// @ts-check
import { defineConfig, envField, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import astroAws from '@astro-aws/adapter';

// TODO: actualizar `SITE_URL` cuando exista un dominio definitivo.
const site = process.env.SITE_URL || 'https://grecodev.vercel.app';

export default defineConfig({
	site,
	output: 'server',
	adapter: astroAws({ mode: 'ssr' }),
	build: {
		inlineStylesheets: 'always',
	},
	trailingSlash: 'ignore',
	prefetch: true,
	i18n: {
		defaultLocale: 'es',
		locales: ['es', 'en'],
		routing: {
			prefixDefaultLocale: true,
			// La redirección de `/` a `/es/` la hace src/pages/index.astro.
			redirectToDefaultLocale: false,
		},
	},
	env: {
		schema: {
			// Endpoint que recibe el JSON del formulario (Formspree, Make, Zapier...).
			CONTACT_WEBHOOK_URL: envField.string({
				context: 'server',
				access: 'secret',
				optional: true,
			}),
		},
	},
	fonts: [
		{
			provider: fontProviders.fontsource(),
			name: 'Inter',
			cssVariable: '--font-inter',
			weights: ['100 900'],
			styles: ['normal'],
			subsets: ['latin'],
			fallbacks: ['sans-serif'],
			display: 'optional',
		},
		{
			provider: fontProviders.fontsource(),
			name: 'JetBrains Mono',
			cssVariable: '--font-jetbrains-mono',
			weights: ['100 800'],
			styles: ['normal'],
			subsets: ['latin'],
			fallbacks: ['monospace'],
			display: 'optional',
		},
	],
	image: {
		responsiveStyles: true,
	},
	integrations: [
		sitemap({
			i18n: {
				defaultLocale: 'es',
				locales: {
					es: 'es-ES',
					en: 'en-US',
				},
			},
			// Excluye la página de redirección de la raíz.
			filter: (page) => page !== `${site}/`,
		}),
	],
	vite: {
		plugins: [tailwindcss()],
	},
});
