const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    await prisma.article.createMany({
        data: [
            {
                slug: 'future-of-ai-marketing',
                title_en: 'The Future of AI in Digital Marketing',
                title_ar: 'مستقبل الذكاء الاصطناعي في التسويق الرقمي',
                content_en: 'Artificial Intelligence is revolutionizing how we approach digital marketing. From predictive analytics to personalized customer experiences, AI tools are enabling businesses to scale their efforts like never before...',
                content_ar: 'يحدث الذكاء الاصطناعي ثورة في كيفية تعاملنا مع التسويق الرقمي. من التحليلات التنبؤية إلى تجارب العملاء المخصصة، تمكن أدوات الذكاء الاصطناعي الشركات من توسيع جهودها بشكل لم يسبق له مثيل...',
            },
            {
                slug: 'scale-your-startup',
                title_en: 'How to Scale Your Startup Tech Stack',
                title_ar: 'كيفية توسيع البنية التقنية لشركتك الناشئة',
                content_en: 'Choosing the right technology stack is crucial for startup success. React, Node.js, and Cloud services offer the flexibility needed to pivot and grow...',
                content_ar: 'يعد اختيار البنية التقنية المناسبة أمرًا بالغ الأهمية لنجاح الشركات الناشئة. توفر React و Node.js والخدمات السحابية المرونة اللازمة للتحول والنمو...',
            },
            {
                slug: 'seo-best-practices-2025',
                title_en: 'SEO Best Practices for 2025',
                title_ar: 'أفضل ممارسات تحسين محركات البحث لعام 2025',
                content_en: 'Search Engine Optimization is constantly evolving. Google s latest core updates prioritize helpful content and user experience identifiers...',
                content_ar: 'تحسين محركات البحث يتطور باستمرار. تعطي تحديثات Google الأساسية الأخيرة الأولوية للمحتوى المفيد ومعرفات تجربة المستخدم...',
            }
        ],
        skipDuplicates: true,
    });
    console.log('✅ seeded articles');
}

main()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect());
