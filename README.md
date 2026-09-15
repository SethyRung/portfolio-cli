# Hi, I'm Sethy — this is my CLI

Most portfolios want a browser. This one wants a terminal.

## Run

```sh
bunx @sethyrung/portfolio
```

Node without Bun:

```sh
npx @sethyrung/portfolio
```

## Screens

No arguments prints the Dev Card. A Screen name prints that Screen.

| Command                                     | Screen                          |
| ------------------------------------------- | ------------------------------- |
| `bunx @sethyrung/portfolio`                 | Dev Card — name, tagline, links |
| `bunx @sethyrung/portfolio about`           | About — bio                     |
| `bunx @sethyrung/portfolio work`            | Work — Role index               |
| `bunx @sethyrung/portfolio work <slug>`     | One Role                        |
| `bunx @sethyrung/portfolio projects`        | Projects — Project index        |
| `bunx @sethyrung/portfolio projects <slug>` | One Project                     |

Role slugs: `ttgreen`, `ycbp`, `self-employed`.

Project slugs: `dotfiles`, `tracker`, `recall`, `movies`, `helpdesk`, `angkor-times`, `nuxt-boilerplate`, `flutter-docs`, `asset-management`, `chongkran`, `movie-website`, `mart-management`, `easypay`, `glitch`.

```sh
bunx @sethyrung/portfolio work ttgreen
bunx @sethyrung/portfolio projects movies
```

An unknown Screen or slug names the valid options on stderr and exits 1.

## Flags

```sh
bunx @sethyrung/portfolio -h
bunx @sethyrung/portfolio --help
bunx @sethyrung/portfolio -v
bunx @sethyrung/portfolio --version
```

`-h` / `--help` prints usage. `-v` / `--version` prints the package version. `NO_COLOR` strips ANSI. Output always goes to stdout — no pager.

## Content

Screens are Comark markdown in `src/content`. Indexes are written files, not generated.

```
src/content/
  card.md
  about.md
  work/index.md
  work/<slug>.md
  projects/index.md
  projects/<slug>.md
```

A new Role or Project appears when you add a markdown file named with its slug next to the index.

## Develop

Requires [Bun](https://bun.sh/) 1.4 or later.

```sh
bun install
bun test
bun run typecheck
bun run lint
bun run fmt
```

```sh
bun bin/cli.js
bun run build          # Node entry at dist/cli.js
bun run compile        # local binary named sethyrung
```
