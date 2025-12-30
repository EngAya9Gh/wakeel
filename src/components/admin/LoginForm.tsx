'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';
import styles from '@/app/[locale]/admin/admin.module.css';

export default function LoginForm() {
    const t = useTranslations('Admin');
    const router = useRouter();
    const locale = useLocale();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError('Invalid credentials');
            } else {
                router.refresh();
                router.push('/admin');
            }
        } catch (err) {
            setError('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.loginCard}>
            <h1 className={styles.headerTitle} style={{ textAlign: 'center', marginBottom: '2rem' }}>
                {t('login')}
            </h1>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>{t('email')}</label>
                    <input
                        type="email"
                        className={styles.input}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>{t('password')}</label>
                    <input
                        type="password"
                        className={styles.input}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
                <button type="submit" className={styles.button} disabled={loading}>
                    {loading ? '...' : t('signIn')}
                </button>
            </form>
        </div>
    );
}
