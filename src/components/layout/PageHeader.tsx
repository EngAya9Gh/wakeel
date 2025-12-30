'use client';

import React from 'react';

interface PageHeaderProps {
    title: string;
    subtitle: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => {
    return (
        <section style={{
            padding: '200px 0 120px',
            background: 'var(--color-secondary)',
            color: 'white',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Silver Accent Decor */}
            <div style={{
                position: 'absolute',
                top: '-10%',
                right: '-5%',
                width: '500px',
                height: '500px',
                background: 'var(--color-silver-metallic)',
                opacity: 0.05,
                borderRadius: '50%',
                zIndex: 1
            }}></div>

            <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                <h1 style={{
                    fontSize: 'clamp(3.5rem, 10vw, 6rem)',
                    fontWeight: '950',
                    marginBottom: '32px',
                    letterSpacing: '-4px',
                    lineHeight: 0.95
                }}>
                    {title}
                </h1>
                <p style={{
                    fontSize: 'clamp(1.2rem, 3.5vw, 1.6rem)',
                    maxWidth: '850px',
                    margin: '0 auto',
                    opacity: 0.9,
                    lineHeight: 1.5,
                    fontWeight: '500'
                }}>
                    {subtitle}
                </p>
            </div>
        </section>
    );
};

export default PageHeader;
