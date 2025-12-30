'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface Country {
    code: string;
    country: string;
    flag: string;
    flagImg?: string;
}

const countryCodes: Country[] = [
    { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦' },
    { code: '+971', country: 'UAE', flag: '🇦🇪' },
    { code: '+965', country: 'Kuwait', flag: '🇰🇼' },
    { code: '+974', country: 'Qatar', flag: '🇶🇦' },
    { code: '+973', country: 'Bahrain', flag: '🇧🇭' },
    { code: '+968', country: 'Oman', flag: '🇴🇲' },
    { code: '+963', country: 'Syria', flag: '🇸🇾', flagImg: '/flags/sy.svg' },
    { code: '+20', country: 'Egypt', flag: '🇪🇬' },
    { code: '+962', country: 'Jordan', flag: '🇯🇴' },
    { code: '+961', country: 'Lebanon', flag: '🇱🇧' },
    { code: '+1', country: 'USA/Canada', flag: '🇺🇸' },
    { code: '+44', country: 'UK', flag: '🇬🇧' },
];

export default function CountrySelector({ name, defaultValue = '+966' }: { name: string; defaultValue?: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(countryCodes.find(c => c.code === defaultValue) || countryCodes[0]);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={containerRef} style={{ position: 'relative', width: '110px' }}>
            <input type="hidden" name={name} value={selected.code} />
            <div
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    padding: '0.8rem',
                    borderRadius: '12px',
                    border: '1px solid #eee',
                    background: '#fcfcfc',
                    color: '#111',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    justifyContent: 'space-between',
                    height: '52px'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {selected.flagImg ? (
                        <div style={{ width: '24px', height: '16px', position: 'relative', borderRadius: '2px', overflow: 'hidden', border: '1px solid #eee' }}>
                            <Image src={selected.flagImg} alt={selected.country} fill style={{ objectFit: 'cover' }} />
                        </div>
                    ) : (
                        <span style={{ fontSize: '1.2rem' }}>{selected.flag}</span>
                    )}
                    <span style={{ fontWeight: 600 }}>{selected.code}</span>
                </div>
                <span style={{ fontSize: '0.6rem', color: '#888' }}>{isOpen ? '▲' : '▼'}</span>
            </div>

            {isOpen && (
                <div style={{
                    position: 'absolute',
                    top: '110%',
                    left: 0,
                    width: '240px',
                    maxHeight: '300px',
                    overflowY: 'auto',
                    background: 'white',
                    borderRadius: '16px',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                    zIndex: 1000,
                    padding: '8px',
                    border: '1px solid #f1f1f1'
                }}>
                    <div style={{ padding: '8px', fontSize: '0.8rem', color: '#888', fontWeight: 600, borderBottom: '1px solid #f5f5f5', marginBottom: '4px' }}>
                        Select Country
                    </div>
                    {countryCodes.map((c) => (
                        <div
                            key={c.code + c.country}
                            onClick={() => {
                                setSelected(c);
                                setIsOpen(false);
                            }}
                            style={{
                                padding: '10px 12px',
                                borderRadius: '10px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                background: selected.code === c.code ? 'var(--color-primary-glow)' : 'transparent',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = '#f8fafc')}
                            onMouseLeave={(e) => (e.currentTarget.style.background = selected.code === c.code ? 'var(--color-primary-glow)' : 'transparent')}
                        >
                            {c.flagImg ? (
                                <div style={{ width: '28px', height: '18px', position: 'relative', borderRadius: '3px', overflow: 'hidden', border: '1px solid #eee' }}>
                                    <Image src={c.flagImg} alt={c.country} fill style={{ objectFit: 'cover' }} />
                                </div>
                            ) : (
                                <span style={{ fontSize: '1.4rem' }}>{c.flag}</span>
                            )}
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#111' }}>{c.code}</span>
                                <span style={{ fontSize: '0.75rem', color: '#666' }}>{c.country}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
