'use client';

import { useEffect, useRef, useState } from 'react';

interface RevealProps {
    children: React.ReactNode;
    className?: string;
}

export default function Reveal({ children, className = "" }: RevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    return (
        <div
            ref={ref}
            className={`reveal ${isVisible ? 'active' : ''} ${className}`}
        >
            {children}
        </div>
    );
}
