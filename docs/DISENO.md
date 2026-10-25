# Concepto visual — Blueprint Editorial

> Propuesta de dirección de arte para el rediseño. Pendiente de aprobación junto con el plan.

## 1. Idea

**Blueprint Editorial** combina la precisión de un plano técnico con la jerarquía de una revista de diseño.

El portfolio no se presenta como una landing genérica de tarjetas redondeadas, sino como un **dossier de ingeniería**: papel cálido, tinta grafito, retícula visible, marcas de medición, numeración de secciones, etiquetas monoespaciadas y un azul cobalto de anotación. La foto y las capturas se tratan como **pruebas documentales**, no como decoración.

Frase guía:

> “Un plano de lo que construyo, con las pruebas al lado.”

### Por qué encaja

- Es diferencial sin ser estridente.
- Refuerza el perfil técnico (TypeScript, datos, infraestructura) sin caer en el cliché “terminal verde”.
- Funciona muy bien en claro y oscuro.
- Permite HTML/CSS puro: líneas, retículas, tipografía y movimiento sutil.
- Es coherente con el contenido real: proyectos en producción, formación, decisiones técnicas.

---

## 2. Paleta

### Tema claro — “papel de plano”

| Token            | Hex       | Uso                                    |
| ---------------- | --------- | -------------------------------------- |
| `--paper`        | `#F4F1EA` | Fondo principal cálido.                |
| `--paper-raised` | `#FBF9F4` | Superficies y tarjetas.                |
| `--ink`          | `#12161C` | Texto principal.                       |
| `--ink-soft`     | `#4A5361` | Texto secundario.                      |
| `--line`         | `#D8D2C4` | Bordes y retícula.                     |
| `--cobalt`       | `#1F4BFF` | Acento principal, enlaces, foco.       |
| `--cobalt-ink`   | `#1436B8` | Texto de acento sobre papel.           |
| `--amber`        | `#D97706` | Acento secundario, estados “en curso”. |
| `--success`      | `#0F766E` | Estados correctos.                     |
| `--danger`       | `#B42318` | Errores.                               |

### Tema oscuro — “tinta nocturna”

| Token            | Hex       | Uso                |
| ---------------- | --------- | ------------------ |
| `--paper`        | `#0C1016` | Fondo principal.   |
| `--paper-raised` | `#131922` | Superficies.       |
| `--ink`          | `#EDE9DF` | Texto principal.   |
| `--ink-soft`     | `#A8B0BC` | Texto secundario.  |
| `--line`         | `#28313D` | Bordes y retícula. |
| `--cobalt`       | `#7C96FF` | Acento principal.  |
| `--cobalt-ink`   | `#A9BBFF` | Texto de acento.   |
| `--amber`        | `#F5B84B` | Acento secundario. |
| `--success`      | `#5EEAD4` | Estados correctos. |
| `--danger`       | `#FDA29B` | Errores.           |

**Contraste:** todos los pares texto/fondo se validan a WCAG AA. El cobalto se usa como acento y para texto grande; para texto pequeño se usa `--cobalt-ink`. Nunca se usa el cobalto como fondo de texto blanco sin comprobar contraste.

---

## 3. Tipografía

- **Display / UI:** Inter Variable. Titulares con tracking negativo y pesos 600–800.
- **Metadatos / código:** JetBrains Mono Variable. Etiquetas, números de sección, fechas, stack, atajos.
- **Escala fluida** con `clamp()`:
  - `--text-xs`: `0.75rem`
  - `--text-sm`: `0.875rem`
  - `--text-base`: `clamp(1rem, 0.95rem + 0.25vw, 1.0625rem)`
  - `--text-lg`: `clamp(1.125rem, 1.05rem + 0.4vw, 1.25rem)`
  - `--text-xl`: `clamp(1.375rem, 1.2rem + 0.9vw, 1.75rem)`
  - `--text-2xl`: `clamp(1.75rem, 1.4rem + 1.7vw, 2.5rem)`
  - `--text-3xl`: `clamp(2.25rem, 1.6rem + 3.2vw, 4rem)`
  - `--text-hero`: `clamp(2.75rem, 1.4rem + 6vw, 6.5rem)`
- El H1 del hero usa `--text-hero`; el nombre es el protagonista.
- Máximo de línea de lectura: `68ch`.
- `font-display: swap` y preload solo de Inter (subset latin).

---

## 4. Retícula y layout

- Contenedor: `min(100% - 2rem, 78rem)` con safe-area.
- Retícula de 12 columnas en desktop; 6 en tablet; 1 en móvil.
- Línea vertical de “plano” en el margen izquierdo con marcas de sección.
- Header sticky de 64 px (72 px en desktop) con barra de progreso de 2 px.
- Secciones numeradas: `01 — PERFIL`, `02 — PROYECTOS`, `03 — TRAYECTORIA`, `04 — STACK`, `05 — CONTACTO`.
- Bento grid para proyectos:
  - Desktop: 6 columnas; UmbraChat ocupa 4×2, KnowMeet 2×1, K2 2×1, tarjeta de estado 2×1.
  - Tablet: 2 columnas.
  - Móvil: 1 columna.
- Container queries en cards para ajustar padding, tamaño de título y stack.
- Radios pequeños (4–10 px), bordes de 1 px, sombras offset tipo “papel superpuesto”.

### Wireframe del hero

```text
┌──────────────────────────────────────────────────────────────┐
│  SG   Inicio  Proyectos  Sobre mí  Stack  Contacto   [◐] ES EN │
├──────────────────────────────────────────────────────────────┤
│ 01 / PERFIL                                      ┌─────────┐ │
│                                                  │  FOTO   │ │
│ Santiago Greco                                   │  ID card│ │
│ Desarrollador de software                        │  recorte│ │
│ TypeScript · Big Data e IA                       └─────────┘ │
│ Construyo productos reales, los pongo en                     │
│ producción y sigo formándome en datos e IA.                  │
│ [ Ver proyectos → ] [ Descargar CV ] [ Contactar ]           │
│ España · Abierto a nuevas oportunidades                      │
└──────────────────────────────────────────────────────────────┘
```

### Wireframe del bento

```text
┌───────────────────────────┬───────────────┐
│                           │  KnowMeet     │
│  UmbraChat                │  [captura]    │
│  [captura grande]         │  React Native │
│  Next.js · NestJS · AWS   ├───────────────┤
│  [Demo] [Repo]            │  K2 Studio    │
│                           │  [captura]    │
├───────────────────────────┴───────────────┤
│  Estado: 3 productos en producción · 1 en curso │
└───────────────────────────────────────────┘
```

---

## 5. Componentes

### Header

- Logo “SG” con marco de plano y nombre.
- Nav con subrayado animado y `aria-current="page"`.
- Botón de tema de 44×44.
- Selector de idioma tipo “ES / EN” con borde.
- CTA de CV visible en desktop; dentro del menú en móvil.
- Menú móvil como panel accesible, no `<details>`.
- Botón `⌘K` discreto.

### Project card

- Portada con relación 16:10, borde y “crop marks” en las esquinas.
- Título + tagline.
- Stack en chips mono, con `+N`.
- Enlaces demo/repo visibles sin entrar al detalle.
- Hover: elevación sutil, portada escala 1.02, flecha se desplaza.
- Tilt 3D muy leve solo con puntero fino.
- `transition:name` en la portada para viajar al detalle.

### Case study

- Cabecera editorial con título, tagline, stack y enlaces.
- Portada grande.
- Tres bloques: **Problema**, **Solución / decisiones**, **Resultado**.
- Métricas como “instrumentos” con borde discontinuo si son TODO.
- Diagrama de arquitectura con placeholder honesto.
- TOC lateral sticky con sección activa.
- Navegación anterior/siguiente entre proyectos.

### Timeline

- Línea vertical con nodos cuadrados, no círculos genéricos.
- Fechas en mono; roles y empresas en Inter.
- Estados: completado, en curso, pendiente.
- Los TODO se muestran como “pendiente de completar” con estilo de anotación.

### Skills

- Grupos en tarjetas con etiqueta mono y una retícula de logos + nombres.
- Logos SVG inline (Astro SVG components) con `aria-hidden` y nombre visible.
- Bloque de aprendizaje separado, con borde discontinuo y color ámbar.
- Sin barras de porcentaje inventadas.

### Contacto

- Canales en tarjetas con icono, etiqueta y valor.
- Formulario con labels visibles, ayuda contextual y errores inline.
- Estados: idle, enviando, éxito, error, servicio no configurado.
- `aria-live="polite"` para el estado.
- Fallback `mailto:` siempre visible.

### Command palette

- `<dialog>` nativo con `showModal()`.
- Atajo `Ctrl/Cmd + K`; también `?` para ayuda.
- Búsqueda difusa simple sobre páginas, proyectos y acciones (tema, idioma, CV).
- Navegación con flechas, Enter, Escape.
- Foco atrapado por el diálogo nativo; retorno al elemento previo.
- Estética de “consola de plano”: fondo tinta, texto papel, acento cobalto.

---

## 6. Movimiento

### Principios

- Animar solo `transform` y `opacity`.
- Duraciones 150–500 ms; nada superior a 700 ms salvo transición de página.
- Easing principal: `cubic-bezier(0.22, 1, 0.36, 1)`.
- Nada de animaciones que bloqueen la lectura o el LCP.
- `prefers-reduced-motion: reduce` desactiva reveals, tilt, parallax y transiciones no esenciales.

### Catálogo

| Efecto               | Implementación                                                                   |
| -------------------- | -------------------------------------------------------------------------------- |
| Entrada del hero     | CSS keyframes escalonados por línea/palabra, `animation-delay` con variable.     |
| Reveal al scroll     | `animation-timeline: view()` + `animation-range`; fallback IntersectionObserver. |
| Transición de página | `<ClientRouter />` con fade corto y `transition:animate`.                        |
| Portada que viaja    | `transition:name={`project-cover-${slug}`}` en card y detalle.                   |
| Hover de card        | `translateY(-4px)`, borde cobalto, sombra offset.                                |
| Tilt                 | `rotateX/rotateY` máximo 3°, con `rAF`; solo `hover: hover` y puntero fino.      |
| Spotlight de hero    | Gradiente radial con `--mx/--my`; solo opacidad; desactivado en touch.           |
| Enlaces              | Subrayado que crece desde la izquierda.                                          |
| Botones              | Cambio de fondo/borde y desplazamiento de icono; sin scale brusco.               |
| Filtro de proyectos  | Transición de opacidad/transform al ocultar/mostrar.                             |
| Tema                 | Transición de colores de 200 ms, excepto en el primer paint.                     |

### Fallback

- Sin JS: todo el contenido visible; no se oculta nada por defecto.
- Sin soporte de `animation-timeline`: IO añade `.is-visible`.
- Sin soporte de View Transitions: navegación normal; `ClientRouter` usa su fallback.
- Sin `prefers-reduced-motion`: se mantiene el movimiento; con reduce, se elimina.

---

## 7. Accesibilidad visual

- Foco visible de 2 px cobalto con offset de 2 px; en fondos cobalto, foco papel.
- Zonas táctiles mínimas 44×44 px.
- Contraste AA en texto normal y AAA en titulares cuando sea posible.
- No se usa color como único indicador de estado: se añade texto/icono.
- Iconos decorativos con `aria-hidden`; iconos con significado con texto visible o `aria-label`.
- Animaciones respetan `prefers-reduced-motion`.
- El menú móvil y la command palette se pueden cerrar con Escape y devuelven el foco.
- El formulario tiene labels, `autocomplete`, `aria-describedby`, errores asociados y estado `aria-live`.

---

## 8. Responsive

| Breakpoint | Layout                                                                  |
| ---------- | ----------------------------------------------------------------------- |
| 320–479    | 1 columna, hero apilado, tipografía compacta, menú móvil.               |
| 480–767    | 1 columna, cards con más aire, CTAs en fila.                            |
| 768–1023   | 2 columnas en bento, timeline a ancho completo, TOC colapsado.          |
| 1024–1439  | 12 columnas, bento asimétrico, TOC sticky.                              |
| 1440+      | Contenedor máximo 78rem, márgenes generosos, retícula visible.          |
| Ultrawide  | Fondo de retícula extendido; contenido centrado; no se estira el texto. |

- `container-type: inline-size` en cards y bloques de skills.
- `overflow-x: clip` solo como red de seguridad; se corrigen las causas.
- `padding-inline: max(1rem, env(safe-area-inset-left/right))`.
- Header con `padding-top: env(safe-area-inset-top)` en modo standalone.

---

## 9. SEO visual y OG

- OG 1200×630 con la misma retícula: fondo papel/tinta, nombre, rol, título de página/proyecto, acento cobalto y marca “SG”.
- Cada proyecto tiene su OG con título y stack; no se usan capturas sin recortar.
- `twitter:image:alt` descriptivo.
- Favicon: SVG + ICO + apple-touch-icon + manifest.
- Imagen de perfil recortada como “ID card” con marcas de encuadre.

---

## 10. Easter egg

`Ctrl/Cmd + K` abre la command palette. En el footer hay una pista discreta: `⌘K / Ctrl K — ir a cualquier sitio`.

Acciones:

- Ir a Inicio, Proyectos, Sobre mí, Stack, Contacto.
- Abrir cada proyecto.
- Cambiar tema.
- Cambiar idioma.
- Descargar CV.
- Copiar email.

Sin telemetría ni dependencias.

---

## 11. Lo que se evita explícitamente

- Gradientes morados genéricos de plantilla.
- Glassmorphism excesivo.
- Tarjetas todas iguales con radios de 24 px.
- Logos de tecnología sin nombre.
- Barras de progreso inventadas.
- Animaciones de canvas/WebGL que penalicen el rendimiento.
- Texto de relleno, métricas inventadas o testimonios falsos.
- Menús que atrapan el foco o no se cierran con Escape.

---

## 12. Aprobación

Para iniciar la Fase 1 se necesita confirmar:

- [ ] Concepto **Blueprint Editorial**.
- [ ] Paleta y tipografía.
- [ ] Estructura de home con bento.
- [ ] Navegación y command palette.
- [ ] Nivel de motion.
