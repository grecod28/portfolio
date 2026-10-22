import { SITE } from '../config';

export type Locale = (typeof SITE.locales)[number];
export type PageKey = 'home' | 'projects' | 'about' | 'stack' | 'contact';

const PAGES: Record<PageKey, { es: string; en: string }> = {
	home: { es: '', en: '' },
	projects: { es: 'proyectos', en: 'projects' },
	about: { es: 'sobre-mi', en: 'about' },
	stack: { es: 'tecnologias', en: 'stack' },
	contact: { es: 'contacto', en: 'contact' },
};

const SEGMENTS: Record<string, PageKey> = Object.entries(PAGES).reduce(
	(acc, [key, value]) => {
		acc[value.es || '/'] = key as PageKey;
		acc[value.en || '/'] = key as PageKey;
		return acc;
	},
	{} as Record<string, PageKey>
);

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

/** Devuelve la clave de página a partir de un segmento de ruta. */
export function getPageFromSegment(segment: string | undefined): PageKey | undefined {
	if (!segment) return 'home';
	return SEGMENTS[segment];
}

/**
 * Traduce una ruta actual (p. ej. `/es/proyectos/umbrachat/`) al idioma destino.
 * Conserva el slug del proyecto y normaliza siempre la barra final.
 */
export function translatePath(pathname: string, to: Locale): string {
	const segments = pathname.split('/').filter(Boolean);
	const raw = segments[0] === 'es' || segments[0] === 'en' ? segments.slice(1) : segments;
	const mapped = raw.map((segment, index) => {
		if (index !== 0) return segment;
		const page = SEGMENTS[segment];
		return page ? PAGES[page][to] : segment;
	});
	const normalized = mapped.filter(Boolean).join('/');
	return `/${to}/${normalized ? `${normalized}/` : ''}`;
}

/** Devuelve la URL canónica (absoluta) de la página actual. */
export function canonicalUrl(pathname: string, base: URL | string = SITE.url): string {
	return new URL(pathname, base).toString();
}

/** Devuelve el otro idioma soportado. */
export function otherLocale(locale: Locale): Locale {
	return locale === 'es' ? 'en' : 'es';
}
