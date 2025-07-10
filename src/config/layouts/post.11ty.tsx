import { siteLayout } from './main.11ty.tsx';
import type { ViewProps } from '../utils/view-props.ts';

export function postPage({ title, tags, children }: ViewProps): JSX.Element {
	const collectionTag = Array.isArray(tags) ? tags[0] : (tags ?? 'default');
	const themeClass = `theme-${collectionTag}`;

	const content = (
		<article class={`post-page ${collectionTag}`}>
			<header>
				<h1>{title}</h1>
			</header>
			{children}
		</article>
	);

	return siteLayout({
		title,
		content,
		className: themeClass,
	});
}

export const render = postPage;
