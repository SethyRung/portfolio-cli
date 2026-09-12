# 05: Ship npx, bunx, and binaries

**What to build:** A stranger can run the finished CLI via `npx sethyrung` (Node), `bunx sethyrung` (Bun), or a curl one-liner that installs a GitHub Releases binary for Linux, macOS, or Windows (x64 and arm64). The published package includes the entry, renderer, and markdown content.

**Blocked by:** 04: Browse Projects and open a Project

**Status:** ready-for-agent

- [ ] `npx sethyrung` runs on Node without Bun
- [ ] `bunx sethyrung` runs on Bun
- [ ] Published package contains the CLI entry, renderer, and Screen content
- [ ] GitHub Releases can ship compiled binaries for Linux, macOS, and Windows (x64 and arm64)
- [ ] README documents npx, bunx, and the curl/GitHub Releases install
- [ ] Tests still spawn the same CLI a visitor runs
