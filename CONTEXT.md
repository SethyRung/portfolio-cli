# Ubiquitous Language & Domain Model

## Core Concepts

### Dev Card (Portfolio TUI)

The interactive terminal UI experience focused exclusively on Sethy Rung's developer profile, skills, featured projects, and social contacts. Decoupled from any future developer utility toolkits.

### Package Scope & Naming

Distributed as `@sethyrung/portfolio`, runnable via `npx @sethyrung/portfolio` or `bunx @sethyrung/portfolio`.

### Top Tabs Layout

Navigation paradigm using a top tab bar (About, Stack, Projects, Contact), driven by Arrow Keys, number keys [1-4], and 'q'/Esc to quit.

### Catppuccin Theme

The visual color palette featuring Catppuccin terminal colors (Mocha: crust `#11111b`, base `#1e1e2e`, mantle `#181825`, mauve `#cba6f7`, blue `#89b4fa`, teal `#94e2d5`, peach `#fab387`, green `#a6e3a1`, text `#cdd6f4`, subtext `#a6adc8`).

### Navigation & Interaction Model

- **Tabs**: `About`, `Skills`, `Projects`, `Contact`. Switched via number keys `[1-4]` or `←` / `→` arrow keys.
- **List Navigation**: Within `Projects` and `Contact`, `↑` and `↓` arrow keys move selection focus.
- **Action**: `Enter` opens the highlighted project repository or social profile in the system's default browser.
- **Exit**: `q` or `Esc` cleanly destroys the renderer and restores the terminal buffer.

### Non-TTY Fallback

When `process.stdout.isTTY` is false or terminal width is under minimum viable size, the CLI bypasses OpenTUI and outputs a static ANSI stylized developer card before cleanly exiting.

### Profile Configuration

Single source of truth in a strongly-typed TypeScript configuration file (`src/config/profile.ts`).

### TUI Host

The terminal application container powered by `@opentui/core` and `@opentui/react`, running in raw mode with keyboard navigation, reactive rendering, and ANSI color styling.

### Scoped Package

The distribution artifact published to npm under the `@sethyrung` namespace.
