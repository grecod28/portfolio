/// <reference types="astro/client" />

interface ImportMetaEnv {
	/** Endpoint que recibe el JSON del formulario. Opcional en desarrollo. */
	readonly CONTACT_WEBHOOK_URL?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

declare module '*.astro' {
	import type { AstroComponentFactory } from 'astro/runtime/server/index.js';
	const component: AstroComponentFactory;
	export default component;
}
