import { describe, expect, it, vi } from 'vitest';
import {
	ContactServiceError,
	contactSchema,
	sendContact,
	type ContactInput,
} from '../../src/actions/contact';

const validInput: ContactInput = {
	name: 'Santiago',
	email: 'santiago@example.com',
	message: 'Hola, me interesa hablar de un proyecto.',
	locale: 'es',
	website: '',
};

describe('contact schema', () => {
	it('accepts valid input', () => {
		expect(contactSchema.parse(validInput)).toMatchObject(validInput);
	});

	it('rejects invalid email and short messages', () => {
		const result = contactSchema.safeParse({
			...validInput,
			email: 'no-es-email',
			message: 'corto',
		});
		expect(result.success).toBe(false);
	});

	it('defaults locale and honeypot', () => {
		const parsed = contactSchema.parse({
			name: 'Santiago',
			email: 'santiago@example.com',
			message: 'Mensaje suficientemente largo para pasar.',
		});
		expect(parsed.locale).toBe('es');
		expect(parsed.website).toBe('');
	});
});

describe('sendContact', () => {
	it('posts the payload to the webhook', async () => {
		const fetchImpl = vi.fn().mockResolvedValue(new Response('', { status: 200 }));
		await expect(
			sendContact(validInput, {
				webhookUrl: 'https://example.com/hook',
				fetchImpl: fetchImpl as unknown as typeof fetch,
			})
		).resolves.toEqual({ ok: true });

		expect(fetchImpl).toHaveBeenCalledOnce();
		const [, init] = fetchImpl.mock.calls[0] as [string, RequestInit];
		const body = JSON.parse(String(init.body));
		expect(body).toMatchObject({
			name: 'Santiago',
			email: 'santiago@example.com',
			locale: 'es',
			source: 'portfolio',
		});
	});

	it('returns success silently for honeypot submissions', async () => {
		const fetchImpl = vi.fn();
		await expect(
			sendContact(
				{ ...validInput, website: 'spam' },
				{ webhookUrl: 'https://example.com/hook', fetchImpl: fetchImpl as unknown as typeof fetch }
			)
		).resolves.toEqual({ ok: true });
		expect(fetchImpl).not.toHaveBeenCalled();
	});

	it('throws SERVICE_UNAVAILABLE without a webhook', async () => {
		await expect(sendContact(validInput)).rejects.toMatchObject({
			code: 'SERVICE_UNAVAILABLE',
		});
	});

	it('throws BAD_GATEWAY when the webhook fails', async () => {
		const fetchImpl = vi.fn().mockResolvedValue(new Response('', { status: 500 }));
		await expect(
			sendContact(validInput, {
				webhookUrl: 'https://example.com/hook',
				fetchImpl: fetchImpl as unknown as typeof fetch,
			})
		).rejects.toBeInstanceOf(ContactServiceError);
	});

	it('throws GATEWAY_TIMEOUT on timeout', async () => {
		const fetchImpl = vi
			.fn()
			.mockRejectedValue(new DOMException('The operation timed out', 'TimeoutError'));
		await expect(
			sendContact(validInput, {
				webhookUrl: 'https://example.com/hook',
				fetchImpl: fetchImpl as unknown as typeof fetch,
			})
		).rejects.toMatchObject({ code: 'GATEWAY_TIMEOUT' });
	});
});
