import { mkdir, readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import matter from 'gray-matter';
import sharp from 'sharp';

const root = process.cwd();
const ogDir = join(root, 'public', 'og');
const projectOgDir = join(ogDir, 'projects');
const projectsDir = join(root, 'src', 'content', 'projects');
const site = process.env.SITE_URL || 'https://grecodev.vercel.app';

const escape = (value) =>
	String(value)
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&apos;');

const wrap = (text, max = 34) => {
	const words = String(text).split(/\s+/);
	const lines = [];
	let current = '';
	for (const word of words) {
		const next = current ? `${current} ${word}` : word;
		if (next.length > max && current) {
			lines.push(current);
			current = word;
		} else {
			current = next;
		}
	}
	if (current) lines.push(current);
	return lines.slice(0, 3);
};

function template({ eyebrow, title, subtitle, footer, accent = false }) {
	const titleLines = wrap(title);
	return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
		<rect width="1200" height="630" fill="#F4F1EA"/>
		<g stroke="#D8D2C4" stroke-width="1">
			${Array.from({ length: 24 }, (_, i) => `<path d="M${i * 50} 0V630"/>`).join('')}
			${Array.from({ length: 13 }, (_, i) => `<path d="M0 ${i * 50}H1200"/>`).join('')}
		</g>
		<rect x="48" y="48" width="1104" height="534" fill="none" stroke="#12161C" stroke-width="2"/>
		<rect x="48" y="48" width="14" height="14" fill="#1F4BFF"/>
		<rect x="1138" y="568" width="14" height="14" fill="#1F4BFF"/>
		<rect x="48" y="48" width="270" height="72" fill="${accent ? '#1F4BFF' : '#12161C'}"/>
		<text x="76" y="94" font-family="monospace" font-size="28" font-weight="700" fill="#FFFFFF">SG</text>
		<text x="128" y="92" font-family="monospace" font-size="16" letter-spacing="3" fill="#FFFFFF">BLUEPRINT / PORTFOLIO</text>
		<text x="76" y="182" font-family="monospace" font-size="18" letter-spacing="4" fill="#1436B8">${escape(eyebrow)}</text>
		${titleLines
			.map(
				(line, index) =>
					`<text x="76" y="${270 + index * 76}" font-family="sans-serif" font-size="64" font-weight="700" fill="#12161C">${escape(line)}</text>`
			)
			.join('')}
		<text x="78" y="${270 + titleLines.length * 76 + 22}" font-family="sans-serif" font-size="24" fill="#4A5361">${escape(subtitle)}</text>
		<path d="M76 512H1124" stroke="#D8D2C4" stroke-width="2"/>
		<text x="76" y="552" font-family="monospace" font-size="16" letter-spacing="2" fill="#4A5361">${escape(footer)}</text>
		<text x="1124" y="552" text-anchor="end" font-family="monospace" font-size="16" letter-spacing="2" fill="#1F4BFF">SANTIAGO GRECO</text>
	</svg>`;
}

const pageImages = [
	{
		file: 'home-es.png',
		eyebrow: '01 / PERFIL',
		title: 'Santiago Greco',
		subtitle: 'Desarrollador de software · TypeScript · Big Data e IA',
		footer: site,
		accent: true,
	},
	{
		file: 'home-en.png',
		eyebrow: '01 / PROFILE',
		title: 'Santiago Greco',
		subtitle: 'Software developer · TypeScript · Big Data & AI',
		footer: site,
		accent: true,
	},
	{
		file: 'projects-es.png',
		eyebrow: '02 / PROYECTOS',
		title: 'Proyectos',
		subtitle: 'Productos propios y trabajos de cliente, en producción.',
		footer: `${site}/es/proyectos/`,
	},
	{
		file: 'projects-en.png',
		eyebrow: '02 / PROJECTS',
		title: 'Projects',
		subtitle: 'Personal products and client work, shipped to production.',
		footer: `${site}/en/projects/`,
	},
	{
		file: 'about-es.png',
		eyebrow: '03 / TRAYECTORIA',
		title: 'Sobre mí',
		subtitle: 'Ingeniería, formación y proyectos propios.',
		footer: `${site}/es/sobre-mi/`,
	},
	{
		file: 'about-en.png',
		eyebrow: '03 / BACKGROUND',
		title: 'About',
		subtitle: 'Engineering, education and personal projects.',
		footer: `${site}/en/about/`,
	},
	{
		file: 'stack-es.png',
		eyebrow: '04 / TECNOLOGÍAS',
		title: 'Stack',
		subtitle: 'Herramientas, datos e infraestructura.',
		footer: `${site}/es/tecnologias/`,
	},
	{
		file: 'stack-en.png',
		eyebrow: '04 / STACK',
		title: 'Stack',
		subtitle: 'Tools, data and infrastructure.',
		footer: `${site}/en/stack/`,
	},
	{
		file: 'contact-es.png',
		eyebrow: '05 / CONTACTO',
		title: 'Hablemos',
		subtitle: 'Ofertas, proyectos o una conversación técnica.',
		footer: `${site}/es/contacto/`,
	},
	{
		file: 'contact-en.png',
		eyebrow: '05 / CONTACT',
		title: 'Let’s talk',
		subtitle: 'Roles, projects or a technical conversation.',
		footer: `${site}/en/contact/`,
	},
	{
		file: 'default-es.png',
		eyebrow: 'SANTIAGO GRECO',
		title: 'Portfolio',
		subtitle: 'Desarrollador de software · España',
		footer: site,
	},
	{
		file: 'default-en.png',
		eyebrow: 'SANTIAGO GRECO',
		title: 'Portfolio',
		subtitle: 'Software developer · Spain',
		footer: site,
	},
];

await mkdir(ogDir, { recursive: true });
await mkdir(projectOgDir, { recursive: true });

const pageJobs = pageImages.map((image) =>
	sharp(Buffer.from(template(image)))
		.png()
		.toFile(join(ogDir, image.file))
);

const files = (await readdir(projectsDir)).filter((file) => file.endsWith('.md'));
const projectJobs = [];
for (const file of files) {
	const id = file.replace(/\.md$/, '');
	const { data } = matter(await readFile(join(projectsDir, file), 'utf8'));
	for (const locale of ['es', 'en']) {
		const svg = template({
			eyebrow: `PROYECTO / ${locale.toUpperCase()}`,
			title: data.title?.[locale] ?? id,
			subtitle: (data.tagline?.[locale] ?? '').slice(0, 110),
			footer: `${site}/${locale === 'es' ? 'es/proyectos' : 'en/projects'}/${id}/`,
			accent: data.featured === true,
		});
		projectJobs.push(
			sharp(Buffer.from(svg))
				.png()
				.toFile(join(projectOgDir, `${id}-${locale}.png`))
		);
	}
}

await Promise.all([...pageJobs, ...projectJobs]);
console.log(`OG generadas: ${pageImages.length} páginas + ${files.length} proyectos.`);
