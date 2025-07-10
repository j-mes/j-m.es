import path from 'path';

type PermalinkOptions = {
	debug?: boolean; // When true, outputs debug logs to console
};

/**
 * Generates clean permalinks for files inside `src/content/`.
 *
 * Examples:
 * - src/content/index.md              → /
 * - src/content/about.md              → /about/
 * - src/content/blog/index.md         → /blog/
 * - src/content/blog/post.md          → /blog/post/
 *
 * Only logs if a problem occurs or if `debug: true` is passed.
 *
 * @param data - Eleventy data object
 * @param options - Optional { debug } flag to enable verbose logging
 * @returns A permalink string or undefined if not applicable
 */
export function getContentPermalink(
	data: any,
	options: PermalinkOptions = {},
): string | undefined {
	const inputPath = data?.page?.inputPath;
	const debug = options.debug ?? false;

	// Skip files without an input path
	if (!inputPath) {
		if (debug) {
			console.warn('[Content Permalinks] Skipped: missing page.inputPath');
		}
		return undefined;
	}

	// Normalize Windows-style backslashes
	const normalized = inputPath.replace(/\\/g, '/');

	// Only apply to content inside `src/content/`
	const contentRoot = '/src/content/';
	const indexInContent = normalized.indexOf(contentRoot);
	if (indexInContent === -1) {
		if (debug) {
			console.warn(`[Content Permalinks] Skipped: not inside ${contentRoot}`);
		}
		return undefined;
	}

	// Extract the path relative to `src/content/`
	const relative = normalized.slice(indexInContent + contentRoot.length);
	const parsed = path.parse(relative);

	// Case: root-level index.md → "/"
	if (parsed.name === 'index' && parsed.dir === '') {
		if (debug) console.log(`[Content Permalinks] Root index → '/'`);
		return '/';
	}

	// Case: index.md inside a folder → "/folder/"
	if (parsed.name === 'index') {
		const permalink = `/${parsed.dir}/`;
		if (debug)
			console.log(`[Content Permalinks] Folder index → '${permalink}'`);
		return permalink;
	}

	// Case: all other files → "/folder/filename/"
	const permalink = `/${parsed.dir ? parsed.dir + '/' : ''}${parsed.name}/`;
	if (debug) console.log(`[Content Permalinks] Page → '${permalink}'`);
	return permalink;
}
