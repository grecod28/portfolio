# TODO — Datos pendientes de completar

Lista de todo lo que Santiago Greco debe completar o confirmar. Cada marcador
`TODO` del código está referenciado aquí con su ubicación.

## 1. Experiencia profesional

| Archivo | Qué falta |
| --- | --- |
| `src/content/experience/knowmeet-tech.md` | `period` (fechas reales) y `highlights` (logros reales, en ES y EN) |
| `src/content/experience/dltcode.md` | `period` (fechas reales) y `highlights` (logros reales, en ES y EN) |

## 2. Proyecto Referigo (`src/content/projects/referigo.md`)

- `problem`: describir el problema que resuelve (ES y EN).
- `result`: describir el resultado (estado actual, usuarios, métricas).
- `cover`: añadir captura a `src/assets/images/projects/referigo.png`, poner
  `cover: referigo` en el frontmatter y copiarla también a
  `public/images/projects/referigo.png` (se usa como imagen Open Graph).
- `links`: añadir enlace a demo/repositorio si existe.

## 3. Proyecto UmbraChat (`src/content/projects/umbrachat.md`)

- `metrics`: usuarios únicos, latencia media de envío, volumen de mensajes/día
  (quitar los marcadores TODO cuando haya datos reales).
- `technicalNotes`: documentar las decisiones técnicas pendientes
  (modelo de salas y mensajes, política de caducidad, despliegue del gateway
  WebSocket).
- Diagrama de arquitectura: `architecturePending: true` muestra un hueco en la
  ficha. Cuando exista el diagrama, añadirlo (p. ej. como captura) y poner el
  campo a `false`.

## 4. CV

- `public/cv/santiago-greco-cv.pdf` es un placeholder generado. Sustituirlo por
  el CV real con el mismo nombre de archivo.

## 5. Dominio y SEO

- `site` en `astro.config.mjs` y `SITE.url` en `src/config.ts` apuntan a
  `https://grecodev.vercel.app`. Si el sitio se despliega en otro dominio,
  actualizar ambos.
- `public/robots.txt` referencia el sitemap con ese dominio; actualizar si cambia.
- Imágenes Open Graph en `public/og/*.png`: generadas con el dominio
  `grecodev.vercel.app`. Si cambia el dominio, regenerarlas (ver README).

## 6. Assets sin usar

- `src/assets/images/projects/devfolio.png`: captura sin asignar a ningún
  proyecto. Decidir si corresponde a Referigo, a otro proyecto o se elimina.
- `src/assets/images/*.svg`: logos de tecnologías (svgrepo) que de momento no se
  usan porque las fichas usan chips de texto. Disponibles si se quiere añadir
  iconos más adelante.

## 7. Mejoras opcionales

- Formulario de contacto: actualmente usa `mailto`. Si se quiere un backend,
  conectar un servicio tipo Formspree.
- Filtro de proyectos: implementado en TypeScript vanilla. Si se prefiere una
  isla de React, sustituir `src/components/pages/Projects.astro`.
