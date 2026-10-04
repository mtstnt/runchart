# Coding Style

## React
- Components are as pure as possible.
    - No state unless needed. Derive values during render instead of syncing them into state.
    - `useEffect` is only allowed to run a function on mount. Everything else belongs in event handlers or derived values.
    - Do not add `useMemo` / `useCallback` / `memo` by hand; React Compiler is enabled.
- Flowchart state (nodes, edges, run state) lives in one place (see `architecture.md`). Components read from it; they do not keep copies.
- Custom React Flow node/edge types are defined once at module level, never inline in a component (a new object each render remounts every node).

## Styling
- Theme via `src/index.css` (Shadcn tokens). Use raw Tailwind classes with theme tokens (`bg-background`, `text-muted-foreground`, ...).
    - No inline colors, inline `style`, or custom classes in `.css` files. Exceptions:
        - Node colors.
        - Exceptional colors (debugging steps, run highlights, etc).
- Need multiple instances? Extract a component into `components/custom/*.tsx`.
- Never edit `components/ui/*.tsx` (Shadcn, regenerated via CLI). Wrap or extend in `components/custom/*.tsx`.
- Use the `@/` alias for imports from `src`.

## Code
- Each line is simple and concise. No workarounds; fix the cause.
- Beginner-friendly UI: plain language in labels and error messages, never raw JS exceptions or stack traces.
- Types must be sound and accurate. No `any` or `unknown` unless justified by a comment or `TODO`.
    - Model nodes as discriminated unions on `type`; handle them with exhaustive `switch`.
    - Data from outside (imported JSON, `localStorage`) is untrusted: validate at the boundary, then use typed values.
- No `eval`, `new Function`, or dynamic `import()` of user content. User code runs only through our own interpreter in `lib/`.
- Pure logic in `lib/*.ts` gets a small test or self-check when it has branches (interpreter, import validation, serialization).
- Run `bun run lint` and `bun run build` before finishing.
