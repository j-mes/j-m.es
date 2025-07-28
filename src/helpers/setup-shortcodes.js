/**
 * Registers all custom Nunjucks/Eleventy shortcodes from the provided object.
 * @param {import('@11ty/eleventy').EleventyConfig} eleventyConfig
 * @param {Object.<string, Function>} shortcodes
 * @example
 * setupShortcodes(eleventyConfig, { myShortcode: fn, ... })
 */
export function setupShortcodes(eleventyConfig, shortcodes) {
  for (const [name, fn] of Object.entries(shortcodes)) {
    eleventyConfig.addShortcode(name, fn);
  }
}
