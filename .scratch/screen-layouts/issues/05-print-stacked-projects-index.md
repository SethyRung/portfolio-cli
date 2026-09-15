# 05: Print stacked Projects index with open commands

**What to build:** `projects` prints a stacked Project index: title, Period, one-liner, then the command that opens that Project. Same pattern as Work. The command uses the same launcher as the Dev Card. Open Periods end in `now`. Project detail chrome stays as-is aside from Period `now`.

**Blocked by:** 01: Print the command-first Dev Card

**Status:** done

Layout from the prototype:

```
Movies  12.2025—now
Movie and TV series discovery with search, browsing, and detail views.
npx @sethyrung/portfolio projects movies

Helpdesk  03.2026—now
Role-based ticket management with Keycloak authentication.
npx @sethyrung/portfolio projects helpdesk

The Angkor Times  02.2025—now
News site with author publishing, admin approval, and SSR pagination.
npx @sethyrung/portfolio projects angkor-times

Nuxt Boilerplate  02.2025—now
Starter template to kickstart Nuxt.js web projects.
npx @sethyrung/portfolio projects nuxt-boilerplate
```

- [x] `projects` prints the Projects index on stdout and exits 0
- [x] Each Project is title, Period, one-liner, then `<bin> projects <project>`
- [x] `<bin>` matches the launcher
- [x] Open Periods render as `start—now`
- [x] `projects movies` / `helpdesk` / `angkor-times` / `nuxt-boilerplate` still open that Project
- [x] Unknown Project or extra tokens still fail with known Project names
- [x] Tests spawn the CLI process only (S1)
