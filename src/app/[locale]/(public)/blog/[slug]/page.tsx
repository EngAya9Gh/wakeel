import { ArticleService } from '@/services/ArticleService';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';

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
    // Await params before accessing properties
    const { slug, locale } = await params;

    const articleService = new ArticleService();
    const article = await articleService.getArticleBySlug(slug, locale);

    if (!article) {
        notFound();
    }

    const title = locale === 'ar' ? (article.title_ar || article.title_en) : article.title_en;
    const content = locale === 'ar' ? (article.content_ar || article.content_en) : article.content_en;

    return (
        <main style={{ background: '#F8FAFC', minHeight: '100vh', paddingBottom: '160px', paddingTop: '120px' }}>
            <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                <article style={{
                    background: 'white',
                    padding: '80px 60px',
                    borderRadius: '40px',
                    boxShadow: '0 50px 100px -20px rgba(0,0,0,0.05)',
                    maxWidth: '1000px',
                    margin: '0 auto',
                    border: '1px solid #F1F5F9'
                }}>
                    <header style={{ marginBottom: '60px' }}>
                        <div style={{
                            background: 'rgba(15, 23, 42, 0.05)',
                            color: 'var(--color-primary)',
                            padding: '8px 16px',
                            borderRadius: '10px',
                            fontSize: '0.9rem',
                            fontWeight: '800',
                            display: 'inline-block',
                            textTransform: 'uppercase',
                            marginBottom: '24px'
                        }}>
                            {locale === 'ar' ? 'رؤى تكنولوجية' : 'Technology Insights'}
                        </div>
                        <h1 style={{
                            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                            color: 'var(--color-secondary)',
                            fontWeight: 950,
                            lineHeight: 1.2,
                            letterSpacing: '-1px',
                            marginBottom: '32px'
                        }}>
                            {title}
                        </h1>

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '24px',
                            paddingBottom: '32px',
                            borderBottom: '1px solid #F1F5F9'
                        }}>
                            <div style={{
                                width: '56px',
                                height: '56px',
                                background: 'var(--color-silver-light)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.4rem'
                            }}>
                                👤
                            </div>
                            <div>
                                <span style={{ display: 'block', fontWeight: 800, color: 'var(--color-secondary)', fontSize: '1.1rem' }}>WakeeL Editorial Team</span>
                                <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: 500 }}>
                                    {new Date(article.publishedAt).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </span>
                            </div>
                        </div>
                    </header>

                    {article.image && (
                        <div style={{
                            marginBottom: '60px',
                            borderRadius: '24px',
                            overflow: 'hidden',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                            position: 'relative',
                            width: '100%',
                            maxHeight: '500px' // Limit height to avoid stretching
                        }}>
                            <Image
                                src={article.image}
                                alt={title}
                                width={1200}
                                height={675}
                                priority
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    maxHeight: '500px',
                                    objectFit: 'cover',
                                    display: 'block'
                                }}
                            />
                        </div>
                    )}

                    <div style={{
                        lineHeight: '2',
                        fontSize: '1.25rem',
                        color: 'var(--color-secondary)',
                        whiteSpace: 'pre-wrap',
                        fontWeight: 500
                    }} className="article-content">
                        {content}
                    </div>
                </article>
            </div>
        </main>
    );
}
