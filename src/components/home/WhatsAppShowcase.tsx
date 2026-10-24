import { Fragment } from 'react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import Reveal from '@/components/ui/Reveal';
import InboxMockup, { avatarColors, tagTones, type Thread } from '@/components/whatsapp/InboxMockup';
import { WHATSAPP_PLATFORM_URL } from '@/lib/links';
import {
    ArrowRight, BadgeCheck, Bot, ChartColumn, Check, ChevronRight, EyeOff, FileText, Image as ImageIcon, Inbox,
    KeyRound, LayoutTemplate, List, MapPin, Megaphone, MessageCircle, MessagesSquare, Mic, MousePointerClick,
    RefreshCw, Shuffle, Sparkles, Star, Store, Ticket, Type, Users, Video, Wallet, Webhook, Workflow
} from 'lucide-react';
import styles from './products.module.css';

type Stat = { value: string; label: string };
type Pillar = { title: string; desc: string };

const pillarIcons = [Inbox, Ticket, Shuffle, Star];

// Rendered beside the inbox tile, then after the campaigns tile
const teamFeatures = [
    { key: 'routing', icon: Users },
    { key: 'visibility', icon: EyeOff }
];
const moreFeatures = [
    { key: 'csat', icon: Star },
    { key: 'ai', icon: Sparkles },
    { key: 'crm', icon: RefreshCw },
    { key: 'bot', icon: Bot },
    { key: 'templates', icon: LayoutTemplate },
    { key: 'api', icon: Webhook }
];

const lifecycle = ['open', 'pending', 'resolved', 'closed'] as const;
const typeIcons = [Type, ImageIcon, FileText, Video, Mic, MousePointerClick, List, MapPin, BadgeCheck, Workflow];
const extraIcons = [KeyRound, ChartColumn, Wallet, Store];

export default async function WhatsAppShowcase({ locale }: { locale: string }) {
    const t = await getTranslations({ locale, namespace: 'Products.whatsapp' });
    const mockT = await getTranslations({ locale, namespace: 'WhatsAppMockups' });
    const pillars = t.raw('pillars') as Pillar[];
    const stats = t.raw('stats') as Stat[];
    const stages = t.raw('features.inbox.stages') as string[];
    const inboxChips = t.raw('features.inbox.chips') as string[];
    const campaignChips = t.raw('features.campaigns.chips') as string[];
    const campaignStats = t.raw('features.campaigns.stats') as Stat[];
    const threads = (mockT.raw('inbox.threads') as Thread[]).slice(0, 3);
    const types = t.raw('types') as string[];
    const extras = t.raw('extras') as string[];

    return (
        <section id="home-whatsapp" className={`${styles.darkSection} ${styles.anchor}`}>
            <div className={`${styles.glow} ${styles.glowGreenTop}`} />
            <div className={`${styles.glow} ${styles.glowGreenBottom}`} />

            <div className={styles.wide}>
                <div className={`${styles.showcase} ${styles.showcaseReverse}`}>
                    <Reveal>
                        <div className={styles.productBadge}>
                            <span className={`${styles.productLogo} ${styles.productLogoWa}`}>
                                <MessageCircle size={24} />
                            </span>
                            <span>
                                <span className={styles.productName}>{t('name')}</span>
                                <span className={styles.productTag}>{t('tag')}</span>
                            </span>
                        </div>

                        <h3 className={styles.showcaseTitle}>{t('title')}</h3>
                        <p className={styles.showcaseDesc}>{t('desc')}</p>

                        <div className={styles.pillars}>
                            {pillars.map((pillar, i) => {
                                const Icon = pillarIcons[i];
                                return (
                                    <div key={pillar.title} className={styles.pillar}>
                                        <span className={styles.pillarIcon}><Icon size={18} /></span>
                                        <span>
                                            <span className={styles.pillarTitle}>{pillar.title}</span>
                                            <span className={styles.pillarDesc}>{pillar.desc}</span>
                                        </span>
                                    </div>
                                );
                            })}
                        </div>

                        <p className={styles.officialNote}><BadgeCheck size={16} /> {t('officialNote')}</p>

                        <div className={styles.ctaRow}>
                            <a
                                href={WHATSAPP_PLATFORM_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`${styles.ctaPrimary} ${styles.ctaPrimaryWa}`}
                            >
                                {t('ctaPrimary')} <ArrowRight size={18} className={styles.flipRtl} />
                            </a>
                            <Link href="/services#whatsappOtp" className={`${styles.ctaGhost} ${styles.ctaGhostDark}`}>
                                {t('ctaSecondary')}
                            </Link>
                        </div>
                    </Reveal>

                    <Reveal delay={150}>
                        <div className={`${styles.visual} ${styles.visualWindow}`}>
                            <div className={`${styles.visualGlow} ${styles.visualGlowWa}`} />
                            <div className={styles.windowWrap}>
                                <InboxMockup locale={locale} height={440} />
                            </div>

                            {/* Floating UI cards */}
                            <div className={`${styles.floatCard} ${styles.floatDark} ${styles.fcRoute}`} aria-hidden="true">
                                <span className={styles.floatIcon} style={{ background: 'rgba(37, 211, 102, 0.15)', color: '#4ADE80' }}>
                                    <Shuffle size={18} />
                                </span>
                                <span>
                                    <span className={styles.floatValue}>{t('float.routeLabel')}</span>
                                    <span className={styles.floatLabel}>{t('float.routeMeta')}</span>
                                </span>
                            </div>
                            <div className={`${styles.floatCard} ${styles.floatDark} ${styles.fcRated}`} aria-hidden="true">
                                <span className={styles.floatIcon} style={{ background: 'rgba(251, 191, 36, 0.15)', color: '#FBBF24' }}>
                                    <Ticket size={18} />
                                </span>
                                <span>
                                    <span className={styles.floatValue}>{t('float.ticketLabel')}</span>
                                    <span className={styles.stars}>★★★★★</span>
                                    <span className={styles.floatLabel}>{t('float.ticketMeta')}</span>
                                </span>
                            </div>
                        </div>
                    </Reveal>
                </div>

                <Reveal>
                    <div className={`${styles.statsRow} ${styles.statsRowDark}`}>
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
                        <article className={`${styles.tile} ${styles.tileDark} ${styles.tileFeatured}`}>
                            <div className={styles.tileHead}>
                                <span className={styles.tileIcon}><MessagesSquare size={26} /></span>
                                <div className={styles.stages} aria-hidden="true">
                                    {stages.map((stage, i) => (
                                        <Fragment key={stage}>
                                            {i > 0 && <ChevronRight size={16} className={`${styles.stageArrow} ${styles.flipRtl}`} />}
                                            <span className={styles.stage}>{stage}</span>
                                        </Fragment>
                                    ))}
                                </div>
                            </div>
                            <h4 className={styles.tileTitle}>{t('features.inbox.title')}</h4>
                            <p className={styles.tileDesc}>{t('features.inbox.desc')}</p>
                            <div className={styles.chips}>
                                {inboxChips.map((chip) => (
                                    <span key={chip} className={`${styles.chip} ${styles.chipDark}`}>
                                        <Check size={14} color="#34D399" strokeWidth={3} /> {chip}
                                    </span>
                                ))}
                            </div>

                            <div className={styles.miniThreads} aria-hidden="true">
                                {threads.map((thread, i) => (
                                    <div key={thread.name} className={styles.miniThread}>
                                        <span className={styles.miniAvatar} style={{ background: avatarColors[i] }}>{thread.initials}</span>
                                        <span className={styles.miniThreadBody}>
                                            <span className={styles.miniThreadName}>{thread.name}</span>
                                            <span className={styles.miniThreadMsg}>{thread.message}</span>
                                        </span>
                                        {thread.tone && (
                                            <span className={styles.pill} style={tagTones[thread.tone]}>{thread.tag}</span>
                                        )}
                                        {thread.unread > 0 && <span className={styles.miniUnread}>{thread.unread}</span>}
                                    </div>
                                ))}
                            </div>
                        </article>
                    </Reveal>

                    <Reveal className={styles.span2} delay={100}>
                        <article className={`${styles.tile} ${styles.tileDark}`}>
                            <div className={styles.tileHead}>
                                <span className={styles.tileIcon}><Ticket size={24} /></span>
                                <div className={styles.lifecycle} aria-hidden="true">
                                    {lifecycle.map((status, i) => (
                                        <Fragment key={status}>
                                            {i > 0 && <ChevronRight size={14} className={`${styles.stageArrow} ${styles.flipRtl}`} />}
                                            <span className={`${styles.lifeStatus} ${styles[`life_${status}`]}`}>
                                                {mockT(`statuses.${status}`)}
                                            </span>
                                        </Fragment>
                                    ))}
                                </div>
                            </div>
                            <h4 className={styles.tileTitle}>{t('features.tickets.title')}</h4>
                            <p className={styles.tileDesc}>{t('features.tickets.desc')}</p>
                        </article>
                    </Reveal>

                    {teamFeatures.map(({ key, icon: Icon }, i) => (
                        <Reveal key={key} delay={i * 80}>
                            <article className={`${styles.tile} ${styles.tileDark}`}>
                                <span className={styles.tileIcon}><Icon size={24} /></span>
                                <h4 className={styles.tileTitle}>{t(`features.${key}.title`)}</h4>
                                <p className={styles.tileDesc}>{t(`features.${key}.desc`)}</p>
                            </article>
                        </Reveal>
                    ))}

                    <Reveal className={styles.span2}>
                        <article className={`${styles.tile} ${styles.tileDark} ${styles.tileCampaign}`}>
                            <div className={styles.tileHead}>
                                <span className={styles.tileIcon}><Megaphone size={24} /></span>
                                <span className={`${styles.pill} ${styles.metaPill}`}>
                                    <BadgeCheck size={14} /> WhatsApp Cloud API
                                </span>
                            </div>
                            <h4 className={styles.tileTitle}>{t('features.campaigns.title')}</h4>
                            <p className={styles.tileDesc}>{t('features.campaigns.desc')}</p>
                            <div className={styles.chips}>
                                {campaignChips.map((chip) => (
                                    <span key={chip} className={`${styles.chip} ${styles.chipDark}`}>
                                        <Check size={14} color="#34D399" strokeWidth={3} /> {chip}
                                    </span>
                                ))}
                            </div>
                            <div className={styles.campaignStats} aria-hidden="true">
                                {campaignStats.map((stat) => (
                                    <div key={stat.label} className={styles.campaignStat}>
                                        <span className={styles.campaignStatValue}>{stat.value}</span>
                                        <span className={styles.campaignStatLabel}>{stat.label}</span>
                                    </div>
                                ))}
                            </div>
                        </article>
                    </Reveal>

                    {moreFeatures.map(({ key, icon: Icon }, i) => (
                        <Reveal key={key} delay={(i % 4) * 80}>
                            <article className={`${styles.tile} ${styles.tileDark}`}>
                                <span className={styles.tileIcon}><Icon size={24} /></span>
                                <h4 className={styles.tileTitle}>{t(`features.${key}.title`)}</h4>
                                <p className={styles.tileDesc}>{t(`features.${key}.desc`)}</p>
                            </article>
                        </Reveal>
                    ))}
                </div>

                <div className={styles.typesMarquee}>
                    <div className={styles.typesTrack}>
                        {[0, 1].map((copy) => types.map((type, i) => {
                            const Icon = typeIcons[i];
                            return (
                                <span key={`${copy}-${type}`} className={styles.typeChip} aria-hidden={copy === 1}>
                                    <Icon size={16} /> {type}
                                </span>
                            );
                        }))}
                    </div>
                </div>

                <Reveal>
                    <div className={`${styles.trustStrip} ${styles.trustStripDark}`}>
                        <span className={styles.extrasLabel}>{t('extrasLabel')}</span>
                        {extras.map((item, i) => {
                            const Icon = extraIcons[i];
                            return (
                                <span key={item} className={styles.trustItem}>
                                    <Icon size={18} /> {item}
                                </span>
                            );
                        })}
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
