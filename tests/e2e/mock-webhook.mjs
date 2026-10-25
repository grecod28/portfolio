import { createServer } from 'node:http';

const port = Number(process.env.MOCK_WEBHOOK_PORT ?? 4322);

const server = createServer((request, response) => {
	if (request.method !== 'POST') {
		response.writeHead(404).end();
		return;
	}

	let body = '';
	request.on('data', (chunk) => {
		body += chunk;
	});

	request.on('end', () => {
		let data;
		try {
			data = JSON.parse(body);
		} catch {
			response.writeHead(400, { 'Content-Type': 'application/json' });
			response.end(JSON.stringify({ error: 'invalid json' }));
			return;
		}

		if (String(data?.email ?? '').startsWith('fail@')) {
			response.writeHead(500, { 'Content-Type': 'application/json' });
			response.end(JSON.stringify({ error: 'simulated failure' }));
			return;
		}

		response.writeHead(200, { 'Content-Type': 'application/json' });
		response.end(JSON.stringify({ ok: true }));
	});
});

server.listen(port, '127.0.0.1', () => {
	console.log(`Mock webhook listening on http://127.0.0.1:${port}/contact`);
});
