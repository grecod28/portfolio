import { SITE } from '../config';

/**
 * Rutas locales de cada página por idioma.
 * Los slugs de proyecto son idénticos en ambos idiomas, así que solo
 * se traducen los segmentos de página.
 */
const PAGE_SEGMENTS: Record<string, { es: string; en: string }> = {
	'': { es: '', en: '' },
	proyectos: { es: 'proyectos', en: 'projects' },
	projects: { es: 'proyectos', en: 'projects' },
	'sobre-mi': { es: 'sobre-mi', en: 'about' },
	about: { es: 'sobre-mi', en: 'about' },
	tecnologias: { es: 'tecnologias', en: 'stack' },
	stack: { es: 'tecnologias', en: 'stack' },
	contacto: { es: 'contacto', en: 'contact' },
	contact: { es: 'contacto', en: 'contact' },
};

export type Locale = (typeof SITE.locales)[number];

/** Páginas del sitio y su segmento de ruta en cada idioma. */
export type PageKey = 'home' | 'projects' | 'about' | 'stack' | 'contact';

const PAGES: Record<PageKey, { es: string; en: string }> = {
	home: { es: '', en: '' },
	projects: { es: 'proyectos', en: 'projects' },
	about: { es: 'sobre-mi', en: 'about' },
	stack: { es: 'tecnologias', en: 'stack' },
	contact: { es: 'contacto', en: 'contact' },
};

/** Ruta local de una página en el idioma dado (con barra final). */
export function pagePath(locale: Locale, page: PageKey): string {
	const segment = PAGES[page][locale];
	return `/${locale}${segment ? `/${segment}` : ''}/`;
}

/** Ruta local del índice de proyectos. */
export function projectsIndexPath(locale: Locale): string {
	return pagePath(locale, 'projects');
}

/** Ruta local de la ficha de un proyecto (el slug es idéntico en ambos idiomas). */
export function projectDetailPath(locale: Locale, slug: string): string {
	return `${projectsIndexPath(locale)}${slug}/`;
}

/** Devuelve el idioma activo a partir de la URL actual. */
export function getLocaleFromUrl(pathname: string): Locale {
	const first = pathname.split('/').filter(Boolean)[0];
	return first === 'en' ? 'en' : 'es';
}

/** Traduce una ruta actual (p. ej. `/es/proyectos/umbrachat`) al idioma destino. */
export function translatePath(pathname: string, to: Locale): string {
	const segments = pathname.split('/').filter(Boolean);
	// Ignora el prefijo de idioma si existe.
	const raw = segments[0] === 'es' || segments[0] === 'en' ? segments.slice(1) : segments;
	const mapped = raw.map((segment, index) => {
		if (index === 0 && PAGE_SEGMENTS[segment]) return PAGE_SEGMENTS[segment][to];
		return segment;
	});
	return `/${to}/${mapped.join('/')}`;
}

/** Devuelve la URL canónica (absoluta) de la página actual. */
export function canonicalUrl(pathname: string): string {
	return new URL(pathname, SITE.url).toString();
}
