import { expect, test } from '@playwright/test';

test('theme toggle persists without flashing back to light', async ({ page }) => {
	await page.goto('/es/');
	await page.getByRole('button', { name: /Cambiar a modo oscuro/i }).click();
	await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
	await expect(page.getByRole('button', { name: /Cambiar a modo claro/i })).toHaveAttribute(
		'aria-pressed',
		'true'
	);

	await page.reload();
	await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

	await page.goto('/es/proyectos/');
	await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

test('mobile menu opens, closes with Escape and returns focus', async ({ page }) => {
	await page.setViewportSize({ width: 375, height: 800 });
	await page.goto('/es/');
	const toggle = page.locator('[data-menu-toggle]');
	const panel = page.locator('[data-menu-panel]');

	await expect(panel).toBeHidden();
	await toggle.click();
	await expect(panel).toBeVisible();
	await expect(toggle).toHaveAttribute('aria-expanded', 'true');

	await page.keyboard.press('Escape');
	await expect(panel).toBeHidden();
	await expect(toggle).toHaveAttribute('aria-expanded', 'false');
	await expect(toggle).toBeFocused();
});
