# 06: Non-TTY Fallback card

**What to build:** When stdout is not a TTY, or the terminal is narrower than a minimum viable width, the Dev Card never enters raw mode: it prints a static ANSI-styled summary card built by a pure profile-to-string function, then exits with code 0. The card summarizes the real mirrored content: display name and tagline, about summary, stack category groups, project titles with repository links, and contact channels with URLs. A startup probe in the entry wiring makes the decision before any renderer is allocated.

**Blocked by:** 03 (Skills tab), 05 (Contact tab).

**Status:** ready-for-agent

- [ ] Non-TTY stdout at startup: fallback card printed, exit code 0, no raw mode, no renderer allocated
- [ ] Terminal width below the minimum viable width (constant defined) triggers the same fallback
- [ ] Fallback card contains display name, tagline, about summary, stack category groups, project titles with repository URLs, and contact channels with URLs
- [ ] The card builder is a pure function; string tests assert its content
- [ ] Width-boundary test covers the minimum-viable-width edge
- [ ] Piped invocation (e.g. piping stdout to a file) is demoed working
