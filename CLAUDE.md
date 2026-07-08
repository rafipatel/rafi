# Portfolio site — working notes for Claude Code

Personal portfolio (React + Vite + Tailwind + shadcn) deployed to `raafiriyaz.com`
via GitHub Pages on push to `main`.

## Design
Clean, light, typography-first (academic / Minimal-Mistakes feel). Two-column:
fixed left `ProfileSidebar` (photo/monogram, name, role, links, section jump-nav) +
right content column. One emerald accent (`--primary: 160 84% 39%`), off-white bg,
serif headings (Newsreader) over Inter body, hairline cards, minimal motion.
No neon gradients/glows, no custom cursor, no 3D background. Keep it that way.

## Content is data-driven
All copy lives in `src/data/portfolioData.ts`. Components are presentation only.
Change content there; the chatbot (`src/lib/knowledge.ts`) derives from the same file.

## Updating content
Use the route in `PORTFOLIO_UPDATE.md`: `npm run mine` → read `.portfolio/digest.md`
→ `npm run add-entry <section> '<json>'` → `npm run validate` → PR → merge.
Never hand-edit arrays for new entries — use `add-entry` so it's schema-validated.
The resume PDF is separate and not auto-generated.
