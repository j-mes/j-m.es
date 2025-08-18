/**
 * Registers passthrough copy rules for static assets in Eleventy.
 * @param {import('@11ty/eleventy').EleventyConfig} eleventyConfig - Eleventy config object
 */
export function setupPassthrough(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ 'src/CNAME': 'CNAME' });

  // Only add specific asset passthroughs here, not content or markdown folders

}
