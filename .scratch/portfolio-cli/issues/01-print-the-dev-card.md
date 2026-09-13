# 01: Print the Dev Card

**What to build:** Running `sethyrung` with no arguments prints the Dev Card (name, Tagline, site/GitHub/email, then a Hint that maps Screen commands and lists Role/Project titles with slugs) as ANSI and exits 0. `--help`/`-h` prints usage and exits 0. `--version`/`-v` prints the package version and exits 0. `NO_COLOR` suppresses escapes. Drop the old live TUI so this is the only CLI.

**Blocked by:** None (can start immediately)

**Status:** done

- [x] `sethyrung` with no arguments prints the Dev Card on stdout and exits 0
- [x] Dev Card shows name, Tagline, and links to the site, GitHub, and email — not location, pronouns, or the current Role
- [x] Dev Card Hint lists `sethyrung about` (bio), `sethyrung work` with each Role title/Period/slug, and `sethyrung projects` with each Project title/Period/slug
- [x] `-h` / `--help` prints usage (including Screen names) and exits 0
- [x] `-v` / `--version` prints the package version and exits 0
- [x] `NO_COLOR` yields no ANSI escape codes
- [x] Tests spawn the CLI process only; no internals
- [x] The previous TUI is gone; this path is what a visitor runs
