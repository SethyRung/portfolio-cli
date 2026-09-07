# 01: Testable Dev Card shell

**What to build:** Launching the Dev Card shows a styled shell — an ascii-font banner of the owner's display name with his static tagline (Full Stack Developer / Cross-Platform Enthusiast) in Catppuccin accents, and a footer hint bar documenting the key model — and quits cleanly on `q` or Escape. The interactive screen is decoupled from the CLI entry wiring (per ADR 0001, so Phase 2 subcommands can wrap it later), and the App becomes mountable into OpenTUI's headless test renderer. This ticket establishes the project's bun test harness with its first mounted smoke tests, and seeds the Profile Configuration with the identity data mirrored from the web portfolio's shared data (display name, taglines, bio, job title, location).

**Blocked by:** None (can start immediately).

**Status:** ready-for-agent

- [ ] Running the app renders the Dev Card shell: ascii-font banner (display name + tagline from the Profile Configuration) and a footer hint bar, styled with Catppuccin Mocha accents
- [ ] `q` or Escape stops the renderer cleanly and restores the terminal buffer
- [ ] Interactive screen mounting is decoupled from CLI entry wiring (ADR 0001)
- [ ] Profile Configuration seeded with identity data mirrored from the web portfolio's shared data
- [ ] bun test harness established via OpenTUI's headless test renderer: a mounted smoke test asserts the banner text in a captured frame; a key-driven test asserts clean quit
- [ ] lint, format check, and typecheck pass
