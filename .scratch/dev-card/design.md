# Dev Card UI Design

Live prototype: `.scratch/dev-card/prototype.tsx`

Viewport: **100 × 32**. Narrower or shorter → Non-TTY Fallback card.

OpenTUI components own chrome, tabs, and lists. This replaces the flat stacked-text mock.

---

## Shared chrome

Every tab uses the same shell:

1. Outer `<box borderStyle="rounded" borderColor=mauve title="@sethyrung/portfolio" bottomTitle>`
2. Header row: `<ascii-font font="tiny">` display name (mauve) + tagline (teal) + location (subtext). Job title is not repeated here — it already leads the tagline.
3. `<tab-select>` — About / Skills / Projects / Contact
   - descriptions: who I am / stack / work / links
   - underline on the active tab
   - selected bg = mauve, selected text = crust
4. Tab body (`flexGrow`)
5. No extra footer bar. Key model lives on the frame `bottomTitle` (left): `1-4 tabs · ←/→ cycle · ↑/↓ select · enter open · q/esc quit`

## Palette (Catppuccin Mocha)

| Token   | Hex       | Use                                      |
| ------- | --------- | ---------------------------------------- |
| crust   | `#11111b` | selected text                            |
| mantle  | `#181825` | inner card fill                          |
| base    | `#1e1e2e` | app background                           |
| text    | `#cdd6f4` | body                                     |
| subtext | `#a6adc8` | hints, secondary                         |
| mauve   | `#cba6f7` | frame, banner, active tab, Frontend      |
| blue    | `#89b4fa` | Identity / Projects cards                |
| teal    | `#94e2d5` | tagline, About / Open / Mobile, live URL |
| peach   | `#fab387` | job title, Selected pane, Tools          |
| green   | `#a6e3a1` | education, Backend, Contact              |

## Keyboard

| Key         | Action                                      |
| ----------- | ------------------------------------------- |
| `1`–`4`     | jump to About / Skills / Projects / Contact |
| `←` / `→`   | cycle tabs, wrap                            |
| `↑` / `↓`   | move `<select>` on Projects / Contact       |
| `Enter`     | open selected repo or channel               |
| `q` / `Esc` | `renderer.destroy()`                        |

App-level `useKeyboard` owns tab keys. `<select>` is focused only on list tabs so ↑/↓ work natively. Tab-select is visual; `selectedIndex` is controlled.

## Components

| Region             | OpenTUI                                      |
| ------------------ | -------------------------------------------- |
| App frame          | `<box border rounded title>`                 |
| Name banner        | `<ascii-font font="tiny">`                   |
| Tabs               | `<tab-select showDescription showUnderline>` |
| About columns      | two titled rounded `<box>`                   |
| Skills groups      | wrapped titled rounded `<box>`               |
| Projects / Contact | `<select>` + titled detail `<box>`           |
| Key hints          | outer box `bottomTitle`                      |

---

## About

Two titled rounded cards, row layout:

- **Identity** (blue, flex 1): bio, job title (peach), employer, location, education (green)
- **About** (teal, flex 2): plain-text bullets (markdown stripped)

```
╭─ @sethyrung/portfolio ───────────────────────────────────────────────────────────────────────────╮
│                                                                                                  │
│ █▀▀ █▀▀ ▀█▀ █ █ █▄█   █▀█ █ █ █▄ █ █▀▀  Full Stack Developer / Cross-Platform Enthusiast         │
│ ▄▄█ ██▄  █  █▀█  █    █▀▄ █▄█ █ ▀█ █▄█  Phnom Penh, Cambodia                                     │
│  About             Skills            Projects          Contact                                   │
│ ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬                                                                               │
│  who I am                                                                                        │
│                                                                                                  │
│ ╭─ Identity ──────────────────────────────────╮ ╭─ About ──────────────────────────────────────╮ │
│ │                                             │ │                                              │ │
│ │ Building software across web, mobile, and   │ │ • Software Developer working across web,     │ │
│ │ desktop platforms with modern technologies  │ │ mobile, and desktop platforms.               │ │
│ │                                             │ │ • Experienced in Vue.js, Nuxt.js, TypeScript,│ │
│ │ Full Stack Developer                        │ │ React, Java, Spring Boot, C#, and Kotlin.    │ │
│ │ InnoBlock Technology                        │ │                                              │ │
│ │ Phnom Penh, Cambodia                        │ │ • Passionate about exploring new technologies│ │
│ │                                             │ │ and turning ideas into polished projects.    │ │
│ │ BSc Computer Science                        │ │                                              │ │
│ │ Royal University of Phnom Penh              │ │                                              │ │
│ │ 2019 – 2023                                 │ │                                              │ │
│ │                                             │ │                                              │ │
│ │                                             │ │                                              │ │
│ │                                             │ │                                              │ │
│ │                                             │ │                                              │ │
│ │                                             │ │                                              │ │
│ │                                             │ │                                              │ │
│ │                                             │ │                                              │ │
│ ╰─────────────────────────────────────────────╯ ╰──────────────────────────────────────────────╯ │
╰─ 1-4 tabs · ←/→ cycle · ↑/↓ select · enter open · q/esc quit ────────────────────────────────────╯
```

## Skills

Five wrapped category cards, one accent each. Items inherit the card accent (core stack emphasis).

| Card     | Accent | Items                                                  |
| -------- | ------ | ------------------------------------------------------ |
| Frontend | mauve  | Vue.js, Nuxt.js, React, TypeScript, Tailwind CSS, GSAP |
| Backend  | green  | Node.js, Bun, Spring Boot, NestJS, FastAPI, Directus   |
| Database | blue   | PostgreSQL, SQL Server, MongoDB                        |
| Tools    | peach  | Vite, Docker, Git                                      |
| Mobile   | teal   | Kotlin, Flutter                                        |

```
╭─ @sethyrung/portfolio ───────────────────────────────────────────────────────────────────────────╮
│                                                                                                  │
│ █▀▀ █▀▀ ▀█▀ █ █ █▄█   █▀█ █ █ █▄ █ █▀▀  Full Stack Developer / Cross-Platform Enthusiast         │
│ ▄▄█ ██▄  █  █▀█  █    █▀▄ █▄█ █ ▀█ █▄█  Phnom Penh, Cambodia                                     │
│  About             Skills            Projects          Contact                                   │
│                   ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬                                                             │
│  stack                                                                                           │
│                                                                                                  │
│ ╭─ Frontend ──────────────────╮ ╭─ Backend ──────────────────╮ ╭─ Database ──────────────────╮   │
│ │                             │ │                            │ │                             │   │
│ │ Vue.js                      │ │ Node.js                    │ │ PostgreSQL                  │   │
│ │ Nuxt.js                     │ │ Bun                        │ │ SQL Server                  │   │
│ │ React                       │ │ Spring Boot                │ │ MongoDB                     │   │
│ │ TypeScript                  │ │ NestJS                     │ │                             │   │
│ │ Tailwind CSS                │ │ FastAPI                    │ │                             │   │
│ │ GSAP                        │ │ Directus                   │ │                             │   │
│ │                             │ │                            │ │                             │   │
│ ╰─────────────────────────────╯ ╰────────────────────────────╯ ╰─────────────────────────────╯   │
│                                                                                                  │
│ ╭─ Tools ─────────────────────╮ ╭─ Mobile ───────────────────╮                                   │
│ │                             │ │                            │                                   │
│ │ Vite                        │ │ Kotlin                     │                                   │
│ │ Docker                      │ │ Flutter                    │                                   │
│ │ Git                         │ │                            │                                   │
│ │                             │ │                            │                                   │
│ ╰─────────────────────────────╯ ╰────────────────────────────╯                                   │
╰─ 1-4 tabs · ←/→ cycle · ↑/↓ select · enter open · q/esc quit ────────────────────────────────────╯
```

## Projects

Master-detail:

- Left **Projects** `<select>` (blue): name + one-line description, `▶` indicator, scroll bar
- Right **Selected** pane (peach): title, stack tags, description, `repo`, `live` (or —), `enter opens repo`
- Enter → repository URL via injected opener

```
╭─ @sethyrung/portfolio ───────────────────────────────────────────────────────────────────────────╮
│                                                                                                  │
│ █▀▀ █▀▀ ▀█▀ █ █ █▄█   █▀█ █ █ █▄ █ █▀▀  Full Stack Developer / Cross-Platform Enthusiast         │
│ ▄▄█ ██▄  █  █▀█  █    █▀▄ █▄█ █ ▀█ █▄█  Phnom Penh, Cambodia                                     │
│  About             Skills            Projects          Contact                                   │
│                                     ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬                                           │
│  work                                                                                            │
│                                                                                                  │
│ ╭─ Projects ──────────────────────────────────────────────╮ ╭─ Selected ───────────────────────╮ │
│ │ ▶ Movies                                                │ │                                  │ │
│ │   Movie and TV series discovery                        █│ │ Movies                           │ │
│ │   Helpdesk                                              │ │ Nuxt · Tailwind                  │ │
│ │   Role-based tickets + Keycloak                         │ │                                  │ │
│ │   The Angkor Times                                      │ │ Movie and TV series discovery    │ │
│ │   News site, Directus CMS                               │ │                                  │ │
│ │   Nuxt Boilerplate                                      │ │ repo  github.com/SethyRung/movies│ │
│ │   Starter template for Nuxt apps                        │ │                                  │ │
│ │   Flutter Docs                                          │ │ live  movies.sethyrung.com       │ │
│ │   Flutter documentation site                            │ │                                  │ │
│ │   Asset Management                                      │ │ enter opens repo                 │ │
│ │   Assets, categories, roles                             │ │                                  │ │
│ │   Chongkran                                             │ │                                  │ │
│ │   Recipes, favorites, meal plans                        │ │                                  │ │
│ │   Movie Website                                         │ │                                  │ │
│ │   React movie discovery                                 │ │                                  │ │
│ │   Mart Management                                       │ │                                  │ │
│ │   Desktop mart ops + inventory                          │ │                                  │ │
│ ╰─────────────────────────────────────────────────────────╯ ╰──────────────────────────────────╯ │
╰─ 1-4 tabs · ←/→ cycle · ↑/↓ select · enter open · q/esc quit ────────────────────────────────────╯
```

## Contact

Same master-detail:

- Left **Channels** `<select>` (green): title + handle
- Right **Open** pane (teal): title, handle, URL, `enter opens in browser`
- Rows: GitHub, LinkedIn, X, Discord, Telegram, Website, Email
- Email stays base64 in Profile Configuration; decode only at runtime
- Enter → URL, or `mailto:` for email
- No YouTube (not in web shared data)

```
╭─ @sethyrung/portfolio ───────────────────────────────────────────────────────────────────────────╮
│                                                                                                  │
│ █▀▀ █▀▀ ▀█▀ █ █ █▄█   █▀█ █ █ █▄ █ █▀▀  Full Stack Developer / Cross-Platform Enthusiast         │
│ ▄▄█ ██▄  █  █▀█  █    █▀▄ █▄█ █ ▀█ █▄█  Phnom Penh, Cambodia                                     │
│  About             Skills            Projects          Contact                                   │
│                                                       ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬                         │
│  links                                                                                           │
│                                                                                                  │
│ ╭─ Channels ──────────────────────────────────────────╮ ╭─ Open ───────────────────────────────╮ │
│ │ ▶ GitHub                                            │ │                                      │ │
│ │   sethyrung                                         │ │ GitHub                               │ │
│ │   LinkedIn                                          │ │ sethyrung                            │ │
│ │   sethyrung                                         │ │                                      │ │
│ │   X                                                 │ │ github.com/sethyrung                 │ │
│ │   @sethyrung                                        │ │                                      │ │
│ │   Discord                                           │ │ enter opens in browser               │ │
│ │   sethyrung                                         │ │                                      │ │
│ │   Telegram                                          │ │                                      │ │
│ │   sethyrung                                         │ │                                      │ │
│ │   Website                                           │ │                                      │ │
│ │   sethyrung.com                                     │ │                                      │ │
│ │   Email                                             │ │                                      │ │
│ │   rungsethyhk@gmail.com                             │ │                                      │ │
│ │                                                     │ │                                      │ │
│ │                                                     │ │                                      │ │
│ │                                                     │ │                                      │ │
│ │                                                     │ │                                      │ │
│ ╰─────────────────────────────────────────────────────╯ ╰──────────────────────────────────────╯ │
╰─ 1-4 tabs · ←/→ cycle · ↑/↓ select · enter open · q/esc quit ────────────────────────────────────╯
```

---

## Fallback

If `!stdout.isTTY` or width < 100 or height < 32: print a static ANSI card (name, tagline, about, skill groups, project titles + repos, contacts + URLs) and exit 0. No renderer.

## Spec deltas (accepted)

- Min size **100×32**, not 80×24
- Lists may scroll (`<select showScrollIndicator>`)
- Project rows are two lines (name + description), not one
- Native `<tab-select>` / `<select>` instead of hand-rolled text lists
