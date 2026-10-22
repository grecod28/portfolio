import type { CollectionEntry } from 'astro:content';
import { SITE } from '../config';
import type { Locale } from '../i18n/utils';

/** JSON-LD `Person` para la home. */
export function personJsonLd(url: string, locale: Locale): Record<string, unknown> {
	return {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: SITE.name,
		alternateName: 'Santiago Greco Domínguez',
		url,
		email: `mailto:${SITE.email}`,
		jobTitle: locale === 'es' ? 'Desarrollador de software' : 'Software developer',
		address: {
			'@type': 'PostalAddress',
			addressCountry: 'ES',
		},
		sameAs: [SITE.social.linkedin, SITE.social.github],
		knowsAbout: [
			'TypeScript',
			'Next.js',
			'React',
			'NestJS',
			'PostgreSQL',
			'Docker',
			'AWS',
			'Big Data',
			'Artificial Intelligence',
		],
	};
}

/** JSON-LD `SoftwareSourceCode` para la ficha de un proyecto. */
export function projectJsonLd(
	project: CollectionEntry<'projects'>,
	locale: Locale,
	url: string
): Record<string, unknown> {
	const { title, tagline, stack, links } = project.data;
	const repo = links.find((l) => l.kind === 'repo');
	const publicLink = links.find((l) => l.kind !== 'repo');
	const languages = stack.includes('TypeScript') ? ['TypeScript'] : [];

	return {
		'@context': 'https://schema.org',
		'@type': 'SoftwareSourceCode',
		name: title[locale],
		description: tagline[locale],
		programmingLanguage: languages,
		url: publicLink?.url ?? url,
		...(repo ? { codeRepository: repo.url } : {}),
		author: {
			'@type': 'Person',
			name: SITE.name,
		},
	};
}
