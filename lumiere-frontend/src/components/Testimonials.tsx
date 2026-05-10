"use client";

import { useState, useEffect } from "react";

const testimonials = [
  {
    quote: "Nums-Nums transformed our wedding into a fairytale. The food was spectacular, the setup was breathtaking, and every single guest complimented the experience. We couldn't have asked for more.",
    author: "Siti Rahimah — Wedding Client, Penang"
  },
  {
    quote: "My makeup artist from Nums-Nums was an absolute genius. She understood my vision perfectly and made me feel like a queen on my special day. Truly world-class artistry.",
    author: "Amirah Lim — Bridal Client, KL"
  },
  {
    quote: "We've used Nums-Nums for three consecutive corporate galas. The consistency, creativity, and professionalism are unmatched. They make us look good every single time.",
    author: "Dato' Ahmad — Corporate Event, Kota Kinabalu"
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="testimonials-section">
      <div className="testimonials-inner">
        <div className="section-eyebrow">Testimonials</div>
        <h2 className="section-title">What Our <em>Clients Say</em></h2>
        <div className="testimonials-slider">
          {testimonials.map((t, index) => (
            <div key={index} className={`testimonial ${index === activeIndex ? "active" : ""}`}>
              <div className="testimonial-quote">{t.quote}</div>
              <div className="testimonial-author">{t.author}</div>
            </div>
          ))}
          <div className="testimonial-dots">
            {testimonials.map((_, index) => (
              <button 
                key={index}
                className={`t-dot ${index === activeIndex ? "active" : ""}`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
