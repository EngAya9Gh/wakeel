import { Article } from '@prisma/client';
import { IArticleRepository } from '@/repositories/IArticleRepository';
import { ArticleRepository } from '@/repositories/ArticleRepository';

export class ArticleService {
    private articleRepository: IArticleRepository;

    constructor(articleRepository: IArticleRepository = new ArticleRepository()) {
        this.articleRepository = articleRepository;
    }

    async createArticle(data: Omit<Article, 'id' | 'createdAt' | 'updatedAt'>): Promise<Article> {
        return this.articleRepository.create(data);
    }

    async getArticleBySlug(slug: string, locale: string): Promise<Article | null> {
        return this.articleRepository.findBySlug(slug, locale);
    }

    async getAllArticles(): Promise<Article[]> {
        return this.articleRepository.findAll();
    }
}
