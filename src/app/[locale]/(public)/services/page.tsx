import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import Reveal from '@/components/ui/Reveal';
import ImageSlider from '@/components/ui/ImageSlider';
import MacbookMockup from '@/components/ui/MacbookMockup';
import { CheckCircle, Zap, BarChart, Shield, Settings, MessageSquare, Globe, Fingerprint } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Services' });
    return {
        title: `${t('title')} | WakeeL Technologies`,
        description: t('subtitle'),
    };
}

const crmScreenshots = [
    { src: '/crm/crm0.jpeg', alt: 'CRM Dashboard Overview' },
    { src: '/crm/crm1_image.jpeg', alt: 'CRM Clients Management' },
    { src: '/crm/crm3.jpeg', alt: 'CRM Reports & Analytics' },
    { src: '/crm/crm4.jpeg', alt: 'CRM Sales Pipeline' },
    { src: '/crm/crm_image.jpeg', alt: 'CRM Activity Feed' },
    { src: '/crm/5crm.jpeg', alt: 'CRM Interface' },
    { src: '/crm/6crm.jpeg', alt: 'CRM Interface' },
    { src: '/crm/crm7.jpeg', alt: 'CRM Interface' },
    { src: '/crm/crm8.jpeg', alt: 'CRM Interface' },
    { src: '/crm/crm8.jpg', alt: 'CRM Interface' },
    { src: '/crm/crm9.jpeg', alt: 'CRM Interface' },
    { src: '/crm/crmn.jpg', alt: 'CRM Interface' },
    { src: '/crm/crrm9.jpeg', alt: 'CRM Interface' },
];

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Services' });
    const isRtl = locale === 'ar';

    return (
        <main style={{ background: '#FAFAFA' }}>

            {/* --- WAKEEL CRM SECTION (DARK PREMIUM - HERO REPLACEMENT) --- */}
            <section style={{
                background: 'var(--color-secondary)', // User requested Hero Color
                color: '#FFFFFF',
                padding: '200px 0 120px 0', // Increased top padding to account for navbar since PageHeader is gone
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Background glow effects */}
                <div style={{
                    position: 'absolute',
                    top: '-10%', right: '-10%', width: '40%', height: '40%',
                    background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)',
                    zIndex: 0
                }} />

                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr',
                        gap: '60px',
                        alignItems: 'center'
                    }}>
                        {/* Text and Features (Top) */}
                        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                            <Reveal>
                                <div style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    background: 'rgba(59, 130, 246, 0.15)',
                                    border: '1px solid rgba(59, 130, 246, 0.3)',
                                    padding: '8px 16px',
                                    borderRadius: '100px',
                                    color: '#60A5FA', // Light blue
                                    fontSize: '0.9rem',
                                    fontWeight: '700',
                                    marginBottom: '24px'
                                }}>
                                    <Settings size={16} /> WakeeL CRM
                                </div>
                                <h2 style={{
                                    fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                                    fontWeight: '900',
                                    color: '#FFFFFF',
                                    marginBottom: '24px',
                                    lineHeight: 1.1,
                                    letterSpacing: '-1px'
                                }}>
                                    {t('crm')}
                                </h2>
                                <p style={{
                                    fontSize: '1.3rem',
                                    lineHeight: '1.7',
                                    color: '#94A3B8',
                                    marginBottom: '60px'
                                }}>
                                    {t('crmDesc')}
                                </p>
                            </Reveal>
                        </div>

                        {/* Slider in Macbook Mockup (Middle) */}
                        <Reveal delay={200}>
                            <MacbookMockup>
                                <div style={{ margin: '-1px' }}> {/* To hide slider border in mockup */}
                                    <ImageSlider images={crmScreenshots} />
                                </div>
                            </MacbookMockup>
                        </Reveal>

                        {/* Features Grid (Bottom) */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                            gap: '30px',
                            marginTop: '40px'
                        }}>
                            <Reveal delay={100}>
                                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '32px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)' }}>
                                    <BarChart size={32} color="#3B82F6" style={{ marginBottom: '20px' }} />
                                    <h4 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '12px', color: '#F8FAFC' }}>{t('crmFeature1' as any) || (isRtl ? 'إدارة شاملة' : 'Comprehensive Management')}</h4>
                                    <p style={{ color: '#94A3B8', lineHeight: '1.6' }}>{t('crmFeature1Desc' as any) || (isRtl ? 'لوحة تحكم احترافية لمتابعة المبيعات' : 'Professional dashboard to track sales.')}</p>
                                </div>
                            </Reveal>
                            <Reveal delay={200}>
                                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '32px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)' }}>
                                    <Shield size={32} color="#10B981" style={{ marginBottom: '20px' }} />
                                    <h4 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '12px', color: '#F8FAFC' }}>{t('security')}</h4>
                                    <p style={{ color: '#94A3B8', lineHeight: '1.6' }}>{t('securityDesc')}</p>
                                </div>
                            </Reveal>
                            <Reveal delay={300}>
                                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '32px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)' }}>
                                    <CheckCircle size={32} color="#F59E0B" style={{ marginBottom: '20px' }} />
                                    <h4 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '12px', color: '#F8FAFC' }}>{t('crmFeature2' as any) || (isRtl ? 'تقارير دقيقة' : 'Accurate Reports')}</h4>
                                    <p style={{ color: '#94A3B8', lineHeight: '1.6' }}>{t('crmFeature2Desc' as any) || (isRtl ? 'إحصائيات حية ورسوم بيانية' : 'Live statistics and charts.')}</p>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>


            {/* --- WHATSAPP OTP SECTION (DARK MODE PREMIUM) --- */}
            <section style={{
                background: '#0F172A', // Dark background for WhatsApp
                padding: '120px 0',
                position: 'relative',
                overflow: 'hidden'
            }}>
                 <div style={{
                    position: 'absolute',
                    top: '20%', left: '-10%', width: '40%', height: '40%',
                    background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)',
                    zIndex: 0
                }} />

                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div className="services-detail-grid" style={{ alignItems: 'center' }}>
                        
                        {/* Text Side */}
                        <div>
                            <Reveal>
                                <div style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    background: 'rgba(16, 185, 129, 0.15)',
                                    border: '1px solid rgba(16, 185, 129, 0.3)',
                                    padding: '8px 16px',
                                    borderRadius: '100px',
                                    color: '#34D399',
                                    fontSize: '0.9rem',
                                    fontWeight: '700',
                                    marginBottom: '24px'
                                }}>
                                    <MessageSquare size={16} /> WhatsApp API
                                </div>
                                <h2 style={{
                                    fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                                    fontWeight: '950',
                                    color: '#FFFFFF',
                                    marginBottom: '24px',
                                    lineHeight: 1.1,
                                    letterSpacing: '-1px'
                                }}>
                                    {t('whatsappOtp')}
                                </h2>
                                <p style={{
                                    fontSize: '1.3rem',
                                    lineHeight: '1.7',
                                    color: '#94A3B8',
                                    marginBottom: '40px',
                                    fontWeight: '500'
                                }}>
                                    {t('whatsappOtpDesc')}
                                </p>

                                {/* Feature List */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    {[
                                        { i: <Zap color="#10B981" size={24} />, t: t('otpFeature1' as any) || (isRtl ? 'سرعة البرق' : 'Lightning Fast'), d: t('otpFeature1Desc' as any) || (isRtl ? 'رسائل التحقق تصل في أقل من ثانية.' : 'Messages arrive in under a second.') },
                                        { i: <Globe color="#10B981" size={24} />, t: t('otpFeature2' as any) || (isRtl ? 'تكامل مرن' : 'Flexible API'), d: t('otpFeature2Desc' as any) || (isRtl ? 'ربط برمجي سهل مع أي لغة برمجة.' : 'Easy API integration.') },
                                        { i: <Fingerprint color="#10B981" size={24} />, t: t('otpFeature3' as any) || (isRtl ? 'موثوقية فائقة' : 'High Reliability'), d: t('otpFeature3Desc' as any) || (isRtl ? 'وصول بنسبة 99.9%.' : '99.9% delivery rate.') }
                                    ].map((feat, idx) => (
                                        <div key={idx} style={{
                                            display: 'flex',
                                            gap: '16px',
                                            background: 'rgba(255,255,255,0.03)',
                                            backdropFilter: 'blur(10px)',
                                            padding: '20px',
                                            borderRadius: '16px',
                                            boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                                            border: '1px solid rgba(255,255,255,0.05)'
                                        }}>
                                            <div style={{ background: 'rgba(16, 185, 129, 0.1)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                {feat.i}
                                            </div>
                                            <div>
                                                <h4 style={{ fontWeight: '800', color: '#F8FAFC', fontSize: '1.1rem', marginBottom: '4px' }}>{feat.t}</h4>
                                                <p style={{ color: '#94A3B8', fontSize: '0.95rem' }}>{feat.d}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Reveal>
                        </div>

                        {/* Visual Side */}
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Reveal delay={200}>
                                <div style={{
                                    position: 'relative',
                                    width: '320px',
                                    height: '650px',
                                    background: '#fff',
                                    borderRadius: '40px',
                                    boxShadow: '0 25px 60px -10px rgba(0,0,0,0.5)',
                                    border: '8px solid #334155', // Darker phone border for dark mode
                                    overflow: 'hidden',
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}>
                                    {/* Mockup Header */}
                                    <div style={{ background: '#075E54', padding: '24px 20px 16px', color: '#fff' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{ width: '40px', height: '40px', background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <Image src="/logo.svg" alt="WakeeL" width={24} height={24} style={{ objectFit: 'contain' }} />
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: '700', fontSize: '1.1rem' }}>WakeeL System</div>
                                                <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Bot</div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Mockup Body - Chat */}
                                    <div style={{ flex: 1, background: '#E5DDD5', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                        <div style={{ alignSelf: 'center', background: 'rgba(0,0,0,0.1)', color: '#555', padding: '4px 12px', borderRadius: '12px', fontSize: '0.8rem' }}>
                                            {isRtl ? 'اليوم' : 'Today'}
                                        </div>
                                        <div style={{
                                            background: '#fff',
                                            padding: '12px 16px',
                                            borderRadius: '8px 8px 8px 0',
                                            maxWidth: '85%',
                                            boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                                            alignSelf: 'flex-start'
                                        }}>
                                            <div style={{ color: '#000', fontSize: '0.95rem', lineHeight: '1.4', fontWeight: '500' }}>
                                                {isRtl ? 'رمز التحقق (OTP) الخاص بك هو:' : 'Your OTP code is:'}
                                            </div>
                                            <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#128C7E', margin: '8px 0', letterSpacing: '2px' }}>
                                                739 421
                                            </div>
                                            <div style={{ fontSize: '0.7rem', color: '#999', textAlign: 'right' }}>10:42 AM</div>
                                        </div>
                                    </div>
                                    {/* Notch simulate */}
                                    <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '100px', height: '24px', background: '#334155', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px' }} />
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- CTA SECTION --- */}
            <section style={{ padding: '160px 0', textAlign: 'center', background: '#FAFAFA' }}>
                <div className="container">
                    <Reveal>
                        <h2 style={{ fontSize: 'clamp(2.8rem, 6vw, 4.5rem)', fontWeight: '950', marginBottom: '24px', letterSpacing: isRtl ? '0' : '-3px', color: 'var(--color-secondary)' }}>
                            {t('ctaTitle')}
                        </h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.5rem', marginBottom: '64px', maxWidth: '750px', marginInline: 'auto', fontWeight: '500', lineHeight: 1.6 }}>
                            {t('ctaSubtitle')}
                        </p>
                        <Link href="/contact" className="btn-primary" style={{ padding: '24px 72px', fontSize: '1.4rem', borderRadius: '100px', boxShadow: '0 20px 40px rgba(0, 102, 255, 0.2)' }}>
                            {t('ctaButton')}
                        </Link>
                    </Reveal>
                </div>
            </section>
        </main>
    );
}
