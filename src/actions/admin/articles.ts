'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from '@/i18n/routing';
import { auth } from '@/auth';

export async function createArticle(formData: FormData) {
    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
        throw new Error('Unauthorized');
    }

    const title_en = formData.get('title_en')?.toString() || '';
    const title_ar = formData.get('title_ar')?.toString() || '';
    const slug_en = formData.get('slug_en')?.toString() || '';
    const slug_ar = formData.get('slug_ar')?.toString() || '';
    const content_en = formData.get('content_en')?.toString() || '';
    const content_ar = formData.get('content_ar')?.toString() || '';
    const image = formData.get('image')?.toString() || '';
    const meta_title_en = formData.get('meta_title_en')?.toString() || '';
    const meta_title_ar = formData.get('meta_title_ar')?.toString() || '';
    const meta_description_en = formData.get('meta_description_en')?.toString() || '';
    const meta_description_ar = formData.get('meta_description_ar')?.toString() || '';
    const meta_keywords_en = formData.get('meta_keywords_en')?.toString() || '';
    const meta_keywords_ar = formData.get('meta_keywords_ar')?.toString() || '';

    await prisma.article.create({
        data: {
            title_en,
            title_ar,
            slug_en,
            slug_ar,
            content_en,
            content_ar,
            image,
            meta_title_en,
            meta_title_ar,
            meta_description_en,
            meta_description_ar,
            meta_keywords_en,
            meta_keywords_ar,
        },
    });

    revalidatePath('/[locale]/admin/articles', 'page');
    revalidatePath('/[locale]/blog', 'page');
}

export async function updateArticle(id: number, formData: FormData) {
    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
        throw new Error('Unauthorized');
    }

    const title_en = formData.get('title_en')?.toString() || '';
    const title_ar = formData.get('title_ar')?.toString() || '';
    const slug_en = formData.get('slug_en')?.toString() || '';
    const slug_ar = formData.get('slug_ar')?.toString() || '';
    const content_en = formData.get('content_en')?.toString() || '';
    const content_ar = formData.get('content_ar')?.toString() || '';
    const image = formData.get('image')?.toString() || '';
    const meta_title_en = formData.get('meta_title_en')?.toString() || '';
    const meta_title_ar = formData.get('meta_title_ar')?.toString() || '';
    const meta_description_en = formData.get('meta_description_en')?.toString() || '';
    const meta_description_ar = formData.get('meta_description_ar')?.toString() || '';
    const meta_keywords_en = formData.get('meta_keywords_en')?.toString() || '';
    const meta_keywords_ar = formData.get('meta_keywords_ar')?.toString() || '';

    await prisma.article.update({
        where: { id },
        data: {
            title_en,
            title_ar,
            slug_en,
            slug_ar,
            content_en,
            content_ar,
            image,
            meta_title_en,
            meta_title_ar,
            meta_description_en,
            meta_description_ar,
            meta_keywords_en,
            meta_keywords_ar,
        },
    });

    revalidatePath('/[locale]/admin/articles', 'page');
    revalidatePath('/[locale]/blog', 'page');
}

export async function deleteArticle(id: number) {
    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
        throw new Error('Unauthorized');
    }

    await prisma.article.delete({
        where: { id },
    });

    revalidatePath('/[locale]/admin/articles', 'page');
    revalidatePath('/[locale]/blog', 'page');
}
