# Session Vault — landing page

Static, single-page waitlist landing page for validating interest in **Session Vault**, a planned Chrome extension that backs up your open tabs and browsing sessions.

No build step: plain HTML + CSS with a tiny vanilla JS file.

## Files
- `index.html` — landing page (hero, problem, planned features, FAQ, waitlist)
- `styles.css` — styles (system font stack, responsive)
- `script.js` — waitlist form wiring + **config**
- `favicon.svg` — icon
- `.nojekyll` — serve as-is on GitHub Pages

## Waitlist form (FormSubmit)
Both forms POST the email via `fetch` to FormSubmit's AJAX endpoint (configured at the top of `script.js`) and show an inline "You're on the list" message. Submissions arrive by email. A hidden honeypot field filters simple bots.

## Local preview
Open `index.html` in a browser, or run `python3 -m http.server` in this folder.
