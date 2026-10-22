import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, expect, it } from 'vitest';
import Header from '../../src/components/Header.astro';
import SectionHeading from '../../src/components/SectionHeading.astro';
import ThemeToggle from '../../src/components/ThemeToggle.astro';
import Contact from '../../src/components/pages/Contact.astro';

async function render(Component: Parameters<AstroContainer['renderToString']>[0], options = {}) {
	const container = await AstroContainer.create();
	return container.renderToString(Component, options);
}

describe('componentes clave', () => {
	it('renders the header navigation with the active page', async () => {
		const html = await render(Header, {
			props: { locale: 'es' },
			request: new Request('https://example.com/es/proyectos/'),
		});
		expect(html).toContain('Navegación principal');
		expect(html).toContain('href="/es/proyectos/"');
		expect(html).toContain('aria-current="page"');
		expect(html).toContain('data-menu-toggle');
	});

	it('renders a section heading with an id and eyebrow', async () => {
		const html = await render(SectionHeading, {
			props: { id: 'proyectos', eyebrow: '02 / Proyectos', title: 'Proyectos' },
		});
		expect(html).toContain('id="proyectos"');
		expect(html).toContain('02 / Proyectos');
		expect(html).toContain('<h2');
	});

	it('renders an accessible theme toggle', async () => {
		const html = await render(ThemeToggle, { props: { locale: 'es' } });
		expect(html).toContain('data-theme-toggle');
		expect(html).toContain('aria-pressed="false"');
		expect(html).toContain('Cambiar a modo oscuro');
	});

	it('renders the contact form with honeypot and status', async () => {
		const html = await render(Contact, { props: { locale: 'es' } });
		expect(html).toContain('data-contact-form');
		expect(html).toContain('name="website"');
		expect(html).toContain('data-contact-status');
		expect(html).toContain('name="message"');
		expect(html).toContain('mailto:');
	});
});
