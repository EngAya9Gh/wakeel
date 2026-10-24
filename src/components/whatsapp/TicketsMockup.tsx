import { getTranslations } from 'next-intl/server';
import { ChevronDown, Search, Sparkles } from 'lucide-react';
import WindowFrame from './WindowFrame';
import { avatarColors } from './InboxMockup';
import styles from './mockups.module.css';

type TicketStatus = 'open' | 'pending' | 'resolved' | 'closed';
type TicketRow = { id: string; subject: string; status: TicketStatus; agent: string; rating: number };

export const statusClass: Record<TicketStatus, string> = {
    open: styles.statusOpen,
    pending: styles.statusPending,
    resolved: styles.statusResolved,
    closed: styles.statusClosed
};

function Stars({ rating }: { rating: number }) {
    if (!rating) return <span className={`${styles.stars} ${styles.starsEmpty}`}>—</span>;
    return (
        <span className={styles.stars}>
            {'★'.repeat(rating)}<span className={styles.starsEmpty}>{'★'.repeat(5 - rating)}</span>
        </span>
    );
}

export default async function TicketsMockup({ locale }: { locale: string }) {
    const t = await getTranslations({ locale, namespace: 'WhatsAppMockups' });
    const rows = t.raw('tickets.rows') as TicketRow[];

    return (
        <WindowFrame url={t('tickets.url')}>
            <div className={styles.page}>
                <div>
                    <div className={styles.pageTitle}>🎫 {t('tickets.title')}</div>
                    <div className={styles.pageSubtitle}>{t('tickets.subtitle')}</div>
                </div>

                <div className={styles.toolbar}>
                    <span className={styles.search}><Search size={12} /> {t('tickets.search')}</span>
                    <span className={styles.select}>{t('tickets.filter')} <ChevronDown size={11} /></span>
                </div>

                <div className={`${styles.card} ${styles.table}`}>
                    <div className={`${styles.row} ${styles.rowHead}`}>
                        <span>{t('tickets.columns.id')}</span>
                        <span>{t('tickets.columns.subject')}</span>
                        <span>{t('tickets.columns.status')}</span>
                        <span className={styles.colAgent}>{t('tickets.columns.agent')}</span>
                        <span>{t('tickets.columns.rating')}</span>
                    </div>
                    {rows.map((row, i) => (
                        <div key={row.id} className={styles.row}>
                            <span className={styles.cellId}>{row.id}</span>
                            <span className={styles.cellSubject}>{row.subject}</span>
                            <span><span className={`${styles.status} ${statusClass[row.status]}`}>{t(`statuses.${row.status}`)}</span></span>
                            <span className={`${styles.cellAgent} ${styles.colAgent}`}>
                                <span className={styles.miniAvatar} style={{ background: avatarColors[(i + 1) % avatarColors.length] }}>
                                    {row.agent.charAt(0)}
                                </span>
                                {row.agent}
                            </span>
                            <Stars rating={row.rating} />
                        </div>
                    ))}
                </div>

                <div className={styles.summary}>
                    <Sparkles size={14} />
                    <span>
                        <span className={styles.summaryLabel}>{t('tickets.summaryLabel')}</span>
                        {t('tickets.summary')}
                    </span>
                </div>
            </div>
        </WindowFrame>
    );
}
