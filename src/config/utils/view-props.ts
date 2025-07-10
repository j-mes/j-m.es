export interface ViewProps {
	title?: string;
	tags?: string[] | string;
	content?: any; // JSX or equivalent content
	children?: any; // optional if you use children also
	className?: string;
	page?: {
		url: string;
		inputPath: string;
		// add more as needed
	};
}
