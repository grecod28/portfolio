import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve } from 'node:path';
import { createGzip } from 'node:zlib';

const root = resolve('dist/client');
const port = Number(process.env.PORT ?? 4321);

const types = {
	'.html': 'text/html; charset=utf-8',
	'.css': 'text/css; charset=utf-8',
	'.js': 'text/javascript; charset=utf-8',
	'.mjs': 'text/javascript; charset=utf-8',
	'.json': 'application/json; charset=utf-8',
	'.xml': 'application/xml; charset=utf-8',
	'.txt': 'text/plain; charset=utf-8',
	'.svg': 'image/svg+xml',
	'.png': 'image/png',
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.webp': 'image/webp',
	'.avif': 'image/avif',
	'.woff2': 'font/woff2',
	'.ico': 'image/x-icon',
	'.pdf': 'application/pdf',
};

const compressible = new Set(['.html', '.css', '.js', '.mjs', '.json', '.xml', '.txt', '.svg']);

function resolveFile(urlPath) {
	const pathname = decodeURIComponent(urlPath.split('?')[0] ?? '/');
	const safe = normalize(pathname).replace(/^(\.\.[/\\])+/, '');
	let file = join(root, safe);
	if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
	if (!existsSync(file) && !extname(file))
		file = join(root, `${safe.replace(/\/$/, '')}/index.html`);
	if (!existsSync(file)) file = join(root, '404.html');
	return file;
}

const server = createServer((request, response) => {
	const file = resolveFile(request.url ?? '/');
	const ext = extname(file);
	const type = types[ext] ?? 'application/octet-stream';
	const cache = file.includes(`${join(root, '_astro')}`)
		? 'public, max-age=31536000, immutable'
		: 'public, max-age=0, must-revalidate';
	const gzip =
		compressible.has(ext) && String(request.headers['accept-encoding'] ?? '').includes('gzip');

	response.setHeader('Content-Type', type);
	response.setHeader('Cache-Control', cache);
	response.setHeader('X-Content-Type-Options', 'nosniff');
	response.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

	if (gzip) {
		response.setHeader('Content-Encoding', 'gzip');
		response.setHeader('Vary', 'Accept-Encoding');
		if (request.method === 'HEAD') {
			response.writeHead(200).end();
			return;
		}
		createReadStream(file).pipe(createGzip()).pipe(response);
		return;
	}

	const size = statSync(file).size;
	response.setHeader('Content-Length', size);
	if (request.method === 'HEAD') {
		response.writeHead(200).end();
		return;
	}
	createReadStream(file).pipe(response);
});

server.listen(port, '127.0.0.1', () => {
	console.log(`Static server listening on http://127.0.0.1:${port}`);
});
