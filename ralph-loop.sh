#!/usr/bin/env bash
# ==============================================================================
# Ralph Loop - Autonomous AI Agent Execution Harness
# Usage:
#   ./ralph-loop.sh [max_iterations]
#   ./ralph-loop.sh --tool claude [max_iterations]
#   ./ralph-loop.sh --tool amp [max_iterations]
# ==============================================================================

# Ensure standard POSIX utilities are on PATH when run via Git for Windows
if [ -d "/usr/bin" ]; then
  export PATH="/usr/bin:$PATH"
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PRD_FILE="$SCRIPT_DIR/prd.json"
PROGRESS_FILE="$SCRIPT_DIR/progress.txt"
ARCHIVE_DIR="$SCRIPT_DIR/archive"
LAST_BRANCH_FILE="$SCRIPT_DIR/.last-branch"
CLAUDE_PROMPT="$SCRIPT_DIR/CLAUDE.md"
AMP_PROMPT="$SCRIPT_DIR/prompt.md"

# ------------------------------------------------------------------------------
# 1. Dependency Verification
# ------------------------------------------------------------------------------
MISSING_DEPS=0

check_dependency() {
  local cmd="$1"
  local install_hint="$2"
  if ! command -v "$cmd" >/dev/null 2>&1; then
    echo "❌ Missing dependency: '$cmd'"
    echo "   Install command: $install_hint"
    echo ""
    MISSING_DEPS=1
  fi
}

echo "🔍 Checking Ralph Loop dependencies..."
check_dependency "git" "Windows: winget install --id Git.Git -e | macOS: brew install git | Linux: sudo apt install git"
check_dependency "jq"  "Windows: winget install --id jqlang.jq -e | macOS: brew install jq | Linux: sudo apt install jq"
check_dependency "gh"  "Windows: winget install --id GitHub.cli -e | macOS: brew install gh | Linux: sudo apt install gh"

if [ "$MISSING_DEPS" -ne 0 ]; then
  echo "⚠️  Please install missing dependencies before running Ralph Loop."
  exit 1
fi
echo "✅ All required CLI dependencies (git, jq, gh) are available."

# ------------------------------------------------------------------------------
# 2. Argument Parsing
# ------------------------------------------------------------------------------
TOOL="claude"
MAX_ITERATIONS=10

while [[ $# -gt 0 ]]; do
  case $1 in
    --tool)
      TOOL="$2"
      shift 2
      ;;
    --tool=*)
      TOOL="${1#*=}"
      shift
      ;;
    *)
      if [[ "$1" =~ ^[0-9]+$ ]]; then
        MAX_ITERATIONS="$1"
      fi
      shift
      ;;
  esac
done

if [[ "$TOOL" != "claude" && "$TOOL" != "amp" ]]; then
  echo "❌ Error: Invalid tool '$TOOL'. Supported tools are 'claude' or 'amp'."
  exit 1
fi

if [ ! -f "$PRD_FILE" ]; then
  echo "❌ Error: PRD file not found at '$PRD_FILE'."
  exit 1
fi

# ------------------------------------------------------------------------------
# 3. Branch Archiving & Setup
# ------------------------------------------------------------------------------
CURRENT_BRANCH=$(jq -r '.branchName // empty' "$PRD_FILE" 2>/dev/null || echo "")

if [ -f "$LAST_BRANCH_FILE" ] && [ -n "$CURRENT_BRANCH" ]; then
  LAST_BRANCH=$(cat "$LAST_BRANCH_FILE" 2>/dev/null || echo "")
  if [ -n "$LAST_BRANCH" ] && [ "$CURRENT_BRANCH" != "$LAST_BRANCH" ]; then
    DATE=$(date +%Y-%m-%d)
    FOLDER_NAME=$(echo "$LAST_BRANCH" | sed 's|^ralph/||' | tr '/' '-')
    ARCHIVE_FOLDER="$ARCHIVE_DIR/$DATE-$FOLDER_NAME"
    echo "📦 Archiving previous run '$LAST_BRANCH' to '$ARCHIVE_FOLDER'..."
    mkdir -p "$ARCHIVE_FOLDER"
    [ -f "$PRD_FILE" ] && cp "$PRD_FILE" "$ARCHIVE_FOLDER/"
    [ -f "$PROGRESS_FILE" ] && cp "$PROGRESS_FILE" "$ARCHIVE_FOLDER/"
    echo "   Archived successfully."

    # Reset progress for new feature branch
    echo "# Ralph Progress Log" > "$PROGRESS_FILE"
    echo "Started: $(date)" >> "$PROGRESS_FILE"
    echo "---" >> "$PROGRESS_FILE"
  fi
fi

if [ -n "$CURRENT_BRANCH" ]; then
  echo "$CURRENT_BRANCH" > "$LAST_BRANCH_FILE"
  # Switch or create feature branch if git repository is initialized
  if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
    if ! git rev-parse --verify "$CURRENT_BRANCH" >/dev/null 2>&1; then
      echo "🌿 Creating feature branch: $CURRENT_BRANCH"
      git checkout -b "$CURRENT_BRANCH" 2>/dev/null || true
    else
      echo "🌿 Switching to branch: $CURRENT_BRANCH"
      git checkout "$CURRENT_BRANCH" 2>/dev/null || true
    fi
  fi
fi

# Initialize progress log if missing
if [ ! -f "$PROGRESS_FILE" ]; then
  echo "# Ralph Progress Log" > "$PROGRESS_FILE"
  echo "Started: $(date)" >> "$PROGRESS_FILE"
  echo "---" >> "$PROGRESS_FILE"
fi

# ------------------------------------------------------------------------------
# 4. Autonomous Execution Loop
# ------------------------------------------------------------------------------
echo ""
echo "🚀 ==============================================================="
echo "   Starting Ralph Loop"
echo "   Tool:           $TOOL"
echo "   Max Iterations: $MAX_ITERATIONS"
echo "   PRD:            $PRD_FILE"
echo "==============================================================="

for ((i = 1; i <= MAX_ITERATIONS; i++)); do
  # Check pending stories
  PENDING_COUNT=$(jq '[.userStories[] | select(.passes == false)] | length' "$PRD_FILE" 2>/dev/null || echo "0")
  TOTAL_COUNT=$(jq '.userStories | length' "$PRD_FILE" 2>/dev/null || echo "0")

  if [ "$PENDING_COUNT" -eq 0 ] && [ "$TOTAL_COUNT" -gt 0 ]; then
    echo ""
    echo "🎉 ALL TASKS COMPLETE!"
    echo "   All $TOTAL_COUNT user stories in $PRD_FILE have passes: true."
    exit 0
  fi

  CURRENT_STORY_ID=$(jq -r '[.userStories[] | select(.passes == false)] | sort_by(.priority)[0].id // "Unknown"' "$PRD_FILE")
  CURRENT_STORY_TITLE=$(jq -r '[.userStories[] | select(.passes == false)] | sort_by(.priority)[0].title // "Next available task"' "$PRD_FILE")

  echo ""
  echo "---------------------------------------------------------------"
  echo "  Iteration $i of $MAX_ITERATIONS"
  echo "  Remaining Stories: $PENDING_COUNT / $TOTAL_COUNT"
  echo "  Current Target:    [$CURRENT_STORY_ID] $CURRENT_STORY_TITLE"
  echo "---------------------------------------------------------------"

  OUTPUT=""
  if [[ "$TOOL" == "claude" ]]; then
    if ! command -v claude >/dev/null 2>&1; then
      echo "⚠️  'claude' CLI not found in PATH. Install via: npm install -g @anthropic-ai/claude-code"
      exit 1
    fi
    OUTPUT=$(claude --dangerously-skip-permissions --print < "$CLAUDE_PROMPT" 2>&1 | tee /dev/stderr) || true
  elif [[ "$TOOL" == "amp" ]]; then
    if ! command -v amp >/dev/null 2>&1; then
      echo "⚠️  'amp' CLI not found in PATH."
      exit 1
    fi
    OUTPUT=$(cat "$AMP_PROMPT" | amp --dangerously-allow-all 2>&1 | tee /dev/stderr) || true
  fi

  # Check if agent issued completion signal
  if echo "$OUTPUT" | grep -q "<promise>COMPLETE</promise>"; then
    echo ""
    echo "🎯 Complete signal received (<promise>COMPLETE</promise>) at iteration $i!"
    exit 0
  fi

  echo "Iteration $i completed. Resetting context for next iteration..."
  sleep 2
done

echo ""
echo "⏳ Ralph reached max iterations ($MAX_ITERATIONS) with remaining tasks."
echo "   Inspect $PROGRESS_FILE and $PRD_FILE to review current progress."
exit 1
