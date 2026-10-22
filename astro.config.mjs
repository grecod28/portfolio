// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// TODO: actualizar `site` cuando exista un dominio definitivo.
export default defineConfig({
	site: 'https://grecodev.vercel.app',
	output: 'static',
	i18n: {
		defaultLocale: 'es',
		locales: ['es', 'en'],
		routing: {
			prefixDefaultLocale: true,
			// La redirección de `/` a `/es/` la hace src/pages/index.astro
			// (evita la ruta fallback duplicada que genera un warning en build).
			redirectToDefaultLocale: false,
		},
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
			filter: (page) => page !== 'https://grecodev.vercel.app/',
		}),
	],
	vite: {
		plugins: [tailwindcss()],
	},
});
