import { dirname, relative, sep } from 'path';

type ProgressiveImageOptions = {
	fallback?: string; // Optional fallback image filename (relative to images/)
	class?: string; // Optional CSS class
};

// Eleventy shortcode for progressive images.
// Assumptions:
// - Content markdown is in: src/content/**/note.md
// - Images are in: src/content/**/images/
// Example usage:
// {% image "photo.jpg", "Alt text", { fallback: "photo-preview.jpg" } %}
export default function imageShortcode(
	this: any,
	src: string,
	alt: string = '',
	options: ProgressiveImageOptions = {},
) {
	// Path to the .md file invoking the shortcode
	const inputPath = this.page.inputPath;

	// Compute relative path from src/content to this directory
	const relativeToContent = relative('src/content', dirname(inputPath))
		.split(sep)
		.join('/');

	// Directory containing the images for this content
	const imageDir = `/content/${relativeToContent}/images`;

	// Full-size image URL
	const fullSrc = `${imageDir}/${src}`;

	// Fallback image URL (either per-image or global fallback)
	const fallbackSrc = options.fallback
		? `${imageDir}/${options.fallback}`
		: `/assets/images/fallback.png`;

	// Optional CSS class
	const className = options.class || '';

	// Return HTML markup
	return `
<div
  class="progressive-image ${className}"
  data-src="${fullSrc}"
  style="background-image: url('${fallbackSrc}')"
>
  <img alt="${alt}" loading="lazy" decoding="async" />
  <noscript>
    <img src="${fullSrc}" alt="${alt}" loading="lazy" decoding="async" />
  </noscript>
</div>`;
}
