import { User } from '@prisma/client';
import { IUserRepository } from './IUserRepository';
import prisma from '@/lib/prisma';

export class UserRepository implements IUserRepository {
    async findByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({
            where: { email },
        });
    }

    async create(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
        return prisma.user.create({
            data,
        });
    }
}
