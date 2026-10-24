import { getTranslations } from 'next-intl/server';
import Reveal from '@/components/ui/Reveal';
import InboxMockup from '@/components/whatsapp/InboxMockup';
import TicketsMockup from '@/components/whatsapp/TicketsMockup';
import ShiftsMockup from '@/components/whatsapp/ShiftsMockup';
import { EyeOff, Inbox, LayoutDashboard, LayoutTemplate, Megaphone, RefreshCw, Shuffle, Sparkles, Star, Ticket } from 'lucide-react';
import styles from './services.module.css';

const features = [
    { key: 'campaigns', icon: Megaphone },
    { key: 'templates', icon: LayoutTemplate },
    { key: 'visibility', icon: EyeOff },
    { key: 'csat', icon: Star },
    { key: 'ai', icon: Sparkles },
    { key: 'crm', icon: RefreshCw }
];

export default async function WhatsAppScreens({ locale }: { locale: string }) {
    const t = await getTranslations({ locale, namespace: 'Services' });
    const featuresT = await getTranslations({ locale, namespace: 'Products.whatsapp.features' });

    return (
        <div className={styles.screens}>
            <Reveal>
                <div className={styles.screensHeader}>
                    <div className={styles.screensBadge}><LayoutDashboard size={16} /> {t('screensBadge')}</div>
                    <h3 className={styles.screensTitle}>{t('screensTitle')}</h3>
                    <p className={styles.screensDesc}>{t('screensDesc')}</p>
                </div>
            </Reveal>

            <Reveal>
                <figure className={styles.figure}>
                    <InboxMockup locale={locale} height={500} />
                    <figcaption className={styles.figcaption}><Inbox size={16} /> {t('screens.inbox')}</figcaption>
                </figure>
            </Reveal>

            <div className={styles.screensGrid}>
                <Reveal>
                    <figure className={styles.figure}>
                        <TicketsMockup locale={locale} />
                        <figcaption className={styles.figcaption}><Ticket size={16} /> {t('screens.tickets')}</figcaption>
                    </figure>
                </Reveal>
                <Reveal delay={150}>
                    <figure className={styles.figure}>
                        <ShiftsMockup locale={locale} />
                        <figcaption className={styles.figcaption}><Shuffle size={16} /> {t('screens.shifts')}</figcaption>
                    </figure>
                </Reveal>
            </div>

            <div className={styles.featureGrid}>
                {features.map(({ key, icon: Icon }, i) => (
                    <Reveal key={key} delay={i * 100}>
                        <div className={styles.featureCard}>
                            <div className={styles.featureIcon}><Icon size={24} /></div>
                            <h4 className={styles.featureTitle}>{featuresT(`${key}.title`)}</h4>
                            <p className={styles.featureDesc}>{featuresT(`${key}.desc`)}</p>
                        </div>
                    </Reveal>
                ))}
            </div>
        </div>
    );
}
