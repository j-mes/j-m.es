import { ViewProps } from '../utils/view-props.ts';

export function siteLayout({ content, title }: ViewProps): JSX.Element {
	return (
		<html lang="en-GB">
			<head>
				<title>{title ?? 'No title'}</title>
				<link rel="stylesheet" href="/style.css" />
			</head>
			<body>{content}</body>
		</html>
	);
}

export const render = siteLayout;
