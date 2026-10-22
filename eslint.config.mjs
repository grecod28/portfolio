import js from '@eslint/js';
import astro from 'eslint-plugin-astro';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
	{
		ignores: [
			'dist/',
			'.astro/',
			'node_modules/',
			'infra/cdk.out/',
			'cdk.out/',
			'playwright-report/',
			'test-results/',
			'.lighthouseci/',
			'coverage/',
		],
	},
	js.configs.recommended,
	...tseslint.configs.recommended,
	...astro.configs['flat/jsx-a11y-recommended'],
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
		rules: {
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{ argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
			],
		},
	},
	{
		files: ['**/*.astro'],
		rules: {
			'astro/no-unused-css-selector': 'off',
		},
	},
];
