'use server';

import { LeadService } from '@/services/LeadService';
import { z } from 'zod';

const schema = z.object({
    name: z.string().min(2),
    phone: z.string().min(5),
    countryCode: z.string().default('+966'),
    email: z.string().email().optional().or(z.literal('')),
});

export async function submitLeadForm(prevState: any, formData: FormData) {
    const leadService = new LeadService();

    const rawData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        countryCode: formData.get('countryCode'),
    };

    const validatedFields = schema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Please check your inputs and try again.',
        };
    }

    try {
        const { name, email, phone, countryCode } = validatedFields.data;
        // Workaround for DB unique constraint on email: generate placeholders if empty
        const finalEmail = email || `no-email-${Date.now()}-${Math.random().toString(36).substr(2, 9)}@placeholder.com`;
        const fullPhone = `${countryCode}${phone}`;

        await leadService.createLead(finalEmail, name, fullPhone);
        return { message: 'success' };
    } catch (e) {
        console.error(e);
        return { message: 'Failed to submit. Please try again later.' };
    }
}
