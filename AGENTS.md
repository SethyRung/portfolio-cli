# AGENTS.md

## Commands

- `bun install` — install dependencies
- `bun run dev` — dev server (watch mode)
- `bun run typecheck` — TypeScript type check
- `bun run lint` — lint with oxlint
- `bun run lint:fix` — lint + auto-fix
- `bun run fmt` — format with oxfmt
- `bun run fmt:check` — check formatting

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
