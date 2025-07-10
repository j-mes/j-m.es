import { ViewProps } from '../utils/view-props.ts';

export function siteLayout({
	content,
	title,
	className,
}: ViewProps): JSX.Element {
	return (
		<html lang="en-GB">
			<head>
				<title>{title ?? 'No title'}</title>
				<link rel="stylesheet" href="/style.css" />
			</head>
			<body class={className}>{content}</body>
		</html>
	);
}

export const render = siteLayout;
