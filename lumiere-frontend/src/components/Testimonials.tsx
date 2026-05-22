"use client";

import { useState, useEffect } from "react";

const testimonials = [
  {
    quote: "Nam-Nams Catering transformed our corporate event. The food was authentic, the setup was elegant, and the service was impeccable.",
    author: "Siti Rahimah — Corporate Client, Penang"
  },
  {
    quote: "The Nam-Nams Bento Choices sets were an absolute hit during our annual meeting. Delicious Malaysian flavors, beautifully packaged, and delivered right on time.",
    author: "Amirah Lim — HR Manager"
  },
  {
    quote: "We've used Nam-Nams for three consecutive school events. Their consistency, quality, and professionalism are truly unmatched.",
    author: "Dato' Ahmad — Principal"
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
