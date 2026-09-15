# 04: Print stacked Work index with open commands

**What to build:** `work` prints a stacked Role index: title, Period, one-liner, then the command that opens that Role. The command uses the same launcher as the Dev Card. Open Periods end in `now`. Role detail chrome stays as-is aside from Period `now`.

**Blocked by:** 01: Print the command-first Dev Card

**Status:** done

Layout from the prototype:

```
TTGreen  03.2025—now
Junior Frontend Developer on a sustainability and carbon management platform.
npx @sethyrung/portfolio work ttgreen

Young Credit Bureau Program  11.2023—12.2024
Internship contributing to credit bureau systems and security.
npx @sethyrung/portfolio work ycbp

Self-employed  01.2024—now
Independent full-stack applications across web, CMS, and APIs.
npx @sethyrung/portfolio work self-employed
```

- [x] `work` prints the Work index on stdout and exits 0
- [x] Each Role is title, Period, one-liner, then `<bin> work <role>`
- [x] `<bin>` matches the launcher
- [x] Open Periods render as `start—now`
- [x] `work ttgreen` / `ycbp` / `self-employed` still open that Role
- [x] Unknown Role or extra tokens still fail with known Role names
- [x] Tests spawn the CLI process only (S1)
