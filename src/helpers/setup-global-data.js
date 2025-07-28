import computePermalinks from './compute-permalinks.js';

/**
 * Registers global data and computed values for Eleventy templates.
 * @param {import('@11ty/eleventy').EleventyConfig} eleventyConfig
 */
export function setupGlobalData(eleventyConfig) {
  eleventyConfig.addGlobalData('archivesGrouped', (data) => {
    return data?.collections?.notesByYear ?? [];
  });

  eleventyConfig.addGlobalData('eleventyComputed', {
    permalink: (data) => computePermalinks(data),
  });
}
