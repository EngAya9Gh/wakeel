import { Link } from '@/i18n/routing';
import { ArticleService } from '@/services/ArticleService';
import PageHeader from '@/components/layout/PageHeader';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Navigation' });
    return {
        title: `${t('blog')} | WakeeL Technologies`,
        description: locale === 'ar' ? 'اكتشف أحدث المقالات والأفكار في عالم التكنولوجيا.' : 'Explore our latest articles and insights on technology.',
    };
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const articleService = new ArticleService();
    const articles = await articleService.getAllArticles();

    return (
        <main style={{ paddingBottom: '160px' }}>
            <PageHeader
                title={locale === 'ar' ? 'المدونة ' : 'Blogs'}
                subtitle={locale === 'ar' ? 'اكتشف أحدث المقالات والأفكار في عالم التكنولوجيا والتحول الرقمي.' : 'Explore our latest articles and insights on technology and digital transformation.'}
            />

            <div className="container" style={{ marginTop: '100px' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                    gap: '40px'
                }}>
                    {articles.map((article, index) => {
                        const title = locale === 'ar' ? (article.title_ar || article.title_en) : article.title_en;
                        const content = locale === 'ar' ? (article.content_ar || article.content_en) : article.content_en;
                        const slug = locale === 'ar' ? article.slug_ar : article.slug_en;
                        const excerpt = content.substring(0, 150) + '...';

                        // Logic for choosing a relevant thumbnail 
                        let thumbnail = article.image || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800';

                        if (!article.image) {
                            if (title.toLowerCase().includes('seo') || title.includes('سيو')) thumbnail = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800';
                            if (title.toLowerCase().includes('digital') || title.includes('رقمي')) thumbnail = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800';
                        }

                        return (
                            <Link href={`/blog/${slug}`} key={article.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s`, textDecoration: 'none' }}>
                                <article className="glass-card" style={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    background: 'white',
                                    borderRadius: '32px',
                                    overflow: 'hidden',
                                    border: '1px solid #F1F5F9',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                                }}>
                                    {/* Article Image */}
                                    <div style={{ position: 'relative', height: '260px', width: '100%', overflow: 'hidden' }}>
                                        <img
                                            src={thumbnail}
                                            alt={title}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                transition: 'transform 0.5s ease'
                                            }}
                                            className="blog-card-image"
                                        />
                                        <div style={{
                                            position: 'absolute',
                                            top: '20px',
                                            left: locale === 'en' ? '20px' : 'auto',
                                            right: locale === 'ar' ? '20px' : 'auto',
                                            background: 'var(--color-primary)',
                                            color: 'white',
                                            padding: '6px 14px',
                                            borderRadius: '10px',
                                            fontSize: '0.8rem',
                                            fontWeight: '800',
                                            textTransform: 'uppercase'
                                        }}>
                                            AI & Tech
                                        </div>
                                    </div>

                                    <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                        <h2 style={{
                                            marginBottom: '20px',
                                            fontSize: '1.6rem',
                                            color: 'var(--color-secondary)',
                                            fontWeight: 900,
                                            lineHeight: 1.2,
                                            letterSpacing: '-0.5px'
                                        }}>
                                            {title}
                                        </h2>
                                        <p style={{
                                            color: 'var(--text-muted)',
                                            lineHeight: '1.8',
                                            flex: 1,
                                            fontSize: '1.05rem',
                                            fontWeight: 500,
                                            marginBottom: '32px'
                                        }}>
                                            {excerpt}
                                        </p>
                                        <div style={{
                                            color: 'var(--color-primary)',
                                            fontWeight: '800',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px',
                                            fontSize: '1.1rem'
                                        }}>
                                            {locale === 'ar' ? 'اقرأ المزيد' : 'Read Full Story'}
                                            <span style={{ fontSize: '1.4rem' }}>{locale === 'en' ? '→' : '←'}</span>
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </main>
    );
}
