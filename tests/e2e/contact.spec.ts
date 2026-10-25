import { expect, test } from '@playwright/test';

test('contact form sends a message successfully', async ({ page }) => {
	await page.goto('/es/contacto/');
	await page.getByLabel('Nombre').fill('Santiago');
	await page.getByLabel('Tu email').fill('santiago@example.com');
	await page
		.getByRole('textbox', { name: 'Mensaje' })
		.fill('Hola, me gustaría hablar de un proyecto.');
	await page.getByRole('button', { name: 'Enviar' }).click();

	await expect(page.locator('[data-contact-status]')).toBeVisible();
	await expect(page.locator('[data-contact-status]')).toContainText('Mensaje enviado');
});

test('contact form shows a server error without losing the UI', async ({ page }) => {
	await page.goto('/en/contact/');
	await page.getByLabel('Name').fill('Santiago');
	await page.getByLabel('Your email').fill('fail@example.com');
	await page
		.getByRole('textbox', { name: 'Message' })
		.fill('This message should trigger a simulated failure.');
	await page.getByRole('button', { name: 'Send' }).click();

	await expect(page.locator('[data-contact-status]')).toBeVisible();
	await expect(page.locator('[data-contact-status]')).toContainText('could not send');
	await expect(page.getByRole('button', { name: 'Send' })).toBeEnabled();
});

test('contact form validates required fields natively', async ({ page }) => {
	await page.goto('/es/contacto/');
	await page.getByRole('button', { name: 'Enviar' }).click();
	await expect(page.locator('[data-contact-status]')).toBeHidden();
});
