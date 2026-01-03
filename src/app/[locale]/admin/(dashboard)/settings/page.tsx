import { getSettings, updateSettings } from '@/actions/admin/settings';
import { getTranslations } from 'next-intl/server';
import styles from '@/app/[locale]/admin/admin.module.css';

export default async function SettingsPage() {
    const settings = await getSettings();
    const t = await getTranslations('Admin');

    return (
        <div style={{ maxWidth: '800px' }}>
            <div className={styles.header} style={{ marginBottom: '2rem' }}>
                <h1 className={styles.headerTitle}>Site Settings</h1>
            </div>

            <form action={updateSettings} className={styles.glassCard} style={{ background: 'white', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Facebook URL</label>
                        <input name="facebook" defaultValue={settings?.facebook || ''} className={styles.input} placeholder="https://facebook.com/..." />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Twitter URL</label>
                        <input name="twitter" defaultValue={settings?.twitter || ''} className={styles.input} placeholder="https://twitter.com/..." />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Instagram URL</label>
                        <input name="instagram" defaultValue={settings?.instagram || ''} className={styles.input} placeholder="https://instagram.com/..." />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>LinkedIn URL</label>
                        <input name="linkedin" defaultValue={settings?.linkedin || ''} className={styles.input} placeholder="https://linkedin.com/..." />
                    </div>
                </div>

                <hr style={{ border: '0', borderTop: '1px solid #E2E8F0', margin: '1rem 0' }} />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Support Email</label>
                        <input name="email" defaultValue={settings?.email || ''} className={styles.input} placeholder="support@example.com" />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Phone (Saudi Arabia)</label>
                        <input name="phone_sa" defaultValue={settings?.phone_sa || ''} className={styles.input} placeholder="+966 ..." />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Phone (Syria)</label>
                        <input name="phone_sy" defaultValue={settings?.phone_sy || ''} className={styles.input} placeholder="+963 ..." />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>WhatsApp Number</label>
                        <input name="whatsapp" defaultValue={settings?.whatsapp || ''} className={styles.input} placeholder="+966 ..." />
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                    <button type="submit" className={styles.button} style={{ width: 'auto', minWidth: '150px' }}>
                        Save Settings
                    </button>
                </div>
            </form>
        </div>
    );
}
