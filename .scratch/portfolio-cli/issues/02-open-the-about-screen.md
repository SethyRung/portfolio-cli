# 02: Open the About Screen

**What to build:** `sethyrung about` prints the About Screen (bio only, no education or certs) and exits 0. An unknown Screen name lists the known Screen names on stderr and exits 1. Extra tokens after `about` fail the same way. Errors go to stderr; the Screen goes to stdout.

**Blocked by:** 01: Print the Dev Card

**Status:** done

- [x] `sethyrung about` prints the bio on stdout and exits 0
- [x] About is bio only — no education, certs, or Dev Card Tagline stand-in
- [x] Unknown Screen name: stderr lists known Screens, exit 1, no Screen on stdout
- [x] `sethyrung about extra` fails the same way as an unknown Screen
- [x] Tests spawn the CLI process only
