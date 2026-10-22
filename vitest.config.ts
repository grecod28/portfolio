/// <reference types="vitest/config" />
import { getViteConfig } from 'astro/config';

export default getViteConfig(
	{
		test: {
			include: ['tests/unit/**/*.test.ts'],
			environment: 'node',
			restoreMocks: true,
			clearMocks: true,
		},
	},
	{ output: 'static', adapter: undefined }
);
