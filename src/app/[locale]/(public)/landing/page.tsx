'use client';

import { useTranslations } from 'next-intl';
import { useActionState } from 'react';
import { submitLeadForm } from '@/actions/lead';
import CountrySelector from '@/components/ui/CountrySelector';


const initialState = {
    message: '',
    errors: {},
};

export default function LandingPage() {
    const t = useTranslations('LeadForm');
    const [state, formAction] = useActionState(submitLeadForm, initialState);

    return (
        <div style={{
            minHeight: '90vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '8rem 1rem 4rem',
            color: 'var(--text-main)'
        }}>
            <div className="container" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))',
                gap: 'clamp(2rem, 8vw, 6rem)',
                alignItems: 'center'
            }}>

                {/* Value Proposition */}
                <div className="animate-fade-in" style={{ textAlign: 'start' }}>
                    <h1 style={{
                        fontSize: 'clamp(2rem, 8vw, 3.5rem)',
                        marginBottom: '1.5rem',
                        background: 'linear-gradient(to right, var(--color-primary), #ff9e42)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontWeight: 800,
                        lineHeight: 1.1
                    }}>
                        Accelerate Your Business Growth
                    </h1>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '2.5rem', lineHeight: '1.7', maxWidth: '500px' }}>
                        Get a comprehensive digital strategy tailored to your needs. From high-end software development to targeted marketing campaigns.
                    </p>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <li style={{ padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '15px', fontSize: '1.1rem', fontWeight: 500 }}>
                            <span style={{ color: 'var(--color-primary)', fontSize: '1.2rem' }}>✓</span> Custom Software Solutions
                        </li>
                        <li style={{ padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '15px', fontSize: '1.1rem', fontWeight: 500 }}>
                            <span style={{ color: 'var(--color-primary)', fontSize: '1.2rem' }}>✓</span> Data-Driven Marketing
                        </li>
                        <li style={{ padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '15px', fontSize: '1.1rem', fontWeight: 500 }}>
                            <span style={{ color: 'var(--color-primary)', fontSize: '1.2rem' }}>✓</span> 24/7 Support & Maintenance
                        </li>
                    </ul>
                </div>

                {/* Lead Form */}
                <div className="glass-card animate-fade-in" style={{
                    background: 'white',
                    padding: 'clamp(1.5rem, 5vw, 3rem)',
                    borderRadius: '24px'
                }}>
                    <h2 style={{ marginBottom: '2rem', textAlign: 'center', color: '#111', fontSize: '1.8rem' }}>{t('title')}</h2>

                    {state.message === 'success' ? (
                        <div style={{ textAlign: 'center', padding: '2rem', background: '#d4edda', borderRadius: '12px', color: '#155724' }}>
                            <h3 style={{ marginBottom: '0.5rem' }}>Thank You!</h3>
                            <p>We will contact you shortly.</p>
                        </div>
                    ) : (
                        <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div>
                                <label htmlFor="name" style={{ display: 'block', marginBottom: '0.6rem', fontWeight: 600, color: '#333' }}>{t('name')}</label>
                                <input type="text" id="name" name="name" required
                                    placeholder="Your Name"
                                    style={{
                                        width: '100%',
                                        padding: '1rem',
                                        borderRadius: '12px',
                                        border: '1px solid #eee',
                                        background: '#fcfcfc',
                                        color: '#111',
                                        fontSize: '1rem',
                                        outlineColor: 'var(--color-primary)'
                                    }}
                                />
                            </div>

                            <div>
                                <label htmlFor="phone" style={{ display: 'block', marginBottom: '0.6rem', fontWeight: 600, color: '#333' }}>{t('phone')}</label>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <CountrySelector name="countryCode" defaultValue="+966" />
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        required
                                        placeholder="55 123 4567"
                                        style={{
                                            flex: 1,
                                            padding: '1rem',
                                            borderRadius: '12px',
                                            border: '1px solid #eee',
                                            background: '#fcfcfc',
                                            color: '#111',
                                            fontSize: '1rem',
                                            outlineColor: 'var(--color-primary)'
                                        }}
                                    />
                                </div>
                            </div>

                            <div>
                                {/* Email is now optional */}
                                <label htmlFor="email" style={{ display: 'block', marginBottom: '0.6rem', fontWeight: 600, color: '#333' }}>
                                    {t('email')} <span style={{ fontSize: '0.85rem', color: '#888', fontWeight: 400 }}>({t('optional')})</span>
                                </label>
                                <input type="email" id="email" name="email"
                                    placeholder="your@email.com"
                                    style={{
                                        width: '100%',
                                        padding: '1rem',
                                        borderRadius: '12px',
                                        border: '1px solid #eee',
                                        background: '#fcfcfc',
                                        color: '#111',
                                        fontSize: '1rem',
                                        outlineColor: 'var(--color-primary)'
                                    }}
                                />
                            </div>

                            <button type="submit" className="btn-primary" style={{
                                width: '100%',
                                padding: '1.1rem',
                                fontSize: '1.1rem',
                                marginTop: '1rem'
                            }}>
                                {t('submit')}
                            </button>

                            {state.message && state.message !== 'success' && (
                                <p style={{ color: '#dc3545', textAlign: 'center', fontWeight: 500 }}>{state.message}</p>
                            )}
                        </form>
                    )}
                </div>

            </div>
        </div>
    );
}
