'use client';

import { Link, usePathname, useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import Logo from '@/components/common/Logo';

export default function Header({ locale }: { locale: string }) {
    const t = useTranslations('Navigation');
    const pathname = usePathname();
    const router = useRouter();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const switchLocale = (newLocale: string) => {
        router.replace(pathname, { locale: newLocale });
        setMenuOpen(false);
    };

    const navLinks: { href: any, label: string, active: boolean }[] = [
        { href: '/', label: t('home'), active: pathname === '/' },
        { href: '/services', label: t('services'), active: pathname === '/services' },
        { href: '/about', label: t('about'), active: pathname === '/about' },
        { href: '/blog', label: t('blog'), active: pathname.startsWith('/blog') },
    ];

    return (
        <header style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            padding: scrolled ? '1rem 0' : '1.5rem 0',
            background: scrolled || menuOpen ? 'white' : 'transparent',
            borderBottom: scrolled || menuOpen ? '1px solid #E2E8F0' : 'none'
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {/* Logo */}
                <Link href="/" style={{ textDecoration: 'none' }} onClick={() => setMenuOpen(false)}>
                    <Logo color={(['/', '/services', '/about', '/blog'].includes(pathname) && !scrolled) ? 'light' : 'dark'} />
                </Link>

                {/* Desktop Nav */}
                <nav style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }} className="nav-desktop">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            style={{
                                color: link.active
                                    ? 'var(--color-primary)'
                                    : (['/', '/services', '/about', '/blog'].includes(pathname) && !scrolled) ? 'white' : 'var(--color-secondary)',
                                fontWeight: link.active ? '800' : '600',
                                fontSize: '0.95rem',
                                opacity: link.active ? 1 : 0.8,
                                transition: 'all 0.2s ease',
                                position: 'relative'
                            }}
                            className="nav-link"
                        >
                            {link.label}
                        </Link>
                    ))}

                    <button
                        onClick={() => switchLocale(locale === 'en' ? 'ar' : 'en')}
                        style={{
                            background: (['/', '/services', '/about', '/blog'].includes(pathname) && !scrolled) ? 'rgba(255, 255, 255, 0.1)' : 'rgba(15, 23, 42, 0.05)',
                            border: (['/', '/services', '/about', '/blog'].includes(pathname) && !scrolled) ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(15, 23, 42, 0.1)',
                            color: (['/', '/services', '/about', '/blog'].includes(pathname) && !scrolled) ? 'white' : 'var(--color-secondary)',
                            width: '40px',
                            height: '40px',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            fontSize: '0.85rem',
                            fontWeight: '800',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        {locale === 'en' ? 'AR' : 'EN'}
                    </button>

                    <Link href="/contact" className="btn-primary" style={{ padding: '0.7rem 1.8rem', borderRadius: '12px', fontSize: '0.9rem' }}>
                        {t('contact')}
                    </Link>
                </nav>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    style={{
                        display: 'none',
                        background: 'none',
                        border: 'none',
                        fontSize: '1.8rem',
                        cursor: 'pointer',
                        color: (['/', '/services', '/about', '/blog'].includes(pathname) && !scrolled) ? 'white' : 'var(--color-secondary)'
                    }}
                    className="mobile-only"
                >
                    {menuOpen ? '✕' : '☰'}
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    background: 'white',
                    padding: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                    borderBottom: '1px solid #f1f5f9'
                }}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            style={{
                                fontSize: '1.2rem',
                                fontWeight: '700',
                                color: link.active ? 'var(--color-primary)' : 'var(--color-secondary)'
                            }}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <button
                            onClick={() => switchLocale(locale === 'en' ? 'ar' : 'en')}
                            style={{ flex: 1, padding: '1rem', borderRadius: '12px', border: '1px solid #eee', fontWeight: '700' }}
                        >
                            {locale === 'en' ? 'العربية' : 'English'}
                        </button>
                        <Link href="/contact" onClick={() => setMenuOpen(false)} style={{ flex: 2 }} className="btn-primary">
                            {t('contact')}
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
