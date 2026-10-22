import { expect, test } from '@playwright/test';

test('home loads with the expected identity and metadata', async ({ page }) => {
	await page.goto('/es/');
	await expect(page).toHaveTitle(/Santiago Greco/);
	await expect(page.getByRole('heading', { level: 1 })).toHaveText('Santiago Greco');
	await expect(page.locator('html')).toHaveAttribute('lang', 'es-ES');
	await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
		'href',
		'https://grecodev.vercel.app/es/'
	);
});

test('navigation between pages keeps the active state', async ({ page }) => {
	await page.goto('/es/');
	await page.getByRole('link', { name: 'Proyectos' }).first().click();
	await expect(page).toHaveURL(/\/es\/proyectos\/$/);
	await expect(page.getByRole('heading', { level: 1 })).toContainText('Proyectos');
	await expect(
		page.locator('header nav[aria-label="Navegación principal"] a[aria-current="page"]').first()
	).toContainText('Proyectos');
});

test('language picker preserves the project slug and trailing slash', async ({ page }) => {
	await page.goto('/es/proyectos/umbrachat/');
	await page.getByRole('link', { name: 'English' }).click();
	await expect(page).toHaveURL(/\/en\/projects\/umbrachat\/$/);
	await expect(page.locator('html')).toHaveAttribute('lang', 'en-US');
	await expect(page.getByRole('heading', { level: 1 })).toHaveText('UmbraChat');
});

test('root redirects to the default locale', async ({ page }) => {
	await page.goto('/');
	await expect(page).toHaveURL(/\/es\/$/);
});

test('404 page is localized and noindexed', async ({ page }) => {
	const response = await page.goto('/es/404/');
	expect(response?.status()).toBe(404);
	await expect(page.getByText('Página no encontrada')).toBeVisible();
	await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex');
});
