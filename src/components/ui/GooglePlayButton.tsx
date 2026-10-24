import { CRM_PLAY_STORE_URL } from '@/lib/links';

interface GooglePlayButtonProps {
    caption: string;
    ariaLabel: string;
    href?: string;
}

export default function GooglePlayButton({ caption, ariaLabel, href = CRM_PLAY_STORE_URL }: GooglePlayButtonProps) {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="play-badge" aria-label={ariaLabel}>
            <svg width="26" height="28" viewBox="0 0 26 28" aria-hidden="true">
                <path fill="#00D7FE" d="M1.2.6C.8 1 .6 1.7.6 2.5v23c0 .8.2 1.5.6 1.9l.1.1 12.9-12.9v-.3L1.3.5z" />
                <path fill="#FFCE00" d="M18.9 19l-4.3-4.3v-.3l4.3-4.3.1.1 5.1 2.9c1.5.8 1.5 2.2 0 3l-5.1 2.9z" />
                <path fill="#FF3A44" d="M19 18.9l-4.4-4.4L1.2 27.4c.5.5 1.3.6 2.2.1L19 18.9" />
                <path fill="#00F076" d="M19 10.1L3.4 1.2C2.5.7 1.7.8 1.2 1.3l13.4 13.2z" />
            </svg>
            <span className="play-badge-text">
                <span className="play-badge-caption">{caption}</span>
                <span className="play-badge-store">Google Play</span>
            </span>
        </a>
    );
}
