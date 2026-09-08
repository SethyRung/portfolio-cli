# 02: Top Tabs Layout + About tab

**What to build:** The Dev Card gains its Top Tabs Layout: a tab bar listing About, Skills, Projects, Contact with the active tab visibly highlighted. Users switch tabs with number keys 1-4 or cycle with Left/Right arrows. Landing on the About tab shows the owner's identity highlights mirrored from the web portfolio's shared data: bio, about summary rendered as plain-text bullets (markdown emphasis stripped), job title, current employer, location, and education. The domain glossary's tab-2 label is corrected to Skills so vocabulary matches the spec.

**Blocked by:** 01 (Testable Dev Card shell).

**Status:** done

## Done

- [x] Tab bar renders all four labels with the active tab highlighted; About is active on launch
- [x] Number keys 1-4 jump directly to the corresponding tab
- [x] Left/Right arrows cycle tabs, wrapping at the ends
- [x] About tab renders bio, about bullets as plain text (no markdown markers visible), job title, current employer, location, and education highlights from the Profile Configuration
- [x] Mounted frame tests: after each hotkey/arrow press, the captured frame shows the newly active tab's content and highlight
- [x] Domain glossary's Top Tabs Layout bullet names tab 2 as Skills
- [x] lint, format check, and typecheck pass

## Files

- `src/app.tsx` — tab bar, About cards, number/arrow tab switching
- `src/app.test.tsx` — mounted frame tests for tabs, About content, hotkeys, arrows
- `src/config/profile.ts` — about markdown, employer, education highlights
- `CONTEXT.md` — Top Tabs Layout tab 2 renamed Skills
