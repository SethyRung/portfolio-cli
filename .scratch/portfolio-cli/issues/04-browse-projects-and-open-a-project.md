# 04: Browse Projects and open a Project

**What to build:** `sethyrung projects` prints the Projects index (each Project as title, Period, one-liner). `sethyrung projects <slug>` prints that Project’s detail, including Stack. Slugs: `movies`, `helpdesk`, `angkor-times`, `nuxt-boilerplate`. Unknown slug or extra tokens list valid Project slugs on stderr and exit 1.

**Blocked by:** 03: Browse Work and open a Role

**Status:** done

- [x] `sethyrung projects` prints the Projects index on stdout and exits 0
- [x] Index entries show title, Period, and a one-liner only
- [x] `sethyrung projects movies`, `helpdesk`, `angkor-times`, and `nuxt-boilerplate` each print that Project’s detail including Stack
- [x] Unknown Projects slug: stderr lists known Project slugs, exit 1
- [x] Extra tokens after a Project slug fail the same way
- [x] Tests spawn the CLI process only
