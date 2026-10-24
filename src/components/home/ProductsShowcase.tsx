import { getTranslations } from 'next-intl/server';
import Reveal from '@/components/ui/Reveal';
import { LayoutDashboard, MessageCircle, Sparkles } from 'lucide-react';
import CrmShowcase from './CrmShowcase';
import WhatsAppShowcase from './WhatsAppShowcase';
import EcosystemFlow from './EcosystemFlow';
import styles from './products.module.css';

export default async function ProductsShowcase({ locale }: { locale: string }) {
    const t = await getTranslations({ locale, namespace: 'Products' });

    return (
        <>
            <section id="products" className={styles.lightSection}>
                <div className={`${styles.glow} ${styles.glowOrangeTop}`} />
                <div className={`${styles.glow} ${styles.glowOrangeMid}`} />

                <div className={styles.wide}>
                    <Reveal>
                        <div className={styles.header}>
                            <span className={`${styles.eyebrow} ${styles.headerEyebrow}`}>
                                <Sparkles size={14} /> {t('eyebrow')}
                            </span>
                            <h2 className={styles.headerTitle}>
                                {t('titleStart')} <span className={styles.highlight}>{t('titleHighlight')}</span>
                            </h2>
                            <p className={styles.headerDesc}>{t('subtitle')}</p>

                            <nav className={styles.productNav}>
                                <a href="#home-crm" className={styles.productNavItem}>
                                    <span className={`${styles.productNavIcon} ${styles.productLogoCrm}`}>
                                        <LayoutDashboard size={18} />
                                    </span>
                                    <span>
                                        <span className={styles.productNavName}>{t('nav.crm')}</span>
                                        <span className={styles.productNavHint}>{t('nav.crmHint')}</span>
                                    </span>
                                </a>
                                <a href="#home-whatsapp" className={styles.productNavItem}>
                                    <span className={`${styles.productNavIcon} ${styles.productLogoWa}`}>
                                        <MessageCircle size={18} />
                                    </span>
                                    <span>
                                        <span className={styles.productNavName}>{t('nav.whatsapp')}</span>
                                        <span className={styles.productNavHint}>{t('nav.whatsappHint')}</span>
                                    </span>
                                </a>
                            </nav>
                        </div>
                    </Reveal>

                    <CrmShowcase locale={locale} />
                </div>
            </section>

            <WhatsAppShowcase locale={locale} />
            <EcosystemFlow locale={locale} />
        </>
    );
}
