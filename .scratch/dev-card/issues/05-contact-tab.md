# 05: Contact tab

**What to build:** Switching to the Contact tab shows every channel mirrored from the web portfolio's shared data: the six social links (X, GitHub, LinkedIn, Discord, Telegram, YouTube) each shown with title and handle, plus the owner's website and email address. Up/Down arrows move the visible selection; Enter opens the selected channel — the default browser for URLs and sites, the mail client for the email address. Email stays base64-encoded in the Profile Configuration exactly as in the shared data and is decoded only at runtime for display and the mailto action.

**Blocked by:** 04 (Projects tab with selection and Enter→browser).

**Status:** ready-for-agent

- [ ] Contact tab renders all social channels (title + handle) plus website and decoded email from the Profile Configuration
- [ ] Up/Down move the visible selection, bounded at the list ends
- [ ] Enter requests the selected channel's URL via the opener adapter (mailto for the email row)
- [ ] Email remains base64-encoded in the configuration; decoding happens only at runtime
- [ ] Spy and frame tests mirroring the Projects suite
- [ ] lint, format check, and typecheck pass
