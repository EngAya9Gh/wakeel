import { ReactNode } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import StructuredData from '@/components/seo/StructuredData';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

type Props = {
    children: ReactNode;
    params: Promise<{ locale: string }>;
};

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
            <WhatsAppButton />
        </>
    );
}
