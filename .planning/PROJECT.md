# Project: Next.js Web Application (GSD Framework)

## Vision & Overview
A modern, high-performance web application built with Next.js (App Router), TypeScript, and Tailwind CSS. The project adopts the **Get Shit Done (GSD)** framework and **Ralph Loop** methodology for autonomous, spec-driven development.

## Tech Stack
- **Framework:** Next.js 15+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Code Quality:** ESLint, TypeScript Strict Mode
- **Autonomous Tooling:** Ralph Loop (`ralph-loop.sh`), GitHub CLI (`gh`), `jq`

## Architecture & Principles
1. **Spec-Driven Development:** Every feature begins with structured requirements in `.planning/` and user stories in `prd.json`.
2. **Atomic Iterations:** Tasks are small and verifiable. Each loop iteration tackles a single story.
3. **Continuous Verification:** Zero broken builds. Every commit must pass typecheck and linting.
4. **Persistent Memory:** Knowledge and discovered patterns are written to `progress.txt` and `AGENTS.md`.

## Non-Negotiables
- Do not commit broken TypeScript or failing linters.
- Always update task progress in both `prd.json` and `progress.txt`.
- Keep changes minimal and focused on the active user story.
