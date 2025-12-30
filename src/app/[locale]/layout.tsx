import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { ReactNode } from 'react';
import '@/app/globals.css';
import { Inter, Tajawal } from 'next/font/google';
import NextAuthProvider from '@/components/providers/NextAuthProvider';

const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700', '800', '900'],
    variable: '--font-inter',
    display: 'swap',
});

const tajawal = Tajawal({
    subsets: ['arabic'],
    weight: ['400', '500', '700', '800', '900'],
    variable: '--font-tajawal',
    display: 'swap',
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Metadata' });

    const baseUrl = 'https://wakeel.sa';

    return {
        metadataBase: new URL(baseUrl),
        title: t('title'),
        description: t('description'),
        keywords: t('keywords'),
        robots: 'index, follow',
        alternates: {
            canonical: `/${locale}`,
            languages: {
                'en': '/en',
                'ar': '/ar',
            },
        },
        openGraph: {
            title: t('title'),
            description: t('description'),
            locale: locale,
            alternateLocale: locale === 'en' ? 'ar' : 'en',
            type: 'website',
            images: [
                {
                    url: '/og-image.png',
                    width: 1200,
                    height: 630,
                    alt: 'WakeeL Technologies',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: t('title'),
            description: t('description'),
            images: ['/og-image.png'],
        },
    };
}

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    themeColor: '#FF6600',
};

type Props = {
    children: ReactNode;
    params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({
    children,
    params
}: Props) {
    const { locale } = await params;

    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    const messages = await getMessages();
    const dir = locale === 'ar' ? 'rtl' : 'ltr';

    return (
        <html
            lang={locale}
            dir={dir}
            className={`${inter.variable} ${tajawal.variable}`}
            suppressHydrationWarning
        >
            <body>
                <NextAuthProvider>
                    <NextIntlClientProvider messages={messages}>
                        {children}
                    </NextIntlClientProvider>
                </NextAuthProvider>
            </body>
        </html>
    );
}
