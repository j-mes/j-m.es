/**
 * Registers an event hook for Eleventy's 'before' event.
 * @param {import('@11ty/eleventy').EleventyConfig} eleventyConfig - Eleventy config object
 */
export function setupEleventyBefore(eleventyConfig) {
  eleventyConfig.on('eleventy.before', () => {
    if (process.env.DEBUG_LAYOUTS === 'true') {
      const layoutsDirectory = '../layouts';
      console.log('Layouts dir:', layoutsDirectory);
    }

    // Add more domain-specific debug or setup logic here as needed
  });

}
