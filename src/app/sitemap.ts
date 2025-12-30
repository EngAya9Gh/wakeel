import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://wakeel.sa';
    const locales = ['en', 'ar'];
    const pages = ['', '/services', '/about', '/blog', '/contact'];

    const entries: MetadataRoute.Sitemap = [];

    for (const locale of locales) {
        for (const page of pages) {
            entries.push({
                url: `${baseUrl}/${locale}${page}`,
                lastModified: new Date(),
                changeFrequency: page === '/blog' ? 'daily' : 'weekly',
                priority: page === '' ? 1 : 0.8,
            });
        }
    }

    return entries;
}
