# Codebase Architecture

## Directory Structure
```
.
├── .planning/             # GSD specification brain (PROJECT, ROADMAP, REQUIREMENTS, STATE)
├── src/
│   └── app/               # Next.js App Router (layout.tsx, page.tsx, globals.css)
├── public/                # Static assets (SVGs, images, fonts)
├── prd.json               # Ralph Loop task backlog & acceptance criteria
├── progress.txt           # Persistent append-only iteration log
├── CLAUDE.md              # Agent prompt instructions for fresh context iterations
├── ralph-loop.sh          # Ralph autonomous execution bash loop
├── package.json           # Node project manifest & scripts
├── tsconfig.json          # TypeScript compiler configuration
└── eslint.config.mjs      # ESLint configuration
```

## Architectural Conventions
1. **Server vs. Client Components:** Default to Server Components (`React Server Components`). Use `'use client'` explicitly only when event handlers, hooks (`useState`, `useEffect`), or browser APIs are required.
2. **Styling:** Tailwind CSS utility classes. Avoid hardcoded hex colors when design tokens or theme classes exist.
3. **Paths & Imports:** Utilize the `@/*` alias pointing directly to `src/*`.
