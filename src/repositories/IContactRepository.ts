import { ContactSubmission } from '@prisma/client';

export interface IContactRepository {
    create(data: Omit<ContactSubmission, 'id' | 'createdAt'>): Promise<ContactSubmission>;
    findAll(): Promise<ContactSubmission[]>;
}
