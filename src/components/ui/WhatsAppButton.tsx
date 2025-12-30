'use client';

import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
    return (
        <a
            href="https://wa.me/1234567890" // Replace with actual number
            target="_blank"
            rel="noopener noreferrer"
            style={{
                position: 'fixed',
                bottom: '2rem',
                right: '2rem',
                backgroundColor: '#25D366',
                color: 'white',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                zIndex: 1000,
                transition: 'transform 0.3s'
            }}
            className="whatsapp-float"
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
            <MessageCircle size={32} />
        </a>
    );
}
