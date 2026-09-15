# 02: Print classic --help

**What to build:** `-h` / `--help` prints classic usage (USAGE, COMMANDS, FLAGS) and exits 0. The bin in USAGE follows the same launcher as the Dev Card. Visitor copy is `[command]`, `work [role]`, `projects [project]` — not screen or slug. `help` is not a Screen.

**Blocked by:** 01: Print the command-first Dev Card

**Status:** done

Layout from the prototype:

```
USAGE
  npx @sethyrung/portfolio [command]

COMMANDS
  (none)                   Dev Card
  about                    Bio
  work [role]              Work index, or a Role
  projects [project]       Projects index, or a Project

FLAGS
  -h, --help               Show usage
  -v, --version            Show version
```

- [x] `-h` and `--help` print usage on stdout and exit 0
- [x] Sections are USAGE, COMMANDS, FLAGS
- [x] USAGE is `<bin> [command]`; COMMANDS list `work [role]` and `projects [project]`
- [x] `<bin>` matches the launcher (npx package, bunx package, or `sethyrung`)
- [x] `help` is not a Screen; unknown `help` as a command still fails
- [x] Tests spawn the CLI process only (S1)
