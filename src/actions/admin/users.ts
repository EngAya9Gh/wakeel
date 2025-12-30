'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';
import bcrypt from 'bcryptjs';

async function checkAdmin() {
    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
        throw new Error('Unauthorized');
    }
    return session;
}

export async function createUser(formData: FormData) {
    await checkAdmin();

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const role = formData.get('role') as 'ADMIN' | 'EDITOR';

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            role,
        },
    });

    revalidatePath('/[locale]/admin/users', 'page');
}

export async function updateUser(id: number, formData: FormData) {
    await checkAdmin();

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const role = formData.get('role') as 'ADMIN' | 'EDITOR';

    await prisma.user.update({
        where: { id },
        data: {
            name,
            email,
            role,
        },
    });

    revalidatePath('/[locale]/admin/users', 'page');
}

export async function deleteUser(id: number) {
    const session = await checkAdmin();

    // Prevent self-deletion
    if (session.user?.id && parseInt(session.user.id) === id) {
        throw new Error('Cannot delete your own account');
    }

    await prisma.user.delete({
        where: { id },
    });

    revalidatePath('/[locale]/admin/users', 'page');
}

export async function resetUserPassword(id: number, newPassword: string) {
    await checkAdmin();

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
        where: { id },
        data: {
            password: hashedPassword,
        },
    });

    revalidatePath('/[locale]/admin/users', 'page');
}
