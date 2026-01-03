import { ArticleService } from '@/services/ArticleService';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import SocialShare from '@/components/ui/SocialShare';
import { getTranslations } from 'next-intl/server';

type Props = {
    params: Promise<{ slug: string, locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug, locale } = await params;
    const articleService = new ArticleService();
    const article = await articleService.getArticleBySlug(slug, locale);

    if (!article) return {};

    const title = locale === 'ar' ? (article.meta_title_ar || article.title_ar) : (article.meta_title_en || article.title_en);
    const description = locale === 'ar' ? article.meta_description_ar : article.meta_description_en;
    const keywords = locale === 'ar' ? article.meta_keywords_ar : article.meta_keywords_en;

    return {
        title: title,
        description: description,
        keywords: keywords,
        openGraph: {
            title: title,
            description: description || undefined,
            images: article.image ? [{ url: article.image }] : [],
        },
    };
}

export default async function ArticlePage({ params }: Props) {
    const { slug, locale } = await params;

    const t = await getTranslations({ locale, namespace: 'Blog' });
    const articleService = new ArticleService();
    const article = await articleService.getArticleBySlug(slug, locale);

    if (!article) {
        notFound();
    }

    // Fetch related articles (excluding the current one)
    const allArticles = await articleService.getAllArticles({ limit: 5 });
    const relatedArticles = allArticles.filter(a => a.id !== article.id).slice(0, 4);

    const title = locale === 'ar' ? (article.title_ar || article.title_en) : article.title_en;
    const content = locale === 'ar' ? (article.content_ar || article.content_en) : article.content_en;

    const currentUrl = `https://wakeel.sa/${locale}/blog/${slug}`;

    return (
        <main style={{ background: '#F8FAFC', minHeight: '100vh', paddingBottom: '160px', paddingTop: '120px' }}>
            <div className="container" style={{ position: 'relative', zIndex: 10, maxWidth: '1400px' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(0, 1fr) 320px',
                    gap: '40px',
                    maxWidth: '100%',
                    margin: '0 auto',
                    alignItems: 'start',
                }} className="blog-details-grid">

                    {/* Main Content */}
                    <article style={{
                        background: 'white',
                        padding: '60px 40px',
                        borderRadius: '32px',
                        boxShadow: '0 30px 60px -12px rgba(0,0,0,0.05)',
                        border: '1px solid #F1F5F9'
                    }}>
                        <header style={{ marginBottom: '40px' }}>
                            <div style={{
                                background: 'rgba(15, 23, 42, 0.05)',
                                color: 'var(--color-primary)',
                                padding: '8px 16px',
                                borderRadius: '10px',
                                fontSize: '0.85rem',
                                fontWeight: '800',
                                display: 'inline-block',
                                textTransform: 'uppercase',
                                marginBottom: '20px'
                            }}>
                                {locale === 'ar' ? 'رؤى تكنولوجية' : 'Technology Insights'}
                            </div>
                            <h1 style={{
                                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                                color: 'var(--color-secondary)',
                                fontWeight: 950,
                                lineHeight: 1.2,
                                letterSpacing: '-0.5px',
                                marginBottom: '24px'
                            }}>
                                {title}
                            </h1>

                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '16px',
                                paddingBottom: '24px',
                                borderBottom: '1px solid #F1F5F9'
                            }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    background: 'var(--color-silver-light)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.2rem'
                                }}>
                                    👤
                                </div>
                                <div>
                                    <span style={{ display: 'block', fontWeight: 800, color: 'var(--color-secondary)', fontSize: '1rem' }}>WakeeL Editorial Team</span>
                                    <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 500 }}>
                                        {new Date(article.publishedAt).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                                    </span>
                                </div>
                            </div>
                        </header>

                        {article.image && (
                            <div style={{
                                marginBottom: '40px',
                                borderRadius: '24px',
                                overflow: 'hidden',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                                position: 'relative',
                                width: '100%',
                            }}>
                                <Image
                                    src={article.image}
                                    alt={title}
                                    width={1200}
                                    height={600}
                                    priority
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        maxHeight: '450px',
                                        objectFit: 'cover',
                                        display: 'block'
                                    }}
                                />
                            </div>
                        )}

                        <div style={{
                            lineHeight: '1.8',
                            fontSize: '1.15rem',
                            color: 'var(--color-secondary)',
                            whiteSpace: 'pre-wrap',
                            fontWeight: 500
                        }} className="article-content">
                            {content}
                        </div>

                        <SocialShare
                            url={currentUrl}
                            title={title}
                            label={t('share')}
                        />
                    </article>

                    {/* Sidebar */}
                    <aside style={{ position: 'sticky', top: '100px' }}>
                        <div style={{
                            background: 'white',
                            padding: '32px',
                            borderRadius: '24px',
                            border: '1px solid #F1F5F9',
                            boxShadow: '0 20px 40px -10px rgba(0,0,0,0.03)'
                        }}>
                            <h3 style={{
                                fontSize: '1.3rem',
                                fontWeight: '900',
                                color: 'var(--color-secondary)',
                                marginBottom: '24px',
                                paddingBottom: '16px',
                                borderBottom: '2px solid var(--color-primary)',
                                display: 'inline-block'
                            }}>
                                {t('related')}
                            </h3>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                {relatedArticles.map((rel) => {
                                    const relTitle = locale === 'ar' ? (rel.title_ar || rel.title_en) : rel.title_en;
                                    const relSlug = locale === 'ar' ? rel.slug_ar : rel.slug_en;
                                    const relThumbnail = rel.image || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=300';

                                    return (
                                        <Link
                                            key={rel.id}
                                            href={`/blog/${relSlug}`}
                                            style={{ textDecoration: 'none', display: 'flex', gap: '16px', alignItems: 'center' }}
                                        >
                                            <div style={{
                                                width: '80px',
                                                height: '80px',
                                                borderRadius: '12px',
                                                overflow: 'hidden',
                                                flexShrink: 0,
                                                background: '#F1F5F9'
                                            }}>
                                                <img src={relThumbnail} alt={relTitle} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            </div>
                                            <h4 style={{
                                                fontSize: '0.95rem',
                                                fontWeight: '700',
                                                color: 'var(--color-secondary)',
                                                lineHeight: '1.4',
                                                margin: 0
                                            }}>
                                                {relTitle}
                                            </h4>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @media (max-width: 992px) {
                    .blog-details-grid {
                        grid-template-columns: 1fr !important;
                    }
                    aside {
                        position: static !important;
                        margin-top: 40px;
                    }
                }
            ` }} />
        </main>
    );
}
