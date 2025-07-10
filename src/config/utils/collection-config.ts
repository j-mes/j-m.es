import rawConfigs from '../data/collections.json' assert { type: 'json' };

export interface CollectionConfig {
	tag: string;
	title: string;
	permalink: string;
	rss: boolean;
	groupByYear: boolean;
}

const configs: CollectionConfig[] = rawConfigs;

export function getCollectionConfig(tag: string): CollectionConfig | undefined {
	return configs.find((collection) => collection.tag === tag);
}
