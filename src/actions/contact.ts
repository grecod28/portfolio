import { z } from 'astro/zod';

export const contactSchema = z.object({
	name: z.string().trim().min(1).max(80),
	email: z.email().max(200),
	message: z.string().trim().min(10).max(5000),
	locale: z.enum(['es', 'en']).default('es'),
	// Honeypot: debe quedar vacío. Los formularios envían "" como null.
	website: z.preprocess((value) => (typeof value === 'string' ? value : ''), z.string()),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactErrorCode = 'SERVICE_UNAVAILABLE' | 'BAD_GATEWAY' | 'GATEWAY_TIMEOUT';

export class ContactServiceError extends Error {
	constructor(
		public readonly code: ContactErrorCode,
		message: string
	) {
		super(message);
		this.name = 'ContactServiceError';
	}
}

interface SendContactOptions {
	webhookUrl?: string;
	fetchImpl?: typeof fetch;
}

export interface ContactResult {
	ok: true;
}

export async function sendContact(
	input: ContactInput,
	{ webhookUrl, fetchImpl = fetch }: SendContactOptions = {}
): Promise<ContactResult> {
	// Honeypot: respondemos como si se hubiera enviado, sin reenviar nada.
	if (input.website) return { ok: true };

	if (!webhookUrl) {
		throw new ContactServiceError('SERVICE_UNAVAILABLE', 'Contact webhook is not configured.');
	}

	let response: Response;
	try {
		response = await fetchImpl(webhookUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify({
				name: input.name,
				email: input.email,
				message: input.message,
				locale: input.locale,
				source: 'portfolio',
				submittedAt: new Date().toISOString(),
			}),
			signal: AbortSignal.timeout(10_000),
		});
	} catch (error) {
		if (error instanceof DOMException && error.name === 'TimeoutError') {
			throw new ContactServiceError('GATEWAY_TIMEOUT', 'The contact webhook timed out.');
		}
		throw new ContactServiceError('BAD_GATEWAY', 'The contact webhook could not be reached.');
	}

	if (!response.ok) {
		throw new ContactServiceError('BAD_GATEWAY', 'The contact webhook rejected the message.');
	}

	return { ok: true };
}
