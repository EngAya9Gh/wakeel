import { PrismaClient, ContactSubmission } from '@prisma/client';
import { IContactRepository } from './IContactRepository';
import prisma from '@/lib/prisma';

export class ContactRepository implements IContactRepository {
    constructor(private db: PrismaClient = prisma) { }

    async create(data: Omit<ContactSubmission, 'id' | 'createdAt'>): Promise<ContactSubmission> {
        return this.db.contactSubmission.create({
            data,
        });
    }

    async findAll(): Promise<ContactSubmission[]> {
        return this.db.contactSubmission.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
}
