import collections from '../data/collections.json';

/**
 * Registers Eleventy collections based on external config
 *
 * Supports:
 * - Base collections filtered by tag
 * - Optional: Grouping posts by year (e.g. `notesByYear`)
 *
 * @param {import('@11ty/eleventy').EleventyConfig} config - The Eleventy config object
 */
export function registerCollections(config) {
	collections.forEach(({ tag, groupByYear }) => {
		// Register the main collection: all items with the tag, sorted by date descending
		config.addCollection(tag, (collectionApi) => {
			return collectionApi
				.getFilteredByTag(tag)
				.filter((item) => item.date instanceof Date) // Ensure the item has a valid date
				.sort((a, b) => b.date.getTime() - a.date.getTime()); // Newest first
		});

		// If configured, register an additional collection grouped by year
		if (groupByYear) {
			config.addCollection(`${tag}ByYear`, (collectionApi) => {
				// Get all dated and sorted posts for the tag
				const posts = collectionApi
					.getFilteredByTag(tag)
					.filter((item) => item.date instanceof Date)
					.sort((a, b) => b.date.getTime() - a.date.getTime());

				// Group posts into a dictionary keyed by year
				const postsByYear = {};

				for (const post of posts) {
					const year = post.date.getFullYear();
					if (!postsByYear[year]) {
						postsByYear[year] = [];
					}
					postsByYear[year].push(post);
				}

				// Convert the dictionary into a sorted array of [year, posts] pairs
				return Object.entries(postsByYear)
					.map(([year, posts]) => [Number(year), posts])
					.sort((a, b) => b[0] - a[0]); // Sort years descending
			});
		}
	});
}
