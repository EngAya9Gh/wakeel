'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';

export async function getSettings() {
    // @ts-ignore
    if (!prisma.siteSettings) {
        console.error('Prisma Error: siteSettings model is not available in the Prisma client.');
        return null;
    }
    let settings = await prisma.siteSettings.findFirst({
        where: { id: 1 }
    });

    if (!settings) {
        settings = await prisma.siteSettings.create({
            data: { id: 1 }
        });
    }

    return settings;
}

export async function updateSettings(formData: FormData) {
    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
        throw new Error('Unauthorized');
    }

    const facebook = formData.get('facebook') as string;
    const twitter = formData.get('twitter') as string;
    const instagram = formData.get('instagram') as string;
    const linkedin = formData.get('linkedin') as string;
    const email = formData.get('email') as string;
    const phone_sa = formData.get('phone_sa') as string;
    const phone_sy = formData.get('phone_sy') as string;

    const whatsapp = formData.get('whatsapp') as string;

    await prisma.siteSettings.upsert({
        where: { id: 1 },
        update: {
            facebook,
            twitter,
            instagram,
            linkedin,
            email,
            phone_sa,
            phone_sy,
            whatsapp
        },
        create: {
            id: 1,
            facebook,
            twitter,
            instagram,
            linkedin,
            email,
            phone_sa,
            phone_sy,
            whatsapp
        }
    });

    revalidatePath('/', 'layout');
}
