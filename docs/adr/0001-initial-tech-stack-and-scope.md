# ADR 0001: Initial Tech Stack, UI Framework, and Package Scope

## Status

Accepted

## Context

We need to create a personal CLI package for Sethy Rung that initially serves as an interactive terminal developer card / portfolio, with planned expansion into a personal developer toolkit in subsequent versions.

## Decisions

1. **UI Framework**: Adopt OpenTUI (`@opentui/core` + `@opentui/react`) for terminal rendering, component layout, and keyboard-driven interactivity.
2. **Package Scope**: Distribute under the `@sethyrung` scoped npm namespace.
3. **Language & Tooling**: TypeScript with Bun for development, build, and package management.
4. **Product Evolution**: Phase 1 will focus on the interactive developer portfolio card; Phase 2 will introduce the personal developer toolkit CLI commands.

## Consequences

- Requires bundling or shipping compatible native/Zig OpenTUI bindings for supported terminal environments.
- Scoped npm execution requires `npx @sethyrung/<package>` or `bunx @sethyrung/<package>`.
- Project structure should decouple the interactive TUI screen from the CLI argument router to seamlessly support subcommands in v2.
