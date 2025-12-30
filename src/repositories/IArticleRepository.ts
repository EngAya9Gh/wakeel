import { Article } from '@prisma/client';

export interface IArticleRepository {
    create(data: Omit<Article, 'id' | 'createdAt' | 'updatedAt'>): Promise<Article>;
    findBySlug(slug: string, locale: string): Promise<Article | null>;
    findAll(): Promise<Article[]>;
}

