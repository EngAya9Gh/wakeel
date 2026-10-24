import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import Reveal from '@/components/ui/Reveal';
import { ArrowRight, Link2, MessageCircle, Sparkles, Star, UserPlus } from 'lucide-react';
import styles from './products.module.css';

type Step = { title: string; desc: string };

// Each step happens on one side of the integration: the WhatsApp platform or the CRM
const stepMeta = [
    { icon: MessageCircle, side: 'wa' },
    { icon: UserPlus, side: 'crm' },
    { icon: Sparkles, side: 'wa' },
    { icon: Star, side: 'crm' }
];

export default async function EcosystemFlow({ locale }: { locale: string }) {
    const t = await getTranslations({ locale, namespace: 'Products.ecosystem' });
    const steps = t.raw('steps') as Step[];

    return (
        <section className={styles.flowSection}>
            <div className={styles.wide}>
                <Reveal>
                    <div className={styles.flowHeader}>
                        <span className={`${styles.eyebrow} ${styles.flowEyebrow}`}>
                            <Link2 size={14} /> {t('eyebrow')}
                        </span>
                        <h2 className={styles.headerTitle}>{t('title')}</h2>
                        <p className={styles.headerDesc}>{t('desc')}</p>
                    </div>
                </Reveal>

                <div className={styles.flow}>
                    <div className={styles.flowLine} aria-hidden="true" />
                    {steps.map((step, i) => {
                        const { icon: Icon, side } = stepMeta[i];
                        return (
                            <Reveal key={step.title} delay={i * 120}>
                                <div className={`${styles.step} ${side === 'wa' ? styles.stepWa : styles.stepCrm}`}>
                                    <div className={styles.stepIcon}>
                                        <Icon size={32} />
                                        <span className={styles.stepNum}>{i + 1}</span>
                                    </div>
                                    <span className={styles.stepTag}>{side === 'wa' ? 'WhatsApp' : 'CRM'}</span>
                                    <h3 className={styles.stepTitle}>{step.title}</h3>
                                    <p className={styles.stepDesc}>{step.desc}</p>
                                </div>
                            </Reveal>
                        );
                    })}
                </div>

                <div className={styles.flowCta}>
                    <Link href="/contact" className={styles.ctaPrimary}>
                        {t('cta')} <ArrowRight size={18} className={styles.flipRtl} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
