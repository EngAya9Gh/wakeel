import prisma from '@/lib/prisma';
import ArticleForm from '@/components/admin/ArticleForm';
import styles from '@/app/[locale]/admin/admin.module.css';
import { getTranslations, getLocale } from 'next-intl/server';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { notFound } from 'next/navigation';

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const t = await getTranslations('Admin');
    const locale = await getLocale();

    const article = await prisma.article.findUnique({
        where: { id: parseInt(id) },
    });

    if (!article) {
        notFound();
    }

    return (
        <div>
            <div className={styles.header}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Link href="/admin/articles" style={{ color: '#64748B', display: 'flex', alignItems: 'center' }}>
                        {locale === 'ar' ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
                    </Link>
                    <h1 className={styles.headerTitle}>Edit Article</h1>
                </div>
            </div>

            <ArticleForm article={article} isEditing={true} locale={locale} />
        </div>
    );
}
