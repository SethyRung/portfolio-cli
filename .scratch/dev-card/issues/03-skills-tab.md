# 03: Skills tab

**What to build:** Switching to the Skills tab shows the owner's full tech stack mirrored from the web portfolio's shared data: every technology entry, grouped by its primary category (Frontend, Backend, Database, Tools, Android/Mobile), rendered as compact multi-item rows so the whole stack fits the viewport. His core web stack is visually emphasized with Catppuccin accents. Presentation consumes only the Profile Configuration schema.

**Blocked by:** 02 (Top Tabs Layout + About tab).

**Status:** done

## Done

- [x] Skills tab renders every tech-stack entry from the Profile Configuration, grouped under its primary category headings (Frontend, Backend, Database, Tools, Android/Mobile)
- [x] Compact multi-item rows keep all groups visible without scrolling on a ≥24-row terminal
- [x] Core web stack items are visually emphasized using Catppuccin accents
- [x] Mounted frame test: switching to Skills shows the category group headings in the captured frame
- [x] lint, format check, and typecheck pass

## Files

- `src/config/profile.ts` — tech-stack entries with primary category
- `src/app.tsx` — Skills category cards with Catppuccin accents
- `src/app.test.tsx` — mounted frame tests for headings and every stack entry
- `.scratch/dev-card/design.md` — removed stale prototype path
