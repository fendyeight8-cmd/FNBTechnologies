import React from "react";

interface FoodTastingProps {
  onOpenBooking: () => void;
}

export default function FoodTasting({ onOpenBooking }: FoodTastingProps) {
  return (
    <section className="food-tasting-section" id="tasting" style={{ padding: "100px 24px", background: "var(--navy)", color: "var(--white)", position: "relative", overflow: "hidden" }}>
      <div className="ft-bg" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0.15 }}>
        <img src="/images/food_testing.webp" alt="Chef preparing food" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      
      <div className="ft-content" style={{ position: "relative", zIndex: 2, maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
        <div className="section-eyebrow reveal">Experience The Magic</div>
        <h2 className="section-title reveal reveal-delay-1" style={{ color: "var(--white)", marginBottom: "24px" }}>
          Book a <em>Food Tasting</em> Session
        </h2>
        <p className="reveal reveal-delay-2" style={{ fontSize: "1.1rem", lineHeight: 1.6, marginBottom: "40px", opacity: 0.9 }}>
          Planning a grand wedding or a major corporate gala? Don't leave the menu to chance. Schedule a private food tasting session with our master chefs to customize and perfect your event's culinary experience.
        </p>
        
        <div className="ft-features reveal reveal-delay-3" style={{ display: "flex", justifyContent: "center", gap: "32px", flexWrap: "wrap", marginBottom: "48px" }}>
          <div className="ft-feature" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ color: "var(--gold)", fontSize: "1.5rem" }}>✦</span>
            <span>Personalized Menu</span>
          </div>
          <div className="ft-feature" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ color: "var(--gold)", fontSize: "1.5rem" }}>✦</span>
            <span>Chef Consultation</span>
          </div>
          <div className="ft-feature" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ color: "var(--gold)", fontSize: "1.5rem" }}>✦</span>
            <span>Tailored Experience</span>
          </div>
        </div>

        <button 
          className="dalca-btn reveal reveal-delay-3" 
          onClick={onOpenBooking}
          style={{ background: "var(--gold)", color: "var(--navy)", border: "none", padding: "16px 40px", fontSize: "1rem", fontWeight: 700, letterSpacing: "0.1em", cursor: "pointer", transition: "all 0.3s" }}
        >
          SCHEDULE TASTING
        </button>
      </div>
    </section>
  );
}
