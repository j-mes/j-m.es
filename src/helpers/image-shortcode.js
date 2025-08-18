/**
 * Eleventy shortcode for progressive images.
 *
 * @param {string} imageFilename - Image filename
 * @param {string} [altText] - Alt text
 * @param {Object} [options] - Options for fallback and class
 * @returns {string} HTML string for the image
 * @this {any} Eleventy context
 */
// Assumptions:
// - Content markdown is in: src/content/**/note.md
// - Images are in: src/content/**/images/
import { dirname, relative, sep } from 'path';

export default function imageShortcode(imageFilename, altText = '', options = {}) {
  const inputPath = this.page.inputPath;

  const relativeToContent = relative('src/content', dirname(inputPath)).split(sep).join('/');
  const imageDirectory = `/content/${relativeToContent}/images`;

  const fullSrc = `${imageDirectory}/${imageFilename}`;
  const fallbackSrc = options.fallback
    ? `${imageDirectory}/${options.fallback}`
    : `/assets/images/fallback.png`;
  const className = options.class || '';

  return `<img src="${fullSrc}" alt="${altText}" class="${className}" loading="lazy" onerror="this.onerror=null;this.src='${fallbackSrc}';">`;
}
