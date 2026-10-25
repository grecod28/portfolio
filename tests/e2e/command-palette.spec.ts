import { expect, test } from '@playwright/test';

test('command palette navigates with the keyboard', async ({ page }) => {
	await page.goto('/es/');
	await page.keyboard.press('Control+k');
	const dialog = page.locator('[data-command-dialog]');
	await expect(dialog).toBeVisible();

	const input = page.locator('[data-command-input]');
	await input.fill('umbra');
	await page.keyboard.press('Enter');
	await expect(page).toHaveURL(/\/es\/proyectos\/umbrachat\/$/);
});

test('command palette closes with Escape and restores focus', async ({ page }) => {
	await page.goto('/en/');
	const trigger = page.locator('[data-command-open]').first();
	await trigger.click();
	const dialog = page.locator('[data-command-dialog]');
	await expect(dialog).toBeVisible();
	await page.keyboard.press('Escape');
	await expect(dialog).toBeHidden();
});
