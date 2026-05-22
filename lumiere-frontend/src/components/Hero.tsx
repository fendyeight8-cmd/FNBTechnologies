"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";

const slides = [
  { id: 1, src: "/images/hero1.webp", label: "Buffet Catering" },
  { id: 2, src: "/images/hero2.webp", label: "Corporate Functions" },
  { id: 3, src: "/images/nam_nams_bento.webp", label: "Assorted Bento" },
];

export default function Hero({ onOpenBooking }: { onOpenBooking: () => void }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <header className="hero dalca-hero" id="home">
      <div className="hero-bg">
        <div className="hero-slides">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`hero-slide ${index === currentSlide ? "active" : ""}`}
              style={{ backgroundImage: `url(${slide.src})` }}
            />
          ))}
        </div>
      </div>

      <div className="hero-content dalca-hero-copy">
        <div className="hero-eyebrow">Corporate Catering Malaysia</div>
        <h1 className="hero-title">
          Catering Excellence<br /><em>Heritage Experience</em>
        </h1>
        <p className="hero-subtitle">
          Premium buffet catering, corporate bento, kuih selections, and daily canteen meals prepared with Malaysian heritage taste.
        </p>
        <div className="hero-cta-group">
          <button onClick={onOpenBooking} className="btn-primary">Order Now</button>
          <Link href="/cateringmenu" className="btn-ghost">View Menu</Link>
        </div>
      </div>

      <button className="hero-nav-btn prev" onClick={prevSlide} aria-label="Previous slide">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
      </button>
      <button className="hero-nav-btn next" onClick={nextSlide} aria-label="Next slide">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
      </button>

      <div className="hero-pagination">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            className={`hero-dot ${index === currentSlide ? "active" : ""}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          >
            <span className="hero-dot-label">{slide.label}</span>
            <span className="hero-dot-line"></span>
          </button>
        ))}
      </div>
    </header>
  );
}
