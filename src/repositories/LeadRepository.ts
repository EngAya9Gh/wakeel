import { PrismaClient, Lead } from '@prisma/client';
import { ILeadRepository } from './ILeadRepository';
import prisma from '@/lib/prisma';

export class LeadRepository implements ILeadRepository {
    constructor(private db: PrismaClient = prisma) { }

    async create(data: Omit<Lead, 'id' | 'createdAt'>): Promise<Lead> {
        return this.db.lead.create({
            data,
        });
    }

    async findAll(): Promise<Lead[]> {
        return this.db.lead.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
}
