import prisma from '@/lib/prisma';
import styles from '@/app/[locale]/admin/admin.module.css';
import { getTranslations, getLocale } from 'next-intl/server';
import { FileText, Users, MessageSquare, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

async function getDashboardData() {
    const [leadsCount, contactsCount, articlesCount, recentLeads, recentContacts] = await Promise.all([
        prisma.lead.count(),
        prisma.contactSubmission.count(),
        prisma.article.count(),
        prisma.lead.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
        prisma.contactSubmission.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
    ]);

    return { leadsCount, contactsCount, articlesCount, recentLeads, recentContacts };
}

export default async function AdminDashboard() {
    const data = await getDashboardData();
    const t = await getTranslations('Admin');
    const locale = await getLocale();

    const stats = [
        { label: t('articles'), value: data.articlesCount, icon: <FileText size={24} />, color: '#3B82F6' },
        { label: t('leads'), value: data.leadsCount, icon: <Users size={24} />, color: '#10B981' },
        { label: t('contacts'), value: data.contactsCount, icon: <MessageSquare size={24} />, color: '#F59E0B' },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Stats Grid */}
            <div className={styles.statsGrid}>
                {stats.map((stat, i) => (
                    <div key={i} className={styles.statCard} style={{ position: 'relative', overflow: 'hidden' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <span className={styles.statLabel}>{stat.label}</span>
                                <span className={styles.statValue}>{stat.value}</span>
                            </div>
                            <div style={{ background: `${stat.color}10`, color: stat.color, padding: '0.75rem', borderRadius: '12px' }}>
                                {stat.icon}
                            </div>
                        </div>
                        <div style={{
                            position: 'absolute',
                            bottom: '-20px',
                            right: '-20px',
                            opacity: 0.05,
                            transform: 'scale(3)'
                        }}>
                            {stat.icon}
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
                {/* Recent Leads */}
                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '24px', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-md)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-secondary)' }}>Recent Leads</h2>
                        <Link href={`/${locale}/admin/leads`} style={{ fontSize: '0.875rem', color: 'var(--color-primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            View All <ArrowUpRight size={16} />
                        </Link>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {data.recentLeads.map((lead) => (
                            <div key={lead.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderRadius: '16px', background: '#F8FAFC', border: '1px solid #F1F5F9' }}>
                                <div>
                                    <div style={{ fontWeight: 600, color: '#1E293B' }}>{lead.name || 'Anonymous'}</div>
                                    <div style={{ fontSize: '0.875rem', color: '#64748B' }}>{lead.email}</div>
                                </div>
                                <div style={{ fontSize: '0.75rem', color: '#94A3B8', textAlign: 'right' }}>
                                    {new Date(lead.createdAt).toLocaleDateString(locale)}
                                </div>
                            </div>
                        ))}
                        {data.recentLeads.length === 0 && <div style={{ textAlign: 'center', padding: '2rem', color: '#94A3B8' }}>No leads yet.</div>}
                    </div>
                </div>

                {/* Recent Messages */}
                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '24px', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-md)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0F172A' }}>Recent Messages</h2>
                        <Link href={`/${locale}/admin/contacts`} style={{ fontSize: '0.875rem', color: 'var(--color-primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            View All <ArrowUpRight size={16} />
                        </Link>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {data.recentContacts.map((contact) => (
                            <div key={contact.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '1rem', borderRadius: '16px', background: '#F8FAFC', border: '1px solid #F1F5F9' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ fontWeight: 600, color: '#1E293B' }}>{contact.name}</div>
                                    <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{new Date(contact.createdAt).toLocaleDateString(locale)}</div>
                                </div>
                                <div style={{ fontSize: '0.875rem', color: '#475569', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                                    {contact.message}
                                </div>
                            </div>
                        ))}
                        {data.recentContacts.length === 0 && <div style={{ textAlign: 'center', padding: '2rem', color: '#94A3B8' }}>No messages yet.</div>}
                    </div>
                </div>
            </div>
        </div>
    );
}
