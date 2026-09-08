# 01: Testable Dev Card shell

**What to build:** Launching the Dev Card shows the shared chrome from `.scratch/dev-card/design.md`: a rounded mauve-bordered frame titled `@sethyrung/portfolio`, an ascii-font banner of the owner's display name beside his static tagline (Full Stack Developer / Cross-Platform Enthusiast) and location, and the key model on the frame `bottomTitle` — and quits cleanly on `q` or Escape. The interactive screen is decoupled from the CLI entry wiring (per ADR 0001, so Phase 2 subcommands can wrap it later), and the App becomes mountable into OpenTUI's headless test renderer at **100×32**. This ticket establishes the project's bun test harness with its first mounted smoke tests, and seeds the Profile Configuration with the identity data mirrored from the web portfolio's shared data (display name, taglines, bio, job title, location).

Tabs, About cards, and list panes are later tickets.

**Blocked by:** None.

**Status:** done

## Done

- [x] Running the app renders the Dev Card shell: rounded frame titled `@sethyrung/portfolio`, ascii-font banner (display name + tagline + location from the Profile Configuration), and the key-model `bottomTitle`, styled with Catppuccin Mocha accents
- [x] `q` or Escape stops the renderer cleanly and restores the terminal buffer
- [x] Interactive screen mounting is decoupled from CLI entry wiring (ADR 0001): `src/index.tsx` hosts, `src/app.tsx` is the mountable screen
- [x] Profile Configuration seeded at `src/config/profile.ts` (display name, taglines, bio, job title, location)
- [x] bun test harness via OpenTUI headless renderer at 100×32 (`src/app.test.tsx`): frame asserts for title, tagline, location, `bottomTitle`; key-driven quit on `q` and Escape
- [x] lint, format check, and typecheck pass

## Design alignments (vs original flat shell)

- Header is tagline + location only — job title is not repeated (it already leads the tagline)
- Key model lives on the outer box `bottomTitle` (`1-4 tabs · ←/→ cycle · ↑/↓ select · enter open · q/esc quit`), not a crust footer bar
- Viewport for tests is 100×32 per `.scratch/dev-card/design.md`

## Files

- `src/app.tsx` — Dev Card shell
- `src/app.test.tsx` — mounted smoke + quit tests
- `src/config/profile.ts` — identity seed
- `src/theme.ts` — Catppuccin Mocha
- `src/index.tsx` — CLI entry only
