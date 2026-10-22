import { describe, expect, it } from 'vitest';
import {
	canonicalUrl,
	getLocaleFromUrl,
	getPageFromSegment,
	otherLocale,
	pagePath,
	projectDetailPath,
	projectsIndexPath,
	translatePath,
} from '../../src/i18n/utils';

describe('i18n routes', () => {
	it('builds localized page paths with trailing slash', () => {
		expect(pagePath('es', 'home')).toBe('/es/');
		expect(pagePath('en', 'projects')).toBe('/en/projects/');
		expect(pagePath('es', 'about')).toBe('/es/sobre-mi/');
		expect(projectsIndexPath('es')).toBe('/es/proyectos/');
		expect(projectDetailPath('en', 'umbrachat')).toBe('/en/projects/umbrachat/');
	});

	it('translates paths preserving project slugs and trailing slash', () => {
		expect(translatePath('/es/proyectos/umbrachat/', 'en')).toBe('/en/projects/umbrachat/');
		expect(translatePath('/en/about/', 'es')).toBe('/es/sobre-mi/');
		expect(translatePath('/es/contacto', 'en')).toBe('/en/contact/');
		expect(translatePath('/es/', 'en')).toBe('/en/');
	});

	it('detects locale and page segment', () => {
		expect(getLocaleFromUrl('/es/proyectos/')).toBe('es');
		expect(getLocaleFromUrl('/en/projects/')).toBe('en');
		expect(getLocaleFromUrl('/')).toBe('es');
		expect(getPageFromSegment('proyectos')).toBe('projects');
		expect(getPageFromSegment('sobre-mi')).toBe('about');
		expect(getPageFromSegment('unknown')).toBeUndefined();
		expect(otherLocale('es')).toBe('en');
	});

	it('builds canonical urls', () => {
		expect(canonicalUrl('/es/', 'https://example.com')).toBe('https://example.com/es/');
		expect(canonicalUrl('/en/about/', new URL('https://example.com'))).toBe(
			'https://example.com/en/about/'
		);
	});
});
