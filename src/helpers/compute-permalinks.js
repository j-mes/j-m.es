import path from 'node:path';

/**
 * Computes permalinks for Eleventy content.
 * @param {{ page: { inputPath: string } }} data - Data object containing page info
 * @returns {string} The computed permalink
 */
export default function computePermalinks(data) {
  const inputPath = data.page.inputPath;

  const relativePath = path.relative('src/content', inputPath);
  const parsedPath = path.parse(relativePath);

  if (parsedPath.name === 'index') {
    return `/${parsedPath.dir}/index.html`;
  }

  return `/${parsedPath.dir}/${parsedPath.name}/index.html`.replace(/\\/g, '/');
}
