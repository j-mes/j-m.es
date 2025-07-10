import { processCSS } from './src/config/utils/css-processing.ts';
import { tsxTransform } from './src/config/utils/tsx-transforming.ts';
import { registerCollections } from './src/config/utils/register-collections.ts';
import { getContentPermalink } from './src/config/utils/content-permalinks.ts';

export default function (eleventyConfig: any) {
	// Define the location of the CSS file (bouth source and compiled)
	const sourceFile: string = './src/assets/styles/index.css';
	const compiledFile: string = './dist/style.css';

	// Add a hook to process CSS with PostCSS plugins before Eleventy builds
	eleventyConfig.on('beforeBuild', async () => {
		// for debugging, turn false into true to see logs
		await processCSS(sourceFile, compiledFile, false);
	});

	// Add the CSS file to Eleventy's watch targets
	eleventyConfig.addWatchTarget(sourceFile);
	eleventyConfig.addWatchTarget('src/assets/components/**/*.css');

	// Add custom extensions for Eleventy to recognise
	eleventyConfig.addExtension(['11ty.jsx', '11ty.ts', '11ty.tsx'], {
		key: '11ty.js',
	});

	// Add a transform to process `.tsx` files and render them to a string
	eleventyConfig.addTransform('tsx', tsxTransform);

	// Register JSON-driven collections
	registerCollections(eleventyConfig);

	// Overrides permalink for templates inside src/content
	eleventyConfig.addGlobalData('eleventyComputed', {
		permalink: (data: any) =>
			getContentPermalink(data, {
				debug: process.env.ELEVENTY_DEBUG_PERMALINKS === 'true',
			}),
	});

	// Eleventy Pass Throughs
	// Add CNAME for j-m.es
	eleventyConfig.addPassthroughCopy('./src/CNAME');
	// All content and images
	eleventyConfig.addPassthroughCopy({ 'src/content': 'content' });
	// Shared fallback image
	eleventyConfig.addPassthroughCopy({ 'src/assets/images': 'assets/images' });

	// Return the configuration object with input and output directory settings
	return {
		dir: {
			input: 'src', // Source directory for input files
			includes: 'assets', // Directory for components, styles and images
			layouts: 'config/layouts', // Directory for layout files
			output: 'dist', // Output directory for generated files
		},
	};
}

export type ViewProps = {
	content?: string;
	title?: string;
};
