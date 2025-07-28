/**
 * Registers all custom Nunjucks/Eleventy filters from the provided object.
 * @param {import('@11ty/eleventy').EleventyConfig} eleventyConfig - Eleventy config object
 * @param {Object.<string, Function>} filters - Object of filter functions
 * @example
 * setupFilters(eleventyConfig, { myFilter: fn, ... })
 */
export function setupFilters(eleventyConfig, filters) {
  Object.entries(filters).forEach(([filterName, filterFunction]) => {
    eleventyConfig.addFilter(filterName, filterFunction);
  });
}
