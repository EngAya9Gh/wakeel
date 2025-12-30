import React from 'react';

type LogoProps = {
    color?: 'light' | 'dark';
    className?: string;
};

export default function Logo({ color = 'dark', className }: LogoProps) {
    const textColor = color === 'light' ? 'white' : 'var(--color-secondary)';
    const primaryColor = 'var(--color-primary)';
    // Dark Silver leaning towards Black (#334155 - Slate 700)
    const darkSilver = '#334155';

    return (
        <div className={className} style={{ display: 'flex', alignItems: 'center', gap: '8px', height: '32px', direction: 'ltr' }}>
            {/* The "4 Shapes" AI Signature - Height matched to 'l' */}
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
                <rect x="0" y="0" width="11" height="11" rx="3" fill={primaryColor} />
                <rect x="13" y="0" width="11" height="11" rx="5.5" fill={textColor} fillOpacity="0.3" />
                {/* Bottom Left: Dark Silver when in light mode (white text) */}
                <rect x="0" y="13" width="11" height="11" rx="5.5" fill={color === 'light' ? darkSilver : textColor} fillOpacity={color === 'light' ? 1 : 0.8} />
                <rect x="13" y="13" width="11" height="11" rx="3" fill={primaryColor} />
            </svg>

            {/* Typography */}
            <span style={{
                fontFamily: 'var(--font-family-en)',
                fontSize: '2rem',
                fontWeight: '900',
                color: textColor,
                letterSpacing: '-0.5px',
                lineHeight: 0.8,
                display: 'flex',
                alignItems: 'baseline'
            }}>
                W
                <span style={{ letterSpacing: '-1px' }}>a</span>
                k
                <span style={{ letterSpacing: '-4px', color: primaryColor, opacity: 0.9 }}>ee</span>
                l
                {/* Two dots integrated very closely with 'l' */}
                <span style={{ color: primaryColor, marginLeft: '-0.13em' }}>.</span>
                <span style={{ color: primaryColor, marginLeft: '-0.18em' }}>.</span>
            </span>
        </div>
    );
}
