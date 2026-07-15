"use client";
import React from 'react';

export default function MacbookMockup({ children }: { children: React.ReactNode }) {
    return (
        <div style={{
            width: '100%',
            maxWidth: '1000px',
            margin: '0 auto',
            position: 'relative'
        }}>
            {/* Top screen frame (bezel + camera) */}
            <div style={{
                background: '#1a1a1a',
                padding: '24px 24px 0 24px',
                borderTopLeftRadius: '32px',
                borderTopRightRadius: '32px',
                position: 'relative',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                border: '1px solid #333',
                borderBottom: 'none'
            }}>
                {/* Camera dot */}
                <div style={{
                    position: 'absolute',
                    top: '10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#333',
                    border: '1px solid #000'
                }}></div>

                {/* Screen content area */}
                <div style={{
                    background: '#fff',
                    borderRadius: '8px 8px 0 0',
                    overflow: 'hidden',
                    position: 'relative',
                    aspectRatio: '16/10'
                }}>
                    {children}
                </div>
            </div>

            {/* Bottom keyboard/base area */}
            <div style={{
                height: '24px',
                background: 'linear-gradient(to bottom, #d4d4d4, #b0b0b0)',
                borderBottomLeftRadius: '16px',
                borderBottomRightRadius: '16px',
                position: 'relative',
                boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
                display: 'flex',
                justifyContent: 'center'
            }}>
                {/* Thumb notch */}
                <div style={{
                    width: '120px',
                    height: '10px',
                    background: '#a0a0a0',
                    borderBottomLeftRadius: '8px',
                    borderBottomRightRadius: '8px',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
                }}></div>
            </div>
        </div>
    );
}
