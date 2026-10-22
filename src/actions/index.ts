import { ActionError, defineAction } from 'astro:actions';
import { CONTACT_WEBHOOK_URL } from 'astro:env/server';
import { ContactServiceError, contactSchema, sendContact } from './contact';

export const server = {
	contact: defineAction({
		accept: 'form',
		input: contactSchema,
		handler: async (input) => {
			try {
				return await sendContact(input, { webhookUrl: CONTACT_WEBHOOK_URL });
			} catch (error) {
				if (error instanceof ContactServiceError) {
					throw new ActionError({ code: error.code, message: error.message });
				}
				throw error;
			}
		},
	}),
};
