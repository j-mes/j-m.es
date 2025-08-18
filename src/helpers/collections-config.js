/**
 * @typedef {Object} CollectionConfig
 * @property {string} title - The title of the collection
 * @property {string} tag - The tag used for the collection
 * @property {boolean} groupByYear - Whether to group by year
 */

/**
 * Eleventy collections configuration object.
 * @type {Record<string, CollectionConfig>}
 */

const collectionsConfig = {
	gaming: {
		title: 'Game Logs',
		tag: 'game-log',
	},
	notes: {
		title: 'Intermittent Notes',
		tag: 'notes',
	},
	projects: {
		title: 'Projects',
		tag: 'project',
	},
	recipes: {
		title: 'Cooking Recipes',
		tag: 'recipe',
	},
	threethings: {
		title: 'Three Things I Learned',
		tag: 'three-things',
	},
};

export default collectionsConfig;
