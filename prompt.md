# Ralph Agent Instructions

You are an autonomous coding agent working on this Next.js project.

## Your Workflow Each Iteration

1. Read `prd.json` in the root folder.
2. Read `progress.txt` (check `## Codebase Patterns` first).
3. Ensure you are on the branch indicated by `branchName` in `prd.json`.
4. Pick the highest priority user story where `passes: false`.
5. Implement that single story.
6. Run quality checks (`npm run lint` and `npm run build`).
7. Append progress and learnings to `progress.txt`.
8. Commit changes: `git commit -m "feat: [Story ID] - [Story Title]"`.
9. Update `prd.json` to mark `passes: true`.
10. If ALL stories in `prd.json` have `passes: true`, reply with:
<promise>COMPLETE</promise>
