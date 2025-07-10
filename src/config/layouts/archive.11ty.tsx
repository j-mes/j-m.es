import { siteLayout } from './main.11ty.tsx';
import type { ViewProps } from '../utils/view-props.ts';
import type { CollectionConfig } from '../utils/collection-config.ts';

interface ArchivePageProps extends ViewProps {
	items: {
		title: string;
		url: string;
		date?: string;
	}[];
	config: CollectionConfig;
}

export function archivePage({
	title,
	items,
	config,
	children,
}: ArchivePageProps): JSX.Element {
	const groupByYear = config.groupByYear;

	let list: JSX.Element;

	if (groupByYear) {
		const grouped = new Map<number, typeof items>();
		for (const item of items) {
			const year = new Date(item.date ?? '').getFullYear();
			if (!grouped.has(year)) grouped.set(year, []);
			grouped.get(year)!.push(item);
		}
		const years = Array.from(grouped.keys()).sort((a, b) => b - a);

		list = (
			<>
				{years.map((year) => (
					<section key={year}>
						<h2>{year}</h2>
						<ul>
							{grouped.get(year)!.map((item) => (
								<li key={item.url}>
									<a href={item.url}>{item.title}</a>
								</li>
							))}
						</ul>
					</section>
				))}
			</>
		);
	} else {
		list = (
			<ul>
				{items.map((item) => (
					<li key={item.url}>
						<a href={item.url}>{item.title}</a>
						{item.date && (
							<span> — {new Date(item.date).toLocaleDateString('en-GB')}</span>
						)}
					</li>
				))}
			</ul>
		);
	}

	return siteLayout({
		title,
		content: (
			<>
				{children}
				{list}
			</>
		),
	});
}

export const render = archivePage;
