# sethyrung

Terminal portfolio for [Sethy Rung](https://sethyrung.com): a Dev Card by default, other Screens on demand.

## Run

```sh
bunx @sethyrung/portfolio
```

Node without Bun:

```sh
npx @sethyrung/portfolio
```

No arguments prints the Dev Card. A Screen name prints that Screen:

```sh
bunx @sethyrung/portfolio about
bunx @sethyrung/portfolio work
bunx @sethyrung/portfolio work ttgreen
bunx @sethyrung/portfolio projects
bunx @sethyrung/portfolio projects movies
```

`-h` / `--help` prints usage. `-v` / `--version` prints the package version. `NO_COLOR` strips ANSI.

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

Windows: download `sethyrung-windows-x64.exe` or `sethyrung-windows-arm64.exe` from the latest release.

## Develop

```sh
bun install
bun test
bun run typecheck
bun run lint
bun run fmt
```

Screens are Comark markdown under `src/content`. Adding a Role or Project is adding a markdown file named with its slug next to the Work or Projects index.
