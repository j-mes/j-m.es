import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import postCssImport from 'postcss-import';
import postCssNesting from 'postcss-nesting';
import postCssCsso from 'postcss-csso';
import { promises as fs } from 'node:fs';
import path from 'node:path';

export async function processCSS(
	sourceFile: string,
	compiledFile: string,
	debug = false,
): Promise<void> {
	try {
		// Remove old file if it exists
		await fs
			.unlink(compiledFile)
			.then(() => {
				if (debug) console.log(`💥 Removed old CSS file: ${compiledFile}`);
			})
			.catch((err) => {
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
