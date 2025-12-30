import prisma from '@/lib/prisma';
import styles from '@/app/[locale]/admin/admin.module.css';
import { getTranslations, getLocale } from 'next-intl/server';
import { Mail, Calendar, MessageSquare, User } from 'lucide-react';

async function getContacts() {
    return prisma.contactSubmission.findMany({
        orderBy: { createdAt: 'desc' },
    });
}

export default async function ContactsPage() {
    const contacts = await getContacts();
    const t = await getTranslations('Admin');
    const locale = await getLocale();

    return (
        <div>
            <div className={styles.header}>
                <h1 className={styles.headerTitle}>{t('contacts')}</h1>
            </div>

            <div className={styles.statsGrid} style={{ marginBottom: '2rem' }}>
                {contacts.map((contact) => (
                    <div key={contact.id} className={styles.statCard} style={{ padding: '1.5rem', gap: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    background: '#F1F5F9',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 'bold',
                                    color: '#64748B'
                                }}>
                                    {contact.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <div style={{ fontWeight: 600, color: '#0F172A' }}>{contact.name}</div>
                                    <div style={{ fontSize: '0.875rem', color: '#64748B' }}>{contact.email}</div>
                                </div>
                            </div>
                            <span style={{ fontSize: '0.75rem', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                <Calendar size={12} />
                                {new Date(contact.createdAt).toLocaleDateString(locale)}
                            </span>
                        </div>

                        <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                            {contact.subject && (
                                <div style={{ marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem', color: '#334155' }}>
                                    {contact.subject}
                                </div>
                            )}
                            <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: '1.5' }}>
                                {contact.message}
                            </p>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
                            <a href={`mailto:${contact.email}`} className={styles.button} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                <Mail size={16} />
                                Reply
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            {contacts.length === 0 && (
                <div style={{ textAlign: 'center', padding: '4rem', background: 'white', borderRadius: '24px', border: '1px solid #E2E8F0' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                        <MessageSquare size={48} color="#E2E8F0" />
                        <p style={{ color: '#64748B' }}>No messages found.</p>
                    </div>
                </div>
            )}
        </div>
    );
}
