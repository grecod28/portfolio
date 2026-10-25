module.exports = {
	ci: {
		collect: {
			url: [
				'http://127.0.0.1:4321/es/',
				'http://127.0.0.1:4321/en/',
				'http://127.0.0.1:4321/es/proyectos/',
				'http://127.0.0.1:4321/es/proyectos/umbrachat/',
				'http://127.0.0.1:4321/es/sobre-mi/',
				'http://127.0.0.1:4321/es/tecnologias/',
				'http://127.0.0.1:4321/es/contacto/',
			],
			numberOfRuns: 1,
			startServerCommand: 'pnpm preview:static',
			startServerReadyPattern: 'Static server listening',
			settings: {
				chromeFlags: '--no-sandbox',
			},
		},
		assert: {
			assertions: {
				'categories:performance': ['error', { minScore: 0.95 }],
				'categories:accessibility': ['error', { minScore: 0.95 }],
				'categories:best-practices': ['error', { minScore: 0.95 }],
				'categories:seo': ['error', { minScore: 0.95 }],
				'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
				'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
				'total-blocking-time': ['error', { maxNumericValue: 200 }],
			},
		},
		upload: {
			target: 'filesystem',
			outputDir: '.lighthouseci',
		},
	},
};
