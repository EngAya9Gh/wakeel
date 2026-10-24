import type { CSSProperties } from 'react';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import Reveal from '@/components/ui/Reveal';
import GooglePlayButton from '@/components/ui/GooglePlayButton';
import {
    ArrowRight, BrainCircuit, CalendarCheck, ChartColumn, Check, Code, Flame, LayoutDashboard, Lock,
    Magnet, Receipt, ScanBarcode, ShieldCheck, Smartphone, Sparkles, Ticket, TrendingUp, UserPlus, UserRound, Users
} from 'lucide-react';
import styles from './products.module.css';

type Stat = { value: string; label: string };
type ScoredLead = { name: string; score: number; label: string; tone: 'hot' | 'warm' | 'cold' };

const toneColors = { hot: '#FF6600', warm: '#F59E0B', cold: '#38BDF8' };

const features = [
    { key: 'profile', icon: UserRound },
    { key: 'reports', icon: ChartColumn },
    { key: 'appointments', icon: CalendarCheck },
    { key: 'invoices', icon: Receipt },
    { key: 'tickets', icon: Ticket },
    { key: 'inventory', icon: ScanBarcode }
];

// Facebook, Instagram, TikTok, WhatsApp, contact form, landing pages, website forms
const sourceColors = ['#1877F2', '#E1306C', '#111111', '#25D366', '#FF6600', '#8B5CF6', '#0EA5E9'];
const trustIcons = [ShieldCheck, Lock, Users, Code];

function ScoreRing({ score, track }: { score: number; track: string }) {
    const radius = 20;
    const circumference = 2 * Math.PI * radius;

    return (
        <div className={styles.scoreRing}>
            <svg width="48" height="48" viewBox="0 0 48 48" aria-hidden="true">
                <circle cx="24" cy="24" r={radius} fill="none" stroke={track} strokeWidth="5" />
                <circle
                    cx="24" cy="24" r={radius} fill="none"
                    stroke="var(--color-primary)" strokeWidth="5" strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference * (1 - score / 100)}
                />
            </svg>
            <span className={styles.scoreRingValue}>{score}</span>
        </div>
    );
}

export default async function CrmShowcase({ locale }: { locale: string }) {
    const t = await getTranslations({ locale, namespace: 'Products.crm' });
    const highlights = t.raw('highlights') as string[];
    const stats = t.raw('stats') as Stat[];
    const prompts = t.raw('features.ai.prompts') as string[];
    const scoredLeads = t.raw('features.ai.leads') as ScoredLead[];
    const sources = t.raw('features.leads.sources') as string[];
    const trust = t.raw('trust') as string[];

    return (
        <div id="home-crm" className={styles.anchor}>
            <div className={styles.showcase}>
                <Reveal>
                    <div className={styles.productBadge}>
                        <span className={`${styles.productLogo} ${styles.productLogoCrm}`}>
                            <LayoutDashboard size={24} />
                        </span>
                        <span>
                            <span className={styles.productName} style={{ color: 'var(--color-secondary)' }}>{t('name')}</span>
                            <span className={styles.productTag}>{t('tag')}</span>
                        </span>
                    </div>

                    <h3 className={styles.showcaseTitle}>{t('title')}</h3>
                    <p className={styles.showcaseDesc}>{t('desc')}</p>

                    <ul className={styles.highlights}>
                        {highlights.map((item) => (
                            <li key={item}>
                                <span className={`${styles.check} ${styles.checkCrm}`}>
                                    <Check size={15} strokeWidth={3} />
                                </span>
                                {item}
                            </li>
                        ))}
                    </ul>

                    <div className={styles.ctaRow}>
                        <Link href="/contact" className={`${styles.ctaPrimary} ${styles.ctaPrimaryCrm}`}>
                            {t('ctaPrimary')} <ArrowRight size={18} className={styles.flipRtl} />
                        </Link>
                        <Link href="/services#crm" className={`${styles.ctaGhost} ${styles.ctaGhostLight}`}>
                            {t('ctaSecondary')}
                        </Link>
                    </div>

                    <div className={styles.appRow}>
                        <GooglePlayButton caption={t('playCaption')} ariaLabel={t('playAria')} />
                        <span className={styles.appNote}>
                            <Smartphone size={16} /> {t('appAvailable')}
                        </span>
                    </div>
                </Reveal>

                <Reveal delay={150}>
                    <div className={styles.visual}>
                        <div className={`${styles.visualGlow} ${styles.visualGlowCrm}`} />
                        <div className={styles.orbit} />

                        <div className={styles.phoneStack}>
                            <div className={`${styles.phone} ${styles.phoneSideStart}`}>
                                <div className={styles.phoneScreen}>
                                    <Image src="/crm/crmn.jpg" alt={t('screens.clients')} fill sizes="220px" />
                                </div>
                            </div>
                            <div className={`${styles.phone} ${styles.phoneSideEnd}`}>
                                <div className={styles.phoneScreen}>
                                    <Image src="/crm/crm-1.jpg" alt={t('screens.kpis')} fill sizes="220px" />
                                </div>
                            </div>
                            <div className={`${styles.phone} ${styles.phoneFront}`}>
                                <div className={styles.phoneScreen}>
                                    <Image src="/crm/client-ai.png" alt={t('screens.ai')} fill sizes="280px" />
                                </div>
                            </div>

                            {/* Floating UI cards */}
                            <div className={`${styles.floatCard} ${styles.floatLight} ${styles.fcLead}`} aria-hidden="true">
                                <span className={styles.floatIcon} style={{ background: '#111111', color: 'white' }}>
                                    <UserPlus size={18} />
                                </span>
                                <span>
                                    <span className={styles.floatValue}>{t('float.newLeadTitle')}</span>
                                    <span className={styles.floatLabel}>{t('float.newLeadMeta')}</span>
                                </span>
                            </div>
                            <div className={`${styles.floatCard} ${styles.floatLight} ${styles.fcKpi}`} aria-hidden="true">
                                <span className={styles.floatIcon} style={{ background: 'rgba(16, 185, 129, 0.12)', color: '#059669' }}>
                                    <TrendingUp size={18} />
                                </span>
                                <span>
                                    <span className={styles.floatLabel}>{t('float.kpiLabel')}</span>
                                    <span className={styles.floatValue}>{t('float.kpiValue')}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </div>

            <Reveal>
                <div className={`${styles.statsRow} ${styles.statsRowLight}`}>
                    {stats.map((stat) => (
                        <div key={stat.label} className={styles.stat}>
                            <div className={styles.statValue}>{stat.value}</div>
                            <div className={styles.statLabel}>{stat.label}</div>
                        </div>
                    ))}
                </div>
            </Reveal>

            <div className={styles.bento}>
                <Reveal className={styles.span2x2}>
                    <article className={`${styles.tile} ${styles.tileAi}`}>
                        <div className={styles.tileHead}>
                            <span className={styles.tileIcon}><BrainCircuit size={26} /></span>
                            <span className={`${styles.pill} ${styles.aiPowered}`}>
                                <Sparkles size={14} /> {t('features.ai.powered')}
                            </span>
                        </div>
                        <h4 className={styles.tileTitle}>{t('features.ai.title')}</h4>
                        <p className={styles.tileDesc}>{t('features.ai.desc')}</p>

                        <div className={styles.insight}>
                            <ScoreRing score={87} track="rgba(255, 255, 255, 0.1)" />
                            <div>
                                <div className={styles.insightLabel}>
                                    <Sparkles size={12} /> {t('features.ai.insightLabel')}
                                </div>
                                <p className={styles.insightText}>{t('features.ai.insight')}</p>
                            </div>
                        </div>

                        <div className={styles.scoredLeads} aria-hidden="true">
                            <div className={styles.insightLabel}>
                                <Flame size={12} /> {t('features.ai.leadsLabel')}
                            </div>
                            {scoredLeads.map((lead) => (
                                <div key={lead.name} className={styles.scoredLead}>
                                    <span className={styles.scoredName}>{lead.name}</span>
                                    <span className={styles.scoredBar}>
                                        <span
                                            className={styles.progressFill}
                                            style={{ '--fill': `${lead.score}%`, background: toneColors[lead.tone] } as CSSProperties}
                                        />
                                    </span>
                                    <span className={styles.scoredValue}>{lead.score}</span>
                                    <span
                                        className={styles.pill}
                                        style={{ color: toneColors[lead.tone], background: `${toneColors[lead.tone]}1F` }}
                                    >
                                        {lead.label}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className={styles.prompts}>
                            {prompts.map((prompt) => (
                                <span key={prompt} className={styles.prompt}>
                                    <Sparkles size={14} /> {prompt}
                                </span>
                            ))}
                        </div>
                    </article>
                </Reveal>

                <Reveal className={styles.span2} delay={100}>
                    <article className={`${styles.tile} ${styles.tileLight}`}>
                        <span className={styles.tileIcon}><Magnet size={24} /></span>
                        <h4 className={styles.tileTitle}>{t('features.leads.title')}</h4>
                        <p className={styles.tileDesc}>{t('features.leads.desc')}</p>
                        <div className={styles.sourcesFlow}>
                            <div className={styles.chips}>
                                {sources.map((source, i) => (
                                    <span key={source} className={`${styles.chip} ${styles.chipLight}`}>
                                        <span className={styles.dot} style={{ background: sourceColors[i] }} />
                                        {source}
                                    </span>
                                ))}
                            </div>
                            <div className={styles.sourcesTarget} aria-hidden="true">
                                <span className={styles.sourcesTargetIcon}><UserPlus size={26} /></span>
                                CRM
                            </div>
                        </div>
                    </article>
                </Reveal>

                {features.map(({ key, icon: Icon }, i) => (
                    <Reveal key={key} delay={(i % 4) * 80}>
                        <article className={`${styles.tile} ${styles.tileLight}`}>
                            <span className={styles.tileIcon}><Icon size={24} /></span>
                            <h4 className={styles.tileTitle}>{t(`features.${key}.title`)}</h4>
                            <p className={styles.tileDesc}>{t(`features.${key}.desc`)}</p>
                        </article>
                    </Reveal>
                ))}
            </div>

            <Reveal>
                <div className={`${styles.trustStrip} ${styles.trustStripLight}`}>
                    {trust.map((item, i) => {
                        const Icon = trustIcons[i];
                        return (
                            <span key={item} className={styles.trustItem}>
                                <Icon size={18} /> {item}
                            </span>
                        );
                    })}
                </div>
            </Reveal>
        </div>
    );
}
