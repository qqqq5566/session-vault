# Session Vault — landing page

Static waitlist landing page for validating interest in **Session Vault**, a planned Chrome extension that backs up the tabs you have open and exports them in one click to a file stored outside the browser. Works alongside OneTab or Session Buddy. Nothing is built yet; no payments, no analytics.

No build step: plain HTML + CSS with a tiny vanilla JS file.

## Files
- `index.html` — landing page (hero + concept diagram, problem, planned features, "why this if OneTab/Session Buddy already have backups?" comparison, FAQ, waitlist)
- `privacy.html` — waitlist privacy page (what's collected, FormSubmit, deletion)
- `styles.css` — styles (system font stack, responsive, shared by both pages)
- `script.js` — waitlist form wiring + **config**
- `favicon.svg` — icon
- `.nojekyll` — serve as-is on GitHub Pages

## Waitlist form (FormSubmit)
Both forms POST the email (plus the page URL as `source`) via `fetch` to FormSubmit's AJAX endpoint (configured at the top of `script.js`) and show an inline "You're on the list" message. Invalid emails and failed submissions show an inline error (`.form-error`, `role="alert"`) under the form — no `alert()` popups. Submissions arrive by email. A hidden honeypot field filters simple bots.

No auto-reply (`_autoresponse`) is used: FormSubmit doesn't support it for AJAX forms (https://formsubmit.co/documentation).

`privacy.html` has an email-removal form (`form[data-removal]`) handled by the same code in `script.js`. It posts to the same endpoint with subject "Session Vault: email removal request" and a `request` field, and shows the same inline success and error messages.

## Copy rules
- First-person voice (solo independent developer); contact via GitHub issues.
- Email deletion requests go by replying to any waitlist email (see `privacy.html`), not via GitHub issues.
- Export wording: say **one-click export** to a file. Do not promise automatic/scheduled export. Chrome can only save background exports to the Downloads folder, and it shows a Save dialog every time if the user has "Ask where to save each file" turned on. See `../session-vault-downloads-check.md`.
- Avoid em/en dashes in page copy; use periods, commas, or colons.
- The hero diagram is an inline SVG labeled "Concept preview" — not a screenshot.
- Competitor statements are limited to facts verified on official pages (October 2026); no stats, testimonials, or user counts.

## Local preview
Open `index.html` in a browser, or run `python3 -m http.server` in this folder.
