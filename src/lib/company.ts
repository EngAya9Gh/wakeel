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
        ar: '7782 طريق الملك عبدالعزيز، حي الربيع، الرقم الفرعي 4565، الرياض 13315، المملكة العربية السعودية',
        en: '7782 King Abdulaziz Rd, Ar Rabie Dist., Additional No. 4565, Riyadh 13315, Saudi Arabia',
        street: '7782 King Abdulaziz Rd, Additional No. 4565',
        district: 'Ar Rabie',
        city: 'Riyadh',
        postalCode: '13315',
        country: 'SA'
    },
    // Legal pages live on the provider platform
    privacyUrl: 'https://provider.wakeel.cc/privacy',
    termsUrl: 'https://provider.wakeel.cc/terms'
} as const;
