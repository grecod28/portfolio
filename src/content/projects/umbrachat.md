---
title:
  es: UmbraChat
  en: UmbraChat
tagline:
  es: Plataforma de mensajería en tiempo real con anonimato de usuario e historial de mensajes que caduca.
  en: Real-time messaging platform with user anonymity and expiring message history.
featured: true
order: 1
cover: umbrachat
coverAlt:
  es: Captura de la interfaz de UmbraChat
  en: Screenshot of the UmbraChat interface
stack:
  - Next.js
  - React
  - NestJS
  - WebSockets
  - PostgreSQL
  - Prisma
  - Docker
  - AWS
  - Nginx
  - TypeScript
  - Tailwind CSS
links:
  - kind: demo
    url: https://umbrachat.org
    label:
      es: Demo
      en: Live demo
  - kind: repo
    url: https://github.com/grecod28/umbrachat
    label:
      es: Repositorio
      en: Repository
problem:
  es: 'Quería construir un servicio de chat en tiempo real donde la identidad no fuera el centro: sin cuentas, con mensajes que desaparecen, y aun así con la experiencia de una plataforma completa — salas públicas y privadas, hilos, presencia y archivos adjuntos.'
  en: 'I wanted a real-time chat service where identity was not the point: no accounts, disappearing messages, but with the feel of a full platform — public and private rooms, threads, presence and file attachments.'
decisions:
  es:
    - 'Jerarquía de hilos: los hilos se modelan como árboles con un único nivel de respuestas y carga perezosa, para no descargar conversaciones enteras de golpe.'
    - 'Consultas sobre historiales grandes: índices y paginación con cursores en PostgreSQL/Prisma para recorrer historiales sin escaneos completos.'
    - 'Presencia y typing sin saturar el WebSocket: eventos de presencia y de escritura de baja frecuencia, con desconexión silenciosa de clientes inactivos.'
    - 'Archivos adjuntos en S3: la subida no pasa por el servidor de la aplicación.'
  en:
    - 'Thread hierarchy: threads are modeled as trees with a single reply level and lazy loading, so full conversations are never downloaded at once.'
    - 'Queries over large histories: indexes and cursor-based pagination in PostgreSQL/Prisma to page through histories without full scans.'
    - 'Presence and typing without saturating the WebSocket: low-frequency presence and typing events, with silent disconnection of idle clients.'
    - 'Attachments on S3: uploads do not go through the application server.'
result:
  es: El servicio está desplegado en AWS y disponible públicamente en umbrachat.org.
  en: The service runs on AWS and is publicly available at umbrachat.org.
metrics:
  - 'TODO: nº de usuarios únicos'
  - 'TODO: latencia media de envío de mensajes'
  - 'TODO: volumen de mensajes por día'
technicalNotes:
  es:
    - 'TODO: documentar cómo se modelan salas y mensajes en PostgreSQL (esquema e índices clave).'
    - 'TODO: describir la política de retención/caducidad de mensajes.'
    - 'TODO: explicar cómo se despliega el gateway WebSocket y cómo se gestionarían varias instancias.'
  en:
    - 'TODO: document how rooms and messages are modeled in PostgreSQL (schema and key indexes).'
    - 'TODO: describe the message retention/expiry policy.'
    - 'TODO: explain how the WebSocket gateway is deployed and how multiple instances would be handled.'
architecturePending: true
---
