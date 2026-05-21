"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const slides = [
  { id: 1, src: "/images/hero1.png", label: "Buffet Catering" },
  { id: 2, src: "/images/hero2.png", label: "Corporate Functions" },
  { id: 3, src: "/images/hero3.png", label: "Premium Bento" },
];

export default function Hero({ onOpenBooking }: { onOpenBooking: () => void }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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

      <div className="hero-service-strip">
        {slides.map((slide, index) => (
          <span key={slide.id} className={index === currentSlide ? "active" : ""}>
            {slide.label}
          </span>
        ))}
      </div>
    </header>
  );
}
