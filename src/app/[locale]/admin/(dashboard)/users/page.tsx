import prisma from '@/lib/prisma';
import styles from '@/app/[locale]/admin/admin.module.css';
import { getTranslations, getLocale } from 'next-intl/server';
import { Edit, Plus, User as UserIcon, Shield } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import DeleteUserButton from '@/components/admin/DeleteUserButton';

async function getUsers() {
    return prisma.user.findMany({
        orderBy: { createdAt: 'desc' },
    });
}

export default async function UsersPage() {
    const session = await auth();
    const locale = await getLocale();

    if (!session || session.user.role !== 'ADMIN') {
        redirect(`/${locale}/admin`);
    }

    const users = await getUsers();
    const t = await getTranslations('Admin');

    return (
        <div>
            <div className={styles.header}>
                <h1 className={styles.headerTitle}>{t('users')}</h1>
                <Link href="/admin/users/new" className={styles.button} style={{ width: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Plus size={20} />
                    <span>{t('addUser')}</span>
                </Link>
            </div>

            <div className={styles.glassCard} style={{ background: 'white', padding: 0, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: locale === 'ar' ? 'right' : 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid #E2E8F0', backgroundColor: '#F8FAFC' }}>
                            <th style={{ padding: '1rem', fontWeight: '600', color: '#64748B' }}>User</th>
                            <th style={{ padding: '1rem', fontWeight: '600', color: '#64748B' }}>Email</th>
                            <th style={{ padding: '1rem', fontWeight: '600', color: '#64748B' }}>Role</th>
                            <th style={{ padding: '1rem', fontWeight: '600', color: '#64748B' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} style={{ borderBottom: '1px solid #E2E8F0' }}>
                                <td style={{ padding: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <UserIcon size={16} color="#64748B" />
                                        </div>
                                        <span style={{ fontWeight: 600 }}>{user.name}</span>
                                    </div>
                                </td>
                                <td style={{ padding: '1rem', color: '#64748B' }}>{user.email}</td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '20px',
                                        background: user.role === 'ADMIN' ? '#fee2e2' : '#dcfce7',
                                        color: user.role === 'ADMIN' ? '#991b1b' : '#166534',
                                        fontSize: '0.75rem',
                                        fontWeight: 700,
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.25rem'
                                    }}>
                                        <Shield size={12} />
                                        {user.role}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <Link href={`/admin/users/${user.id}`} style={{ padding: '0.5rem', borderRadius: '8px', backgroundColor: '#F1F5F9', color: '#475569' }}>
                                            <Edit size={18} />
                                        </Link>
                                        <DeleteUserButton id={user.id} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
