"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";

export default function AboutPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleOpenAdmin = () => {
    router.push("/admin");
  };

  return (
    <main className="about-page">
      <Navbar
        onOpenBooking={() => setIsBookingOpen(true)}
        onOpenAdmin={handleOpenAdmin}
      />

      <div className="about-hero reveal">
        <h1 className="about-hero-title">
          Our <em>Story</em>
        </h1>
        <p className="about-hero-subtitle">
          From humble beginnings in Sabah to becoming the region&apos;s most sought-after catering & event specialists - this is the Nam-Nams journey.
        </p>
      </div>

      <div className="about-content">
        <div className="about-text reveal">
          <div className="section-eyebrow">The Beginning</div>
          <h2 className="section-title" style={{ fontSize: "3rem", marginBottom: "32px" }}>
            Born from <em>Passion</em>
          </h2>
          <p>
            <strong>Nam-Nams Catering & Event</strong> was founded with one simple belief: food is love, made visible. What started as a small family kitchen catering for intimate gatherings in Kota Kinabalu has grown into Sabah&apos;s premier event and catering powerhouse - a proud subsidiary of <em>Food & Beverage Technologies</em>.
          </p>
          <p>
            Our name &quot;Nam-Nams&quot; captures the childlike joy of that first irresistible bite - a moment of pure delight that we strive to recreate at every event. From royal weddings to corporate galas, our team of master chefs, event architects, and bridal artisans orchestrate unforgettable experiences with warmth, precision, and a distinctly Malaysian flair.
          </p>
          <p>
            We believe luxury doesn&apos;t have to be distant or cold. At Nam-Nams, luxury is welcoming. It&apos;s the aroma of freshly prepared nasi lemak next to artisan canapes, a smile from our service team, and the confident feeling that every last detail has been perfected - just for you.
          </p>
        </div>
        <div className="about-image-wrapper reveal reveal-delay-1">
          <div className="about-image-inner">
            <img src="/images/nam_nams_bento.webp" alt="Nam-Nams Culinary Artistry" loading="lazy" />
          </div>
        </div>
      </div>

      <div className="facts-section">
        <div className="facts-grid">
          <div className="fact-item reveal">
            <div className="fact-number">15+</div>
            <div className="fact-label">Years of Excellence</div>
          </div>
          <div className="fact-item reveal reveal-delay-1">
            <div className="fact-number">2,500+</div>
            <div className="fact-label">Events Catered</div>
          </div>
          <div className="fact-item reveal reveal-delay-2">
            <div className="fact-number">50K+</div>
            <div className="fact-label">Happy Guests Served</div>
          </div>
          <div className="fact-item reveal reveal-delay-3">
            <div className="fact-number">100%</div>
            <div className="fact-label">Bespoke Experiences</div>
          </div>
        </div>
      </div>

      <br /><br /><br />

      <Footer />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </main>
  );
}
