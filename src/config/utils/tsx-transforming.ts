import { jsxToString } from 'jsx-async-runtime';

export async function tsxTransform(content: string): Promise<string> {
	const result = await jsxToString(content);
	return `<!doctype html>\n${result}`;
}
