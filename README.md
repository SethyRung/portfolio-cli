# @sethyrung/portfolio

Interactive terminal Dev Card for [Sethy Rung](https://sethyrung.com) — identity, stack, projects, and contact — built with [OpenTUI](https://github.com/anomalyco/opentui) and React 19.

## Run

Requires [Bun](https://bun.sh/) 1.4 or later. OpenTUI's renderer does not run under Node, so `npx` re-execs through Bun when it is on `PATH`.

```bash
npx @sethyrung/portfolio
# or
bunx @sethyrung/portfolio
```

Non-TTY or very narrow terminals print a static ANSI card instead of opening the TUI.

### Local

```bash
bun install
bun run dev
```

## Keyboard

| Key         | Action                                      |
| ----------- | ------------------------------------------- |
| `1`–`4`     | Jump to About / Skills / Projects / Contact |
| `←` `→`     | Cycle tabs                                  |
| `↑` `↓`     | Move selection in Projects and Contact      |
| `tab`       | Toggle live / repo / backend on a project   |
| `enter`     | Open the selected link                      |
| `q` / `esc` | Quit                                        |

## Tabs

- **About** — bio, role, education
- **Skills** — stack grouped by Frontend, Backend, Database, Tools, Mobile
- **Projects** — selectable list; Enter opens live (else repo); Tab picks live / repo / backend
- **Contact** — GitHub, LinkedIn, X, Discord, Telegram, website, email

Profile data lives in `src/config/profile.ts`.

## Develop

```bash
bun test
bun run typecheck
bun run lint
bun run fmt
```
