# Blessmore Ndlovu — Personal Website

My portfolio site: about me, certifications, projects, blog and a contact form.

**Stack:** React 19 · TypeScript · Vite · Tailwind CSS v4 · shadcn/ui · React Router · EmailJS

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the EmailJS IDs
npm run dev                  # http://localhost:5173
```

Without EmailJS settings the contact form falls back to opening the visitor's email app.

## Scripts

| Command           | What it does                                    |
| ----------------- | ----------------------------------------------- |
| `npm run dev`     | Dev server with hot reload                      |
| `npm run build`   | Type-check and build the static site to `dist/` |
| `npm run preview` | Serve the production build locally              |
| `npm run lint`    | ESLint                                          |

## Content

- **Profile, links, CV:** `src/data/profile.ts`
- **Projects:** `src/data/projects.ts` (empty list shows "Coming soon")
- **Blog posts:** Markdown in `src/content/blog/<slug>.md` plus an entry in `src/data/posts.ts`.
  Posts hosted elsewhere (Medium, dev.to) can be listed with `externalUrl`. See `docs/blog-templates/`.

## Deployment (cPanel)

1. `npm run build` on a machine that has `.env.local` (the EmailJS keys are baked in at build time).
2. Upload the **contents** of `dist/` to `public_html/` (including the hidden `.htaccess`, which sets
   security and caching headers).

The site uses hash-based URLs (`/#/blog`), so no server rewrite rules are needed.
