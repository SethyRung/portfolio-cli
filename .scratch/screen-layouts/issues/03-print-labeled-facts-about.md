# 03: Print labeled-facts About

**What to build:** `about` prints the labeled-facts About (TITLE, SCOPE, STACK, NOTE) as ANSI and exits 0. Bio only: no Tagline, education, or certs.

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

Layout from the prototype:

```
  TITLE     Software Developer
  SCOPE     web · mobile · desktop
  STACK     Vue.js  Nuxt.js  TypeScript  React
            Java  Spring Boot  C#  Kotlin
  NOTE      Passionate about exploring new technologies and turning
            ideas into reality through polished, thoughtfully crafted
            projects.
```

- [ ] `about` prints About on stdout and exits 0
- [ ] Rows are TITLE, SCOPE, STACK, NOTE
- [ ] Tagline ("Full Stack Developer") does not appear
- [ ] Education and certs do not appear
- [ ] Extra tokens after `about` still fail
- [ ] Tests spawn the CLI process only (S1)
