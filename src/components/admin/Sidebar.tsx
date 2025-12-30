'use client';

import { Link, usePathname } from '@/i18n/routing';
import styles from '@/app/[locale]/admin/admin.module.css';
import { LayoutDashboard, FileText, MessageSquare, Users, Settings, LogOut, ChevronLeft, ChevronRight, UserCog } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Logo from '@/components/common/Logo';

export default function Sidebar({ user }: { user: any }) {
    const pathname = usePathname();
    const locale = useLocale();
    const t = useTranslations('Admin');

    const navLinks = [
        { href: '/admin', label: t('dashboard'), icon: <LayoutDashboard size={20} /> },
        { href: '/admin/articles', label: t('articles'), icon: <FileText size={20} /> },
        { href: '/admin/leads', label: t('leads'), icon: <Users size={20} /> },
        { href: '/admin/contacts', label: t('contacts'), icon: <MessageSquare size={20} /> },
    ];

    // Add users management for ADMINs only
    if (user?.role === 'ADMIN') {
        navLinks.push({ href: '/admin/users', label: t('users'), icon: <UserCog size={20} /> });
    }

    navLinks.push({ href: '/admin/settings', label: t('settings'), icon: <Settings size={20} /> });

    const isActive = (path: string) => {
        if (path === '/admin') return pathname === '/admin';
        return pathname.startsWith(path);
    };

    return (
        <aside className={styles.sidebar}>
            <div className={styles.sidebarHeader} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Link href="/" style={{ textDecoration: 'none' }}>
                    <Logo color="light" />
                </Link>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.75rem', fontWeight: 600, letterSpacing: '2px' }}>ADMIN PANEL</div>
            </div>

            <nav className={styles.nav}>
                {navLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href as any}
                        className={`${styles.navLink} ${isActive(link.href) ? styles.navLinkActive : ''}`}
                    >
                        {link.icon}
                        <span>{link.label}</span>
                        {isActive(link.href) && (
                            <div style={{ marginLeft: 'auto' }}>
                                {locale === 'ar' ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                            </div>
                        )}
                    </Link>
                ))}
            </nav>

            <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <Link href="/admin/login" className={styles.navLink} style={{ color: '#FCA5A5' }}>
                    <LogOut size={20} />
                    <span>{t('signOut')}</span>
                </Link>
            </div>
        </aside>
    );
}
