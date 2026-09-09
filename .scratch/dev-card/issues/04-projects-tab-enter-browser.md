# 04: Projects tab with selection and Enter→browser

**What to build:** Switching to the Projects tab shows every real project mirrored from the web portfolio's shared data as a selectable one-line row — title, one-line description, stack tags. Up/Down arrows move a visibly highlighted selection through the list. The selected row additionally shows the project's repository URL and live demo link (where one exists). Pressing Enter opens the selected project's repository in the system default browser via an injected cross-platform opener adapter (open / xdg-open / start dispatch); the interactive screen never spawns processes directly, and tests assert against an opener spy.

**Blocked by:** 02 (Top Tabs Layout + About tab). Runs in parallel with 03.

**Status:** done

## Done

- [x] Projects tab renders every project from the Profile Configuration as a one-line row (title, description, stack tags), fitting a ≥24-row terminal
- [x] One row is always selected with visible focus; Up/Down move it, bounded at the list ends
- [x] The selected row shows the repository URL and the live demo link when one exists
- [x] Enter passes the selected project's repository URL to the opener adapter
- [x] The browser opener is injected; the interactive screen never spawns processes directly
- [x] Spy test: pressing Enter on a known selection requests exactly that project's repository URL
- [x] Frame tests: the focus marker moves visibly with Up/Down, and the selected row's URLs appear in the frame
- [x] lint, format check, and typecheck pass

## Files

- `src/config/profile.ts` — all 14 projects with repo/live/stacks
- `src/app.tsx` — Projects master-detail; Enter via injected `openUrl`
- `src/open-url.ts` — platform opener (`open` / `xdg-open` / `start`)
- `src/index.tsx` — injects opener into App
- `src/app.test.tsx` — list, selection, and opener-spy tests
