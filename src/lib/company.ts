// The legal entity behind WakeeL. Shown in the footer, structured data and the About page.
// Keep it identical to the documents submitted to Meta for business verification
// (and to dashboard/src/data/company.js in the provider project).
export const COMPANY = {
    product: { ar: 'وكيل', en: 'WakeeL' },
    legalName: { ar: 'شركة رشد إيه أي', en: 'Rushd AI Company' },
    crNumber: '7053993619',
    email: 'aya.ghouri@rushdai.com',
    phone: '+966539592520',
    phoneDisplay: '+966 53 959 2520',
    website: 'https://rushdai.com',
    address: {
        ar: 'عبدالله المخضوب، حي الوادي، الرياض 13313، المملكة العربية السعودية',
        en: 'Abdullah Al Makhdoub, Al Wadi Dist., Riyadh 13313, Saudi Arabia',
        street: 'Abdullah Al Makhdoub',
        district: 'Al Wadi',
        city: 'Riyadh',
        postalCode: '13313',
        country: 'SA'
    },
    // Legal pages live on the provider platform
    privacyUrl: 'https://provider.wakeel.cc/privacy',
    termsUrl: 'https://provider.wakeel.cc/terms'
} as const;
