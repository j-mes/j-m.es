import collectionsConfig from './collections-config.js';

/**
 * Registers custom Eleventy collections based on the collections config.
 * @param {import('@11ty/eleventy').EleventyConfig} eleventyConfig - Eleventy config object
 */
export function setupCollections(eleventyConfig) {
  Object.entries(collectionsConfig).forEach(([collectionKey, collectionOptions]) => {
    const { tag, title } = collectionOptions;
    eleventyConfig.addCollection(collectionKey, (collectionApi) => {
      const taggedItems = collectionApi.getFilteredByTag(tag);
      const sortedItems = [...taggedItems].sort((firstItem, secondItem) => secondItem.date - firstItem.date);
      return {
        title: title || collectionKey,
        items: sortedItems
      };
    });
  });

}
