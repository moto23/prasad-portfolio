# Prasad Nathe — Portfolio

A personal portfolio for backend engineering, full-stack development, and AI / GenAI. Built with React 18, TypeScript, Vite 6, Tailwind CSS 4, and Framer Motion.

## Development

Use Node.js 22 and npm:

```sh
npm ci
npm run dev
```

## Validation

```sh
npm run lint
npm run typecheck
npm run build
npx playwright install chromium
npm test
```

The Playwright suite checks 375, 768, 1024, and 1440px layouts in both themes, WCAG accessibility rules, images, runtime errors, navigation, theme persistence, blocked storage, contact validation, clipboard failures, mobile focus handling, and reduced motion. Tests run against the production bundle, so build first. Biome provides lightweight linting. GitHub Actions repeats validation on pushes and pull requests.

To validate a deployment with the same browser suite, set `PLAYWRIGHT_BASE_URL` to its real URL before running `npm test`. `node scripts/check-links.mjs` checks outbound HTTP responses; LinkedIn and LeetCode can block automated requests even when the supplied URLs are correct.

## Editing

- `src/data/content.ts`: identity, links, projects, experience, skills, education, and certifications.
- `src/components/`: existing reusable section components.
- `src/index.css`: shared theme tokens, responsive styles, and locally bundled fonts.
- `public/`: portrait, PN favicon, and original social-preview graphic.
- `vercel.json`: Vite production settings and response headers.

The three featured project panels illustrate system flows; they are not application screenshots. Additional projects from the existing portfolio are retained. All achievements and metrics come from the owner's supplied content.

## Interaction and privacy

Dark mode is the default. Theme selection persists when browser storage is available. Mobile navigation uses a native modal, keyboard focus cycling, Escape handling, and focus restoration. Reduced-motion preferences are respected. Fonts are served locally; there are no analytics trackers, particle loops, loading interstitials, or replaced cursors.

The contact form opens a draft in the visitor's own email application. It does not send or retain messages. No backend, API key, or environment file is needed.

## Deployment

Vercel builds with `npm run build` and serves `dist/`. Reuse the linked project when present. Production canonical/social URLs and the sitemap should use the actual assigned domain, never the previous Gamma site.

Local auth, CLI tools, caches, test artifacts, dependencies, and build output are excluded from Git. Do not commit credentials or `.env` files.
