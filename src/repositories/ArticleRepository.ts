import { PrismaClient, Article } from '@prisma/client';
import { IArticleRepository } from './IArticleRepository';
import prisma from '@/lib/prisma';

export class ArticleRepository implements IArticleRepository {
    constructor(private db: PrismaClient = prisma) { }

    async create(data: Omit<Article, 'id' | 'createdAt' | 'updatedAt'>): Promise<Article> {
        return this.db.article.create({
            data,
        });
    }

    async findBySlug(slug: string, locale: string): Promise<Article | null> {
        const decodedSlug = decodeURIComponent(slug);
        // Search in both fields to handle language switching or manual URL edits gracefully
        return this.db.article.findFirst({
            where: {
                OR: [
                    { slug_en: decodedSlug },
                    { slug_ar: decodedSlug }
                ]
            }
        });
    }

    async findAll(): Promise<Article[]> {
        return this.db.article.findMany({
            orderBy: { publishedAt: 'desc' },
        });
    }
}
