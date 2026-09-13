# @sethyrung/portfolio

[Sethy Rung](https://sethyrung.com)'s terminal portfolio. No arguments prints the Dev Card. A Screen name prints that Screen.

## Run

```sh
bunx @sethyrung/portfolio
```

Node without Bun:

```sh
npx @sethyrung/portfolio
```

## Screens

| Command                                     | Screen                                |
| ------------------------------------------- | ------------------------------------- |
| `bunx @sethyrung/portfolio`                 | Dev Card — name, Tagline, links, Hint |
| `bunx @sethyrung/portfolio about`           | About — bio                           |
| `bunx @sethyrung/portfolio work`            | Work — Role index                     |
| `bunx @sethyrung/portfolio work <slug>`     | One Role                              |
| `bunx @sethyrung/portfolio projects`        | Projects — Project index              |
| `bunx @sethyrung/portfolio projects <slug>` | One Project                           |

Role slugs: `ttgreen`, `ycbp`, `self-employed`.

Project slugs: `movies`, `helpdesk`, `angkor-times`, `nuxt-boilerplate`.

```sh
bunx @sethyrung/portfolio work ttgreen
bunx @sethyrung/portfolio projects movies
```

Unknown Screen or slug names the valid options on stderr and exits 1.

## Flags

```sh
bunx @sethyrung/portfolio -h
bunx @sethyrung/portfolio --help
bunx @sethyrung/portfolio -v
bunx @sethyrung/portfolio --version
```

`-h` / `--help` prints usage. `-v` / `--version` prints the package version.

`NO_COLOR` strips ANSI. Output always goes to stdout (no pager).

## Binary

GitHub Releases ship compiled binaries for Linux, macOS, and Windows (x64 and arm64). No Node or Bun required.

```sh
os=$(uname -s | tr '[:upper:]' '[:lower:]')
arch=$(uname -m)
case "$arch" in
  x86_64) arch=x64 ;;
  aarch64 | arm64) arch=arm64 ;;
esac
curl -fsSL "https://github.com/SethyRung/portfolio-cli/releases/latest/download/sethyrung-${os}-${arch}" -o sethyrung
chmod +x sethyrung
./sethyrung
```

Windows: download `sethyrung-windows-x64.exe` or `sethyrung-windows-arm64.exe` from the [latest release](https://github.com/SethyRung/portfolio-cli/releases/latest).

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

MIT.
