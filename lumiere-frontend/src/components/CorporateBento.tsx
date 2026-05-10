"use client";

import { useEffect } from "react";

const bentoPackages = [
  {
    name: "Executive Set",
    price: "RM 18",
    pax: "per pax",
    desc: "Nasi Lemak with Ayam Rendang, Sambal Prawn, Acar & Dessert",
    minOrder: "Min. 30 pax",
    popular: false,
  },
  {
    name: "Premium Set",
    price: "RM 25",
    pax: "per pax",
    desc: "Choice of Rice, Premium Protein, 2 Sides, Salad & Artisan Dessert",
    minOrder: "Min. 20 pax",
    popular: true,
  },
  {
    name: "VIP Set",
    price: "RM 35",
    pax: "per pax",
    desc: "Signature Rice, Wagyu/Salmon, 3 Premium Sides, Dessert & Beverage",
    minOrder: "Min. 15 pax",
    popular: false,
  },
];

const features = [
  { icon: "🍱", title: "Variety", desc: "Diverse menu options from local favourites to international cuisine, catering to every palate." },
  { icon: "⚡", title: "Flexibility", desc: "Last-minute changes? We adapt. Our team handles unexpected adjustments with ease." },
  { icon: "✨", title: "Customisation", desc: "Dietary needs, branding on sleeves & stickers — every detail personalised for your company." },
  { icon: "🏆", title: "Quality Assured", desc: "Prepared with the finest locally-sourced ingredients, strict hygiene standards, and authentic Malaysian recipes." },
];

const bentoTypes = [
  {
    name: "Malay Bento",
    img: "/images/bento_malay.png",
    desc: "Enjoy the taste of Malaysia with our diverse selection of authentic Malay dishes such as nasi goreng kampung, ayam goreng berempah and so on.",
  },
  {
    name: "Western",
    img: "/images/bento_western.png",
    desc: "Savour classic Western favourites — grilled chicken, pasta, fresh salads and more, perfect for a sophisticated corporate lunch.",
  },
  {
    name: "Chinese Bento",
    img: "/images/bento_chinese.png",
    desc: "Indulge in popular Chinese favourites like assam tiger prawn, salted egg fish fillet, and more in our flavourful Chinese Bento.",
  },
  {
    name: "Japanese Bento",
    img: "/images/bento_japanese.png",
    desc: "Experience the essence of Japan with our Japanese Cuisine Bento: salmon, edamame, tamago, and more in a single, delectable meal.",
  },
];
export default function CorporateBento({ onOpenBooking }: { onOpenBooking: () => void }) {
  useEffect(() => {
    const reveals = document.querySelectorAll(".cb-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("cb-visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="cb-section" id="corporate-bento">
      {/* Hero Banner */}
      <div className="cb-hero cb-reveal">
        <div className="cb-hero-bg" style={{ backgroundImage: "url('/images/bento_corporate.png')" }} />
        <div className="cb-hero-overlay" />
        <div className="cb-hero-content">
          <div className="cb-eyebrow">Corporate Solutions</div>
          <h2 className="cb-main-title">
            Corporate <em>Bento</em> Services
          </h2>
          <p className="cb-main-sub">
            Elevate your meetings, trainings, town halls & corporate events with premium individually-packed bento sets — crafted fresh, delivered on time.
          </p>
        </div>
      </div>

      {/* Features Strip */}
      <div className="cb-features">
        {features.map((f, i) => (
          <div key={i} className={`cb-feature-item cb-reveal`} style={{ transitionDelay: `${i * 0.12}s` }}>
            <div className="cb-feature-icon">{f.icon}</div>
            <h4 className="cb-feature-title">{f.title}</h4>
            <p className="cb-feature-desc">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Bento Types Showcase */}
      <div className="cb-types-header cb-reveal">
        <div className="cb-eyebrow">Our Cuisine</div>
        <h3 className="cb-section-title">Explore Our <em>Bento Range</em></h3>
      </div>
      <div className="cb-types-grid">
        {bentoTypes.map((bt, i) => (
          <div key={i} className={`cb-type-card cb-reveal`} style={{ transitionDelay: `${i * 0.12}s` }}>
            <div className="cb-type-img-wrap">
              <img src={bt.img} alt={bt.name} className="cb-type-img" loading="lazy" />
              <div className="cb-type-overlay" />
              <h4 className="cb-type-name">{bt.name}</h4>
            </div>
            <p className="cb-type-desc">{bt.desc}</p>
          </div>
        ))}
      </div>

      {/* Pricing Cards */}
      <div className="cb-pricing-header cb-reveal">
        <div className="cb-eyebrow">Our Packages</div>
        <h3 className="cb-section-title">Choose Your <em>Bento Set</em></h3>
        <p className="cb-section-sub">All sets include cutlery, napkin, and custom sleeve branding available as add-on.</p>
      </div>

      <div className="cb-pricing-grid">
        {bentoPackages.map((pkg, i) => (
          <div key={i} className={`cb-price-card cb-reveal ${pkg.popular ? "cb-popular" : ""}`} style={{ transitionDelay: `${i * 0.15}s` }}>
            {pkg.popular && <div className="cb-badge">Most Popular</div>}
            <h4 className="cb-pkg-name">{pkg.name}</h4>
            <div className="cb-pkg-price">
              {pkg.price}<span>{pkg.pax}</span>
            </div>
            <p className="cb-pkg-desc">{pkg.desc}</p>
            <div className="cb-pkg-min">{pkg.minOrder}</div>
            <button className="cb-pkg-btn" onClick={onOpenBooking}>
              Order Now
            </button>
          </div>
        ))}
      </div>

      {/* Add-on CTA */}
      <div className="cb-addon cb-reveal">
        <div className="cb-addon-inner">
          <div className="cb-addon-text">
            <div className="cb-eyebrow">Add-On Service</div>
            <h3 className="cb-section-title">Custom Branded <em>Sleeves & Stickers</em></h3>
            <p className="cb-addon-desc">
              Impress your guests with bento sets featuring your company logo, event theme, or personalised messages. Perfect for corporate branding, product launches, and VIP events.
            </p>
            <button className="cb-addon-btn" onClick={onOpenBooking}>
              Get a Quote →
            </button>
          </div>
          <div className="cb-addon-visual">
            <div className="cb-addon-box">
              <div className="cb-addon-icon">🎨</div>
              <div className="cb-addon-label">Your Logo Here</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
