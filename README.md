# Portfolio — Santiago Greco

Sitio web personal de [Santiago Greco](https://grecodev.vercel.app), desarrollador
de software en España. Estático, bilingüe (ES/EN), con SEO completo y construido
con Astro + TypeScript + Tailwind CSS.

## Stack

- [Astro](https://astro.build) (salida estática) con TypeScript en modo estricto
- [Tailwind CSS](https://tailwindcss.com) v4 (vía `@tailwindcss/vite`)
- Content Collections con esquemas tipados (Zod) — `src/content.config.ts`
- i18n nativo de Astro: `/es/...` (por defecto) y `/en/...`
- Sin frameworks de UI; solo scripts vanilla mínimos (toggle de tema, filtro de
  proyectos, formulario mailto)

## Requisitos

- Node.js ≥ 22.22
- pnpm ≥ 11 (el repo declara `packageManager`; `corepack` lo gestiona solo)

## Instalación

```sh
corepack pnpm install
```

## Desarrollo

```sh
# Modo normal
pnpm dev

# Modo en segundo plano (recomendado por AGENTS.md)
pnpm dev -- --background
pnpm dev -- status
pnpm dev -- logs
pnpm dev -- stop
```

El sitio se sirve en `http://localhost:4321`. La raíz redirige a `/es/`.

## Build y validación

```sh
pnpm check   # astro check (types + Astro)
pnpm build   # genera dist/
pnpm preview # sirve la build localmente
```

El build debe terminar sin errores ni advertencias.

## Estructura

```text
src/
├── content/                 # colecciones de contenido (Markdown + frontmatter)
│   ├── projects/            # una entrada por proyecto (ES/EN localizados)
│   └── experience/          # experiencia profesional (fechas y logros: TODO)
├── content.config.ts        # esquemas Zod de las colecciones
├── i18n/
│   ├── ui.ts                # diccionario de interfaz y copys (ES/EN)
│   └── utils.ts             # helpers de rutas y traducción
├── layouts/BaseLayout.astro # <html> completo: SEO, hreflang, JSON-LD, tema
├── components/
│   ├── pages/               # páginas compartidas entre /es y /en
│   └── ...                  # Header, Footer, ProjectCard, etc.
├── pages/
│   ├── index.astro          # redirección / → /es/
│   ├── es/…                 # páginas en español
│   └── en/…                 # páginas en inglés
└── styles/global.css        # Tailwind + tema claro/oscuro
```

### Añadir un proyecto

1. Crear `src/content/projects/<slug>.md` con el frontmatter tipado (ver los
   existentes como plantilla; todos los campos de texto tienen `es` y `en`).
2. Añadir la captura en `src/assets/images/projects/<clave>.png` y referenciarla
   con `cover: <clave>` (las claves viven en `src/lib/covers.ts`).
3. Para la imagen Open Graph, copiar la captura también a
   `public/images/projects/<slug>.png`.

### Añadir una página

Crear el componente compartido en `src/components/pages/`, los wrappers en
`src/pages/es/` y `src/pages/en/`, y añadir las rutas a `PAGES` en
`src/i18n/utils.ts` para que el selector de idioma enlace bien.

## Despliegue

### Vercel

1. Importar el repositorio en Vercel; detecta Astro automáticamente.
2. Framework preset: **Astro**. Build command: `pnpm build`. Output: `dist`.
3. No requiere adaptador: la salida es totalmente estática.

Las redirecciones (`/ → /es/`) se generan en el build como páginas con
meta-refresh, no requieren configuración extra.

### Netlify o AWS S3 + CloudFront

La carpeta `dist/` es un sitio estático normal: se puede publicar tal cual.

### Cambiar el dominio

Actualizar `site` en `astro.config.mjs` y `SITE.url` en `src/config.ts`, el
sitemap en `public/robots.txt` y regenerar las imágenes Open Graph:

```powershell
# Desde Windows (PowerShell)
.\scripts\generate-og-images.ps1
```

## Datos pendientes

Los marcadores `TODO` visibles (fechas de experiencia, métricas, capturas, CV)
están listados y explicados en [TODO.md](./TODO.md).
