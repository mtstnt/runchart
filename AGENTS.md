# RunChart

Runnable flowchart editor for beginner programmers learning to code. Users build flowcharts on a canvas, run them step by step, export to JSON and import JSON files back. **Client-only: no server, everything lives in the browser.**

Stack: React 19, Vite, TypeScript, Tailwind v4, Shadcn, `@xyflow/react`, Bun, oxlint.

## Read first
- `docs/architecture.md`: structure, data model, execution, import/export. Read before adding features.
- `docs/coding-style.md`: React, styling and typing rules. Follow them exactly.

## Commands
- `bun run dev`: dev server
- `bun run lint`: oxlint
- `bun run build`: typecheck + build (run both lint and build before finishing)
- `bunx --bun shadcn@latest add <component>`: add Shadcn components

## Rules
- Never add a backend, network calls, analytics or accounts. All data stays local.
- Never `eval` or `new Function` user input; use the interpreter in `lib/`.
- Treat imported files as untrusted; validate before use.
- Don't edit `components/ui/*`; extend via `components/custom/*`.
- Audience is beginners: simple UI, plain-language text and error messages.
- Keep changes small and match surrounding code. Don't add dependencies for what a few lines can do.
