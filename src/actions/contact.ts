'use server';

import { ContactService } from '@/services/ContactService';
import { z } from 'zod';

const schema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Valid email is required'),
    phone: z.string().optional(),
    subject: z.string().optional(),
    message: z.string().min(1, 'Message is required'),
});

export async function submitContactForm(prevState: any, formData: FormData) {
    const contactService = new ContactService();

    const rawData = {
        name: formData.get('name') as string || '',
        email: formData.get('email') as string || '',
        phone: formData.get('phone') as string || '',
        subject: formData.get('subject') as string || '',
        message: formData.get('message') as string || '',
    };

    console.log('Contact form raw data:', rawData);

    const validatedFields = schema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to submit.',
        };
    }

    try {
        const { name, email, subject, message, phone } = validatedFields.data;
        await contactService.submitContactForm(name, email, message, subject, phone);
        return { message: 'success', errors: {} };
    } catch (e) {
        console.error('Failed to save contact submission:', e);
        return { message: 'Database Error: Failed to submit message.', errors: {} };
    }
}
