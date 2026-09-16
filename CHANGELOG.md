# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and this project
adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-09-16

### Added

- Commanded Screens: `about` (bio), `work` (Role index), and `projects`
  (Project index), each printable on demand (`#8e23b8f`).
- Individual Role and Project views by slug, e.g. `work ttgreen` or
  `projects movies` (`#61f55be`, `#a6437ac`).
- Classic `--help` output (`#0d39961`).
- GitHub Release workflow that compiles standalone binaries for Linux, macOS,
  and Windows (x64 and arm64) on every published release (`#dbce093`).

### Changed

- The Dev Card and all Screens now print through a stacked, terminal-native
  layout (`#a6437ac` and related redesign work).
- README rewritten around `bunx`/`npx` usage and the Screens command table.

### Notes

- Unknown Screens or slugs print the valid options on stderr and exit 1.
- v1.0.0 was unpublished from npm; this release supersedes it.

## [1.0.0] - 2026-09-12

### Added

- The Dev Card: identity, Tagline, links, and Hint, printed by default (`#ed18df3`).
- Runnable via `bunx @sethyrung/portfolio` and `npx @sethyrung/portfolio`.

[1.1.0]: https://github.com/SethyRung/portfolio-cli/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/SethyRung/portfolio-cli/commit/ed18df3
