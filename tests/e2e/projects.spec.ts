import { expect, test } from '@playwright/test';

test('project filter narrows the grid and can be reset', async ({ page }) => {
	await page.goto('/es/proyectos/');
	const cards = page.locator('[data-project]');
	await expect(cards).toHaveCount(4);

	await page.getByRole('button', { name: 'Next.js' }).click();
	await expect(page.locator('[data-filter-count]')).toContainText('1');
	const visible = page.locator('[data-project]:not([hidden])');
	await expect(visible).toHaveCount(1);
	await expect(visible.first()).toContainText('UmbraChat');

	await page.getByRole('button', { name: 'Todos' }).click();
	await expect(page.locator('[data-project]:not([hidden])')).toHaveCount(4);
});

test('project detail shows the case study sections', async ({ page }) => {
	await page.goto('/es/proyectos/umbrachat/');
	await expect(page.getByRole('heading', { level: 1 })).toHaveText('UmbraChat');
	await expect(page.getByRole('heading', { name: 'El problema', exact: true })).toBeVisible();
	await expect(
		page.getByRole('heading', { name: 'Decisiones técnicas', exact: true })
	).toBeVisible();
	await expect(page.getByRole('heading', { name: 'Resultado', exact: true })).toBeVisible();
	await expect(page.getByRole('heading', { name: 'Stack', exact: true })).toBeVisible();
	await expect(page.getByRole('link', { name: /Demo/i }).first()).toHaveAttribute(
		'href',
		'https://umbrachat.org'
	);
});

test('filtering by Angular shows Referigo', async ({ page }) => {
	await page.goto('/es/proyectos/');
	await page.getByRole('button', { name: 'Angular' }).click();
	const visible = page.locator('[data-project]:not([hidden])');
	await expect(visible).toHaveCount(1);
	await expect(visible.first()).toContainText('Referigo');
	await page.getByRole('button', { name: 'Todos' }).click();
	await expect(page.locator('[data-project]:not([hidden])')).toHaveCount(4);
});
