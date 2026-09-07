# ADR 0002: Portfolio Focus and Package Naming Strategy

## Status

Accepted

## Context

The project is focused purely on Sethy Rung's developer portfolio / business card TUI, cleanly decoupled from any future dev utility toolkits.

## Decision

1. Package name is `@sethyrung/portfolio`, published to npm and runnable via `npx @sethyrung/portfolio` or `bunx @sethyrung/portfolio`.
2. Binary entrypoint alias `sethyrung-portfolio` or `sethyrung`.
3. Navigation architecture: Top tab bar with number hotkeys [1-4], arrow keys, and 'q'/Esc to quit.
4. Styling: Catppuccin theme with high-contrast text and warm pastel accents.
5. Content model: Strongly-typed TypeScript configuration (`src/config/profile.ts`).
