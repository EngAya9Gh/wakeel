import prisma from '@/lib/prisma';
import styles from '@/app/[locale]/admin/admin.module.css';
import { getTranslations, getLocale } from 'next-intl/server';
import { Mail, Calendar, User, Phone } from 'lucide-react';

async function getLeads() {
    return prisma.lead.findMany({
        orderBy: { createdAt: 'desc' },
    });
}

export default async function LeadsPage() {
    const leads = await getLeads();
    const t = await getTranslations('Admin');
    const locale = await getLocale();

    return (
        <div>
            <div className={styles.header}>
                <h1 className={styles.headerTitle}>{t('leads')}</h1>
            </div>

            <div className={styles.glassCard} style={{ background: 'white', padding: 0, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: locale === 'ar' ? 'right' : 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid #E2E8F0', backgroundColor: '#F8FAFC' }}>
                            <th style={{ padding: '1rem', fontWeight: '600', color: '#64748B' }}>ID</th>
                            <th style={{ padding: '1rem', fontWeight: '600', color: '#64748B' }}>Name</th>
                            <th style={{ padding: '1rem', fontWeight: '600', color: '#64748B' }}>Email</th>
                            <th style={{ padding: '1rem', fontWeight: '600', color: '#64748B' }}>Phone</th>
                            <th style={{ padding: '1rem', fontWeight: '600', color: '#64748B' }}>Source</th>
                            <th style={{ padding: '1rem', fontWeight: '600', color: '#64748B' }}>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leads.map((lead) => (
                            <tr key={lead.id} style={{ borderBottom: '1px solid #E2E8F0' }}>
                                <td style={{ padding: '1rem', color: '#94A3B8' }}>#{lead.id}</td>
                                <td style={{ padding: '1rem', fontWeight: '500' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <div style={{ padding: '4px', background: '#F1F5F9', borderRadius: '50%' }}>
                                            <User size={14} color="#64748B" />
                                        </div>
                                        {lead.name || 'Anonymous'}
                                    </div>
                                </td>
                                <td style={{ padding: '1rem', color: 'var(--color-primary)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Mail size={14} />
                                        {lead.email}
                                    </div>
                                </td>
                                <td style={{ padding: '1rem', color: '#475569' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Phone size={14} />
                                        {lead.phone || '-'}
                                    </div>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '20px',
                                        background: '#DBEAFE',
                                        color: '#1E40AF',
                                        fontSize: '0.875rem',
                                        fontWeight: '500'
                                    }}>
                                        {lead.source}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem', color: '#64748B' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Calendar size={14} />
                                        {new Date(lead.createdAt).toLocaleDateString(locale)}
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {leads.length === 0 && (
                            <tr>
                                <td colSpan={5} style={{ padding: '3rem', textAlign: 'center', color: '#64748B' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                                        <User size={48} color="#E2E8F0" />
                                        <p>No leads found.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
