# إعداد تكامل CRM - خطوات سريعة

## الخطوة 1: إضافة المتغيرات للـ `.env`

افتح ملف `.env` (أو `.env.local`) وأضف السطور التالية:

```env
# CRM Integration
CRM_BASE_URL=https://honeydew-sheep-602146.hostingersite.com
CRM_API_KEY=JlQlzqUN1HFfeenMO5Iz8eJYMtOMxPnE772sqxJ
```

## الخطوة 2: إعادة تشغيل السيرفر

```bash
npm run dev
```

## الخطوة 3: اختبار التكامل

1. اذهب إلى صفحة `/contact` أو `/landing`
2. املأ النموذج وأرسله
3. افتح Console في المتصفح (F12)
4. ابحث عن رسالة: `[CRM Integration] Lead sent successfully`

## ✅ تم!

الآن كل عميل يسجل في الموقع سيتم إرساله تلقائياً للـ CRM في الخلفية.

---

**ملاحظة مهمة:** إذا فشل الـ CRM، لن يتأثر العميل ولن يرى أي رسالة خطأ. البيانات ستُحفظ في قاعدة بياناتك دائماً.

للمزيد من التفاصيل، راجع: `docs/CRM_INTEGRATION.md`
