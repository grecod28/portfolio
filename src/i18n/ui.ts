import type { Locale } from './utils';

/**
 * Diccionario de interfaz y copys del sitio.
 * Todo el texto visible vive aquí, por idioma. Los contenidos de
 * proyectos y experiencia viven en las content collections.
 */
export const ui = {
	es: {
		nav: {
			home: 'Inicio',
			projects: 'Proyectos',
			about: 'Sobre mí',
			stack: 'Tecnologías',
			contact: 'Contacto',
		},
		theme: { light: 'Cambiar a modo oscuro', dark: 'Cambiar a modo claro' },
		skipToContent: 'Saltar al contenido',
		downloadCv: 'Descargar CV',
		openMenu: 'Abrir menú',
		closeMenu: 'Cerrar menú',
		notFound: {
			title: 'Página no encontrada',
			text: 'La página que buscas no existe o ha cambiado de dirección.',
			back: 'Volver al inicio',
		},
		footer: {
			rights: 'Todos los derechos reservados.',
			madeWith: 'Hecho con Astro y Tailwind CSS.',
		},
		home: {
			title: 'Inicio',
			description:
				'Portfolio de Santiago Greco, desarrollador de software en España: proyectos en producción, formación en Big Data e IA y experiencia con TypeScript.',
			heroTitle: 'Desarrollador de software · TypeScript · Big Data e Inteligencia Artificial',
			heroSubtitle: 'Construyo productos reales, los pongo en producción y sigo formándome en datos e IA.',
			status: 'España · Abierto a nuevas oportunidades',
			ctaProjects: 'Ver proyectos',
			ctaContact: 'Contactar',
			photoAlt: 'Retrato de Santiago Greco',
			featuredEyebrow: 'Proyectos destacados',
			featuredTitle: 'Cosas que funcionan ahora mismo',
			featuredSubtitle: 'Productos propios y trabajos de cliente, con enlace directo a lo publicado o al código.',
			viewAll: 'Ver todos los proyectos',
			educationEyebrow: 'Formación',
			educationTitle: 'Dónde estoy y hacia dónde voy',
			educationItems: [
				{
					title: 'Grado Superior en Desarrollo de Aplicaciones Web (DAW)',
					meta: '2024–2026 · Finalizado con Matrícula de Honor (9,47/10)',
				},
				{
					title: 'Especialización en Big Data e Inteligencia Artificial',
					meta: 'En curso',
				},
				{
					title: 'AWS Developer Associate',
					meta: 'En preparación',
				},
			],
			initiativeEyebrow: 'Iniciativa',
			initiativeTitle: 'Lo que ya está hecho',
			initiative: [
				{
					title: 'Productos en producción',
					text: 'UmbraChat funcionando en umbrachat.org y KnowMeet publicada en Google Play.',
				},
				{
					title: 'Infraestructura propia',
					text: 'Despliegues en AWS y en un VPS autogestionado con Nginx y PM2; publicación automática con GitHub Actions.',
				},
				{
					title: 'Formación y construcción en paralelo',
					text: 'DAW finalizado con Matrícula de Honor (9,47/10) mientras desarrollaba proyectos propios.',
				},
				{
					title: 'Siguiente objetivo',
					text: 'Especialización en Big Data e IA en curso y certificación AWS Developer Associate en preparación.',
				},
			],
			finalCtaTitle: '¿Hablamos?',
			finalCtaText: 'Estoy abierto a proyectos nuevos y a posiciones donde aportar desde el primer día.',
			finalCtaPrimary: 'Contactar',
			finalCtaSecondary: 'Ver proyectos',
		},
		projects: {
			title: 'Proyectos',
			description:
				'Proyectos de Santiago Greco: mensajería en tiempo real, apps móviles, webs para clientes y plataformas desplegadas en producción.',
			intro: 'Productos propios y trabajos para clientes. Cada ficha enlaza con lo que está publicado o con su código.',
			filterLabel: 'Filtrar por tecnología',
			all: 'Todos',
			noResults: 'Ningún proyecto usa esa tecnología.',
			viewProject: 'Ver proyecto',
		},
		project: {
			back: 'Volver a proyectos',
			problem: 'El problema',
			decisions: 'Decisiones técnicas',
			result: 'Resultado',
			stack: 'Stack',
			links: 'Enlaces',
			metrics: 'Métricas',
			metricsPending: 'Pendientes de medir. Se añadirán cuando haya datos reales.',
			technicalNotes: 'Decisiones técnicas por documentar',
			architecture: 'Arquitectura',
			architecturePending: 'TODO: diagrama de arquitectura en preparación.',
			screenshots: 'Capturas',
			coverPending: 'TODO: captura pendiente de añadir.',
		},
		about: {
			title: 'Sobre mí',
			description:
				'Historia, formación y experiencia de Santiago Greco: DAW con Matrícula de Honor, especialización en Big Data e IA en curso y proyectos propios en producción.',
			intro1:
				'Soy Santiago Greco, desarrollador de software en España. Terminé el Grado Superior de Desarrollo de Aplicaciones Web (DAW) con Matrícula de Honor (9,47/10) y ahora curso la especialización en Big Data e Inteligencia Artificial.',
			intro2:
				'Construyo productos propios de principio a fin: los diseño, los despliego y los mantengo. Esa combinación de base de ingeniería de software y orientación a datos e IA es la que quiero seguir desarrollando.',
			educationTitle: 'Formación',
			education: [
				{
					period: '2024–2026',
					title: 'Grado Superior en Desarrollo de Aplicaciones Web (DAW)',
					detail: 'Finalizado con Matrícula de Honor — nota media 9,47/10.',
					status: 'done',
				},
				{
					period: 'En curso',
					title: 'Especialización en Big Data e Inteligencia Artificial',
					detail:
						'Procesamiento de datos a gran escala, aprendizaje automático, redes neuronales, sistemas simbólicos, difusos y multiagente, algoritmos genéticos y razonamiento basado en casos.',
					status: 'active',
				},
				{
					period: 'En preparación',
					title: 'AWS Developer Associate',
					detail: 'Certificación en preparación.',
					status: 'prep',
				},
			],
			experienceTitle: 'Experiencia',
			experienceNote: 'Periodos y logros pendientes de completar.',
			initiativeTitle: 'Iniciativa',
			initiativeIntro: 'Proyectos e infraestructura que he creado y mantengo por mi cuenta.',
		},
		stack: {
			title: 'Tecnologías',
			description:
				'Stack de Santiago Greco: TypeScript, Next.js, NestJS, PostgreSQL, Docker, AWS y formación en curso en Big Data e Inteligencia Artificial.',
			intro: 'Las herramientas con las que trabajo cada día, agrupadas por área.',
			groups: {
				frontend: 'Frontend',
				backend: 'Backend',
				data: 'Datos',
				infra: 'Infraestructura',
			},
			learningEyebrow: 'En formación',
			learningTitle: 'Big Data e Inteligencia Artificial',
			learningNote: 'Especialización en curso. Lo listo por transparencia: no lo presento como experiencia todavía.',
			learningTopics: [
				'Procesamiento de datos a gran escala',
				'Aprendizaje automático',
				'Redes neuronales',
				'Sistemas simbólicos, difusos y multiagente',
				'Algoritmos genéticos',
				'Razonamiento basado en casos',
			],
			awsNote: 'AWS Developer Associate: en preparación.',
		},
		contact: {
			title: 'Contacto',
			description:
				'Contacta con Santiago Greco: email, LinkedIn, GitHub y formulario directo por correo.',
			intro: 'Para ofertas, proyectos o para hablar de tecnología, la vía más directa es el correo.',
			channelsTitle: 'Canales',
			formTitle: 'Enviar un mensaje',
			formName: 'Nombre',
			formEmail: 'Tu email',
			formMessage: 'Mensaje',
			formSubmit: 'Enviar',
			formNote: 'Se abrirá tu cliente de correo con el mensaje ya preparado.',
		},
	},
	en: {
		nav: {
			home: 'Home',
			projects: 'Projects',
			about: 'About',
			stack: 'Stack',
			contact: 'Contact',
		},
		theme: { light: 'Switch to dark mode', dark: 'Switch to light mode' },
		skipToContent: 'Skip to content',
		downloadCv: 'Download CV',
		openMenu: 'Open menu',
		closeMenu: 'Close menu',
		notFound: {
			title: 'Page not found',
			text: 'The page you are looking for does not exist or has moved.',
			back: 'Back to home',
		},
		footer: {
			rights: 'All rights reserved.',
			madeWith: 'Built with Astro and Tailwind CSS.',
		},
		home: {
			title: 'Home',
			description:
				'Portfolio of Santiago Greco, software developer based in Spain: production projects, Big Data & AI training and hands-on TypeScript experience.',
			heroTitle: 'Software developer · TypeScript · Big Data & Artificial Intelligence',
			heroSubtitle: 'I build real products, ship them to production, and keep training in data and AI.',
			status: 'Spain · Open to new opportunities',
			ctaProjects: 'View projects',
			ctaContact: 'Contact',
			photoAlt: 'Portrait of Santiago Greco',
			featuredEyebrow: 'Featured projects',
			featuredTitle: 'Things that work right now',
			featuredSubtitle: 'Personal products and client work, with direct links to what is live or to the code.',
			viewAll: 'View all projects',
			educationEyebrow: 'Education',
			educationTitle: 'Where I am and where I am heading',
			educationItems: [
				{
					title: 'Higher National Diploma in Web Application Development (DAW)',
					meta: '2024–2026 · Finished with Honors (9.47/10)',
				},
				{
					title: 'Big Data & Artificial Intelligence specialization',
					meta: 'In progress',
				},
				{
					title: 'AWS Developer Associate',
					meta: 'In preparation',
				},
			],
			initiativeEyebrow: 'Initiative',
			initiativeTitle: 'What is already done',
			initiative: [
				{
					title: 'Products in production',
					text: 'UmbraChat running at umbrachat.org and KnowMeet published on Google Play.',
				},
				{
					title: 'Own infrastructure',
					text: 'Deployments on AWS and on a self-managed VPS with Nginx and PM2; automated releases with GitHub Actions.',
				},
				{
					title: 'Studying and building at the same time',
					text: 'Finished DAW with Honors (9.47/10) while developing my own products.',
				},
				{
					title: 'Next step',
					text: 'Big Data & AI specialization in progress and AWS Developer Associate in preparation.',
				},
			],
			finalCtaTitle: 'Let’s talk?',
			finalCtaText: 'I am open to new projects and to roles where I can contribute from day one.',
			finalCtaPrimary: 'Contact',
			finalCtaSecondary: 'View projects',
		},
		projects: {
			title: 'Projects',
			description:
				'Projects by Santiago Greco: real-time messaging, mobile apps, client websites and platforms deployed to production.',
			intro: 'Personal products and client work. Each card links to what is live or to its code.',
			filterLabel: 'Filter by technology',
			all: 'All',
			noResults: 'No project uses that technology.',
			viewProject: 'View project',
		},
		project: {
			back: 'Back to projects',
			problem: 'The problem',
			decisions: 'Technical decisions',
			result: 'Result',
			stack: 'Stack',
			links: 'Links',
			metrics: 'Metrics',
			metricsPending: 'Pending measurement. They will be added once real data exists.',
			technicalNotes: 'Technical decisions to document',
			architecture: 'Architecture',
			architecturePending: 'TODO: architecture diagram coming soon.',
			screenshots: 'Screenshots',
			coverPending: 'TODO: screenshot pending.',
		},
		about: {
			title: 'About',
			description:
				'Santiago Greco’s background, education and experience: DAW with Honors, Big Data & AI specialization in progress and personal products in production.',
			intro1:
				'I’m Santiago Greco, a software developer based in Spain. I finished the Higher National Diploma in Web Application Development (DAW) with Honors (9.47/10) and I’m now studying the Big Data & Artificial Intelligence specialization.',
			intro2:
				'I build my own products end to end: I design them, deploy them and maintain them. That mix of software engineering fundamentals and a data & AI direction is what I want to keep growing.',
			educationTitle: 'Education',
			education: [
				{
					period: '2024–2026',
					title: 'Higher National Diploma in Web Application Development (DAW)',
					detail: 'Finished with Honors — GPA 9.47/10.',
					status: 'done',
				},
				{
					period: 'In progress',
					title: 'Big Data & Artificial Intelligence specialization',
					detail:
						'Large-scale data processing, machine learning, neural networks, symbolic, fuzzy and multi-agent systems, genetic algorithms and case-based reasoning.',
					status: 'active',
				},
				{
					period: 'In preparation',
					title: 'AWS Developer Associate',
					detail: 'Certification in preparation.',
					status: 'prep',
				},
			],
			experienceTitle: 'Experience',
			experienceNote: 'Periods and achievements pending completion.',
			initiativeTitle: 'Initiative',
			initiativeIntro: 'Projects and infrastructure I have created and maintain on my own.',
		},
		stack: {
			title: 'Stack',
			description:
				'Santiago Greco’s stack: TypeScript, Next.js, NestJS, PostgreSQL, Docker, AWS and in-progress Big Data & AI training.',
			intro: 'The tools I work with every day, grouped by area.',
			groups: {
				frontend: 'Frontend',
				backend: 'Backend',
				data: 'Data',
				infra: 'Infrastructure',
			},
			learningEyebrow: 'In training',
			learningTitle: 'Big Data & Artificial Intelligence',
			learningNote: 'Specialization in progress. Listed for transparency: I do not present it as experience yet.',
			learningTopics: [
				'Large-scale data processing',
				'Machine learning',
				'Neural networks',
				'Symbolic, fuzzy and multi-agent systems',
				'Genetic algorithms',
				'Case-based reasoning',
			],
			awsNote: 'AWS Developer Associate: in preparation.',
		},
		contact: {
			title: 'Contact',
			description: 'Get in touch with Santiago Greco: email, LinkedIn, GitHub and a direct email form.',
			intro: 'For offers, projects or just to talk about technology, email is the most direct channel.',
			channelsTitle: 'Channels',
			formTitle: 'Send a message',
			formName: 'Name',
			formEmail: 'Your email',
			formMessage: 'Message',
			formSubmit: 'Send',
			formNote: 'Your email client will open with the message already filled in.',
		},
	},
};

export type UI = (typeof ui)['es'];

export function useUI(locale: Locale): UI {
	return ui[locale];
}
