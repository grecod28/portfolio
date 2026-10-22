# Plan de rediseño y modernización — Fase 0

> **Estado:** propuesta pendiente de confirmación. No se inicia la implementación hasta que el usuario apruebe este plan (o indique lo contrario).

- **Rama:** `feat/portfolio-redesign` (ya creada, con baseline limpio en `53fb2d2`)
- **Objetivo:** portfolio estático, bilingüe, rápido, accesible, visualmente diferencial y con testing/CI reales.
- **Estrategia:** evolucionar la base existente, conservando rutas y contenido. No reescribir desde cero.

---

## 1. Principios de ejecución

1. **Contenido real primero.** No se inventan proyectos, métricas, experiencia ni testimonios. Lo que falte se marca `TODO:` y se lista al final.
2. **Menos JavaScript.** HTML/CSS por defecto; JS vanilla solo para tema, menú, filtro, command palette, reveals con fallback, tilt y formulario.
3. **Una sola estrategia de estilos:** Tailwind CSS v4 + tokens en variables CSS + CSS scoped para keyframes. Sin CSS-in-JS ni otra librería.
4. **Progressive enhancement.** El sitio funciona sin JS (salvo el envío del formulario, que tiene fallback `mailto:`). Las animaciones no bloquean contenido.
5. **Gate por fase.** Al final de cada fase: `lint`, `format:check`, `check`, `test:unit`, `build` y, cuando aplique, `test:e2e`. Si falla, no se avanza.
6. **Commits pequeños** con Conventional Commits (`feat:`, `fix:`, `chore:`, `test:`, `docs:`, `ci:`).
7. **Accesibilidad como requisito, no como extra.** Teclado, foco, contraste, 44 px, `prefers-reduced-motion` y axe sin violaciones serias/críticas.
8. **Presupuesto de rendimiento.** Sin librerías de animación, sin fuentes extra, sin imágenes sin optimizar. Objetivo Lighthouse ≥95 móvil en las cuatro categorías.

---

## 2. Decisiones técnicas propuestas

| Decisión         | Elección                                                                            | Justificación                                                                                        |
| ---------------- | ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Framework        | **Astro 7.4.2**                                                                     | Última estable; patch desde 7.4.1; sin migración mayor.                                              |
| Estilos          | **Tailwind CSS v4 + tokens CSS**                                                    | Ya instalado; permite tokens, container queries y CSS moderno sin dependencias extra.                |
| UI framework     | **Ninguno**                                                                         | No hay islas complejas; menos JS y mejor INP.                                                        |
| Contenido        | **Content Layer API**: `glob` (proyectos, experiencia) + `file` (skills, formación) | Tipado Zod, validación en build y demuestra ambos loaders.                                           |
| Imágenes         | **`<Picture>` AVIF/WebP + `srcset`/`sizes` + `layout`**                             | Reduce peso, evita CLS y sirve formatos modernos.                                                    |
| Fuentes          | **Fonts API** con Inter + JetBrains Mono, subset latin, `preload` de Inter          | Elimina subsets innecesarios y mejora LCP. Fallback a Fontsource local si el build offline falla.    |
| Routing          | **i18n nativo + helper de slugs traducidos**                                        | Se conservan `/es/proyectos/` y `/en/projects/`; se corrige la barra final.                          |
| Navegación       | **`<ClientRouter />`**                                                              | Transiciones SPA ligeras y `transition:name` para portadas.                                          |
| Motion           | **CSS + JS vanilla**                                                                | Scroll-driven animations, `@starting-style`, View Transitions y micro-interacciones sin Motion/GSAP. |
| Formulario       | **Astro Actions + Zod + adapter AWS**                                               | Validación server-side, errores tipados y Lambda para el endpoint.                                   |
| Entrega de email | **Webhook configurable** (Formspree/Make/Zapier)                                    | Sin SMTP ni dependencias; se configura con `astro:env`.                                              |
| Server Islands   | **No**                                                                              | No hay contenido dinámico esencial; el sitio sigue estático.                                         |
| Blog/RSS/MDX     | **No**                                                                              | No existe blog; añadirlo sería deuda sin contenido.                                                  |
| Testing          | **Vitest + Container API + Playwright + axe + LHCI**                                | Cobertura unitaria, E2E multi-browser y a11y/rendimiento automatizados.                              |
| CI/CD            | **GitHub Actions + Husky + lint-staged**                                            | Calidad en cada PR y pre-commit.                                                                     |
| Deploy           | **AWS S3 + CloudFront + Lambda**                                                    | Hosting confirmado; CDK con `@astro-aws/constructs`.                                                 |

---

## 3. Fases

### Fase 0 — Análisis (completada)

**Entregables**

- `docs/ANALISIS.md`
- `docs/PLAN.md`
- `docs/DISENO.md` (propuesta visual)

**Gate:** confirmación del usuario.

---

### Fase 1 — Fundaciones y tooling

**Objetivo:** dejar el proyecto listo para construir sin deuda de configuración.

**Tareas**

1. Actualizar Astro a `7.4.2` y `engines.node` a `>=22.23.4`.
2. Limpiar `src/layouts/Layout.astro` (starter sin uso).
3. Configurar `astro.config.mjs`:
   - `trailingSlash: 'always'`.
   - `prefetch` para enlaces internos.
   - `image.layout`/`responsiveStyles` si procede.
   - `env.schema` con variables de contacto.
   - `fonts` con Inter/JetBrains Mono.
   - `adapter: astroAws({ mode: 'ssr' })` y `output: 'server'` con `prerender = true` en las páginas.
   - Mantener sitemap e i18n.
4. Crear `src/env.d.ts` con tipos de `ImportMetaEnv` y `App.Locals` si hace falta.
5. Crear `.env.example` documentado.
6. Crear la infraestructura CDK en `infra/` con S3, CloudFront, Lambda y `ResponseHeadersPolicy`.
7. Instalar y configurar:
   - ESLint 10 + `eslint-plugin-astro` + `eslint-plugin-jsx-a11y` + `typescript-eslint` + `globals`.
   - Prettier + `prettier-plugin-astro`.
   - Vitest + `getViteConfig` + Container API.
   - Playwright + `@axe-core/playwright`.
   - Lighthouse CI.
   - Husky + lint-staged.
8. Añadir scripts de `package.json` (ver §5).
9. Crear `tsconfig` estricto para tests (`tsconfig.test.json` si hace falta).
10. Crear workflow `.github/workflows/ci.yml` con lint, format, check, unit, build, e2e, axe y LHCI.
11. Configurar Husky + lint-staged.
12. Actualizar `.gitignore` (`.env*` excepto `.env.example`, `playwright-report`, `test-results`, `.lighthouseci`, `.vercel`).

**Dependencias nuevas y justificación (una línea cada una)**

| Dependencia                              | Motivo                                                      |
| ---------------------------------------- | ----------------------------------------------------------- |
| `@astro-aws/adapter`                     | Adapter de comunidad para Astro Actions en AWS Lambda.      |
| `@astro-aws/constructs`                  | Constructs CDK para S3 + CloudFront + Lambda.               |
| `aws-cdk-lib` + `constructs` + `aws-cdk` | Infraestructura como código (solo dev/infra).               |
| `vitest`                                 | Tests unitarios y de componentes con `getViteConfig`.       |
| `@playwright/test`                       | E2E en Chromium, Firefox y WebKit.                          |
| `@axe-core/playwright`                   | Auditoría a11y automatizada en E2E.                         |
| `@lhci/cli`                              | Umbrales de rendimiento/SEO/a11y en CI.                     |
| `eslint`                                 | Calidad estática.                                           |
| `eslint-plugin-astro`                    | Reglas específicas de `.astro`.                             |
| `eslint-plugin-jsx-a11y`                 | Reglas de accesibilidad.                                    |
| `typescript-eslint`                      | Reglas TS tipadas.                                          |
| `globals`                                | Globals de Node/browser para ESLint.                        |
| `prettier`                               | Formato consistente.                                        |
| `prettier-plugin-astro`                  | Soporte de `.astro` en Prettier.                            |
| `husky`                                  | Hooks de pre-commit.                                        |
| `lint-staged`                            | Ejecutar lint/format solo en staged.                        |
| `gray-matter`                            | Leer frontmatter para generar OG en Node (solo build-time). |

> No se instalan Motion, GSAP, React, Vue, Svelte, `@astrojs/mdx` ni `@astrojs/rss`. Se justifica por ausencia de casos de uso.

**Gate:** `pnpm lint`, `pnpm format:check`, `pnpm check`, `pnpm test:unit`, `pnpm build` en verde. Commit `chore: set up astro 7.4 and quality tooling`.

---

### Fase 2 — Sistema de diseño y shell

**Objetivo:** aplicar el concepto **Blueprint Editorial** y dejar una base visual coherente, responsive y accesible.

**Tareas**

1. Reescribir tokens en `src/styles/global.css`:
   - colores claro/oscuro, superficies, tinta, acento cobalto, ámbar, bordes, sombras.
   - tipografía fluida con `clamp()`.
   - espaciado, radios, duraciones y easings.
   - `@layer` para base/componentes/utilidades.
2. Cargar fuentes con Fonts API y preload; eliminar imports completos de Fontsource o reducirlos a subset latin.
3. Layout base:
   - `viewport-fit=cover`.
   - theme script robusto (try/catch, `astro:after-swap`, `prefers-color-scheme`).
   - skip link, landmark roles, `main` con foco.
   - metadatos SEO mejorados (title/description/OG/Twitter/JSON-LD).
4. Header:
   - sticky con progreso de scroll.
   - nav con indicador de página activa.
   - menú móvil accesible (button + `aria-expanded`, Escape, click fuera, foco).
   - zonas táctiles ≥44 px.
   - labels i18n (no hardcodeadas).
5. Footer con enlaces sociales, CV y `⌘K`.
6. Command palette accesible (`<dialog>`, Ctrl/Cmd+K, búsqueda, flechas, Enter, Escape, foco).
7. Componentes base: Button, Chip, SectionHeading, Icon, ThemeToggle, LangPicker.
8. Revisar contraste y foco en ambos temas.
9. Añadir `site.webmanifest`, apple-touch-icon y favicon completo.

**Gate:** build + check + unit de componentes + axe básico en home. Commit `feat: add blueprint editorial design system and accessible shell`.

---

### Fase 3 — Contenido, páginas y formulario

**Objetivo:** rediseñar todas las secciones con el contenido real y hacer funcional el contacto.

**Tareas**

1. **Content collections**
   - Mantener `projects` y `experience` con `glob`.
   - Añadir `skills` y `education` con `file` loader (JSON) y esquema Zod.
   - Validar portadas y evitar fallos silenciosos (`covers` test o `image()`).
2. **i18n**
   - Corregir `translatePath` con barra final.
   - Unificar `PAGES`/`PAGE_SEGMENTS`.
   - Tests para rutas ES/EN, detalle, 404 y `x-default`.
3. **Home**
   - Hero con nombre como H1, rol, propuesta de valor, estado y CTAs (proyectos, CV, contacto).
   - Bento grid de proyectos destacados con portada, stack y enlaces.
   - Bloque “ahora” / iniciativa.
   - Formación resumida y CTA final.
4. **Proyectos**
   - Bento grid responsive con container queries.
   - Filtro por tecnología accesible, con conteo/estado y sin recarga.
   - Cards con `transition:name` para la portada.
   - Detalle con caso de estudio: problema → solución/decisiones → resultado, stack, enlaces, métricas/TODO y diagrama pendiente.
   - TOC/scrollspy con sección activa.
5. **Sobre mí**
   - Bio editorial.
   - Timeline de formación y experiencia (con TODO visibles).
   - Iniciativa y enlaces.
6. **Tecnologías**
   - Grupos visuales con logos SVG seleccionados + nombre.
   - Bloque de aprendizaje separado y honesto.
7. **Contacto**
   - Canales (email, LinkedIn, GitHub).
   - Formulario con Astro Action, validación Zod, honeypot, estados de carga/éxito/error, `aria-live`, foco en error.
   - Fallback `mailto:` si el servicio no está configurado.
   - Actualizar textos i18n.
8. **Imágenes**
   - `<Picture>` AVIF/WebP con `widths`, `sizes`, `layout`, `loading` y `fetchpriority`.
   - OG por página/proyecto a 1200×630 con script Node cross-platform; eliminar PNG duplicados innecesarios.
9. **SEO**
   - Títulos con nombre + rol + página.
   - OG/Twitter completos, canonical con barra final, hreflang corregido.
   - JSON-LD Person/Project enriquecido solo con datos reales.
   - Sitemap sin 404 y con dominio centralizado.

**Gate:** build + check + unit (schemas, i18n, actions, componentes) + E2E de navegación/filtro/formulario + axe en todas las páginas. Commit(s) por sección.

---

### Fase 4 — Motion y pulido

**Objetivo:** dar personalidad sin sacrificar rendimiento ni accesibilidad.

**Tareas**

1. `<ClientRouter />` en el layout, con transición de página sobria.
2. `transition:name` en portada de proyecto (lista ↔ detalle).
3. Hero: entrada escalonada por líneas/palabras con CSS.
4. Reveals al scroll:
   - `animation-timeline: view()` dentro de `@supports`.
   - Fallback con IntersectionObserver solo si no hay soporte.
   - Estado inicial visible si no hay JS.
5. Micro-interacciones:
   - hover de cards con elevación/scale sutil.
   - tilt 3D en cards con puntero fino; desactivado en touch/reduced motion.
   - subrayado animado en enlaces.
   - fondo de hero con spotlight CSS que sigue al puntero (sin canvas).
6. `prefers-reduced-motion`: desactivar/simplificar todo.
7. Asegurar que las animaciones solo tocan `transform`/`opacity` y no bloquean LCP/CLS.
8. Re-inicializar scripts en `astro:page-load` y reaplicar tema en `astro:after-swap`.
9. Revisar 320/375/768/1024/1440/ultrawide, safe-area y scroll horizontal.

**Gate:** build + E2E + axe + Lighthouse preliminar. Commit `feat: add performant motion and view transitions`.

---

### Fase 5 — Testing, accesibilidad y rendimiento

**Objetivo:** demostrar calidad con datos, no con intenciones.

**Tareas**

1. **Unitarios/componentes (Vitest + Container API)**
   - `i18n/utils` (rutas, barra final, locale).
   - Schemas de content collections (válidos/inválidos).
   - `covers` (todas las portadas existen).
   - Acción de contacto (schema, honeypot, webhook OK/error/timeout).
   - Componentes: Header, ProjectCard, ThemeToggle, SectionHeading, Contact form markup.
   - JSON-LD.
2. **E2E (Playwright)**
   - Proyectos desktop y móvil; Chromium, Firefox y WebKit.
   - Navegación ES/EN, selector de idioma, redirect raíz.
   - Tema persistente, sin flash.
   - Menú móvil (abrir/cerrar/Escape/foco).
   - Filtro de proyectos.
   - Formulario: éxito con webhook mock, error de validación, error de servicio.
   - Command palette.
   - 404.
   - Sin scroll horizontal en 320/375/768/1024/1440.
3. **Accesibilidad**
   - `@axe-core/playwright` en home, proyectos, detalle, about, stack, contacto y 404, ES/EN, desktop/móvil.
   - Fallar si hay violaciones `serious` o `critical`.
   - Revisión manual de teclado, foco, contraste y lectores de pantalla básicos.
4. **Lighthouse CI**
   - Umbrales: Performance/Accessibility/Best Practices/SEO ≥ 95 en móvil.
   - LCP < 2.5 s, CLS < 0.1, TBT < 200 ms (proxy de INP).
   - Ejecutar contra build de producción servido estáticamente.
5. **Calidad estática**
   - ESLint, Prettier, `astro check`, `tsc --noEmit`.
6. **CI**
   - Jobs: quality, e2e, lighthouse.
   - Cache de pnpm, upload de reportes en fallo.
7. **Pre-commit**
   - Husky + lint-staged (ESLint/Prettier en staged).

**Gate:** todos los tests en verde en local y CI; informe con resultados. Commit `test: add unit, e2e, a11y and lighthouse coverage`.

---

### Fase 6 — Documentación y entrega

**Tareas**

1. `README.md` completo: instalación, scripts, estructura, decisiones, capturas, deploy, env.
2. `docs/DISENO.md` final (concepto, tokens, componentes, motion, a11y).
3. `docs/PLAN.md` actualizado con estado real.
4. Informe final:
   - Lighthouse por página (móvil).
   - axe (0 serias/críticas).
   - Tests y cobertura.
   - TODOs de contenido.
   - Mejoras futuras.
5. Revisar `TODO.md` y enlazarlo.
6. Comprobar build sin warnings y `git status` limpio.
7. Commit final `docs: document redesign, testing and deployment`.

**Gate:** entrega completa y reproducible.

---

## 4. Estructura objetivo

```text
src/
├── actions/
│   ├── index.ts              # defineAction(contact)
│   └── contact.ts            # schema + envío (testeable)
├── components/
│   ├── ui/                   # Button, Chip, SectionHeading, Icon...
│   ├── layout/               # Header, Footer, CommandPalette, ThemeToggle
│   ├── projects/             # ProjectCard, ProjectGrid, ProjectToc
│   ├── sections/             # Hero, Bento, Timeline, Skills, ContactForm
│   └── pages/                # composición de páginas ES/EN
├── content/
│   ├── projects/*.md
│   ├── experience/*.md
│   ├── skills.json
│   └── education.json
├── content.config.ts         # glob + file + Zod
├── i18n/                     # ui.ts + utils.ts
├── layouts/BaseLayout.astro
├── lib/                      # seo, jsonld, covers, motion, contact
├── pages/                    # rutas ES/EN + 404 + og endpoints si aplica
├── scripts/                  # reveal, tilt, command palette, theme
└── styles/global.css         # tokens + Tailwind + motion
tests/
├── unit/
├── e2e/
└── a11y/
```

---

## 5. Scripts de `package.json`

```json
{
	"scripts": {
		"dev": "astro dev",
		"build": "astro build",
		"preview": "astro preview",
		"astro": "astro",
		"test": "pnpm test:unit && pnpm test:e2e",
		"test:unit": "vitest run",
		"test:unit:watch": "vitest",
		"test:e2e": "playwright test",
		"test:a11y": "playwright test tests/a11y",
		"lint": "eslint .",
		"lint:fix": "eslint . --fix",
		"format": "prettier --write .",
		"format:check": "prettier --check .",
		"check": "astro check && tsc --noEmit",
		"og": "node scripts/generate-og.mjs",
		"lighthouse": "lhci autorun"
	}
}
```

> `build` no ejecutará `og` automáticamente para no ralentizar cada build; las OG se generan con `pnpm og` y se commitean. En CI se puede validar que existan.

---

## 6. Matriz de testing

| Área            | Herramienta                     | Casos                                                        |
| --------------- | ------------------------------- | ------------------------------------------------------------ |
| Utilidades i18n | Vitest                          | Rutas, barra final, locale, traducción de slugs              |
| Schemas         | Vitest                          | Proyectos, experiencia, skills, education, campos inválidos  |
| Actions         | Vitest                          | Validación, honeypot, webhook OK/500/timeout, sin configurar |
| Componentes     | Vitest + Container API          | Header, ProjectCard, ThemeToggle, SectionHeading, Form       |
| Navegación      | Playwright                      | ES/EN, header, footer, lang picker, redirect                 |
| Tema            | Playwright                      | Toggle, persistencia, `prefers-color-scheme`, sin flash      |
| Móvil           | Playwright (móvil)              | Menú, foco, Escape, 44 px, sin scroll horizontal             |
| Proyectos       | Playwright                      | Filtro, conteo, empty state, detalle, transición             |
| Formulario      | Playwright                      | Éxito, validación, error de servicio, `aria-live`            |
| Command palette | Playwright                      | Ctrl/Cmd+K, filtro, flechas, Enter, Escape                   |
| A11y            | axe + Playwright                | Todas las páginas, ES/EN, desktop/móvil                      |
| Rendimiento     | Lighthouse CI                   | Performance, a11y, best practices, SEO, CWV                  |
| Estático        | ESLint/Prettier/tsc/astro check | Todo el repo                                                 |

---

## 7. CI (GitHub Actions)

```text
quality:
  - checkout
  - pnpm install --frozen-lockfile
  - pnpm lint
  - pnpm format:check
  - pnpm check
  - pnpm test:unit
  - pnpm build

e2e:
  - checkout
  - pnpm install --frozen-lockfile
  - pnpm exec playwright install --with-deps
  - pnpm build
  - pnpm test:e2e
  - upload playwright-report/test-results on failure

lighthouse:
  - checkout
  - pnpm install --frozen-lockfile
  - pnpm build
  - serve build estático
  - pnpm lighthouse
```

- Node 24 LTS.
- Cache de pnpm.
- Secretos de contacto **no** necesarios en CI: los tests E2E usan un webhook mock local.
- Si el adapter AWS no permite `astro preview`, el job de Lighthouse servirá el directorio estático generado con un servidor estático; se documentará el comando exacto tras verificar el build.

---

## 8. Entorno y despliegue

### Variables (`astro:env`)

Propuesta inicial:

```dotenv
# Servidor (secreto). Endpoint que recibe el JSON del formulario.
CONTACT_WEBHOOK_URL=

# Servidor (público). Email de contacto mostrado en la UI.
CONTACT_EMAIL=stgrecodev@gmail.com
```

- `CONTACT_WEBHOOK_URL` será opcional para no romper el build.
- Sin configuración, la Action devuelve `SERVICE_UNAVAILABLE` y la UI ofrece `mailto:`.
- `.env.example` documentado; `.env*` ignorado salvo el ejemplo.

### Infraestructura AWS (`infra/`)

- CDK stack con `AstroAWS` de `@astro-aws/constructs`.
- S3 privado + CloudFront con OAC.
- Lambda solo para Astro Actions (`output: 'server'` + `prerender = true` en páginas).
- `ResponseHeadersPolicy` con CSP, HSTS, `X-Content-Type-Options`, `X-Frame-Options` y `Referrer-Policy`.
- Dominio/certificado: se dejan parámetros opcionales y documentados; no se inventa un dominio.
- GitHub Actions con OIDC para `cdk deploy` (sin claves estáticas).

### Modelo de despliegue

- Páginas y assets: **S3 + CloudFront**.
- Acción de contacto: **Lambda**.
- Sin Server Islands.
- Redirect `/` → `/es/` se mantiene.

---

## 9. Presupuesto de rendimiento y calidad

| Métrica                        | Objetivo                                                    |
| ------------------------------ | ----------------------------------------------------------- |
| Lighthouse Performance (móvil) | ≥ 95                                                        |
| Lighthouse Accessibility       | ≥ 95                                                        |
| Lighthouse Best Practices      | ≥ 95                                                        |
| Lighthouse SEO                 | ≥ 95                                                        |
| LCP                            | < 2.5 s                                                     |
| CLS                            | < 0.1                                                       |
| INP (proxy TBT)                | < 200 ms                                                    |
| JS de aplicación               | < 20 KB gzip                                                |
| Fuentes                        | 2 familias, subset latin, ≤ 2 archivos preload              |
| Imágenes                       | AVIF/WebP, `srcset`, sin > 200 KB por imagen above-the-fold |
| axe                            | 0 violaciones serias/críticas                               |

---

## 10. Decisiones confirmadas

El usuario confirmó:

1. **Concepto visual:** **Blueprint Editorial** (ver `docs/DISENO.md`).
2. **Hosting:** **S3 + CloudFront + Lambda**.
3. **Formulario:** **webhook/Formspree** mediante `CONTACT_WEBHOOK_URL`, con Astro Actions y validación Zod.
4. **Adapter:** `@astro-aws/adapter` + CDK (`@astro-aws/constructs`). Si el adaptador falla, plan B: Lambda dedicada + sitio estático.
5. **Dominio y CV:** se mantienen como `TODO:` hasta que el usuario los aporte.

---

## 11. TODOs de contenido que quedan fuera del código

- [ ] Fechas y logros reales de Knowmeet Tech y DLTCode.
- [ ] Problema, resultado, portada y enlaces de Referigo.
- [ ] Métricas reales de UmbraChat (usuarios, latencia, volumen).
- [ ] Notas técnicas de UmbraChat (modelo de datos, retención, gateway WebSocket).
- [ ] Diagrama de arquitectura de UmbraChat.
- [ ] CV real en `public/cv/santiago-greco-cv.pdf`.
- [ ] Dominio definitivo (actualizar `site`, `SITE.url`, `robots.txt`, OG).
- [ ] Decidir `devfolio.png` y logos SVG no usados.
- [ ] Configurar `CONTACT_WEBHOOK_URL` en AWS (Lambda) y en el build.
- [ ] Revisar textos legales/privacidad si se recogen datos del formulario.

---

## 12. Definición de “terminado”

- [ ] Sitio compila sin errores ni warnings.
- [ ] Rutas actuales conservadas y redirects funcionando.
- [ ] Contenido real intacto; TODO visibles y listados.
- [ ] Diseño coherente con `docs/DISENO.md`, responsive 320→ultrawide.
- [ ] Tema claro/oscuro sin flash y persistente.
- [ ] Formulario funcional con validación y fallback.
- [ ] Navegación por teclado completa y axe sin serias/críticas.
- [ ] Lighthouse ≥95 en las cuatro categorías (móvil) o informe con desviaciones justificadas.
- [ ] Tests unitarios, E2E y a11y pasando en local y CI.
- [ ] Husky + lint-staged activos.
- [ ] `README.md`, `docs/ANALISIS.md`, `docs/PLAN.md`, `docs/DISENO.md` y `TODO.md` actualizados.
- [ ] `git status` limpio y commits con Conventional Commits.
