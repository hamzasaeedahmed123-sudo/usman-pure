# Ralph Agent Instructions

You are an autonomous coding agent working on this Next.js project.

## Your Workflow Each Iteration

1. **Read PRD:** Check `prd.json` in the root folder.
2. **Read Progress Log:** Check `progress.txt` (read the `## Codebase Patterns` section first).
3. **Verify Git Branch:** Ensure you are on the branch indicated by `branchName` in `prd.json` (e.g. `ralph/feature-foundation`). Create or switch to it if needed.
4. **Select Next Task:** Find the **highest priority** user story where `passes: false`. Work on **ONLY ONE** story per iteration.
5. **Implement Story:** Write clean, modular TypeScript / React code matching the acceptance criteria.
6. **Quality Checks:** Run project validation:
   ```bash
   npm run lint
   npm run build
   ```
7. **Document Learnings:**
   - Append to `progress.txt` under `## [Date] - [Story ID]`.
   - If you discovered a reusable pattern or architectural convention, update `## Codebase Patterns` in `progress.txt` and `.planning/codebase/ARCHITECTURE.md`.
8. **Git Commit:** If quality checks pass, commit all changes:
   ```bash
   git add -A
   git commit -m "feat: [Story ID] - [Story Title]"
   ```
9. **Update PRD:** Mark `passes: true` for the completed story in `prd.json`.
10. **Stop Condition Check:** Check if all user stories in `prd.json` have `passes: true`.
    - If ALL stories pass, output: `<promise>COMPLETE</promise>`
    - If remaining stories are pending, end normally so the next loop iteration begins with a clean context.

## Constraints
- Never commit broken code (build or lint errors).
- Do not attempt multiple stories in a single iteration—keep context minimal.
- Always use `@/*` import paths for `src/`.
