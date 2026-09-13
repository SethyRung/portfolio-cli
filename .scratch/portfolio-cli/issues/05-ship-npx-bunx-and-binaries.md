# 05: Ship npx, bunx, and binaries

**What to build:** A stranger can run the finished CLI via `npx @sethyrung/portfolio` (Node), `bunx @sethyrung/portfolio` (Bun), or a curl one-liner that installs a GitHub Releases binary for Linux, macOS, or Windows (x64 and arm64). The published package includes the entry, renderer, and markdown content.

**Blocked by:** 04: Browse Projects and open a Project

**Status:** done

- [x] `npx @sethyrung/portfolio` runs on Node without Bun
- [x] `bunx @sethyrung/portfolio` runs on Bun
- [x] Published package contains the CLI entry, renderer, and Screen content
- [x] GitHub Releases can ship compiled binaries for Linux, macOS, and Windows (x64 and arm64)
- [x] README documents npx, bunx, and the curl/GitHub Releases install
- [x] Tests still spawn the same CLI a visitor runs
