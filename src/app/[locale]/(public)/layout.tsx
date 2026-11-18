import { ReactNode } from 'react';
import Script from 'next/script';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import StructuredData from '@/components/seo/StructuredData';

type Props = {
    children: ReactNode;
    params: Promise<{ locale: string }>;
};

import { WEBCHAT_WIDGET_ID, WEBCHAT_WIDGET_SRC } from '@/lib/links';

export default async function PublicLayout({ children, params }: Props) {
    const { locale } = await params;

    return (
        <>
            <StructuredData locale={locale} />
            <Header locale={locale} />
            <main style={{ minHeight: '80vh' }}>
                {children}
            </main>
            <Footer locale={locale} />
            {/* Website chat widget: loads after the page is idle and sits in the bottom-right corner */}
            <Script src={WEBCHAT_WIDGET_SRC} data-id={WEBCHAT_WIDGET_ID} strategy="lazyOnload" />
        </>
    );
}
