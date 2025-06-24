import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import postCssImport from 'postcss-import';
import postCssNesting from 'postcss-nesting';
import postCssCsso from 'postcss-csso';
import { jsxToString } from 'jsx-async-runtime';
import fs from 'node:fs';

export default function (eleventyConfig: any) {
    // Add a hook to process CSS with PostCSS plugins before Eleventy builds
    eleventyConfig.on('beforeBuild', async () => {
        const sourceFile: string = './src/styles/index.css';
        const compiledFile: string = './dist/style.css';

        try {
            // Remove the old compiled CSS file if it exists
            try {
                await fs.promises.unlink(compiledFile);
                console.log(
                    `💥 Eradicated the ancient, decrepit and old CSS file: ${compiledFile}`
                );
            } catch (err: any) {
                if (err.code !== 'ENOENT') {
                    throw err;
                }
                // Ignore error if file does not exist
            }

            // Read the source CSS file
            const css: Buffer = await fs.promises.readFile(sourceFile);

            // Process the CSS with PostCSS plugins: import, autoprefixer, and csso
            const result = await postcss([
                postCssImport,
                postCssNesting,
                autoprefixer,
                postCssCsso
            ]).process(css.toString(), { from: sourceFile, to: compiledFile });

            // Write the processed CSS to the compiled file
            await fs.promises.writeFile(compiledFile, result.css);
            console.log(
                `🎉 Successfully compiled the wonderful and new CSS file: ${compiledFile}`
            );
        } catch (error) {
            console.error('⛔️ Error processing CSS:', error);
        }
    });

    // Add the CSS file to Eleventy's watch targets
    eleventyConfig.addWatchTarget('src/styles/index.css');
    eleventyConfig.addWatchTarget('src/styles/components/*.css');

    // Add custom extensions for Eleventy to recognise
    eleventyConfig.addExtension(['11ty.jsx', '11ty.ts', '11ty.tsx'], {
        key: '11ty.js'
    });

    // Add a transform to process `.tsx` files and render them to a string
    eleventyConfig.addTransform('tsx', async (content: any) => {
        const result: string = await jsxToString(content);
        return `<!doctype html>\n${result}`;
    });

    // Eleventy Pass Throughs
	eleventyConfig.addPassthroughCopy('./src/images');
	eleventyConfig.addPassthroughCopy('./src/CNAME');

    // Return the configuration object with input and output directory settings
    return {
        dir: {
            input: 'src', // Source directory for input files
            layouts: 'layouts', // Directory for layout files
            output: 'dist' // Output directory for generated files
        }
    };
}

export type ViewProps = {
    content?: string;
    title?: string;
};
