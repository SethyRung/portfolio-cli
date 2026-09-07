# 02: Top Tabs Layout + About tab

**What to build:** The Dev Card gains its Top Tabs Layout: a tab bar listing About, Skills, Projects, Contact with the active tab visibly highlighted. Users switch tabs with number keys 1-4 or cycle with Left/Right arrows. Landing on the About tab shows the owner's identity highlights mirrored from the web portfolio's shared data: bio, about summary rendered as plain-text bullets (markdown emphasis stripped), job title, current employer, location, and education. The domain glossary's tab-2 label is corrected to Skills so vocabulary matches the spec.

**Blocked by:** 01 (Testable Dev Card shell).

**Status:** ready-for-agent

- [ ] Tab bar renders all four labels with the active tab highlighted; About is active on launch
- [ ] Number keys 1-4 jump directly to the corresponding tab
- [ ] Left/Right arrows cycle tabs, wrapping at the ends
- [ ] About tab renders bio, about bullets as plain text (no markdown markers visible), job title, current employer, location, and education highlights from the Profile Configuration
- [ ] Mounted frame tests: after each hotkey/arrow press, the captured frame shows the newly active tab's content and highlight
- [ ] Domain glossary's Top Tabs Layout bullet names tab 2 as Skills
