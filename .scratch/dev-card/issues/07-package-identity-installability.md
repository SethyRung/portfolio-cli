# 07: Scoped Package identity + installability

**What to build:** The package becomes runnable anywhere by name: the bin alias `sethyrung` is registered in the package manifest, and a pack→install→run smoke proves that installing the packed tarball exposes the `sethyrung` command and that the Dev Card (including its Non-TTY Fallback) works from that install. `npx @sethyrung/portfolio` / `bunx` invocation is verified against the packed artifact. All checks are green and the developer instructions are updated with the new commands.

**Blocked by:** 06 (Non-TTY Fallback card).

**Status:** ready-for-agent

- [ ] Bin alias `sethyrung` registered in the package manifest; the packed tarball exposes it
- [ ] Install-from-tarball smoke: global install, run by bin name, card renders and quits cleanly
- [ ] `npx @sethyrung/portfolio` / `bunx @sethyrung/portfolio` verified against the packed artifact
- [ ] Non-TTY Fallback works from the installed package (piped output, exit 0)
- [ ] lint, format check, typecheck, and test all green
- [ ] Developer instructions updated with the test command and any new scripts
