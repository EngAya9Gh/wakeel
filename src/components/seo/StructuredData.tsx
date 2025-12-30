export default function StructuredData({ locale }: { locale: string }) {
    const data = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "WakeeL Technologies",
        "url": "https://wakeel.sa",
        "logo": "https://wakeel.sa/logo.png",
        "description": locale === 'ar'
            ? "شركة رائدة في مجال تطوير البرمجيات والحلول الرقمية في المملكة العربية السعودية."
            : "Leading software development and digital solutions company in Saudi Arabia.",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Olaya St",
            "addressLocality": "Riyadh",
            "addressCountry": "SA"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+966-50-000-0000",
            "contactType": "customer service"
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}
