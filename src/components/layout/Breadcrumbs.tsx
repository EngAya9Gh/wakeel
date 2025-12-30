'use client';

import { usePathname } from '@/i18n/routing';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export default function Breadcrumbs() {
    const pathname = usePathname();
    const t = useTranslations('Navigation');

    // Don't show on homepage
    if (pathname === '/') return null;

    const pathSegments = pathname.split('/').filter(Boolean);

    const pathMap: Record<string, string> = {
        'services': t('services'),
        'about': t('about'),
        'contact': t('contact'),
        'blog': t('blog'),
        'landing': 'Get Started',
        'admin': 'Admin Dashboard'
    };

    return (
        <nav style={{
            padding: '1rem 0',
            fontSize: '0.9rem',
            color: '#666',
            borderBottom: '1px solid #eee',
            background: 'white'
        }}>
            <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <Link href="/" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
                    {t('home')}
                </Link>
                {pathSegments.map((segment, index) => {
                    const href = '/' + pathSegments.slice(0, index + 1).join('/');
                    const isLast = index === pathSegments.length - 1;
                    const decodedSegment = decodeURIComponent(segment);
                    const label = pathMap[decodedSegment] || decodedSegment;

                    return (
                        <span key={href} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ color: '#ccc' }}>→</span>
                            {isLast ? (
                                <span style={{ color: '#111', fontWeight: 600 }}>{label}</span>
                            ) : (
                                <Link href={href as any} style={{ color: '#666' }}>
                                    {label}
                                </Link>
                            )}
                        </span>
                    );
                })}
            </div>
        </nav>
    );
}
