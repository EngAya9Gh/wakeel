import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import Logo from '@/components/common/Logo';
import prisma from '@/lib/prisma';
import { COMPANY } from '@/lib/company';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export default async function Footer({ locale }: { locale: string }) {
    const t = await getTranslations({ locale, namespace: 'Footer' });
    const settings = await prisma.siteSettings.findFirst({ where: { id: 1 } });

    const socialLinks = [
        { icon: <Linkedin size={20} />, url: settings?.linkedin, name: 'LinkedIn' },
        { icon: <Twitter size={20} />, url: settings?.twitter, name: 'Twitter' },
        { icon: <Instagram size={20} />, url: settings?.instagram, name: 'Instagram' },
        { icon: <Facebook size={20} />, url: settings?.facebook, name: 'Facebook' },
    ].filter(link => link.url);

    const isAr = locale === 'ar';
    const phoneSa = settings?.phone_sa || COMPANY.phoneDisplay;
    const email = settings?.email || COMPANY.email;

    return (
        <footer style={{
            background: 'var(--color-secondary)',
            padding: '100px 0 40px',
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Accent - Circle */}
            <div style={{
                position: 'absolute',
                bottom: '-5%',
                left: '-5%',
                width: '400px',
                height: '400px',
                background: 'var(--color-silver-metallic)',
                opacity: 0.04,
                borderRadius: '50%',
                zIndex: 0
            }}></div>

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                    gap: '4rem',
                    marginBottom: '6rem'
                }}>
                    {/* Brand Info */}
                    <div style={{ gridColumn: 'span 1', display: 'flex', flexDirection: 'column', alignItems: locale === 'ar' ? 'center' : 'flex-start', textAlign: locale === 'ar' ? 'center' : 'left' }}>
                        <div style={{ marginBottom: '2rem' }}>
                            <Logo color="light" />
                        </div>
                        <p style={{
                            color: '#94A3B8',
                            lineHeight: '1.8',
                            fontSize: '1.1rem',
                            marginBottom: '3rem',
                            maxWidth: '400px'
                        }}>
                            {locale === 'ar'
                                ? 'نحول الرؤى الرقمية إلى واقع ملموس. شريككم التقني الموثوق في المملكة العربية السعودية والشرق الأوسط.'
                                : 'Transforming digital visions into reality. Your trusted tech partner in Saudi Arabia and the Middle East.'}
                        </p>

                        <div style={{ display: 'flex', gap: '1.2rem' }}>
                            {socialLinks.map(link => (
                                <a key={link.name} href={link.url || '#'} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label={link.name}>
                                    {link.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '2.5rem', borderBottom: '2px solid var(--color-primary)', display: 'inline-block', paddingBottom: '0.5rem' }}>
                            {t('company')}
                        </h4>
                        <nav style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                            <Link href="/about" className="footer-link">{t('aboutUs')}</Link>
                            <Link href="/services" className="footer-link">{t('services')}</Link>
                            <Link href="/blog" className="footer-link">{t('blog')}</Link>
                            <Link href="/contact" className="footer-link">{t('contact')}</Link>
                        </nav>
                    </div>

                    {/* Offices Section - Fixed side-by-side */}
                    <div style={{ gridColumn: 'span 1' }}>
                        <h4 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '2.5rem', borderBottom: '2px solid var(--color-primary)', display: 'inline-block', paddingBottom: '0.5rem' }}>
                            {t('offices')}
                        </h4>

                        <div className="offices-grid">
                            {/* Riyadh */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <h5 style={{ fontWeight: '800', fontSize: '1rem', color: 'white' }}>{t('riyadhOffice')}</h5>
                                <p style={{ fontSize: '0.9rem', color: '#94A3B8', lineHeight: '1.5' }}>
                                    <span style={{ color: 'var(--color-primary)' }}>📍</span> {isAr ? COMPANY.address.ar : COMPANY.address.en}
                                </p>
                                <a href={`tel:${phoneSa.replace(/\s/g, '')}`} style={{ fontSize: '0.9rem', color: '#94A3B8', direction: 'ltr', textAlign: isAr ? 'right' : 'left', whiteSpace: 'nowrap' }}>
                                    📞 {phoneSa}
                                </a>
                            </div>

                            {/* Syria */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <h5 style={{ fontWeight: '800', fontSize: '1rem', color: 'white' }}>{t('syriaOffice')}</h5>
                                <p style={{ fontSize: '0.9rem', color: '#94A3B8', lineHeight: '1.5' }}>
                                    <span style={{ color: 'var(--color-primary)' }}>📍</span> {locale === 'ar' ? 'دمشق' : 'Damascus'}
                                </p>
                                {settings?.phone_sy && (
                                    <a href={`tel:${settings.phone_sy.replace(/\s/g, '')}`} style={{ fontSize: '0.9rem', color: '#94A3B8', direction: 'ltr', textAlign: isAr ? 'right' : 'left', whiteSpace: 'nowrap' }}>
                                        📞 {settings.phone_sy}
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Global Email */}
                        <div style={{ marginTop: '3rem', padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <p style={{ fontSize: '0.95rem', fontWeight: '700' }}>
                                <span style={{ color: 'var(--color-primary)', marginInlineEnd: '10px' }}>✉</span>
                                <a href={`mailto:${email}`}>{email}</a>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '2rem',
                    paddingTop: '3rem',
                    borderTop: '1px solid rgba(255,255,255,0.05)',
                    color: '#ffffffff',
                    fontSize: '0.95rem',
                    fontWeight: '600'
                }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        <p>
                            © {new Date().getFullYear()} {isAr
                                ? `${COMPANY.product.ar} منتج من ${COMPANY.legalName.ar}`
                                : `${COMPANY.product.en} is a product of ${COMPANY.legalName.en}`}. {t('allRights')}.
                        </p>
                        <p style={{ color: '#94A3B8', fontWeight: 500, fontSize: '0.85rem' }}>
                            {isAr ? 'سجل تجاري' : 'CR'} {COMPANY.crNumber}
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <a href={COMPANY.privacyUrl}>{isAr ? 'سياسة الخصوصية' : 'Privacy Policy'}</a>
                        <a href={COMPANY.termsUrl}>{isAr ? 'شروط الخدمة' : 'Terms of Service'}</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
