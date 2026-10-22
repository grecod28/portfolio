/**
 * Configuración global del sitio (datos personales verificados).
 */

export const SITE = {
	name: 'Santiago Greco',
	email: 'stgrecodev@gmail.com',
	location: 'España',
	// TODO: actualizar cuando exista un dominio definitivo.
	url: 'https://grecodev.vercel.app',
	social: {
		linkedin: 'https://www.linkedin.com/in/santiago-greco-dominguez',
		github: 'https://github.com/grecod28',
	},
	cv: '/cv/santiago-greco-cv.pdf',
	// Idioma por defecto del sitio (debe coincidir con astro.config.mjs).
	defaultLocale: 'es',
	locales: ['es', 'en'],
} as const;

export type Locale = (typeof SITE.locales)[number];

export function isLocale(value: string | undefined): value is Locale {
	return SITE.locales.includes(value as Locale);
}
