import { Lead } from '@prisma/client';

export interface ILeadRepository {
    create(data: Omit<Lead, 'id' | 'createdAt'>): Promise<Lead>;
    findAll(): Promise<Lead[]>;
}
