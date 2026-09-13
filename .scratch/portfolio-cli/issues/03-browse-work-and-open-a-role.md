# 03: Browse Work and open a Role

**What to build:** `sethyrung work` prints the Work index (each Role as title, Period, one-liner). `sethyrung work <slug>` prints that Role’s detail, including Stack. Slugs: `ttgreen`, `ycbp`, `self-employed`. Unknown slug or extra tokens list valid Role slugs on stderr and exit 1.

**Blocked by:** 02: Open the About Screen

**Status:** done

- [x] `sethyrung work` prints the Work index on stdout and exits 0
- [x] Index entries show title, Period, and a one-liner only
- [x] `sethyrung work ttgreen`, `ycbp`, and `self-employed` each print that Role’s detail including Stack
- [x] Unknown Work slug: stderr lists known Role slugs, exit 1
- [x] Extra tokens after a Role slug fail the same way
- [x] Tests spawn the CLI process only
