# j-m.es

A static site powered by [Eleventy (11ty)](https://www.11ty.dev/), with a modular helper system for collections, layouts, filters, shortcodes, and a modern CSS pipeline.

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Helpers Overview](#helpers-overview)
- [Debugging & Troubleshooting](#debugging--troubleshooting)

## Getting Started

**Requirements:**
- Node.js v24+ (managed via [Volta](https://volta.sh/) if desired)
- npm

**Install dependencies:**
```sh
npm install
```

**Run the development server:**
```sh
npm start
```
This starts Eleventy in serve mode with incremental builds.

**Build for production:**
```sh
npm run build
```
Outputs the static site to the `dist/` directory.

**Clean build artifacts:**
```sh
npm run clean
```

## Project Structure

- `src/content/` — Markdown and content files
- `src/layouts/` — Nunjucks layout templates
- `src/styles/` — CSS (processed with PostCSS)
- `src/helpers/` — Modular helper scripts for Eleventy config
- `eleventy.config.js` — Main Eleventy configuration

## Deployment

The site is built with Eleventy and outputs to the `dist/` directory. Deployment is automated using GitHub Actions:

- **Automatic Deployments:**
  - On every push to the `main` branch, the workflow in `.github/workflows/build-and-deploy.yml` runs:
    1. Checks out the code and sets up Node.js (v24.2.0).
    2. Installs dependencies with `npm ci`.
    3. Builds the site with `npm run build`.
    4. Deploys the contents of the `dist/` directory to the `gh-pages` branch using the `peaceiris/actions-gh-pages` action and a deploy key stored in repository secrets.
- **Custom Domain:**
  - The `CNAME` file in `src/` is copied to the root of the deployed site for custom domain support.
- **Preview Builds:**
  - On pull requests to `main`, the workflow in `.github/workflows/build.yml` runs a build to ensure the site compiles, but does not deploy.

You do not need to manually deploy; simply push to `main` and the site will be published automatically.

## Helpers Overview

Helpers in `src/helpers/` modularize Eleventy’s configuration:

- **setup-plugins.js**: Register Eleventy plugins (extend as needed).
- **setup-css.js**: Handles CSS build pipeline using PostCSS, autoprefixer, nesting, and minification. Watches for changes in development.
- **setup-passthrough.js**: Configures passthrough copy for static assets (e.g., `CNAME`).
- **setup-global-data.js**: Adds global data and computed values (e.g., permalinks, grouped archives).
- **setup-layout-aliases.js**: Registers layout aliases for all Nunjucks templates in `src/layouts/`.
- **setup-shortcodes.js**: Registers custom shortcodes (e.g., `imageShortcode` for progressive images).
- **setup-filters.js**: Registers custom Nunjucks/Eleventy filters (e.g., `groupByYear`).
- **group-by-year.js**: Groups content entries by year for archive views.
- **compute-permalinks.js**: Computes clean permalinks for content.
- **collections-config.js**: Central config for custom collections (notes, projects, recipes, etc.).
- **setup-collections.js**: Registers custom collections based on `collections-config.js`.
- **setup-eleventy-before.js**: Adds Eleventy event hooks (e.g., debugging layouts).
- **image-shortcode.js**: Shortcode for responsive/progressive images.

## Debugging & Troubleshooting

- **Debugging Layouts:**  
  Set `DEBUG_LAYOUTS=true` or `DEBUG_LAYOUT_ALIASES=true` in your environment to log layout and alias registration.
- **CSS Issues:**  
  The CSS pipeline uses PostCSS. If styles are missing, check the build output and ensure all PostCSS plugins are installed.
- **Permalinks:**  
  If permalinks are not as expected, review `compute-permalinks.js` and the computed data in `setup-global-data.js`.
- **Collections:**  
  Custom collections are defined in `collections-config.js` and registered in `setup-collections.js`. Check these files if content is missing from expected collections.
- **Static Assets:**  
  Only specific files (like `CNAME`) are passed through by default. Add more passthroughs in `setup-passthrough.js` as needed.
