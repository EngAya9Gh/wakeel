'use client';

import { useTranslations } from 'next-intl';
import { useActionState } from 'react';
import { submitContactForm } from '@/actions/contact';
import { Link } from '@/i18n/routing';
import CountrySelector from '@/components/ui/CountrySelector';

const initialState = {
    message: '',
    errors: {} as Record<string, string[]>,
};

export default function ContactPage() {
    const t = useTranslations('Contact');
    const [state, formAction] = useActionState(submitContactForm, initialState);

    return (
        <main className="container" style={{ padding: 'clamp(6rem, 15vh, 10rem) 1rem 4rem', maxWidth: '800px' }}>
            <div className="glass-card animate-fade-in" style={{ background: 'white' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <Link href="/" style={{ color: 'var(--color-primary)', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                        <span>&larr;</span>
                    </Link>
                </div>

                <h1 style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', marginBottom: '2rem', color: '#111', fontWeight: 800 }}>{t('title')}</h1>

                {state.message === 'success' ? (
                    <div style={{
                        padding: '3rem 1.5rem',
                        backgroundColor: '#f0fff4',
                        color: '#22543d',
                        borderRadius: '24px',
                        border: '1px solid #c6f6d5',
                        textAlign: 'center',
                        fontSize: '1.2rem',
                        fontWeight: '600',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
                    }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                        {t('success')}
                    </div>
                ) : (
                    <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                <label htmlFor="name" style={{ fontWeight: '700', color: '#111', fontSize: '0.95rem' }}>{t('name')}</label>
                                <input type="text" id="name" name="name" required placeholder="John Doe"
                                    style={{ padding: '1rem', borderRadius: '12px', border: '1px solid #eee', background: '#fcfcfc', outlineColor: 'var(--color-primary)', fontSize: '1rem', transition: 'all 0.2s' }}
                                />
                                {state.errors?.name && <p style={{ color: '#dc3545', fontSize: '0.85rem' }}>{state.errors.name[0]}</p>}
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                <label htmlFor="email" style={{ fontWeight: '700', color: '#111', fontSize: '0.95rem' }}>{t('email')}</label>
                                <input type="email" id="email" name="email" required placeholder="john@example.com"
                                    style={{ padding: '1rem', borderRadius: '12px', border: '1px solid #eee', background: '#fcfcfc', outlineColor: 'var(--color-primary)', fontSize: '1rem', transition: 'all 0.2s' }}
                                />
                                {state.errors?.email && <p style={{ color: '#dc3545', fontSize: '0.85rem' }}>{state.errors.email[0]}</p>}
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                            <label htmlFor="phone" style={{ fontWeight: '700', color: '#111', fontSize: '0.95rem' }}>{t('phone')}</label>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <CountrySelector name="countryCode" defaultValue="+966" />
                                <input type="tel" id="phone" name="phone" placeholder="50 000 0000"
                                    style={{ flex: 1, padding: '1rem', borderRadius: '12px', border: '1px solid #eee', background: '#fcfcfc', outlineColor: 'var(--color-primary)', fontSize: '1rem' }}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                            <label htmlFor="subject" style={{ fontWeight: '700', color: '#111', fontSize: '0.95rem' }}>{t('subject')}</label>
                            <input type="text" id="subject" name="subject" placeholder="How can we help?"
                                style={{ padding: '1rem', borderRadius: '12px', border: '1px solid #eee', background: '#fcfcfc', outlineColor: 'var(--color-primary)', fontSize: '1rem' }}
                            />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                            <label htmlFor="message" style={{ fontWeight: '700', color: '#111', fontSize: '0.95rem' }}>{t('message')}</label>
                            <textarea id="message" name="message" rows={5} required placeholder="Tell us about your project..."
                                style={{ padding: '1rem', borderRadius: '12px', border: '1px solid #eee', background: '#fcfcfc', outlineColor: 'var(--color-primary)', fontSize: '1rem', resize: 'vertical' }}
                            />
                            {state.errors?.message && <p style={{ color: '#dc3545', fontSize: '0.85rem' }}>{state.errors.message[0]}</p>}
                        </div>

                        <button type="submit" className="btn-primary" style={{ fontSize: '1.2rem', padding: '1.2rem', borderRadius: '16px', fontWeight: '800', marginTop: '1rem' }}>
                            {t('send')}
                        </button>

                        {state.message && state.message !== 'success' && (
                            <p style={{ color: '#dc3545', textAlign: 'center', fontWeight: '600' }}>{t('error')}</p>
                        )}
                    </form>
                )}
            </div>
        </main>
    );
}
