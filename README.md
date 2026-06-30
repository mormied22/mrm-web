# mrm-web

A clean, lightweight personal portfolio for **mormied**, a Cyber Security Analyst focused on malware analysis, threat research, reverse engineering, and defensive security.

This project is intentionally simple: plain HTML, CSS, and JavaScript served as static assets through Cloudflare Workers using Wrangler.

## Project structure

```text
mrm-web/
├─ public/
│  ├─ index.html        # Page structure
│  ├─ styles.css        # Full visual design
│  ├─ content.js        # Edit name, links, cards, projects, and notes here
│  ├─ script.js         # Rendering, navigation, typing effect, scroll reveal
│  ├─ _headers          # Security headers for static assets
│  ├─ favicon.svg
│  ├─ robots.txt
│  └─ site.webmanifest
├─ package.json
├─ wrangler.json
├─ .gitignore
└─ README.md
```

## Edit the website

Most content is in:

```text
public/content.js
```

Edit these sections:

- `contact` for GitHub, LinkedIn, email, TryHackMe, or Hack The Box links
- `focusAreas` for skill cards
- `projects` for upcoming project cards
- `notes` for research notes and future blog-style entries

The HTML layout is in:

```text
public/index.html
```

The visual styling is in:

```text
public/styles.css
```

## Local setup

Install dependencies:

```powershell
npm.cmd install
```

Run locally:

```powershell
npm.cmd run dev
```

Wrangler will show a local URL, usually:

```text
http://localhost:8787
```

## Deploy to Cloudflare Workers

Deploy manually:

```powershell
npm.cmd run deploy
```

For Cloudflare Git deployments, use these settings:

```text
Build command: npm install
Deploy command: npx wrangler deploy
Root directory: /
```

## Cloudflare Worker name

The current Wrangler config uses:

```json
"name": "mrm-web"
```

This should match the Cloudflare Worker name shown in your dashboard. If you rename the Worker in Cloudflare, update `wrangler.json` to match.

## Security notes

This site is static and has no backend, database, login, or secrets.

The repo should never contain:

- `.env`
- `.dev.vars`
- Cloudflare API tokens
- private keys
- passwords
- real secrets of any kind

The `_headers` file adds baseline browser security headers, including a Content Security Policy that only allows scripts and styles from this site.

## Before pushing AI-generated changes

Check for unexpected network calls or risky JavaScript:

```powershell
Select-String -Path public\*.html,public\*.css,public\*.js -Pattern 'http://|https://|fetch\(|XMLHttpRequest|localStorage|sessionStorage|document.cookie|innerHTML|eval\(|Function\(' -CaseSensitive:$false
```

For this site, unexpected external scripts, analytics, cookies, or remote fetches should be reviewed before pushing.


## Adding write-ups

Write-up pages live in `public/notes/`. Add a new HTML page there, then add a matching entry to the `notes` array in `public/content.js`. If the note has an `href`, the homepage note card becomes clickable.
