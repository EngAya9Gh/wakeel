import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import Reveal from '@/components/ui/Reveal';
import { QrCode } from 'lucide-react';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'HomePage' });
    const statsT = await getTranslations({ locale, namespace: 'Stats' });
    const servicesT = await getTranslations({ locale, namespace: 'Services' });
    const testT = await getTranslations({ locale, namespace: 'Testimonials' });
    const ctaT = await getTranslations({ locale, namespace: 'HomeCTA' });

    const services = [
        { key: 'crm', icon: '💼', color: '#0EA5E9', image: '/crm/crm_image.jpeg' },
        { key: 'whatsappOtp', icon: '💬', color: '#10B981', image: '/mobile-app.png' }
    ];
    const stats = [
        { val: '99.9%', label: statsT('uptime') },
        { val: '< 1s', label: statsT('speed') },
        { val: '100%', label: statsT('customization') },
        { val: '24/7', label: statsT('support') }
    ];

    const isRtl = locale === 'ar';

    return (
        <main>
            {/* Hero Section - Immersive Full-Width Design */}
            <section style={{
                height: '100vh',
                width: '100%',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                color: 'white',
                background: 'var(--color-secondary)',
                padding: 0
            }}>
                {/* Background Image with Dark Overlay */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 0
                }}>
                    <Image
                        src="/hero.png"
                        alt="Digital Transformation"
                        fill
                        style={{ objectFit: 'cover', opacity: 0.5 }}
                        priority
                        sizes="100vw"
                    />
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'radial-gradient(circle at center, transparent 0%, rgba(16, 15, 15, 0.85) 100%)'
                    }}></div>
                </div>

                <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
                    <div className="animate-fade-in">
                        <div style={{
                            display: 'inline-block',
                            padding: '10px 24px',
                            background: 'rgba(255, 102, 0, 0.1)',
                            border: '1px solid var(--color-primary)',
                            borderRadius: '100px',
                            color: 'var(--color-primary)',
                            fontWeight: '800',
                            fontSize: '0.9rem',
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                            marginBottom: '32px'
                        }}>
                            {t('getStarted')}
                        </div>

                        <h1 style={{
                            fontSize: 'clamp(2rem, 6vw, 4.5rem)',
                            lineHeight: 1.3,
                            fontWeight: '950',
                            letterSpacing: '-2px',
                            marginBottom: '32px',
                            color: 'white'
                        }}>
                            {t('title').split(' ').map((word, i) => (
                                <span key={i} style={{ display: 'inline-block', marginInlineEnd: '14px', marginBottom: '10px' }}>
                                    {i === 1 ? <span style={{ color: 'var(--color-primary)' }}>{word}</span> : word}
                                </span>
                            ))}
                        </h1>

                        <p style={{
                            fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
                            lineHeight: 1.4,
                            marginBottom: '56px',
                            maxWidth: '850px',
                            marginInline: 'auto',
                            fontWeight: '500',
                            opacity: 0.9
                        }}>
                            {t('subtitle')}
                        </p>

                        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link href="/contact" className="btn-primary" style={{
                                padding: '20px 56px',
                                fontSize: '1.2rem',
                                borderRadius: '16px',
                                boxShadow: '0 20px 40px var(--color-primary-glow)'
                            }}>
                                {t('contact')}
                            </Link>
                            <Link href="/services" className="btn-secondary" style={{
                                padding: '20px 56px',
                                fontSize: '1.2rem',
                                borderRadius: '16px',
                                background: 'rgba(255,255,255,0.05)',
                                color: 'white',
                                border: '1px solid rgba(255,255,255,0.2)'
                            }}>
                                {t('services')}
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Scroll Indicator */}
                <div style={{
                    position: 'absolute',
                    bottom: '40px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '12px'
                }}>
                    <div style={{ width: '2px', height: '60px', background: 'linear-gradient(to bottom, var(--color-primary), transparent)' }}></div>
                </div>
            </section>

            {/* Stats - More Consistent Alignment */}
            <section style={{ padding: '80px 0', background: 'white', borderTop: '1px solid #F1F5F9' }}>
                <div className="container">
                    <div className="stats-grid">
                        {stats.map((stat, i) => (
                            <div key={i} className="animate-fade-in" style={{
                                animationDelay: `${i * 0.1}s`,
                                padding: '20px',
                                borderRight: locale === 'en' && i < stats.length - 1 ? '1px solid #F1F5F9' : 'none',
                                borderLeft: locale === 'ar' && i < stats.length - 1 ? '1px solid #F1F5F9' : 'none',
                                textAlign: 'center'
                            }}>
                                <div style={{
                                    fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                                    fontWeight: '950',
                                    color: 'var(--color-secondary)',
                                    marginBottom: '8px',
                                    letterSpacing: '-2px',
                                    lineHeight: 1
                                }}>
                                    {stat.val}
                                </div>
                                <div style={{
                                    fontSize: '0.85rem',
                                    color: 'var(--text-muted)',
                                    fontWeight: '800',
                                    textTransform: 'uppercase',
                                    letterSpacing: '2px'
                                }}>
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Grid - Modern & Attractive */}
            <section style={{
                background: 'linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)',
                padding: '140px 0',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Decorative Elements */}
                <div style={{
                    position: 'absolute',
                    top: '10%',
                    right: '-5%',
                    width: '400px',
                    height: '400px',
                    background: 'var(--color-primary)',
                    opacity: 0.03,
                    filter: 'blur(100px)',
                    borderRadius: '50%',
                    zIndex: 0
                }}></div>
                <div style={{
                    position: 'absolute',
                    bottom: '10%',
                    left: '-5%',
                    width: '400px',
                    height: '400px',
                    background: 'var(--color-accent)',
                    opacity: 0.03,
                    filter: 'blur(100px)',
                    borderRadius: '50%',
                    zIndex: 0
                }}></div>

                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ textAlign: 'center', marginBottom: '100px' }}>
                        <div style={{
                            color: 'var(--color-primary)',
                            fontWeight: '800',
                            fontSize: '1rem',
                            textTransform: 'uppercase',
                            letterSpacing: '3px',
                            marginBottom: '16px'
                        }}>
                            {t('servicesLabel')}
                        </div>
                        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '950', marginBottom: '24px', color: 'var(--color-secondary)', letterSpacing: '-2px' }}>
                            {t('services')}
                        </h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.4rem', maxWidth: '850px', margin: '0 auto', fontWeight: '500', lineHeight: 1.6 }}>
                            {t('servicesDesc')}
                        </p>
                    </div>

                    <div className="services-grid-home">
                        {services.map((s, i) => (
                            <Reveal key={s.key}>
                                <Link 
                                    href={`/services#${s.key}`} 
                                    className="glass-card" 
                                    style={{
                                        animationDelay: `${i * 0.1}s`,
                                        background: 'white',
                                        padding: '0',
                                        border: '1px solid #F1F5F9',
                                        position: 'relative',
                                        borderRadius: '48px',
                                        textAlign: 'start',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: '100%',
                                        overflow: 'hidden',
                                        textDecoration: 'none',
                                        color: 'inherit',
                                        cursor: 'pointer',
                                        transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                                    }}
                                >
                                    {/* Thumbnail / Image Area */}
                                    <div style={{
                                        position: 'relative',
                                        width: '100%',
                                        height: '260px',
                                        overflow: 'hidden',
                                        background: s.key === 'whatsappOtp' ? '#0F172A' : '#f8f9fa'
                                    }}>
                                        {s.key === 'whatsappOtp' ? (
                                            /* WhatsApp Mini Mockup */
                                            <div style={{
                                                width: '100%',
                                                height: '100%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                padding: '20px'
                                            }}>
                                                <div style={{
                                                    width: '100%',
                                                    maxWidth: '280px',
                                                    height: '100%',
                                                    background: '#fff',
                                                    borderRadius: '24px 24px 0 0',
                                                    border: '4px solid #334155',
                                                    borderBottom: 'none',
                                                    overflow: 'hidden',
                                                    display: 'flex',
                                                    flexDirection: 'column'
                                                }}>
                                                    {/* Header */}
                                                    <div style={{ background: '#075E54', padding: '12px', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                        <div style={{ width: '24px', height: '24px', background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                            <Image src="/logo.svg" alt="WakeeL" width={14} height={14} style={{ objectFit: 'contain' }} />
                                                        </div>
                                                        <div style={{ fontWeight: '700', fontSize: '0.8rem' }}>WakeeL</div>
                                                    </div>
                                                    {/* Body */}
                                                    <div style={{ flex: 1, background: '#E5DDD5', padding: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                        {/* Campaign Message (Bot) */}
                                                        <div style={{
                                                            background: '#fff',
                                                            padding: '8px 10px',
                                                            borderRadius: isRtl ? '8px 0 8px 8px' : '0 8px 8px 8px',
                                                            maxWidth: '90%',
                                                            boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                                                            alignSelf: 'flex-start'
                                                        }}>
                                                            <div style={{ color: '#000', fontSize: '0.65rem', lineHeight: '1.4', fontWeight: '600' }}>
                                                                {isRtl ? '✨ دعوة لمؤتمر التقنية غداً بالرياض.' : '✨ Invitation: Tech Conference tomorrow.'}
                                                            </div>
                                                        </div>

                                                        {/* User Reply */}
                                                        <div style={{
                                                            background: '#dcf8c6',
                                                            padding: '8px 10px',
                                                            borderRadius: isRtl ? '0 8px 8px 8px' : '8px 0 8px 8px',
                                                            maxWidth: '90%',
                                                            boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                                                            alignSelf: 'flex-end'
                                                        }}>
                                                            <div style={{ color: '#000', fontSize: '0.65rem', lineHeight: '1.4', fontWeight: '500' }}>
                                                                {isRtl ? 'تأكيد الحضور' : 'Confirm Attendance'}
                                                            </div>
                                                        </div>

                                                        {/* Ticket Message (Bot) */}
                                                        <div style={{
                                                            background: '#fff',
                                                            padding: '8px 10px',
                                                            borderRadius: isRtl ? '8px 0 8px 8px' : '0 8px 8px 8px',
                                                            maxWidth: '90%',
                                                            boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                                                            alignSelf: 'flex-start',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '8px'
                                                        }}>
                                                            <QrCode size={28} color="#075E54" />
                                                            <div>
                                                                <div style={{ color: '#000', fontSize: '0.65rem', fontWeight: 'bold' }}>
                                                                    {isRtl ? 'تذكرة الدخول' : 'Entry Ticket'}
                                                                </div>
                                                                <div style={{ fontSize: '0.6rem', color: '#666' }}>
                                                                    TCK-8439
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <Image
                                                src={s.image}
                                                alt={servicesT(s.key as any)}
                                                fill
                                                style={{ objectFit: 'cover' }}
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                            />
                                        )}
                                    </div>

                                    <div style={{ padding: '60px 40px 45px', display: 'flex', flexDirection: 'column', gap: '20px', flex: 1 }}>
                                        <div>
                                            <h3 style={{ fontSize: '1.75rem', fontWeight: '900', marginBottom: '16px', color: 'var(--color-secondary)' }}>
                                                {servicesT(s.key as any)}
                                            </h3>
                                            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '32px', fontSize: '1.1rem', fontWeight: '500' }}>
                                                {servicesT(`${s.key}Desc` as any)}
                                            </p>
                                        </div>
                                        <div style={{ marginTop: 'auto' }}>
                                            <div style={{
                                                color: 'var(--color-primary)',
                                                fontWeight: '800',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '12px',
                                                fontSize: '1.1rem',
                                                padding: '12px 0'
                                            }}>
                                                {t('viewService')} <span style={{ fontSize: '1.4rem' }}>{locale === 'en' ? '→' : '←'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials - Marquee */}
            <section style={{ padding: '140px 0', background: 'var(--color-secondary)', color: 'white', overflow: 'hidden' }}>
                <div className="container" style={{ textAlign: 'center', marginBottom: '100px' }}>
                    <h2 style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', fontWeight: '950', letterSpacing: '-2px' }}>{testT('title')}</h2>
                </div>

                <div className="marquee-container">
                    {[1, 2, 3, 1, 2, 3].map((num, i) => (
                        <div key={i} style={{
                            width: '550px',
                            minWidth: '550px',
                            padding: '60px',
                            borderRadius: '48px',
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.08)'
                        }}>
                            <div style={{ color: '#FBBF24', fontSize: '1.5rem', marginBottom: '32px' }}>★★★★★</div>
                            <p style={{ fontSize: '1.4rem', lineHeight: '1.8', marginBottom: '48px', fontWeight: '500', opacity: 0.9 }}>
                                "{testT(`${num}.quote` as any)}"
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                <div style={{
                                    width: '64px',
                                    height: '64px',
                                    borderRadius: '50%',
                                    background: 'var(--color-primary)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: '950',
                                    fontSize: '1.4rem'
                                }}>
                                    {testT(`${num}.name` as any).charAt(0)}
                                </div>
                                <div>
                                    <h4 style={{ fontWeight: '900', fontSize: '1.3rem' }}>{testT(`${num}.name` as any)}</h4>
                                    <p style={{ fontSize: '1rem', opacity: 0.5, fontWeight: '700' }}>{testT(`${num}.role` as any)}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section - Translated */}
            <section style={{ padding: '160px 1.5rem', textAlign: 'center', background: 'white' }}>
                <div className="container" style={{ maxWidth: '1000px' }}>
                    <h2 style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', fontWeight: '950', marginBottom: '32px', color: 'var(--color-secondary)', letterSpacing: '-3px' }}>
                        {ctaT('title')}
                    </h2>
                    <p style={{ fontSize: '1.4rem', fontWeight: '500', marginBottom: '64px', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: '800px', marginInline: 'auto' }}>
                        {ctaT('subtitle')}
                    </p>
                    <Link href="/contact" className="btn-primary" style={{
                        padding: '24px 72px',
                        fontSize: '1.4rem',
                        borderRadius: '20px',
                        boxShadow: '0 30px 60px -10px var(--color-primary-glow)'
                    }}>
                        {ctaT('button')}
                    </Link>
                </div>
            </section>
        </main>
    );
}
