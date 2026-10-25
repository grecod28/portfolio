---
title:
  es: K2 Studio
  en: K2 Studio
tagline:
  es: Web estática para una agencia de marketing, desplegada en AWS con CI/CD.
  en: Static website for a marketing agency, deployed on AWS with CI/CD.
featured: true
order: 3
cover: k2
coverAlt:
  es: Captura de la web de K2 Studio
  en: Screenshot of the K2 Studio website
stack:
  - Astro
  - TypeScript
  - Tailwind CSS
  - AWS
  - GitHub Actions
links:
  - kind: web
    url: https://studiok2.es
    label:
      es: Sitio web
      en: Website
  - kind: repo
    url: https://github.com/grecod28/k2
    label:
      es: Repositorio
      en: Repository
problem:
  es: La agencia necesitaba una web rápida, fácil de mantener y sin costes de servidor continuos. El contenido tenía que actualizarse con cada campaña sin depender de un equipo técnico.
  en: The agency needed a fast, low-maintenance site without ongoing server costs. Content had to be updated for every campaign without depending on a technical team.
decisions:
  es:
    - 'Astro genera un sitio totalmente estático: HTML y CSS, sin servidor que mantener.'
    - 'Despliegue en AWS S3 + CloudFront para servir el contenido desde una CDN con HTTPS.'
    - 'GitHub Actions publica automáticamente cada cambio de la rama principal.'
  en:
    - 'Astro generates a fully static site: HTML and CSS, no server to maintain.'
    - 'Deployed on AWS S3 + CloudFront to serve content from a CDN with HTTPS.'
    - 'GitHub Actions automatically publishes every change on the main branch.'
result:
  es: Trabajo real para cliente, en producción en studiok2.es.
  en: Real client work, live at studiok2.es.
metrics: []
technicalNotes:
  es: []
  en: []
architecturePending: false
---
