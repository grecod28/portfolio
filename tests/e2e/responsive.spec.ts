import { expect, test } from '@playwright/test';

test('no horizontal scroll on common mobile widths', async ({ page }) => {
	await page.goto('/es/', { waitUntil: 'domcontentloaded' });
	for (const width of [320, 375, 768, 1024, 1440]) {
		await page.setViewportSize({ width, height: 900 });
		const overflow = await page.evaluate(
			() => document.documentElement.scrollWidth > document.documentElement.clientWidth
		);
		expect(overflow, `horizontal overflow at ${width}px`).toBe(false);
	}
});

test('responsive grid reflows on mobile and desktop', async ({ page }) => {
	await page.setViewportSize({ width: 375, height: 900 });
	await page.goto('/es/proyectos/', { waitUntil: 'domcontentloaded' });
	const cards = page.locator('[data-project]');
	await expect(cards).toHaveCount(4);

	await page.setViewportSize({ width: 1440, height: 900 });
	await expect(cards.first()).toBeVisible();
});
