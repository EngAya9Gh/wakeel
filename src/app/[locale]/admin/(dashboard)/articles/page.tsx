import Link from 'next/link';
import styles from '@/app/[locale]/admin/admin.module.css';
import prisma from '@/lib/prisma';
import { Edit, Plus } from 'lucide-react';
import { getTranslations, getLocale } from 'next-intl/server';
import DeleteArticleButton from '@/components/admin/DeleteArticleButton';

async function getArticles() {
    return prisma.article.findMany({
        orderBy: { updatedAt: 'desc' },
    });
}

export default async function ArticlesPage() {
    const articles = await getArticles();
    const t = await getTranslations('Admin');
    const locale = await getLocale();

    return (
        <div>
            <div className={styles.header}>
                <h1 className={styles.headerTitle}>{t('articles')}</h1>
                <Link href={`/${locale}/admin/articles/new`} className={styles.button} style={{ width: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Plus size={20} />
                    <span>New Article</span>
                </Link>
            </div>

            <div className={styles.glassCard} style={{ background: 'white', padding: 0, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: locale === 'ar' ? 'right' : 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid #E2E8F0', backgroundColor: '#F8FAFC' }}>
                            <th style={{ padding: '1rem', fontWeight: '600', color: '#64748B' }}>Title (EN)</th>
                            <th style={{ padding: '1rem', fontWeight: '600', color: '#64748B' }}>Title (AR)</th>
                            <th style={{ padding: '1rem', fontWeight: '600', color: '#64748B' }}>Date</th>
                            <th style={{ padding: '1rem', fontWeight: '600', color: '#64748B' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {articles.map((article) => (
                            <tr key={article.id} style={{ borderBottom: '1px solid #E2E8F0' }}>
                                <td style={{ padding: '1rem', fontWeight: '500' }}>{article.title_en}</td>
                                <td style={{ padding: '1rem', fontWeight: '500' }}>{article.title_ar}</td>
                                <td style={{ padding: '1rem', color: '#64748B' }}>
                                    {new Date(article.publishedAt).toLocaleDateString(locale)}
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <Link href={`/${locale}/admin/articles/${article.id}`} style={{ padding: '0.5rem', borderRadius: '8px', backgroundColor: '#F1F5F9', color: '#475569' }}>
                                            <Edit size={18} />
                                        </Link>
                                        <DeleteArticleButton id={article.id} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {articles.length === 0 && (
                            <tr>
                                <td colSpan={4} style={{ padding: '2rem', textAlign: 'center', color: '#64748B' }}>
                                    No articles found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
