import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const pages = [
	'/es/',
	'/en/',
	'/es/proyectos/',
	'/en/projects/',
	'/es/proyectos/umbrachat/',
	'/en/projects/umbrachat/',
	'/es/sobre-mi/',
	'/en/about/',
	'/es/tecnologias/',
	'/en/stack/',
	'/es/contacto/',
	'/en/contact/',
	'/es/404/',
];

for (const path of pages) {
	test(`axe: ${path}`, async ({ page }) => {
		await page.goto(path);
		const results = await new AxeBuilder({ page })
			.withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
			.analyze();

		const serious = results.violations.filter(
			(violation) => violation.impact === 'serious' || violation.impact === 'critical'
		);
		expect(
			serious,
			serious
				.map(
					(violation) =>
						`${violation.id}: ${violation.help}\n${violation.nodes
							.map((node) => node.target.join(' '))
							.join('\n')}`
				)
				.join('\n\n')
		).toEqual([]);
	});
}
