# Password Generator App

Single-page password generator that mirrors the Frontend Mentor reference layout. Generates cryptographically strong passwords in the browser, lets you choose character sets and length, shows estimated strength, and copies results to the clipboard.

## Features
- Adjustable length slider (4–30 characters) with live display.
- Toggle uppercase, lowercase, numbers, and symbols (must select at least one).
- Passwords generated with `crypto.getRandomValues` to reduce bias.
- Strength indicator based on entropy relative to the maximum alphabet/length.
- One-click copy with inline status alert.

## Quick start
1) Clone/download this repo.  
2) Open `index.html` directly in your browser (no build step needed).

## How it works
- UI: `index.html` + `style.css` for the dark card layout from the sample screenshot.
- Logic: `script.js`
  - Builds an alphabet from checked boxes.
  - Uses secure random numbers to pick characters.
  - Updates strength bars by mapping entropy to four states.
  - Copies the generated password via the Clipboard API.

## File map
- `index.html` — markup and controls.
- `style.css` — styling to match the provided mock.
- `script.js` — generation, strength calculation, slider display, and copy handling.

## Notes / constraints
- Browser must support the Clipboard API and `crypto.getRandomValues` (modern browsers do).
- Strength meter is heuristic: it scales entropy by the maximum possible for the selected length.

## Ideas for improvement
- Add keyboard/a11y polish (e.g., focus styling parity on checkboxes, aria-live for copy feedback).
- Persist last-used settings in localStorage.
- Allow custom symbol sets or exclusion rules (ambiguous chars).
