import ArticleForm from '@/components/admin/ArticleForm';
import styles from '@/app/[locale]/admin/admin.module.css';
import { getTranslations, getLocale } from 'next-intl/server';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from '@/i18n/routing';

export default async function NewArticlePage() {
    const t = await getTranslations('Admin');
    const locale = await getLocale();

    return (
        <div>
            <div className={styles.header}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Link href="/admin/articles" style={{ color: '#64748B', display: 'flex', alignItems: 'center' }}>
                        {locale === 'ar' ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
                    </Link>
                    <h1 className={styles.headerTitle}>Create New Article</h1>
                </div>
            </div>

            <ArticleForm locale={locale} />
        </div>
    );
}
