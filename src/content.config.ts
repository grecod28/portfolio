import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'zod';

/**
 * Esquema localizado: campo que existe en español y en inglés.
 */
const localized = <T>(schema: T) =>
	z.object({
		es: schema,
		en: schema,
	});

const projectLinkKinds = ['demo', 'repo', 'web', 'store'] as const;

/**
 * Colección `projects`: una entrada por proyecto, con ficha completa
 * para la página de detalle (problema → decisiones → resultado).
 */
const projects = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
	schema: z.object({
		/** Título del proyecto (igual o casi igual en ambos idiomas). */
		title: localized(z.string().min(1)),
		/** Resumen de una línea para tarjetas y listados. */
		tagline: localized(z.string().min(1)),
		/** Aparece en la sección de destacados de la home. */
		featured: z.boolean().default(false),
		/** Orden de aparición (menor primero). */
		order: z.number().default(0),
		/**
		 * Clave de la captura principal. Debe existir en
		 * `src/assets/images/projects/` con el mismo nombre.
		 * Vacío si todavía no hay captura (se muestra un TODO).
		 */
		cover: z.string().default(''),
		coverAlt: localized(z.string()).default({ es: '', en: '' }),
		stack: z.array(z.string()),
		links: z
			.array(
				z.object({
					kind: z.enum(projectLinkKinds),
					url: z.url(),
					label: localized(z.string()),
				})
			)
			.default([]),
		problem: localized(z.string().min(1)),
		decisions: localized(z.array(z.string().min(1))),
		result: localized(z.string().min(1)),
		/** Métricas con marcadores TODO mientras no haya datos reales. */
		metrics: z.array(z.string()).default([]),
		/** Decisiones técnicas por documentar (TODO). */
		technicalNotes: localized(z.array(z.string())).default({ es: [], en: [] }),
		/** true = mostrar hueco reservado para el diagrama de arquitectura. */
		architecturePending: z.boolean().default(true),
	}),
});

/**
 * Colección `experience`: empresas donde ha trabajado Santiago.
 * Los campos `period` y `highlights` llevan marcadores TODO hasta
 * que Santiago los complete (ver TODO.md).
 */
const experience = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/experience' }),
	schema: z.object({
		company: z.string().min(1),
		role: localized(z.string().min(1)),
		/** TODO: completar con las fechas reales. */
		period: z.string(),
		/** TODO: completar con logros reales. */
		highlights: localized(z.array(z.string())),
		order: z.number().default(0),
	}),
});

/**
 * Colección `skills`: una entrada por tecnología, agrupada por área.
 * Usa el loader `file()` para demostrar la Content Layer API con JSON.
 */
const skills = defineCollection({
	loader: file('./src/content/skills.json'),
	schema: z.object({
		id: z.string().min(1),
		group: z.enum(['frontend', 'backend', 'data', 'infra']),
		name: z.string().min(1),
		icon: z.string().optional(),
		order: z.number().default(0),
	}),
});

export const collections = { projects, experience, skills };
