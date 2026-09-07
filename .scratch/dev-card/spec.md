# Spec: Dev Card (Portfolio TUI)

## Problem Statement

Sethy Rung has no shareable, interactive representation of his developer profile. People who encounter his work — via a GitHub README, a talk, a social bio, or a conversation — are pointed at scattered links instead of a single artifact. A PDF résumé or static site is impersonal and out of place for a terminal-native audience. All the canonical content already exists — the web portfolio's shared data module holds his identity, tech stack, experience, projects, and social channels — but nothing lets a curious developer explore it in the terminal, and nothing degrades safely when run piped or in CI.

## Solution

Publish a Scoped Package, `@sethyrung/portfolio`, that renders an interactive Dev Card — a TUI Host powered by OpenTUI — launched with `npx @sethyrung/portfolio` or `bunx @sethyrung/portfolio` with zero install steps. The Dev Card presents a Top Tabs Layout (About, Skills, Projects, Contact) styled with the Catppuccin Theme, an ascii-font name banner, and full keyboard navigation. Content is not invented: a strongly-typed Profile Configuration mirrors the web portfolio's canonical shared data — identity and bio, the full tech stack with its categories, all real projects with repo and live links, and the social channels — so the Dev Card is the terminal surface of the same truth as the website. Projects and Contact items are selectable lists; Enter opens the highlighted item's URL in the system's default browser. In any non-interactive or too-narrow environment, the Non-TTY Fallback prints a static ANSI-styled developer card and exits cleanly.

## User Stories

1. As a developer visiting Sethy's profile, I want to launch the Dev Card with a single `npx @sethyrung/portfolio` command, so that I can explore his portfolio in seconds without installing anything.
2. As a developer launching the Dev Card, I want an ascii-font banner of his name with his tagline (Full Stack Developer / Cross-Platform Enthusiast), so that the first impression feels crafted and personal.
3. As a developer navigating the Dev Card, I want a top tab bar listing About, Skills, Projects, and Contact with the active tab visually highlighted, so that I always know where I am and what else is available.
4. As a developer navigating the Dev Card, I want to jump to any tab with number keys 1-4, so that I can reach a section in one keystroke.
5. As a developer navigating the Dev Card, I want to cycle tabs with Left and Right arrows, so that I can browse sections sequentially.
6. As a developer on the About tab, I want his bio, job title, current employer, location, and education highlights, so that I understand who he is and what he does at a glance.
7. As a developer on the About tab, I want the about summary rendered as readable plain-text bullets with markdown emphasis stripped, so that nothing looks like raw markup.
8. As a developer on the Skills tab, I want his technologies grouped by domain (Frontend, Backend, Database, Tools, Mobile) as recorded in his tech stack data, so that I can quickly gauge the breadth of his stack.
9. As a developer on the Skills tab, I want his core web stack visually emphasized with Catppuccin accents, so that his strongest areas stand out from the rest.
10. As a developer on the Projects tab, I want all his real projects listed with name, one-line description, and stack tags, so that I can scan everything he has built without leaving the terminal.
11. As a developer on the Projects tab, I want the selected project to show both its repository URL and its live demo link (when one exists), so that I know where Enter will take me and where the deployed site lives.
12. As a developer on the Projects tab, I want the selected project visually highlighted, so that I always know what Enter will act on.
13. As a developer in a list tab, I want Up and Down arrows to move the selection with visible focus, so that I can pick an item without a mouse.
14. As a developer with a project selected, I want Enter to open its repository in my default browser, so that I can dig into the code immediately.
15. As a developer on the Contact tab, I want all his channels listed — GitHub, X, LinkedIn, Discord, Telegram, YouTube, plus his website and email — so that I know every way to reach him.
16. As a developer on the Contact tab, I want each channel row to show the handle or address (e.g. `@sethyrung`), so that I can identify accounts at a glance.
17. As a developer with a contact channel selected, I want Enter to open it in my default browser (or mail client for email), so that connecting takes two keystrokes.
18. As a developer finished exploring, I want `q` or Escape to quit immediately and restore my terminal buffer, so that leaving is instant and leaves no artifacts.
19. As a developer on Linux, macOS, or Windows, I want URLs opened via the correct platform mechanism, so that Enter behaves identically everywhere.
20. As a developer on any terminal, I want on-screen hints for tab hotkeys, list navigation, and quitting, so that I can navigate without external documentation.
21. As a script or CI author, I want the package piped to a file to print the static Non-TTY Fallback card and exit with code 0, so that embedding its output in logs is safe.
22. As a user in a very narrow terminal, I want the static fallback card instead of a broken interactive layout, so that output is never garbled.
23. As a terminal user, I want the Catppuccin Theme applied with high-contrast text and warm pastel accents, so that the Dev Card is beautiful on themed terminals and still legible on plain ones.
24. As Sethy (owner), I want the Profile Configuration to mirror the web portfolio's canonical shared data, so that the Dev Card stays consistent with the site and edits touch data, never presentation code.
25. As Sethy (owner), I want the Profile Configuration schema to reject missing or malformed entries at typecheck, so that bad content cannot ship.
26. As Sethy (owner), I want contact details kept base64-encoded in the configuration exactly as in the shared data, decoded only at runtime, so that the obfuscation intent carries over to the package source.
27. As Sethy (owner), I want the interactive screen decoupled from the CLI entry routing, so that Phase 2 toolkit subcommands can be added without touching the Dev Card.
28. As Sethy (owner), I want the package published under the `@sethyrung` scope with the binary alias `sethyrung`, so that it is runnable via npx/bunx and globally installable by name.
29. As Sethy (owner), I want lint, typecheck, and tests green before any publish, so that releases do not regress.

## Implementation Decisions

- The Dev Card is Phase 1 of the product per ADR 0001: purely the interactive portfolio card, no toolkit subcommands yet. The entry wiring stays decoupled from the interactive screen so a subcommand router can wrap it in Phase 2.
- Tabs, labels, and order are fixed: About, Skills, Projects, Contact (number keys 1-4 map in order). Tab 2 is named Skills, resolving the glossary conflict in favor of the Navigation & Interaction Model vocabulary.
- Keyboard model: 1-4 select tabs; Left/Right cycle tabs; Up/Down move selection within the Projects and Contact lists; Enter opens the selected item's URL; `q` or Escape quits immediately.
- The browser opener is a cross-platform adapter (open / xdg-open / start dispatch) injected into the interactive screen; the Dev Card itself never spawns processes directly.
- Content source: the Profile Configuration is a local, strongly-typed copy mirroring the web portfolio's shared data module — its identity, tech-stack, project, and social-link shapes, seeded with the same real content. An npm package cannot import a sibling repo, so re-sync is a manual copy; no sync tooling.
- Identity model: display name, taglines (used as the static banner tagline), bio, about summary (markdown emphasis stripped to plain-text bullets), job title, current employer, location, and education highlights.
- Skills model: every tech-stack entry, grouped by its primary category (Frontend, Backend, Database, Tools, Android/Mobile), rendered as compact multi-item rows to fit the viewport; the core web stack emphasized with Catppuccin accents.
- Projects model: every project as a selectable one-line row — title, one-line description, stack tags. The selected row additionally shows the repository URL and live demo link where one exists. Enter opens the repository, per ADR 0003. One-line rows keep the full fifteen-project list inside a ≥24-row terminal.
- Contact model: rows built from the social-channel data — title plus handle plus URL — plus the website and the email address. Email is carried base64-encoded in the Profile Configuration, as in the shared data, and decoded at runtime only for display and mailto actions. Bookmarks, phone numbers, detailed experience records, and certifications are excluded from the Dev Card; only the curated identity highlights surface on About.
- Non-TTY Fallback: at startup, if stdout is not a TTY or terminal width is below a minimum viable size, print a static ANSI-styled summary card (display name, tagline, about summary, stack groups, project titles with repo links, contact channels) and exit with code 0 — no raw mode, no renderer allocation. The fallback card builder is a pure function from profile to string.
- Visual identity: Catppuccin Mocha palette (crust `#11111b`, base `#1e1e2e`, mantle `#181825`, text `#cdd6f4`, subtext `#a6adc8`; accents mauve `#cba6f7`, blue `#89b4fa`, teal `#94e2d5`, peach `#fab387`, green `#a6e3a1`). Header banner uses OpenTUI ascii-font with accent styling; a footer hint bar documents the key model.
- Interactive state is minimal: active tab index plus a selected item index per list tab; nothing persists between runs.
- Package identity: `@sethyrung` scope, bin alias `sethyrung` (deliberately takes the bare name; Phase 2 toolkit will need a distinct alias), runnable via `npx @sethyrung/portfolio` or `bunx @sethyrung/portfolio`.
- The test harness uses the official headless test renderer and mock key input from OpenTUI's testing utilities; no custom TUI harness is built.

## Testing Decisions

- A good test asserts only externally visible behavior: the text visible in a captured screen frame, the URL requested via the injected opener, and whether the app exited. Internal component structure and state are never asserted.
- Runner: `bun test`. These are the first tests in the codebase; this spec establishes the harness.
- Primary seam — the mounted interactive screen: render the real Dev Card App into the headless test renderer, drive it with mock keystrokes, and assert on captured character frames. Covers: initial render (banner, tab bar, About content, hint bar), tab switching via 1-4 and Left/Right (frame shows the active tab's content), Up/Down selection movement (frame shows the focus marker move), Enter (opener spy receives the selected item's URL), and `q`/Escape (renderer stops cleanly).
- Secondary seam — the fallback card builder: a pure function whose output is asserted as a string (contains display name, stack group headings, project titles, contact URLs), with no renderer involved.
- Data integrity: the Profile Configuration must satisfy schema-level checks — every project carries a repository URL, every social channel carries a URL and handle, tech-stack groups are non-empty, and the base64 email decodes to a well-formed address — enforced by typecheck and cheap data assertions, not by rendering.
- Browsers are never spawned in tests; the opener is always a spy. Terminal sizing in tests is set through the test renderer's width and height options.

## Out of Scope

- Phase 2 developer toolkit subcommands (ADR 0001) — only the entry decoupling that keeps them addable.
- Bookmarks, phone numbers, detailed experience timelines, and certification records — the About tab carries curated highlights only.
- Markdown rendering — emphasis markers are stripped to plain text, not rendered.
- Scrolling or pagination for lists longer than the viewport — content is sized to fit terminals of ≥24 rows.
- Cross-repo data automation — the Profile Configuration is a manual copy of the web portfolio's shared data; no sync tooling.
- Runtime resize handling beyond OpenTUI's native relayout; the width-based fallback decision happens at startup only.
- CLI flags (e.g. --no-browser, --plain), config files, environment variables.
- Alternative themes or color-profile negotiation beyond Catppuccin Mocha.
- Mouse support.
- Automated publishing pipeline or CI (the repo has no remote or CI yet; publishing is manual).
- i18n, search, filtering, animation (including rotating taglines — the banner tagline is static).

## Further Notes

- Content snapshot: mirrored from the sibling web portfolio repo's shared data module (its identity, tech-stack, project, and social-link exports) at spec-writing time. Re-sync manually when the site data changes.
- Height assumption: interactive layout assumes ≥24 rows — fifteen one-line project rows plus chrome fit exactly. If project count grows, revisit scrolling before adding entries.
- The web site rotates taglines with animation; the Dev Card shows a static tagline (animation is out of scope).
- Minimum viable width needs a concrete constant chosen during implementation (80 columns is a sensible default); fallback tests should cover the boundary.
- Behavior when an interactive session is resized below the minimum width is unspecified by the ADRs; default to letting OpenTUI relayout rather than switching to the fallback mid-session.
- The glossary conflict (Stack vs Skills) is resolved as Skills; consider updating the Top Tabs Layout bullet in the domain glossary to match.
- The bin alias `sethyrung` intentionally consumes the bare name; Phase 2's toolkit CLI will need a different alias.
- Repo follow-ups when tests land: add the test script to package.json and document the new commands in AGENTS.md.
