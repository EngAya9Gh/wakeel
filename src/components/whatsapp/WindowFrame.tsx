import { Lock } from 'lucide-react';
import styles from './mockups.module.css';

export default function WindowFrame({ url, children }: { url: string; children: React.ReactNode }) {
    return (
        <div className={styles.window} aria-hidden="true">
            <div className={styles.windowBar}>
                <div className={styles.dots}>
                    <span style={{ background: '#FF5F57' }} />
                    <span style={{ background: '#FEBC2E' }} />
                    <span style={{ background: '#28C840' }} />
                </div>
                <div className={styles.url}><Lock size={10} /> {url}</div>
            </div>
            {children}
        </div>
    );
}
