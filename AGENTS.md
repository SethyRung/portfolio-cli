# AGENTS.md

## Runtime

- **Requires Bun >= 1.3.0** — this is not a Node.js project
- Install: `bun install` (no `npm`/`pnpm`/`yarn`)
- Dev server (watch mode): `bun dev`
- Typecheck: `bun run typecheck` — do not call `tsc` directly

## Stack

- **OpenTUI** (`@opentui/core`, `@opentui/react`) — terminal TUI framework
- React 19 with JSX intrinsic elements defined by OpenTUI (e.g. `<box>`, `<text>`, `<ascii-font>`)
- **Do not** assume standard DOM/React HTML elements (`<div>`, `<span>`, etc.) are valid
- Single entry point: `src/index.tsx`

## JSX / TypeScript

- `tsconfig.json` uses `jsxImportSource: "@opentui/react"` — no manual React import needed for JSX
- `moduleResolution: bundler`, `module: Preserve`, `noEmit: true`
- `verbatimModuleSyntax: true` — use `import type` for type-only imports
- Strict mode enabled; `noUncheckedIndexedAccess: true`
