import { getTranslations } from 'next-intl/server';
import PageHeader from '@/components/layout/PageHeader';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'About' });
    return {
        title: `${t('title')} | WakeeL Technologies`,
        description: t('subtitle'),
    };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'About' });

    const values = [
        { key: 'innovation', icon: '💡' },
        { key: 'excellence', icon: '🏆' },
        { key: 'integrity', icon: '🤝' },
        { key: 'partnership', icon: '🤜' }
    ];

    return (
        <main style={{ paddingBottom: '160px' }}>
            <PageHeader title={t('title')} subtitle={t('subtitle')} />

            {/* Story & Mission Section - Overlapping Premium Cards */}
            <section style={{ marginTop: '-80px', position: 'relative', zIndex: 3 }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
                        <div className="animate-fade-in" style={{
                            padding: '80px 50px',
                            background: 'white',
                            borderRadius: '40px',
                            boxShadow: '0 40px 100px -30px rgba(0,0,0,0.1)',
                            border: '1px solid #F1F5F9',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '24px'
                        }}>
                            <div style={{ width: '40px', height: '6px', background: 'var(--color-primary)', borderRadius: '10px' }}></div>
                            <h2 style={{ fontSize: '2.2rem', fontWeight: '900', color: 'var(--color-secondary)', letterSpacing: '-1px' }}>{t('story')}</h2>
                            <p style={{ fontSize: '1.2rem', lineHeight: '1.7', color: 'var(--text-muted)', fontWeight: '500' }}>
                                {t('storyContent')}
                            </p>
                        </div>

                        <div className="animate-fade-in delay-1" style={{
                            padding: '80px 50px',
                            background: 'white',
                            borderRadius: '40px',
                            boxShadow: '0 40px 100px -30px rgba(0,0,0,0.1)',
                            border: '1px solid #F1F5F9',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '24px'
                        }}>
                            <div style={{ width: '40px', height: '6px', background: 'var(--color-primary)', borderRadius: '10px' }}></div>
                            <h2 style={{ fontSize: '2.2rem', fontWeight: '900', color: 'var(--color-secondary)', letterSpacing: '-1px' }}>{t('mission')}</h2>
                            <p style={{ fontSize: '1.2rem', lineHeight: '1.7', color: 'var(--text-muted)', fontWeight: '500' }}>
                                {t('missionText')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section - Redesigned for visual appeal without icons */}
            <section style={{ padding: '140px 0', background: 'white' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                        <h2 style={{
                            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                            fontWeight: '950',
                            marginBottom: '24px',
                            color: 'var(--color-secondary)',
                            letterSpacing: '-2px'
                        }}>{t('values.title')}</h2>
                        <div style={{ width: '60px', height: '6px', background: 'var(--color-primary)', margin: '0 auto', borderRadius: '10px', opacity: 0.3 }}></div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '32px' }}>
                        {values.map((v, i) => (
                            <div key={v.key} className="animate-fade-in" style={{
                                animationDelay: `${i * 0.1}s`,
                                padding: '60px 40px',
                                background: 'white',
                                borderRadius: '32px',
                                border: '1px solid #F1F5F9',
                                transition: 'all 0.4s ease',
                                position: 'relative',
                                overflow: 'hidden'
                            }}>
                                <div style={{
                                    fontSize: '5rem',
                                    position: 'absolute',
                                    top: '-20px',
                                    right: '-10px',
                                    opacity: 0.03,
                                    fontWeight: '950',
                                    color: 'var(--color-secondary)',
                                    pointerEvents: 'none'
                                }}>
                                    0{i + 1}
                                </div>
                                <h3 style={{
                                    fontSize: '1.6rem',
                                    fontWeight: '900',
                                    marginBottom: '20px',
                                    color: 'var(--color-secondary)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px'
                                }}>
                                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-primary)' }}></span>
                                    {t(`values.${v.key}` as any)}
                                </h3>
                                <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '1.1rem', fontWeight: '500' }}>{t(`values.${v.key}Desc` as any)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Experts Section - Minimalist & Clean */}

            {/* <section style={{ background: '#F8FAFC', padding: '160px 0' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <h2 style={{
                        fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                        fontWeight: '950',
                        marginBottom: '100px',
                        color: 'var(--color-secondary)',
                        letterSpacing: '-2px'
                    }}>{t('team')}</h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '60px' }}>
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                                <div style={{
                                    width: '240px',
                                    height: '240px',
                                    borderRadius: '56px',
                                    background: 'white',
                                    margin: '0 auto 40px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '5rem',
                                    color: '#E2E8F0',
                                    boxShadow: '0 30px 60px -20px rgba(0,0,0,0.05)',
                                    border: '1px solid #F1F5F9'
                                }}>
                                    👤
                                </div>
                                <h3 style={{ fontSize: '1.8rem', fontWeight: '900', marginBottom: '12px', color: 'var(--color-secondary)' }}>Expert Consultant</h3>
                                <p style={{
                                    color: 'var(--color-primary)',
                                    fontWeight: '800',
                                    textTransform: 'uppercase',
                                    fontSize: '1rem',
                                    letterSpacing: '2px'
                                }}>Core Engineering Team</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
           */}


        </main>
    );
}

