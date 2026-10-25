import { defineConfig, devices } from '@playwright/test';

const port = process.env.PORT ?? '4321';
const baseURL = `http://127.0.0.1:${port}`;

export default defineConfig({
	testDir: './tests',
	testMatch: ['**/tests/e2e/**/*.spec.ts', '**/tests/a11y/**/*.spec.ts'],
	fullyParallel: true,
	forbidOnly: Boolean(process.env.CI),
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 2 : undefined,
	reporter: [['list'], ['html', { open: 'never' }]],
	use: {
		baseURL,
		trace: 'on-first-retry',
		screenshot: 'only-on-failure',
	},
	webServer: [
		{
			command: 'node tests/e2e/mock-webhook.mjs',
			port: 4322,
			reuseExistingServer: !process.env.CI,
			env: {
				MOCK_WEBHOOK_PORT: '4322',
			},
		},
		{
			command: `pnpm dev --host 127.0.0.1 --port ${port}`,
			url: `${baseURL}/es/`,
			reuseExistingServer: !process.env.CI,
			timeout: 120_000,
			env: {
				CONTACT_WEBHOOK_URL: 'http://127.0.0.1:4322/contact',
			},
		},
	],
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
		{
			name: 'firefox',
			use: { ...devices['Desktop Firefox'] },
		},
		{
			name: 'webkit',
			use: { ...devices['Desktop Safari'] },
		},
		{
			name: 'mobile-chrome',
			use: { ...devices['Pixel 5'] },
		},
		{
			name: 'mobile-safari',
			use: { ...devices['iPhone 13'] },
		},
	],
});
