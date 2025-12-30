import { ReactNode } from 'react';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Sidebar from '@/components/admin/Sidebar';
import styles from '../admin.module.css';

type Props = {
    children: ReactNode;
};

export default async function DashboardLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const session = await auth();

    if (!session || !session.user) {
        redirect(`/${locale}/admin/login`);
        return null;
    }

    return (
        <div className={styles.adminContainer}>
            <Sidebar user={session.user} />
            <main className={styles.mainContent}>
                <div className={styles.header}>
                    <h1 className={styles.headerTitle}>Overview</h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span>Welcome, {session.user.name}</span>
                        <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--color-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                            {session.user.name?.charAt(0).toUpperCase()}
                        </div>
                    </div>
                </div>
                {children}
            </main>
        </div>
    );
}
