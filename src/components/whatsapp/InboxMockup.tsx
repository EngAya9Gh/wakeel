import { getTranslations } from 'next-intl/server';
import {
    CheckCheck, ChevronDown, Lock, Mic, Paperclip, Search, SendHorizontal, Smile, UserRound, X
} from 'lucide-react';
import WindowFrame from './WindowFrame';
import styles from './mockups.module.css';

export type Thread = {
    name: string;
    initials: string;
    message: string;
    time: string;
    tag: string;
    tone: 'red' | 'amber' | 'blue' | '';
    unread: number;
    agent: string;
};

export const tagTones = {
    red: { background: '#FEF2F2', color: '#DC2626' },
    amber: { background: '#FFFBEB', color: '#D97706' },
    blue: { background: '#EFF6FF', color: '#2563EB' }
};

export const avatarColors = ['#FF6600', '#8B5CF6', '#0EA5E9', '#10B981'];

export default async function InboxMockup({ locale, height = 440 }: { locale: string; height?: number }) {
    const t = await getTranslations({ locale, namespace: 'WhatsAppMockups' });
    const threads = t.raw('inbox.threads') as Thread[];
    const active = threads[0];

    return (
        <WindowFrame url={t('inbox.url')}>
            <div className={styles.inbox} style={{ height }}>
                <div className={styles.threads}>
                    <div className={styles.threadsHead}>
                        <div className={styles.threadsTitle}>
                            {t('inbox.title')}
                            <span className={styles.countBadge}>{threads.reduce((sum, th) => sum + th.unread, 0)}</span>
                        </div>
                        <div className={styles.search}><Search size={12} /> {t('inbox.search')}</div>
                        <div className={styles.filters}>
                            <span className={styles.filter}>{t('inbox.filterNumbers')} <ChevronDown size={10} /></span>
                            <span className={styles.filter}>{t('inbox.filterTags')} <ChevronDown size={10} /></span>
                        </div>
                    </div>

                    {threads.map((thread, i) => (
                        <div key={thread.name} className={`${styles.thread} ${i === 0 ? styles.threadActive : ''}`}>
                            <span className={styles.avatar} style={{ background: avatarColors[i % avatarColors.length] }}>
                                {thread.initials}
                            </span>
                            <div className={styles.threadBody}>
                                <div className={styles.threadTop}>
                                    <span className={styles.threadName}>{thread.name}</span>
                                    <span className={styles.threadTime}>{thread.time}</span>
                                </div>
                                <div className={styles.threadMsg}>{thread.message}</div>
                                <div className={styles.threadMeta}>
                                    {thread.tone && (
                                        <span className={styles.tag} style={tagTones[thread.tone]}>{thread.tag}</span>
                                    )}
                                    <span className={styles.agentChip}><UserRound size={10} /> {thread.agent}</span>
                                    {thread.unread > 0 && <span className={styles.unread}>{thread.unread}</span>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.chat}>
                    <div className={styles.chatHead}>
                        <span className={styles.avatar} style={{ background: avatarColors[0] }}>{active.initials}</span>
                        <div>
                            <div className={styles.chatName}>{active.name}</div>
                            <div className={`${styles.chatPhone} ${styles.ltr}`}>{t('inbox.phone')}</div>
                        </div>
                        <span className={styles.stagePill}>{t('inbox.stage')}</span>
                    </div>

                    <div className={styles.ticketBar}>
                        <span className={styles.ticketId}>TKT-1042</span>
                        <span className={`${styles.status} ${styles.statusOpen}`}>{t('statuses.open')}</span>
                        <span className={styles.category}>{t('inbox.ticketCategory')}</span>
                        <span className={styles.assignee}>
                            <span className={styles.miniAvatar}>{t('inbox.assignee').charAt(0)}</span>
                            {t('inbox.assignee')}
                        </span>
                        <span className={styles.ticketActions}>
                            <span className={styles.btn}><UserRound size={10} /> {t('inbox.assign')}</span>
                            <span className={`${styles.btn} ${styles.btnDanger}`}><X size={10} /> {t('inbox.close')}</span>
                        </span>
                    </div>

                    <div className={styles.messages}>
                        <div className={`${styles.msg} ${styles.msgIn}`}>
                            {t('inbox.msgIn1')}
                            <div className={styles.msgTime}>10:40</div>
                        </div>
                        <div className={styles.note}>
                            <Lock size={11} />
                            <span>
                                {t('inbox.note')} <span className={styles.noteAuthor}>— {t('inbox.noteAuthor')}</span>
                            </span>
                        </div>
                        <div className={`${styles.msg} ${styles.msgOut}`}>
                            {t('inbox.msgOut1')}
                            <div className={styles.msgTime}>10:41 <CheckCheck size={13} /></div>
                        </div>
                        <div className={`${styles.msg} ${styles.msgIn}`}>
                            {t('inbox.msgIn2')}
                            <div className={styles.msgTime}>10:42</div>
                        </div>
                        <div className={styles.typing}><span /><span /><span /></div>
                    </div>

                    <div className={styles.composer}>
                        <Smile size={16} />
                        <Paperclip size={16} />
                        <span className={styles.composerInput}>{t('inbox.composer')}</span>
                        <Mic size={16} />
                        <span className={styles.send}><SendHorizontal size={14} className={styles.flipRtl} /></span>
                    </div>
                </div>
            </div>
        </WindowFrame>
    );
}
