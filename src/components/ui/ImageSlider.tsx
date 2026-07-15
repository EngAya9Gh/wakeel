"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ImageSlider({ images }: { images: { src: string; alt: string }[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length);
    const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

    // Auto-advance
    useEffect(() => {
        const timer = setInterval(nextSlide, 2000);
        return () => clearInterval(timer);
    }, [images.length]);

    return (
        <div style={{ position: "relative", width: "100%", aspectRatio: "16/10", borderRadius: "24px", overflow: "hidden", boxShadow: "0 30px 60px -10px rgba(0,0,0,0.15)", border: "1px solid #F1F5F9", background: "#f8fafc" }}>
            {images.map((img, idx) => (
                <div key={idx} style={{ position: "absolute", inset: 0, opacity: currentIndex === idx ? 1 : 0, transition: "opacity 0.8s ease-in-out", zIndex: currentIndex === idx ? 2 : 1 }}>
                    <Image src={img.src} alt={img.alt} fill style={{ objectFit: "contain", padding: "16px" }} sizes="(max-width: 768px) 100vw, 80vw" quality={90} priority={idx === 0} />
                </div>
            ))}

            {/* Overlay for contrast on indicators */}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 20%)", zIndex: 3, pointerEvents: "none" }} />

            {/* Arrows */}
            <button onClick={prevSlide} style={{ position: "absolute", left: "24px", top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.9)", border: "none", borderRadius: "50%", width: "56px", height: "56px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", backdropFilter: "blur(4px)", transition: "all 0.2s", zIndex: 10, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} onMouseOver={e => e.currentTarget.style.transform = "translateY(-50%) scale(1.05)"} onMouseOut={e => e.currentTarget.style.transform = "translateY(-50%) scale(1)"}>
                <ChevronLeft size={28} color="var(--color-secondary)" />
            </button>
            <button onClick={nextSlide} style={{ position: "absolute", right: "24px", top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.9)", border: "none", borderRadius: "50%", width: "56px", height: "56px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", backdropFilter: "blur(4px)", transition: "all 0.2s", zIndex: 10, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} onMouseOver={e => e.currentTarget.style.transform = "translateY(-50%) scale(1.05)"} onMouseOut={e => e.currentTarget.style.transform = "translateY(-50%) scale(1)"}>
                <ChevronRight size={28} color="var(--color-secondary)" />
            </button>

            {/* Indicators */}
            <div style={{ position: "absolute", bottom: "32px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "12px", zIndex: 10 }}>
                {images.map((_, idx) => (
                    <button key={idx} onClick={() => setCurrentIndex(idx)} style={{ width: currentIndex === idx ? "40px" : "12px", height: "12px", borderRadius: "6px", border: "none", background: currentIndex === idx ? "var(--color-primary)" : "rgba(255,255,255,0.6)", cursor: "pointer", transition: "all 0.3s ease", boxShadow: "0 2px 4px rgba(0,0,0,0.2)" }} />
                ))}
            </div>
        </div>
    );
}
