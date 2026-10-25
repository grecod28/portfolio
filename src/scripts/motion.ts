const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

let revealObserver: IntersectionObserver | undefined;

function initReveal() {
	revealObserver?.disconnect();
	if (reduceMotion.matches || CSS.supports('animation-timeline: view()')) return;

	revealObserver = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					entry.target.classList.add('is-visible');
					revealObserver?.unobserve(entry.target);
				}
			}
		},
		{ rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
	);

	for (const element of document.querySelectorAll<HTMLElement>(
		'.reveal:not([data-reveal-bound])'
	)) {
		element.dataset.revealBound = 'true';
		element.classList.add('reveal-ready');
		revealObserver.observe(element);
	}
}

function initTilt() {
	for (const card of document.querySelectorAll<HTMLElement>('.tilt-card:not([data-tilt-bound])')) {
		card.dataset.tiltBound = 'true';
		let frame = 0;

		card.addEventListener('pointermove', (event) => {
			if (!finePointer.matches || reduceMotion.matches) return;
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(() => {
				const rect = card.getBoundingClientRect();
				const x = (event.clientX - rect.left) / rect.width - 0.5;
				const y = (event.clientY - rect.top) / rect.height - 0.5;
				card.style.setProperty('--rx', `${(-y * 3).toFixed(2)}deg`);
				card.style.setProperty('--ry', `${(x * 3).toFixed(2)}deg`);
			});
		});

		card.addEventListener('pointerleave', () => {
			cancelAnimationFrame(frame);
			card.style.setProperty('--rx', '0deg');
			card.style.setProperty('--ry', '0deg');
		});
	}
}

function initSpotlight() {
	for (const zone of document.querySelectorAll<HTMLElement>(
		'[data-spotlight]:not([data-spotlight-bound])'
	)) {
		zone.dataset.spotlightBound = 'true';
		zone.addEventListener('pointermove', (event) => {
			if (!finePointer.matches || reduceMotion.matches) return;
			const rect = zone.getBoundingClientRect();
			zone.style.setProperty('--mx', `${event.clientX - rect.left}px`);
			zone.style.setProperty('--my', `${event.clientY - rect.top}px`);
		});
	}
}

let progressBound = false;

function initProgress() {
	const bar = document.querySelector<HTMLElement>('[data-scroll-progress]');
	if (!bar) return;
	const update = () => {
		const scrollable = document.documentElement.scrollHeight - window.innerHeight;
		const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
		bar.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
	};
	update();
	if (!progressBound) {
		progressBound = true;
		window.addEventListener('scroll', update, { passive: true });
		window.addEventListener('resize', update, { passive: true });
	}
}

function init() {
	initReveal();
	initTilt();
	initSpotlight();
	initProgress();
}

init();
document.addEventListener('astro:page-load', init);
