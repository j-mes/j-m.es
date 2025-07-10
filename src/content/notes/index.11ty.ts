import { getCollectionConfig } from '../../config/utils/collection-config.ts';

const tag = "notes";
const config = getCollectionConfig(tag);

if (!config) throw new Error(`Collection config not found for tag "${tag}"`);

export const data = {
  title: config.title,
  layout: "archivePage.tsx",
  eleventyComputed: {
    items: (data) => {
      return (data.collections[tag] || []).map((item) => ({
        title: item.data.title,
        url: item.url,
        date: item.date,
      }));
    },
    config: () => config,
  },
};

export default function Content() {
  return <p>Welcome to the {config.title} archive.</p>;
}
