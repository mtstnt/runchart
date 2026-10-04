# Architecture

## Product
RunChart is a runnable flowchart editor for beginner programmers learning to code. Users draw a flowchart on a canvas and run it step by step.

- **Client-only.** No server, no API calls, no accounts. Everything lives in the user's browser.
- **Persistence = files.** Export a flowchart to JSON; import a JSON file to reopen it on the canvas. Optional autosave to `localStorage`.
- **Stack:** React 19 + Vite, Tailwind v4, Shadcn (`components/ui`), `@xyflow/react` for the canvas, Bun.

## Layout
One page: canvas in the center, side panels around it. Implementation is split by responsibility:

| Path | Contents |
|---|---|
| `components/panels/*.tsx` | Side panels (node palette, properties, variables, output/console, run controls) |
| `components/charts/*.tsx` | One file per node type: its React Flow component, plus its parsing and execution |
| `components/custom/*.tsx` | Reusable app-level UI, wrappers around Shadcn |
| `components/ui/*.tsx` | Shadcn generated. Do not edit |
| `lib/*.ts` | All non-UI code (no JSX): types, interpreter, serialization, validation |

## Core model
- A flowchart is plain serializable data: `{ version, nodes, edges }`. Node `data` holds only JSON-safe values, never functions or class instances.
- Node types are a discriminated union on `type`. Adding a node type means: add it to the union, add its `components/charts/` file, register it in the node-type map. The compiler (exhaustive `switch`) points to what is missing.
- The exported JSON is the same shape as the in-memory model, plus a `version` field for future migration.

## Execution
- Runs entirely in-browser through our own interpreter in `lib/`. User-written expressions are parsed and evaluated by it. **Never `eval` / `new Function`.**
- The interpreter is pure: `(flowchart, runState) -> next runState`. It does not touch React or the DOM. This makes step, run-all, pause and reset trivial, and makes it testable.
- Run state: current node, variables, output log, status (`idle | running | paused | finished | error`).
- Step mode highlights the current node and shows variable changes, since that is the learning goal.
- Guard against infinite loops: cap steps per run and offer a Stop button. Keep the UI responsive (yield between steps; no blocking loop on the main thread).
- Errors point at a node and use beginner-friendly wording ("Variable `x` is not defined"), not raw exceptions.

## Import / export
- Single module in `lib/` owns both directions.
- Import is a trust boundary: parse the file, validate the shape and `version`, and reject or explain failures. Never put unvalidated data into state.
- Export via `Blob` + download link. Import via `<input type="file">`; no File System APIs required.

## State
- One store for the flowchart document and one for run state, shared by canvas and panels. Panels read what they need; they do not duplicate it.
- UI-only state (open panel, selected tab) stays local to the component.
