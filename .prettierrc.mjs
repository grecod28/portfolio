/** @type {import('prettier').Config} */
export default {
	plugins: ['prettier-plugin-astro'],
	useTabs: true,
	tabWidth: 2,
	printWidth: 100,
	singleQuote: true,
	semi: true,
	trailingComma: 'es5',
	astroAllowShorthand: true,
	overrides: [
		{
			files: '*.astro',
			options: {
				parser: 'astro',
			},
		},
	],
};
