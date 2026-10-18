# Project: Usman's Pure (E-Commerce & Brand Showcase)

## Vision & Overview
**Usman's Pure** is a premium organic storefront specializing in 100% unrefined cold-pressed oils, raw unprocessed forest honey, and certified organic herbs. The project is built using Next.js 16 (App Router), TypeScript, Tailwind CSS v4, and GSAP/Framer Motion fluid kinetic physics, guided by the **Get Shit Done (GSD)** framework and **Ralph Loop** methodology.

## Tech Stack
- **Framework:** Next.js 16+ (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 with glassmorphism design tokens
- **Animations:** GSAP 3 (Canvas fluid particle mechanics) & Framer Motion
- **Icons:** Lucide React
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
