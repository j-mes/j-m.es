# AGENTS.md

## Project snapshot

- Static site built with [Eleventy 3](https://www.11ty.dev/).
- Source lives in `src/` with content, layouts, helpers, and a classless CSS pipeline in `src/styles/`.
- Builds target `dist/`, GitHub Actions deploys the site on pushes to `main`.
- PostCSS handles CSS (import, nesting, autoprefixer, minification) via `setup-css.js`.

## Quick start

```bash
npm install
npm start
```

- Development server runs at <http://localhost:8080/> with incremental rebuilds.
- Stop and restart the server after adding new Eleventy collections, shortcodes, or filters so the config reloads cleanly.

## Build & verification

- Production build: `npm run build` (outputs to `dist/`).
- Minimum pre-commit check: `npm run build`.
- Formatting and linting: `npx biome check .` (append `--write` to format).
- Cache cleanup: `npm run clean` clears Eleventy/PostCSS caches; use `npm run clean:npm` if npm resolution becomes unstable.
- Enable Eleventy debug output when troubleshooting layouts: set `DEBUG_LAYOUTS=true` or `DEBUG_LAYOUT_ALIASES=true`.

## Project layout

- `src/content/` — Markdown and template-driven content (Eleventy input root).
- `src/layouts/` — Nunjucks layouts; aliases are registered automatically.
- `src/styles/` — Classless CSS entry point processed by PostCSS.
- `src/helpers/` — Modular Eleventy configuration helpers (plugins, filters, shortcodes, collections, etc.).
- `dist/` — Build artefacts produced by Eleventy (GitHub Pages deploy input).
- `.github/workflows/` — CI builds and deploys on pushes to `main`.

## Content workflows

### Notes and posts

- Create new notes in `src/content/notes/<year>/<slug>.md`.
- Include front matter with at least `layout`, `tags`, `title`, and `date`.
- Prefer British English spelling in copy and headings.
- Use the `post` layout for long-form notes; review `src/layouts/post.njk` for available blocks.

### Images

- Store note-specific images under `src/content/notes/<year>/images/`.
- Reference images via the `image` shortcode (`{% image 'photo.jpg', 'Alt text' %}`) to benefit from the lazy-loading helper and fallback handling in `image-shortcode.js`.
- Provide meaningful alt text; omit only when images are decorative and tagged with `role="presentation"`.

### Metadata

- Global metadata lives in `src/content/_data/metadata.js`.
- Update `src/content/_data/collections-config.js` when introducing new content groups so Eleventy collections stay in sync.

## Coding conventions

### General

- Files: UTF-8, LF line endings, tab indentation.
- Naming: filenames in kebab-case, variables/functions in camelCase, types/classes in PascalCase.
- Prefer descriptive identifiers; reserve single letters for conventional indexes only.
- Write in British English across comments, content, and copy.
- Avoid hard-coded secrets; read configuration from the environment or secure stores.
- Keep the dependency list lean; reach for the standard library or existing helpers first.

### HTML and semantics

- Begin documents with `<!doctype html>` and `<html lang="en-GB">` and provide meaningful `<title>` text.
- Use semantic landmarks (`header`, `nav`, `main`, `section`, `article`, `aside`, `footer`) to structure pages.
- Favour native form controls; enhance progressively if behaviour requires it.
- Keep markup minimal so element selectors style predictably. Reserve `id` for fragment identifiers and form associations.
- Maintain a logical heading hierarchy and ensure every page exposes a skip link (`href="#main-content"`).

### Classless CSS focus

- Target semantic elements (e.g. `header`, `main > section`, `figure > figcaption`).
- Use custom elements (e.g. `<site-header>`) when a reusable, scoped block needs unique styling.
- Prefer descendant, child, and pseudo selectors over utility classes.
- Reserve attribute selectors for native behaviours (e.g. `button[type="submit"]`, `a[role="button"]`).
- Theme with CSS custom properties declared on `:root` or high-level containers.
- Avoid `!important`; rely on structural specificity.
- Provide minimal resets and base typography, then test across representative documents.

### JavaScript (client-side)

- Use ES modules and async/await; default to `const`, fall back to `let` when mutation is required.
- Scope DOM queries to the relevant root (document fragment or custom element).
- Employ data attributes for behavioural hooks only (never for styling cues).
- Wrap long-running or cancellable tasks with `AbortController`.
- Sanitize external input, handle errors with clear messages, and keep functions focused.

### Accessibility

- Guarantee full keyboard access and visible focus styles.
- Provide descriptive `alt` text and associate labels with form controls.
- Supplement with ARIA only when native semantics are insufficient.
- Maintain WCAG AA contrast ratios and offer non-visual cues for interactive affordances.

### Performance

- Lazy-load below-the-fold imagery and defer non-critical assets.
- Keep CSS bundles small; inline only the minimal critical CSS when justified.
- Use `transform`/`opacity` for animation to avoid layout thrash.

### Security

- Never commit secrets or API keys; load from environment variables.
- Escape or sanitize untrusted data before inserting into templates or the DOM.
- Prefer HTTPS endpoints and handle network failures gracefully.

## Eleventy helpers and structure

- Helper modules in `src/helpers/` keep Eleventy config modular (`setup-collections`, `setup-shortcodes`, etc.). Extend these helpers instead of editing the main config inline.
- Filters are registered in `setup-filters.js`; add new utilities there and expose them from `src/helpers` to keep usage consistent.
- CSS processing runs through PostCSS with import, nesting, autoprefixer, and minification (`setup-css.js`). Keep CSS within `src/styles/` and avoid scattering styles elsewhere.
- Collections are configured via `src/content/_data/collections-config.js`; update this file when introducing new content groupings.
- `setup-eleventy-before.js` is the hook for Eleventy lifecycle events—use it for cache busting or additional logging as required.

## Testing and deployment

- No dedicated test suite exists yet; treat a successful `npm run build` as the minimum acceptance check.
- GitHub Actions in `.github/workflows/` run installs, builds, and deploys on merges to `main`.
- When adding build steps or scripts, update the workflows accordingly.

## Tooling tips

- Biome handles linting and formatting; align with `biome.json` (tabs, double quotes in JS).
- Volta pins Node 24.2.0; if you install different versions locally, confirm compatibility before committing lockfile changes.
- Use the workspace `npm` scripts instead of invoking Eleventy or PostCSS binaries directly—helpers assume the scripted paths.

## Troubleshooting

- **Layouts not updating:** restart `npm start` after creating new layouts or aliases so Eleventy reloads the config.
- **Stale output:** run `npm run clean` to drop `.eleventy_cache`, `_site`, and `dist` artefacts.
- **Missing styles:** confirm the PostCSS pipeline picked up changes—check `dist/styles/` after a build and review `setup-css.js` for watched paths.
- **Image paths broken:** ensure images live alongside the content file under an `images/` directory so the shortcode resolves the relative path correctly.

## Git workflow

- Use small, focused commits with Conventional Commits prefixes (e.g. `feat:`, `fix:`).
- Document behavioural changes in commit messages or accompanying markdown.
- Update `AGENTS.md` whenever process expectations change; it is the source of truth for agents.
