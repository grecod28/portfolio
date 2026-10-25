# Análisis del portfolio — Fase 0

- **Fecha:** 2026-10-22
- **Rama:** `feat/portfolio-redesign`
- **Commit base:** `53fb2d2 chore: preserve current portfolio baseline`
- **Alcance:** auditoría del repositorio, contenido, rutas, rendimiento, accesibilidad, SEO, testing y despliegue antes de escribir código.

---

## 1. Resumen ejecutivo

El proyecto **no parte de cero**. La base ya es moderna y está bien encaminada:

- Astro 7 con salida estática, TypeScript estricto y Tailwind CSS v4.
- Content Collections con Content Layer API (`glob`) y esquemas Zod.
- i18n manual ES/EN con rutas traducidas, `hreflang`, canonical y JSON-LD.
- SEO razonablemente completo, sitemap, `robots.txt`, OG images y CV.
- HTML/CSS mayoritariamente estático, sin frameworks de UI y con muy poco JavaScript.

Lo que falta es principalmente **producto, diseño, motion, accesibilidad fina, formulario real, testing, CI y despliegue con Actions**. También hay deuda técnica concreta (i18n sin barra final, imágenes OG de proyecto con dimensiones incorrectas, imágenes no responsivas, dependencias de fuentes sobredimensionadas, componentes a11y incompletos y un layout de starter sin usar).

**Conclusión:** conviene **evolucionar** la base, no reconstruirla. Se conservan rutas, contenido y esquemas, y se moderniza la capa visual, interactiva y de calidad.

---

## 2. Stack actual verificado

| Pieza                             | Versión actual | Última estable verificada     | Notas                                                                              |
| --------------------------------- | -------------- | ----------------------------- | ---------------------------------------------------------------------------------- |
| Astro                             | `7.4.1`        | **`7.4.2`** (npm, 2026-10-21) | Actualización patch. Sin migración mayor pendiente.                                |
| Tailwind CSS                      | `4.3.3`        | `4.3.3`                       | Integrado vía `@tailwindcss/vite`, no `@astrojs/tailwind`.                         |
| `@tailwindcss/vite`               | `4.3.3`        | `4.3.3`                       | Correcto para Tailwind v4.                                                         |
| TypeScript                        | `^6.0.0`       | `7.0.2`                       | Mantener 6.x por compatibilidad con `typescript-eslint` y Astro.                   |
| Zod                               | `4.6.7`        | `4.6.7`                       | Usado en content collections.                                                      |
| `@astrojs/sitemap`                | `3.7.4`        | `3.7.4`                       | Activo.                                                                            |
| `@astrojs/check`                  | `0.9.11`       | `0.9.12`                      | Actualización patch.                                                               |
| Sharp                             | `0.35.5`       | `0.35.5`                      | Procesado de imágenes en build.                                                    |
| Fontsource Inter / JetBrains Mono | `5.3.0`        | `5.3.0`                       | Importados completos desde CSS.                                                    |
| Node (engines del proyecto)       | `>=22.22.0`    | Astro 7.4.2 exige `>=22.23.4` | **Desajuste a corregir.**                                                          |
| pnpm                              | `11.25.0`      | `11.25.0`                     | Declarado en `packageManager`.                                                     |
| Testing / lint / CI               | **No existe**  | —                             | Vitest, Playwright, axe, LHCI, ESLint, Prettier, Husky y Actions están pendientes. |

### Configuración actual

- `astro.config.mjs`: `output: 'static'`, `site: 'https://grecodev.vercel.app'`, i18n nativo con `prefixDefaultLocale: true`, sitemap con i18n y filtro de la raíz.
- `tsconfig.json`: extiende `astro/tsconfigs/strict`.
- Sin adapter, sin variables de entorno, sin workflows y sin infraestructura de despliegue.
- **Hosting confirmado por el usuario:** bucket **S3 + CloudFront**, con una **Lambda** para el formulario. Se usará `@astro-aws/adapter` + `@astro-aws/constructs` (CDK) para mantener Astro Actions con validación server-side. El dominio `grecodev.vercel.app` es solo un placeholder heredado.

### Comprobaciones ejecutadas

| Comando      | Resultado                                        |
| ------------ | ------------------------------------------------ |
| `pnpm check` | 41 archivos, **0 errores, 0 warnings, 0 hints**. |
| `pnpm build` | **22 páginas** generadas, sin warnings.          |
| `git status` | Limpio.                                          |

---

## 3. Estructura actual

```text
src/
├── assets/images/            # retrato, 24 logos SVG y capturas de proyectos
├── components/
│   ├── pages/                # Home, Projects, ProjectDetail, About, Stack, Contact
│   ├── Header.astro
│   ├── Footer.astro
│   ├── LangPicker.astro
│   ├── ThemeToggle.astro
│   ├── ProjectCard.astro
│   ├── SectionHeading.astro
│   ├── InitiativeSection.astro
│   ├── NotFound.astro
│   └── Icon.astro
├── content/
│   ├── projects/             # 4 proyectos en Markdown localizado
│   └── experience/           # 2 experiencias en Markdown
├── content.config.ts         # loaders glob + esquemas Zod
├── config.ts                 # datos de sitio (nombre, email, redes, CV, locales)
├── i18n/
│   ├── ui.ts                 # diccionario ES/EN
│   └── utils.ts              # rutas, traducción de segmentos, canonical
├── layouts/
│   ├── BaseLayout.astro      # layout real
│   └── Layout.astro          # restos del starter de Astro (sin usar)
├── lib/
│   ├── covers.ts             # mapa manual de capturas
│   └── jsonld.ts             # Person + SoftwareSourceCode
├── pages/                    # rutas ES/EN, 404 y redirect raíz
└── styles/global.css         # Tailwind v4 + tema + utilidades
public/
├── cv/                       # PDF placeholder de 728 bytes
├── images/projects/          # copias PNG pesadas para OG
├── og/                       # 12 PNG generadas por script PowerShell
├── favicon.svg / favicon.ico
└── robots.txt
scripts/generate-og-images.ps1
```

---

## 4. Rutas y contenido reutilizable

### Rutas actuales (se conservan)

| ES                      | EN                     | Tipo                               |
| ----------------------- | ---------------------- | ---------------------------------- |
| `/` → `/es/`            | —                      | Redirect 308 generado en build     |
| `/es/`                  | `/en/`                 | Home                               |
| `/es/proyectos/`        | `/en/projects/`        | Listado + filtro                   |
| `/es/proyectos/<slug>/` | `/en/projects/<slug>/` | Detalle de proyecto                |
| `/es/sobre-mi/`         | `/en/about/`           | Sobre mí + formación + experiencia |
| `/es/tecnologias/`      | `/en/stack/`           | Skills                             |
| `/es/contacto/`         | `/en/contact/`         | Contacto                           |
| `/es/404/`              | `/en/404/`             | 404 localizado                     |
| `/404`                  | —                      | 404 raíz                           |

Slugs de proyecto idénticos en ambos idiomas: `umbrachat`, `knowmeet`, `k2-studio`, `referigo`.

### Proyectos (contenido real)

| Proyecto      | Estado                                          | Stack                                                                                            | Enlaces     | Pendientes                                                   |
| ------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------ | ----------- | ------------------------------------------------------------ |
| **UmbraChat** | Destacado, portada, deploy en AWS/umbrachat.org | Next.js, React, NestJS, WebSockets, PostgreSQL, Prisma, Docker, AWS, Nginx, TypeScript, Tailwind | Demo + repo | Métricas, notas técnicas y diagrama de arquitectura (`TODO`) |
| **KnowMeet**  | Destacado, portada, Google Play                 | React Native, TypeScript, Node.js, PostgreSQL, Docker                                            | Google Play | —                                                            |
| **K2 Studio** | Destacado, portada, cliente real en studiok2.es | Astro, TypeScript, Tailwind, AWS, GitHub Actions                                                 | Web + repo  | —                                                            |
| **Referigo**  | No destacado, sin portada                       | Angular, NestJS, TypeORM, MySQL, Redis, BullMQ, Nginx, PM2                                       | Ninguno     | `problem`, `result`, `cover`, `links` (`TODO`)               |

### Experiencia

- **Knowmeet Tech S.L.** — Desarrollador. `period` y `highlights`: `TODO`.
- **DLTCode** — Desarrollador. `period` y `highlights`: `TODO`.

### Contenido de perfil y UI

- Nombre: Santiago Greco.
- Email: `stgrecodev@gmail.com`.
- Ubicación: España.
- LinkedIn y GitHub verificados en `src/config.ts`.
- Bio, formación (DAW con Matrícula de Honor 9,47/10; especialización Big Data e IA en curso; AWS Developer Associate en preparación), iniciativa y propuesta de valor ya redactadas en ES/EN.
- Stack agrupado en frontend, backend, datos e infraestructura; bloque de “en formación”.
- Formulario actual: `mailto:` sin backend.

### TODOs de contenido existentes

Ver [TODO.md](../TODO.md). Los más importantes para el rediseño:

1. Fechas y logros reales de las dos experiencias.
2. Problema/resultado/portada/enlaces de Referigo.
3. Métricas y notas técnicas de UmbraChat.
4. Diagrama de arquitectura de UmbraChat.
5. CV real (el actual es un placeholder).
6. Dominio definitivo.
7. Decidir qué hacer con `devfolio.png` y con los 24 SVG de tecnologías.

---

## 5. Deuda técnica y problemas detectados

### 5.1 Arquitectura y mantenimiento

1. **`src/layouts/Layout.astro` es un resto del starter de Astro** y no se usa. Eliminar.
2. **`src/config.ts` duplica `site` de `astro.config.mjs`** (`SITE.url`). Puede desincronizarse. Usar `Astro.site`/`import.meta.env.SITE` como fuente única.
3. **`src/lib/covers.ts` es un mapa manual** de capturas. Si se añade un proyecto sin actualizar el mapa, el fallo es silencioso. Se puede validar con `image()` en el schema o con un test que cruce proyectos y capturas.
4. **No hay `astro:env`**: cualquier secreto del formulario acabaría en `process.env` sin tipos.
5. **No hay adapter**: hoy es 100 % estático; Astro Actions necesita endpoints on-demand. Se añadirá `@astro-aws/adapter` y se desplegará en S3 + CloudFront + Lambda.
6. **Script de OG solo para Windows/PowerShell** y no ejecutable en CI Linux. Además genera imágenes genéricas, no por proyecto.
7. **`public/images/projects/*.png` duplica capturas de `src/assets`** (1,8 MB) y se usa como `og:image` sin redimensionar.

### 5.2 i18n y rutas

8. **Bug confirmado de barra final:** `translatePath()` devuelve `/en/projects/umbrachat` (sin `/`), mientras la ruta real es `/en/projects/umbrachat/`. Afecta a:
   - `hreflang` de las páginas de detalle,
   - selector de idioma,
   - `x-default`.
     En los HTML generados se ven URLs sin barra final, que provocan redirecciones. Corregir el helper y añadir tests.
9. **`PAGE_SEGMENTS` y `PAGES` mantienen dos mapas de rutas** con información solapada. Unificar.
10. **`getLocaleFromUrl()` asume que cualquier ruta que no empiece por `en` es `es`**, incluida la 404 raíz. Aceptable, pero conviene hacerlo explícito.
11. **No se usan helpers nativos de `astro:i18n`** (`getRelativeLocaleUrl`, `getLocaleByPath`, etc.). Se puede mantener el mapeo de segmentos traducidos, pero apoyarse en la API nativa para el resto.
12. **`trailingSlash` no está fijado** en la config; conviene `'always'` para que canonical, hreflang y enlaces coincidan.

### 5.3 Imágenes y rendimiento

13. **Imágenes no responsivas:** `<Image format="webp">` sin `widths`/`sizes`/`layout`; no se genera `srcset`. No hay AVIF ni `<Picture>`.
14. **Fuentes sobredimensionadas:** `@fontsource-variable/inter` y `jetbrains-mono` se importan completos en CSS. El build incluye subsets latin-ext, cyrillic, greek, vietnamese, etc. (~350 KB de woff2). No hay `preload` ni `font-display` explícito.
15. **CSS global de 43,8 KB** (sin comprimir) en una sola hoja. Aceptable, pero se puede reducir con menos utilidades y CSS por componente.
16. **`dist` pesa 4,1 MB**, de los cuales 1,8 MB son imágenes públicas duplicadas y 1,2 MB son OG. El JS actual es mínimo (solo tema y menú), lo cual es una gran base.
17. **Retrato de perfil de 1,7 MB en origen**; el build genera WebP pequeño, pero conviene servir AVIF/WebP responsivos.
18. **LCP no medido**: no hay baseline de Lighthouse. El hero actual carga la foto con `eager` y `fetchpriority="high"`, pero el H1 es largo y el LCP real puede ser el texto. Se medirá en Fase 5.

### 5.4 Accesibilidad

19. **`InitiativeSection.astro` usa `aria-labelledby="initiative-title"` pero no existe ningún elemento con ese `id`.** `SectionHeading` no acepta `id`. Corregir.
20. **Zonas táctiles de 36 px** en toggle de tema, menú móvil y selector de idioma; los botones de filtro miden ~30 px. El objetivo es ≥44 px.
21. **Menú móvil con `<details>`**: no expone `aria-expanded`, no cierra con `Escape`, no cierra al hacer clic fuera y no devuelve el foco. Además duplica el enlace de CV.
22. **Etiquetas `aria-label` hardcodeadas en español** en el header (`"Principal"`), footer (`"Redes sociales"`) y selector de idioma, incluso en la versión inglesa.
23. **Formulario de contacto incompleto**: `name` y `email` no son `required`, no hay validación server-side, no hay estados de error/éxito accesibles ni `aria-describedby`.
24. **Animaciones**: solo existe `.animate-rise`; no hay `prefers-reduced-motion` global para hovers/transforms, ni fallback de scroll animations.
25. **`viewport` sin `viewport-fit=cover`** y sin `safe-area-inset`, relevante en móviles con notch.
26. **`aria-current="true"` en el selector de idioma** es válido, pero conviene revisar semántica (`page`/`true`) y no duplicar `hreflang` incorrecto.
27. **Foco visible** existe, pero conviene revisar contraste del anillo en ambos temas y en fondos con glassmorphism.

### 5.5 SEO y metadatos

28. **Títulos pobres en home**: `<title>Inicio · Santiago Greco</title>` y `og:title: "Inicio"`. Deberían incluir nombre + rol + propuesta de valor.
29. **`og:image` de proyectos apunta a capturas PNG que no son 1200×630** (`umbrachat.png`, `knowmeet.png`, `k2-studio.png`), pero se declaran `og:image:width=1200` y `height=630`. Incorrecto para redes sociales.
30. **OG images genéricas** generadas por PowerShell; no reflejan el nuevo concepto ni incluyen el título de cada proyecto.
31. **`twitter:image:alt` no existe**; `og:image:alt` usa el título, no una descripción.
32. **`robots.txt` y `sitemap` hardcodean el dominio**. Centralizar el dominio y documentar el cambio.
33. **No hay `site.webmanifest` ni apple-touch-icon**; el favicon está incompleto para PWA/instalación.
34. **JSON-LD `Person`** correcto, pero se puede enriquecer con `alumniOf`, `knowsLanguage` y `worksFor` solo si el contenido es real. No inventar.

### 5.6 Testing y calidad

35. **No hay tests** (ni unitarios, ni E2E, ni a11y, ni Lighthouse).
36. **No hay ESLint, Prettier, `tsc --noEmit` ni scripts de formato**.
37. **No hay CI ni hooks de pre-commit**.
38. **No hay `README` actualizado** con scripts, estructura, decisiones y capturas; el actual describe el estado antiguo.
39. **No hay `docs/`** con análisis, plan ni diseño (se crean en esta fase).

### 5.7 Contenido y assets

40. **CV placeholder de 728 bytes**. No debe presentarse como CV real.
41. **`devfolio.png` sin usar** (1,2 MB).
42. **24 SVG de logos sin usar**. Se pueden aprovechar en la sección de skills.
43. **Experiencia con `TODO`** visible; el diseño debe marcar claramente lo pendiente sin inventar.
44. **Referigo sin portada ni enlaces**; el diseño necesita un placeholder honesto.
45. **No hay blog**, por lo que **no aplican RSS ni MDX** en esta iteración. Se documentará como decisión.

---

## 6. Investigación de Astro (verificada en documentación oficial)

### Versión estable

- **Astro 7.4.2** es la última estable (npm, 2026-10-21). El proyecto usa 7.4.1.
- La guía de migración a v7 no introduce cambios obligatorios para este proyecto: el build actual ya pasa con el compilador Rust y el nuevo procesador Markdown.
- Cambios de v7 relevantes: Vite 8, compilador Rust (HTML más estricto), Sätteri como procesador Markdown por defecto, `compressHTML: 'jsx'` por defecto, routing avanzado y eliminación de `@astrojs/db`.
- **No se necesita** `@astrojs/markdown-remark` ni plugins remark/rehype.

### Funciones que se van a aprovechar

| Función                                   | Estado               | Uso previsto                                                                         |
| ----------------------------------------- | -------------------- | ------------------------------------------------------------------------------------ |
| **Content Layer API + loaders**           | Estable              | `glob` para proyectos/experiencia; `file` para skills/formación.                     |
| **Zod 4**                                 | Estable              | Esquemas de colecciones y validación del formulario.                                 |
| **`<ClientRouter />` (View Transitions)** | Estable              | Transiciones de página y `transition:name` en portadas de proyecto.                  |
| **Server Islands (`server:defer`)**       | Estable              | **No se usarán**: no hay contenido dinámico esencial. Se mantiene el sitio estático. |
| **Astro Actions**                         | Estable              | Formulario de contacto con validación Zod y errores tipados. Requiere adapter.       |
| **`astro:env`**                           | Estable              | Variables tipadas para el webhook/email de contacto.                                 |
| **`<Picture>` + imágenes responsivas**    | Estable              | AVIF/WebP, `srcset`, `sizes`, `layout`.                                              |
| **Fonts API**                             | Estable              | Inter + JetBrains Mono con subsets y preload.                                        |
| **SVG como componentes**                  | Estable (Astro 5.7+) | Logos de skills inline y accesibles.                                                 |
| **`astro:i18n`**                          | Estable              | Apoyo al routing i18n nativo, manteniendo slugs traducidos.                          |
| **Sitemap**                               | Estable              | Mantener y filtrar rutas no indexables.                                              |
| **Prefetch**                              | Estable              | Precarga de páginas en hover/touch.                                                  |

### Funciones que se descartan (con justificación)

- **MDX / RSS**: no hay blog ni contenido MDX. Añadirlos sería una dependencia sin uso.
- **Server Islands**: no hay estadísticas, feeds ni datos dinámicos que lo justifiquen. Si en el futuro se añade GitHub stats, se evaluará.
- **Motion / GSAP**: no se necesitan para los efectos pedidos. CSS moderno + JS vanilla mínimo mantiene el bundle pequeño. Se documentará.
- **React/Vue/Svelte**: no hay islas que lo requieran. El filtro y el formulario se resuelven con TypeScript vanilla y Astro Actions.
- **Tailwind como integración `@astrojs/tailwind`**: Tailwind v4 se integra vía Vite, que es el camino actual y correcto.

---

## 7. Rendimiento actual (baseline estático)

| Métrica                          | Valor                           |
| -------------------------------- | ------------------------------- |
| Páginas generadas                | 22                              |
| `dist/` total                    | 4,1 MB                          |
| CSS principal                    | 43,8 KB (sin comprimir)         |
| JS de aplicación                 | Mínimo (scripts de tema y menú) |
| Fuentes woff2                    | ~350 KB, varios subsets         |
| `public/images/projects`         | 1,8 MB (duplicados)             |
| `public/og`                      | 1,2 MB                          |
| Imágenes de proyecto en `_astro` | 14–79 KB por variante WebP      |

**Fortalezas:** ningún framework de UI, HTML estático, imágenes ya optimizadas a WebP en build, fuentes locales, SEO completo.

**Riesgos:** fuentes con subsets innecesarios, imágenes no responsivas, CSS monolítico, falta de preload, OG pesadas y no normalizadas, y ausencia de medición real.

---

## 8. Despliegue y entorno

- **Hosting confirmado:** bucket **S3** + **CloudFront**.
- **Formulario:** Lambda (Astro Actions) con validación Zod y entrega a un **webhook/Formspree** configurable.
- **Adapter:** `@astro-aws/adapter` (comunidad, compatible con Astro 7 y Node 22/24) + `@astro-aws/constructs` para CDK.
- **Modelo:** páginas prerenderizadas a S3; Lambda solo para la acción de contacto. Las páginas conservan `export const prerender = true`.
- **Variables necesarias:** `CONTACT_WEBHOOK_URL` (secreto de servidor). Se definirán con `astro:env` y `.env.example`.
- **Headers de seguridad:** no existen. Se añadirán en la política de respuestas de CloudFront (`ResponseHeadersPolicy`): X-Content-Type-Options, Referrer-Policy, X-Frame-Options, HSTS y CSP.
- **Dominio:** `grecodev.vercel.app` es un placeholder. Pendiente de confirmar el dominio definitivo.
- **Riesgo:** `@astro-aws/adapter` es un adaptador de comunidad con adopción baja. Se validará en build y despliegue; si falla, plan B: Lambda dedicada para el formulario y sitio estático puro.

---

## 9. Riesgos y decisiones abiertas

| Riesgo / decisión                                  | Impacto | Propuesta                                                                |
| -------------------------------------------------- | ------- | ------------------------------------------------------------------------ |
| Confirmar hosting AWS                              | Alto    | Usar `@astro-aws/adapter` + CDK; si el adaptador falla, Lambda dedicada. |
| Cómo entregar el formulario                        | Alto    | Webhook/Formspree; requiere cuenta y `CONTACT_WEBHOOK_URL`.              |
| CV real                                            | Medio   | Mantener placeholder marcado; no presentarlo como definitivo.            |
| Contenido `TODO` de experiencia/Referigo/UmbraChat | Medio   | Mostrar avisos honestos; no inventar.                                    |
| Dominio definitivo                                 | Medio   | Centralizar en `site` + `SITE`; actualizar OG/sitemap/robots.            |
| Actions + S3                                       | Medio   | S3/CloudFront para páginas + Lambda para Actions. Documentar el modelo.  |
| Adapter AWS de comunidad                           | Medio   | Validar build/deploy; plan B con Lambda dedicada.                        |
| Fonts API requiere red en build                    | Bajo    | Fallback a fuentes locales/Fontsource si falla en CI.                    |
| Lighthouse ≥95 en móvil                            | Medio   | Medir y presupuestar; sin librerías pesadas.                             |
| Tests E2E en 3 navegadores                         | Medio   | Chromium local; Firefox/WebKit en CI con dependencias.                   |

---

## 10. Criterios de aceptación de la Fase 0

- [x] Repositorio explorado y build/check verificados.
- [x] Versión estable de Astro y novedades confirmadas en documentación oficial.
- [x] Contenido reutilizable y TODOs inventariados.
- [x] Deuda técnica, rendimiento, accesibilidad y SEO documentados.
- [x] Plan por fases propuesto en [`PLAN.md`](./PLAN.md).
- [x] Concepto visual propuesto en [`DISENO.md`](./DISENO.md).
- [ ] Confirmación del usuario para iniciar la implementación.

---

## 11. Fuentes consultadas

- [Astro 7 upgrade guide](https://docs.astro.build/en/guides/upgrade-to/v7/)
- [Content collections](https://docs.astro.build/en/guides/content-collections/)
- [View transitions](https://docs.astro.build/en/guides/view-transitions/)
- [Actions](https://docs.astro.build/en/guides/actions/)
- [Environment variables / `astro:env`](https://docs.astro.build/en/guides/environment-variables/)
- [Fonts API](https://docs.astro.build/en/guides/fonts/)
- [Images / `<Picture />`](https://docs.astro.build/en/guides/images/)
- [Testing con Vitest y Playwright](https://docs.astro.build/en/guides/testing/)
- [Vercel adapter](https://docs.astro.build/en/guides/integrations-guide/vercel/) (descartado)
- [On-demand rendering](https://docs.astro.build/en/guides/on-demand-rendering/)
- [Astro AWS adapter](https://www.astro-aws.org/) (comunidad; S3 + CloudFront + Lambda)
- Registro npm de Astro (`astro@7.4.2`, consultado el 2026-10-22).
