import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import postCssImport from 'postcss-import';
import postCssNesting from 'postcss-nesting';
import postCssCsso from 'postcss-csso';
import { promises as fs } from 'node:fs';
import path from 'node:path';

/**
 * Registers CSS build and watch logic for Eleventy using PostCSS pipeline.
 * @param {import('@11ty/eleventy').EleventyConfig} eleventyConfig - Eleventy config object
 */
export function setupCSS(eleventyConfig) {
  const sourceFile = './src/styles/index.css';
  const compiledFile = './dist/style.css';

  // Process CSS before the build starts
  eleventyConfig.on('beforeBuild', async () => {
    await processCSS(sourceFile, compiledFile, false);
  });

  // Watch CSS source files for changes to trigger rebuild
  eleventyConfig.addWatchTarget(sourceFile);
  eleventyConfig.addWatchTarget('src/components/**/*.css');

}

/**
 * Processes CSS using PostCSS and writes the output to the compiled file.
 * @param {string} sourceFile - Path to the source CSS file
 * @param {string} compiledFile - Path to the output CSS file
 * @param {boolean} [debug=false] - Enable debug logging
 */
async function processCSS(sourceFile, compiledFile, debug = false) {
  try {
  // Remove old file if it exists
    await fs.unlink(compiledFile).then(() => {
      if (debug) console.log(`💥 Removed old CSS file: ${compiledFile}`);
    }).catch((err) => {
      if (err.code !== 'ENOENT') throw err;
    });

    // Ensure the output directory exists
    const compiledDir = path.dirname(compiledFile);
    await fs.mkdir(compiledDir, { recursive: true });

    // Read the source CSS
    const css = await fs.readFile(sourceFile, 'utf8');

    // Process CSS with PostCSS plugins
    const result = await postcss([
      postCssImport,
      postCssNesting,
      autoprefixer,
      postCssCsso,
    ]).process(css, { from: sourceFile, to: compiledFile });

    // Write processed CSS to compiledFile
    await fs.writeFile(compiledFile, result.css);

    if (debug) console.log(`🎉 Compiled new CSS file: ${compiledFile}`);
  } catch (error) {
    console.error('⛔️ CSS processing error:', error);
  }
}
