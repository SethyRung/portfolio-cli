# ADR 0003: Navigation, Browser Interaction, and Non-TTY Fallbacks

## Status

Accepted

## Context

An interactive TUI package run via `npx` must deliver a delightful terminal experience, handle keyboard navigation intuitively, provide actionable links, and safely degrade in non-interactive environments (e.g. CI, piped output).

## Decisions

1. **Interactive Links**: Projects and contact items are selectable via Up/Down arrow keys; pressing Enter invokes a cross-platform browser opener (`open` / `xdg-open` / `start`) to launch the relevant URL.
2. **Tab Controls**: Tab navigation supports direct hotkeys `[1-4]` and Left/Right arrow keys. `q` or `Esc` immediately exits.
3. **Non-TTY Fallback**: Detect `!process.stdout.isTTY` at startup; if true, print a static ANSI formatted summary card and exit immediately without allocating the raw terminal screen.
4. **Header Style**: Use OpenTUI `<ascii-font>` for the main header banner with Catppuccin accent styling.
5. **Configuration**: Structured TypeScript configuration in `src/config/profile.ts` with typed schema (`ProfileConfig`).

## Consequences

- Interactive and pipe-safe in all terminal contexts.
- Clean separation between presentation components and personal profile data.
