/**
 * Registers Nunjucks layout aliases for all .njk files in the layouts directory.
 * @param {import('@11ty/eleventy').EleventyConfig} eleventyConfig
 */
import fs from 'node:fs';
import path from 'node:path';

export function setupLayoutAliases(eleventyConfig) {
  const layoutDir = path.resolve('src/layouts');
  fs.readdirSync(layoutDir).forEach((fileName) => {
    if (fileName.endsWith('.njk')) {
      const aliasName = path.basename(fileName, '.njk');
      eleventyConfig.addLayoutAlias(aliasName, fileName);
      if (process.env.DEBUG_LAYOUT_ALIASES === 'true') {
        console.log(`✔ Registered layout alias: ${aliasName} → ${fileName}`);
      }
    }
  });
}
