# Portfolio CLI

## Problem Statement

A visitor should be able to run my portfolio in a terminal (`npx sethyrung`, `bunx sethyrung`, or a curl-installed binary) and read who I am, my Work, and my Projects as styled text. Today the package is an empty Bun shell (an earlier live TUI is being thrown away). I need a commanded CLI that prints Screens, not a full-screen app.

## Solution

A CLI named `sethyrung`. No arguments prints the Dev Card. A Screen name prints that Screen. Work and Projects also take a slug to open one Role or Project. Content is Comark markdown in the repo, rendered to ANSI. Unknown input fails with the known names. The same JS entry runs under Node (npx) and Bun (bunx); GitHub Releases also ship compiled binaries for Linux, macOS, and Windows.

## User Stories

1. As a visitor, I want to run `sethyrung` with no arguments, so that I see the Dev Card immediately.
2. As a visitor, I want the Dev Card to show a name, a Tagline, and links, so that I know who this is in one glance.
3. As a visitor, I want the Dev Card links to be the site, GitHub, and email, so that I can follow up without hunting.
   3a. As a visitor, I want a Hint under those links that maps `sethyrung about` / `work` / `projects` and lists each Role and Project with Period and slug, so that I can drill in without running `--help` or opening an index first.
4. As a visitor, I want the Dev Card to omit location, pronouns, and the current Role, so that it stays a card and not a mini About.
5. As a visitor, I want the Tagline on the Dev Card to be distinct from About, so that the Card stays one line and the bio lives elsewhere.
6. As a visitor, I want to run `sethyrung about`, so that I can read the full bio.
7. As a visitor, I want About to be bio only, so that I am not dropped into education or certs.
8. As a visitor, I want to run `sethyrung work`, so that I can scan Roles as an index.
9. As a visitor, I want each Work index entry to show title, Period, and a one-liner, so that I can scan without reading a full Role.
10. As a visitor, I want to run `sethyrung work ttgreen`, so that I can read the TTGreen Role.
11. As a visitor, I want to run `sethyrung work ycbp`, so that I can read the Young Credit Bureau Program Role.
12. As a visitor, I want to run `sethyrung work self-employed`, so that I can read the self-employed Role.
13. As a visitor, I want a Role Screen to include the rest of that Role (not just the index one-liner), so that drill-in is worth it.
14. As a visitor, I want a Role Screen to show its Stack, so that I can see what was used there.
15. As a visitor, I want to run `sethyrung projects`, so that I can scan shipped Projects as an index.
16. As a visitor, I want each Projects index entry to show title, Period, and a one-liner, so that I can pick one to open.
17. As a visitor, I want to run `sethyrung projects movies`, so that I can read the Movies Project.
18. As a visitor, I want to run `sethyrung projects helpdesk`, so that I can read the Helpdesk Project.
19. As a visitor, I want to run `sethyrung projects angkor-times`, so that I can read The Angkor Times Project.
20. As a visitor, I want to run `sethyrung projects nuxt-boilerplate`, so that I can read the Nuxt Boilerplate Project.
21. As a visitor, I want a Project Screen to include the rest of that Project plus its Stack, so that drill-in is worth it.
22. As a visitor, I want unknown Screen names to fail, so that I am not shown the Dev Card as if nothing went wrong.
23. As a visitor, I want an unknown Screen to print the known Screen names on stderr and exit 1, so that I can correct the command.
24. As a visitor, I want an unknown Work slug to print the known Role slugs on stderr and exit 1, so that I can correct the command.
25. As a visitor, I want an unknown Projects slug to print the known Project slugs on stderr and exit 1, so that I can correct the command.
26. As a visitor, I want `sethyrung about extra` to fail the same way, so that leftover arguments are not ignored.
27. As a visitor, I want `sethyrung work ttgreen extra` to fail the same way, so that leftover arguments are not ignored.
28. As a visitor, I want a successful Screen to print on stdout and exit 0, so that the CLI is scriptable.
29. As a visitor, I want errors on stderr and Screens on stdout, so that I can pipe output without error text.
30. As a visitor, I want `-h` and `--help` to print usage and exit 0, so that I can discover Screens and flags.
31. As a visitor, I want help to list Screen names and the nested slug form, so that I do not have to guess argv.
32. As a visitor, I want `help` not to be a Screen, so that `--help` is the only help path.
33. As a visitor, I want `-v` and `--version` to print the package version and exit 0, so that I can see what I ran.
34. As a visitor, I want `npx sethyrung` to work on Node, so that I do not need Bun installed.
35. As a visitor, I want `bunx sethyrung` to work, so that Bun users have a first-class path.
36. As a visitor, I want a curl one-liner from GitHub Releases to install a binary, so that I can run it without Node or Bun.
37. As a visitor on Linux, macOS, or Windows (x64 or arm64), I want a matching binary, so that the curl path is not OS-specific folklore.
38. As a visitor, I want `NO_COLOR` to suppress ANSI, so that the output is readable in logs and dumps.
39. As a visitor, I want output to go straight to stdout with no pager, so that pipes and `less` of my own still work.
40. As a visitor, I want links to be visible as text (label and URL), so that they survive copy/paste and non-hyperlink terminals.
41. As a visitor, I want the terminal width to follow the real TTY when known, so that rules and wrapping are not stuck at 80 on a wide terminal.
42. As an author, I want each Screen to be Comark markdown I can edit, so that copy changes do not require code changes.
43. As an author, I want a new Role or Project to appear when I add a markdown file named with its slug, so that inventory is files, not a registry.
44. As an author, I want Work and Projects indexes to live next to their detail files, so that I can find copy in one folder per Screen.
45. As an author, I want `::identity` and `::links` on the Dev Card, so that the Card has structure without being a TUI.
46. As an author, I want `::role` and `::project` with title and Period as props, so that indexes and details share one vocabulary.
47. As an author, I want `::stack` as a child of Role and Project, so that technologies are structured and not category labels.
48. As an author, I want prose to stay ordinary Markdown, so that bios and bullets are not components.
49. As an author, I want education, certs, and bookmarks out of v1, so that the CLI stays lean.
50. As a CI job, I want to spawn the CLI with argv and assert exit code plus stdout/stderr, so that visitor behavior is locked without testing internals.

## Implementation Decisions

- Commanded Screens, not a live TUI and not a one-shot-only Dev Card (ADR 0001).
- Ship all three: Node-compatible npx, bunx, and compiled binaries from GitHub Releases for Linux, macOS, and Windows, x64 and arm64 (ADR 0002). Dev and tests stay on Bun. The published JS entry must run on Node.
- Binary name: `sethyrung`.
- argv: optional flags, then optional Screen, then optional slug. Empty argv is the Dev Card. Screens: `about`, `work`, `projects`.
- Role slugs: `ttgreen`, `ycbp`, `self-employed`. Project slugs: `movies`, `helpdesk`, `angkor-times`, `nuxt-boilerplate`. Slug equals the detail file stem.
- Flags: `-h` / `--help` (usage, exit 0) and `-v` / `--version` (package version, exit 0). No `--no-color` flag; honor `NO_COLOR` via `@comark/ansi`.
- Unknown Screen, unknown slug, or extra tokens: message on stderr that lists the valid names for that position, exit 1. No fuzzy match.
- Content lives as Comark markdown in the repo. Layout: Card, About, Work index, one file per Role, Projects index, one file per Project. Indexes are written content, not generated from details.
- Render with `@comark/ansi`. Width from the stdout column count when it is a TTY, otherwise 80. Always write the Screen to stdout. Never invoke a pager.
- Comark components in v1: `identity`, `links`, `role`, `project`, and `stack`. Period is a prop on `role` and `project`, not its own component. No Tag component.
- `identity` renders name + Tagline. `links` renders site, GitHub, and email. The Dev Card Hint maps Screen commands and lists Role/Project titles, Periods, and slugs — not `--help`, not the full Screens. `stack` is only valid as a child of `role` or `project`.
- Work/Projects index uses `role` / `project` with title, Period, and the one-liner only. Detail files use the same components plus prose and `stack`.
- About is a markdown bio. It does not include education or certs.
- The published package must include the CLI entry, the renderer, and the markdown content. Tests spawn that same entry.
- Do not revive the deleted Ink TUI, tab UI, or non-TTY fallback from the previous Dev Card.

## Testing Decisions

- Test external behavior only: argv in, exit code + stdout + stderr out. Do not test routers, parsers, component renderers, or Comark internals in isolation.
- One seam (S1): spawn the CLI process. Prefer the same entry a visitor runs.
- Assert on exit code, stderr text for failures, and visitor-visible text on stdout for Screens (name, Tagline, Screen headings, slugs' titles, Stack names, links). Strip ANSI when asserting copy. One test should run with `NO_COLOR` and expect no escape codes.
- Cover at least: default Dev Card; each top-level Screen; one Role slug; one Project slug; unknown Screen; unknown slug; extra args on About; `--help`; `--version`; `NO_COLOR`.
- There is no remaining prior art in-tree (previous Dev Card tests were removed with the TUI). Start this seam fresh under the existing `bun test` script.

## Out of Scope

- Live TUI, menus, keybindings, tab chrome, or any full-screen redraw.
- Fetching or mirroring sethyrung.com at runtime.
- Shared CMS with the website.
- Education, certs, bookmarks, location, pronouns on the Dev Card.
- Tag / category labels, `::period` as a component, frontmatter as the source of title/Period/Stack.
- Pager, fuzzy matching, JSON output, `--no-color`, `sethyrung help` as a Screen.
- Drill-in on About. Bare slugs (`sethyrung movies` without `projects`).
- Generating Work/Projects indexes from detail files.
- Windows-only extras beyond shipping a Windows binary.

## Further Notes

Glossary: `CONTEXT.md`. Architecture: `docs/adr/0001-commanded-screens.md`, `docs/adr/0002-npx-bunx-and-binaries.md`. After this spec: to-tickets, then implement. GitHub issue publish was skipped — `gh` is not authenticated and no issue-tracker skill setup is present.
