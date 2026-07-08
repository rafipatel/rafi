# Keeping the portfolio up to date (the "Rafa" route)

The whole site renders from a single file — `src/data/portfolioData.ts`. Update that
one file and everything (site sections + the on-site chatbot) stays in sync. The resume
is intentionally **separate** (a curated Google-Drive PDF) and is not touched here.

## The route

1. **Mine new work** — `npm run mine`
   Reads your Claude Code history (`~/.claude/projects/**/*.jsonl`) incrementally.
   A cursor at `~/.claude/portfolio-miner/seen.json` means already-read sessions are
   skipped; only *new* activity is scanned. Output: `./.portfolio/digest.md`
   (gitignored — raw transcript text never enters the repo). Items from client/NDA
   folders (e.g. `tensium`) are tagged `⚠ confidential-source`.

2. **Read the digest with a portfolio lens** — open `./.portfolio/digest.md`.
   Decide what is genuinely showcase-worthy. Skip confidential-source items.

3. **Add an entry** — `npm run add-entry <section> '<json>'`
   Sections: `currentlyWorkingOn`, `projects`, `openSourceContributions`,
   `achievements`, `certifications`, `experiences`.
   The entry is validated against `scripts/lib/schema.mjs` (rejected if malformed),
   inserted non-destructively into `portfolioData.ts`, `lastUpdated` is bumped, and
   the diff is printed. Nothing is committed automatically.

   Example:
   ```
   npm run add-entry currentlyWorkingOn '{"iconName":"rocket","title":"New Thing","subtitle":"one line","description":"what it is","badges":["X"],"accentColor":"18 58% 42%","type":"building","link":"https://example.com"}'
   ```

4. **Validate** — `npm run validate` (runs `tsc --noEmit`). Must pass.

5. **Review → PR → deploy** — commit on a branch, open a PR, eyeball the diff, merge.
   Pushing to `main` triggers `.github/workflows/deploy.yml` (which also runs
   `npm run validate`) and publishes `raafiriyaz.com` in ~2–3 min.

## Config

`~/.claude/portfolio-miner/config.json` (optional):
```json
{ "allow": [], "deny": [] }
```
`allow` non-empty = only mine those project names. `deny` = exclude those. Default: all.
