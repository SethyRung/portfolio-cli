# 05: Contact tab

**What to build:** Switching to the Contact tab shows every channel mirrored from the web portfolio's shared data: the six social links (X, GitHub, LinkedIn, Discord, Telegram, YouTube) each shown with title and handle, plus the owner's website and email address. Up/Down arrows move the visible selection; Enter opens the selected channel — the default browser for URLs and sites, the mail client for the email address. Email stays base64-encoded in the Profile Configuration exactly as in the shared data and is decoded only at runtime for display and the mailto action.

**Blocked by:** 04 (Projects tab with selection and Enter→browser).

**Status:** done

## Done

- [x] Contact tab renders all social channels (title + handle) plus website and decoded email from the Profile Configuration
- [x] Up/Down move the visible selection, bounded at the list ends
- [x] Enter requests the selected channel's URL via the opener adapter (mailto for the email row)
- [x] Email remains base64-encoded in the configuration; decoding happens only at runtime
- [x] Spy and frame tests mirroring the Projects suite
- [x] lint, format check, and typecheck pass

YouTube is omitted — it is not in the web portfolio shared data (design).

## Files

- `src/config/profile.ts` — contacts + base64 email
- `src/app.tsx` — Contact master-detail; Enter via injected opener
- `src/app.test.tsx` — list, selection, mailto spy tests
