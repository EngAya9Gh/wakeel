import { getTranslations } from 'next-intl/server';
import { Shuffle, UserRound, Users } from 'lucide-react';
import WindowFrame from './WindowFrame';
import styles from './mockups.module.css';

type Member = { name: string; onShift: boolean };
type Shift = { name: string; start: string; end: string; days: number[]; people: number };

const shiftColors = ['#F59E0B', '#8B5CF6', '#0EA5E9'];

export default async function ShiftsMockup({ locale }: { locale: string }) {
    const t = await getTranslations({ locale, namespace: 'WhatsAppMockups.shifts' });
    const tabs = t.raw('tabs') as string[];
    const members = t.raw('members') as Member[];
    const days = t.raw('days') as string[];
    const shifts = t.raw('list') as Shift[];
    const onDuty = members.filter((m) => m.onShift).length;

    return (
        <WindowFrame url={t('url')}>
            <div className={styles.page}>
                <div>
                    <div className={styles.pageTitle}>{t('title')}</div>
                    <div className={styles.pageSubtitle}>{t('subtitle')}</div>
                </div>

                <div className={styles.tabs}>
                    {tabs.map((tab, i) => (
                        <span key={tab} className={`${styles.tab} ${i === 0 ? styles.tabActive : ''}`}>{tab}</span>
                    ))}
                </div>

                <div className={`${styles.card} ${styles.teamCard}`}>
                    <div className={styles.teamHead}>
                        <span className={styles.teamName}>
                            <span className={styles.colorDot} style={{ background: '#FF6600' }} /> {t('team')}
                        </span>
                        <span className={`${styles.channelPill} ${styles.ltr}`}>{t('channel')}</span>
                    </div>
                    <div className={styles.members}>
                        {members.map((member) => (
                            <span key={member.name} className={styles.member}>
                                <span className={`${styles.memberDot} ${member.onShift ? styles.memberOn : ''}`} />
                                {member.name}
                            </span>
                        ))}
                    </div>
                    <div className={styles.routing}><Shuffle size={12} /> {t('routing')}</div>
                </div>

                <div className={styles.card}>
                    {shifts.map((shift, i) => (
                        <div key={shift.name} className={styles.shiftRow}>
                            <span className={styles.colorDot} style={{ background: shiftColors[i % shiftColors.length] }} />
                            <div className={styles.shiftInfo}>
                                <div className={styles.shiftName}>{shift.name}</div>
                                <div className={styles.shiftTime}>
                                    <span className={styles.ltr}>{shift.start} – {shift.end}</span>
                                    {shift.end === '00:00' && <> ({t('nextDay')})</>}
                                </div>
                            </div>
                            <div className={styles.days}>
                                {days.map((day, d) => (
                                    <span key={day} className={`${styles.day} ${shift.days.includes(d) ? styles.dayOn : ''}`}>{day}</span>
                                ))}
                            </div>
                            <span className={styles.peopleCount}><UserRound size={11} /> {shift.people} {t('people')}</span>
                        </div>
                    ))}
                </div>

                <div className={styles.dutyRow}>
                    <div className={styles.duty}>
                        <div className={styles.dutyValue} style={{ color: '#10B981' }}>{onDuty}</div>
                        <div className={styles.dutyLabel}><Users size={9} /> {t('onDuty')}</div>
                    </div>
                    {shifts.map((shift, i) => (
                        <div key={shift.name} className={styles.duty}>
                            <div className={styles.dutyValue} style={{ color: shiftColors[i % shiftColors.length] }}>{shift.people}</div>
                            <div className={styles.dutyLabel}>{shift.name}</div>
                        </div>
                    ))}
                </div>
            </div>
        </WindowFrame>
    );
}
