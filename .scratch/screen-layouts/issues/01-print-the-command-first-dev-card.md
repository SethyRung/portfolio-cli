# 01: Print the command-first Dev Card

**What to build:** Running the CLI with no arguments prints the command-first Dev Card (NAME, USAGE, LINKS, WORK, PROJECTS) as ANSI and exits 0. USAGE follows the launcher: `npx @sethyrung/portfolio`, `bunx @sethyrung/portfolio`, or `sethyrung` for a compiled binary. Open Periods end in `now`. Detect the launcher (npx vs bunx vs binary), not merely the runtime.

**Blocked by:** None (can start immediately)

**Status:** done

Layout from the prototype:

```
NAME
       Sethy Rung — Full Stack Developer

USAGE
       npx @sethyrung/portfolio
       npx @sethyrung/portfolio about
       npx @sethyrung/portfolio work [ttgreen | ycbp | self-employed]
       npx @sethyrung/portfolio projects [movies | helpdesk | angkor-times | nuxt-boilerplate]

LINKS
       Site     https://sethyrung.com
       GitHub   https://github.com/sethyrung
       Email    rungsethyhk@gmail.com

WORK
       ttgreen          TTGreen                          03.2025—now
       ycbp             Young Credit Bureau Program      11.2023—12.2024
       self-employed    Self-employed                    01.2024—now

PROJECTS
       movies           Movies                           12.2025—now
       helpdesk         Helpdesk                         03.2026—now
       angkor-times     The Angkor Times                 02.2025—now
       nuxt-boilerplate Nuxt Boilerplate                 02.2025—now
```

- [x] No arguments prints the Dev Card on stdout and exits 0
- [x] Sections are NAME, USAGE, LINKS, WORK, PROJECTS — no man-page header
- [x] USAGE uses `npx @sethyrung/portfolio` when launched via npx
- [x] USAGE uses `bunx @sethyrung/portfolio` when launched via bunx
- [x] USAGE uses `sethyrung` when launched as a compiled binary
- [x] Open Periods render as `start—now`; closed Periods keep both ends
- [x] NAME is identity (name + Tagline), distinct from About; no location, pronouns, or current Role
- [x] Tests spawn the CLI process only (S1); stub launcher via env/argv, do not call npx/bunx
