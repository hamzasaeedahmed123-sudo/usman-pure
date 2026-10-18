# Research Findings: GSD & Ralph Loop Integration

## Overview
Combining the Get Shit Done (GSD) framework with Geoffrey Huntley's Ralph Loop provides two complementary layers:
1. **GSD Layer (Spec-Driven Brain):** Manages macro roadmap, architectural contracts, and milestones in `.planning/`.
2. **Ralph Loop Layer (Autonomous Engine):** Automates micro-iterations with clean-slate LLM sessions, running tests, making atomic commits, and advancing through tasks until `<promise>COMPLETE</promise>`.

## Dependencies
- **`jq`:** Used by `ralph-loop.sh` to query user stories in `prd.json`, extract status, and update tasks.
- **`gh` (GitHub CLI):** Used for repository issue synchronization, PR generation, and CI status checks.
- **`git`:** Used for branching and committing after each passing user story.
