import { setupPlugins } from './src/helpers/setup-plugins.js';
import { setupCSS } from './src/helpers/setup-css.js';
import { setupPassthrough } from './src/helpers/setup-passthrough.js';
import { setupGlobalData } from './src/helpers/setup-global-data.js';
import { setupLayoutAliases } from './src/helpers/setup-layout-aliases.js';
import { setupShortcodes } from './src/helpers/setup-shortcodes.js';
import imageShortcode from './src/helpers/image-shortcode.js';
import { setupFilters } from './src/helpers/setup-filters.js';
import formatDate from './src/helpers/setup-format-date.js';
import truncateWords from './src/helpers/truncate-words.js';
import groupByYear from './src/helpers/group-by-year.js';
import { setupCollections } from './src/helpers/setup-collections.js';
import { setupEleventyBefore } from './src/helpers/setup-eleventy-before.js';

export default function (eleventyConfig) {
	// Register Eleventy plugins (see /src/helpers/setup-plugins.js)
	setupPlugins(eleventyConfig);

	// Setup PostCSS and CSS pipeline
	setupCSS(eleventyConfig);

	// Tell Eleventy which template formats to process
	eleventyConfig.setTemplateFormats(['md', 'njk', 'js']);

	// Setup passthrough copy first (static assets)
	setupPassthrough(eleventyConfig);

	// Setup global data
	setupGlobalData(eleventyConfig);

	// Setup layout aliases from layouts directory
	setupLayoutAliases(eleventyConfig);

	// Setup shortcodes
	setupShortcodes(eleventyConfig, {
		image: imageShortcode
		// Add more shortcodes here as needed
	});

	// Setup filters
	setupFilters(eleventyConfig, {
		groupByYear,
		date: formatDate,
		truncateWords,
		// Add more filters here as needed
	});

	// Setup custom collections
	setupCollections(eleventyConfig);

	// Setup event hooks (e.g., eleventy.before)
	setupEleventyBefore(eleventyConfig);

	return {
		dir: {
			input: 'src/content', // source files location (content root)
			includes: '../layouts', // includes and layouts folder (relative to input)
			layouts: '../layouts', // layouts folder path (relative to input)
			output: 'dist', // output folder
		},
	};
}
