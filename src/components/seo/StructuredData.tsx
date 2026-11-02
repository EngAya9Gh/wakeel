import { COMPANY } from '@/lib/company';

export default function StructuredData({ locale }: { locale: string }) {
    const data = {
        "@context": "https://schema.org",
        "@type": "Organization",
        // The legal entity; WakeeL is its product brand
        "name": COMPANY.legalName.en,
        "legalName": COMPANY.legalName.en,
        "alternateName": [COMPANY.legalName.ar, COMPANY.product.en, COMPANY.product.ar],
        "brand": { "@type": "Brand", "name": COMPANY.product.en },
        "identifier": { "@type": "PropertyValue", "propertyID": "Commercial Registration (SA)", "value": COMPANY.crNumber },
        "email": COMPANY.email,
        "url": "https://wakeel.sa",
        "logo": "https://wakeel.sa/logo.png",
        "description": locale === 'ar'
            ? "شركة رائدة في مجال تطوير البرمجيات والحلول الرقمية في المملكة العربية السعودية."
            : "Leading software development and digital solutions company in Saudi Arabia.",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": COMPANY.address.street,
            "addressRegion": COMPANY.address.district,
            "addressLocality": COMPANY.address.city,
            "postalCode": COMPANY.address.postalCode,
            "addressCountry": COMPANY.address.country
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": COMPANY.phone,
            "email": COMPANY.email,
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
