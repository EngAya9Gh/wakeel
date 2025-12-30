import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import PageHeader from '@/components/layout/PageHeader';
import Reveal from '@/components/ui/Reveal';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Services' });
    return {
        title: `${t('title')} | WakeeL Technologies`,
        description: t('subtitle'),
    };
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Services' });

    const services = [
        { key: 'webDev', icon: '💻', image: '/hero.png' },
        { key: 'mobile', icon: '📱', image: '/mobile-app.png' },
        { key: 'ai', icon: '🤖', image: '/ai-service.png' },
        { key: 'marketing', icon: '📈', image: '/marketing.png' },
    ];

    return (
        <main style={{ background: '#FFFFFF' }}>
            <PageHeader title={t('title')} subtitle={t('subtitle')} />

            {/* In-depth Services - Ultra Professional with Real Assets */}
            <section style={{ padding: '140px 0' }}>
                <div className="container">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '140px' }}>
                        {services.map((s, i) => (
                            <Reveal key={s.key}>
                                <div className="services-detail-grid" style={{
                                    alignItems: 'center'
                                }}>
                                    {/* Text Content */}
                                    <div style={{ order: i % 2 === 0 ? 1 : 2 }}>
                                        <h2 style={{
                                            fontSize: 'clamp(2.5rem, 6vw, 3.5rem)',
                                            fontWeight: '950',
                                            color: 'var(--color-secondary)',
                                            marginBottom: '32px',
                                            letterSpacing: '-2px',
                                            lineHeight: 1.1
                                        }}>
                                            {t(s.key as any)}
                                        </h2>
                                        <p style={{
                                            fontSize: '1.3rem',
                                            lineHeight: '1.7',
                                            color: 'var(--text-muted)',
                                            marginBottom: '40px',
                                            fontWeight: '500'
                                        }}>
                                            {t(`${s.key}Desc` as any)}
                                        </p>
                                        <div style={{
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                                            gap: '24px'
                                        }}>
                                            {[
                                                { t: t('performance'), d: t('performanceDesc') },
                                                { t: t('scalability'), d: t('scalabilityDesc') },
                                                { t: t('security'), d: t('securityDesc') },
                                                { t: t('support'), d: t('supportDesc') }
                                            ].map((item, idx) => (
                                                <div key={idx} style={{ display: 'flex', gap: '16px' }}>
                                                    <div style={{ color: 'var(--color-primary)', fontSize: '1.4rem', fontWeight: '900' }}>✓</div>
                                                    <div>
                                                        <h4 style={{ fontWeight: '800', color: 'var(--color-secondary)' }}>{item.t}</h4>
                                                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{item.d}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Visual Side - Sharp Professional Images */}
                                    <div style={{
                                        order: i % 2 === 0 ? 2 : 1,
                                        position: 'relative',
                                        borderRadius: '56px',
                                        overflow: 'hidden',
                                        boxShadow: '0 50px 100px -20px rgba(0,0,0,0.15)',
                                        aspectRatio: '16/11'
                                    }}>
                                        <Image
                                            src={s.image}
                                            alt={`${t(s.key as any)} - WakeeL Technologies`}
                                            fill
                                            style={{ objectFit: 'cover' }}
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            priority={i === 0}
                                            quality={85}
                                        />
                                        {/* Overlay for depth */}
                                        <div style={{
                                            position: 'absolute',
                                            inset: 0,
                                            background: 'linear-gradient(to top, rgba(15,23,42,0.2), transparent)'
                                        }}></div>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Premium CTA */}
            <section style={{ padding: '160px 0', borderTop: '1px solid #F1F5F9', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ fontSize: 'clamp(2.8rem, 6vw, 4.5rem)', fontWeight: '950', marginBottom: '32px', letterSpacing: '-3px' }}>
                        {t('ctaTitle')}
                    </h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.5rem', marginBottom: '64px', maxWidth: '750px', marginInline: 'auto', fontWeight: '500' }}>
                        {t('ctaSubtitle')}
                    </p>
                    <Link href="/contact" className="btn-primary" style={{ padding: '24px 72px', fontSize: '1.4rem', borderRadius: '20px' }}>
                        {t('ctaButton')}
                    </Link>
                </div>
            </section>
        </main>
    );
}
