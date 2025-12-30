import UserForm from '@/components/admin/UserForm';
import styles from '@/app/[locale]/admin/admin.module.css';
import { getTranslations, getLocale } from 'next-intl/server';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function NewUserPage() {
    const session = await auth();
    const locale = await getLocale();

    if (!session || session.user.role !== 'ADMIN') {
        redirect(`/${locale}/admin`);
    }

    const t = await getTranslations('Admin');

    return (
        <div>
            <div className={styles.header}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Link href="/admin/users" style={{ color: '#64748B', display: 'flex', alignItems: 'center' }}>
                        {locale === 'ar' ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
                    </Link>
                    <h1 className={styles.headerTitle}>{t('addUser')}</h1>
                </div>
            </div>

            <UserForm />
        </div>
    );
}
