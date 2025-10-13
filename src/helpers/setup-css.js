import autoprefixer from 'autoprefixer';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import postcss from 'postcss';
import postCssCsso from 'postcss-csso';
import postCssImport from 'postcss-import';
import postCssNesting from 'postcss-nesting';

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
	eleventyConfig.addWatchTarget('src/styles/**/*.css');
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
		await fs
			.unlink(compiledFile)
			.then(() => {
				if (debug)
					console.log(`💥 Removed old CSS file: ${compiledFile}`);
			})
			.catch((err) => {
				if (err.code !== 'ENOENT') throw err;
			});

		// Ensure the output directory exists
		const compiledDir = path.dirname(compiledFile);
		await fs.mkdir(compiledDir, { recursive: true });

		// Read the source CSS
		const css = await fs.readFile(sourceFile, 'utf8');

		// Process CSS with PostCSS plugins. Run the minifier only in production
		const plugins = [postCssImport, postCssNesting, autoprefixer];
		if (process.env.NODE_ENV === 'production') {
			plugins.push(postCssCsso);
		}

		const result = await postcss(plugins).process(css, {
			from: sourceFile,
			to: compiledFile
		});

		// Write processed CSS to compiledFile
		await fs.writeFile(compiledFile, result.css);

		if (debug) console.log(`🎉 Compiled new CSS file: ${compiledFile}`);
	} catch (error) {
		console.error('⛔️ CSS processing error:', error);
	}
}
