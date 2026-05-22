"use client";

import { useEffect, useState } from "react";

const specializations = [
  {
    name: "Family Events",
    img: "/images/engagement.webp",
    desc: "Celebration menus for birthdays, festival gatherings, intimate functions, and family occasions.",
    bullets: ["Festival gatherings", "Celebration parties", "Special occasions", "Birthday celebrations"],
  },
  {
    name: "Corporate Functions",
    img: "/images/corporate_event.webp",
    desc: "Catering packages for meetings, product launches, open houses, seminars, and office events.",
    bullets: ["Meetings", "Seminars & conferences", "Product launches", "Corporate open house"],
  },
  {
    name: "Schools & Canteens",
    img: "/images/nam_nams_bento.webp",
    desc: "Daily customised meals for schools, offices, and factories, cooked fresh for small or large groups.",
    bullets: ["Kindergartens and schools", "Universities", "Office cafeteria", "Factory canteens"],
  },
];

const whyChoose = [
  {
    title: "Quality & Consistency",
    desc: "Fresh ingredients, controlled preparation, and repeatable standards help every service feel dependable.",
  },
  {
    title: "Reliable Service",
    desc: "From preparation to delivery, the workflow is built around punctuality and calm event execution.",
  },
  {
    title: "Affordable",
    desc: "Packages are shaped for practical budgets without making guests compromise on taste.",
  },
  {
    title: "Heritage Taste",
    desc: "Malaysian flavours remain at the centre, with modern preparation for corporate and family needs.",
  },
];

const bentoTypes = [
  { name: "Malay Bento", img: "/images/bento_malay.webp" },
  { name: "Western Bento", img: "/images/bento_western.webp" },
  { name: "Chinese Bento", img: "/images/bento_chinese.webp" },
  { name: "Japanese Bento", img: "/images/bento_japanese.webp" },
];

export default function CorporateBento({ onOpenBooking }: { onOpenBooking: () => void }) {
  const [active, setActive] = useState(0);

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

  const activeItem = specializations[active];

  return (
    <section className="cb-section dalca-specialize" id="specialize">
      <div className="dalca-section-head cb-reveal">
        <div className="section-eyebrow">What We Specialize</div>
        <h2 className="section-title">Catering For Every<br /><em>Occasion</em></h2>
      </div>

      <div className="dalca-tabs cb-reveal">
        <div className="dalca-tab-nav">
          {specializations.map((item, index) => (
            <button
              key={item.name}
              type="button"
              className={active === index ? "active" : ""}
              onClick={() => setActive(index)}
            >
              {item.name}
            </button>
          ))}
        </div>

        <div className="dalca-tab-panel" key={activeItem.name}>
          <div className="dalca-tab-copy">
            <h3>{activeItem.name}</h3>
            <p>{activeItem.desc}</p>
            <ul>
              {activeItem.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
            <button className="btn-primary" onClick={onOpenBooking}>Enquire Now</button>
          </div>
          <img src={activeItem.img} alt={activeItem.name} loading="lazy" />
        </div>
      </div>

      <div className="dalca-why">
        <div className="dalca-section-head cb-reveal">
          <div className="section-eyebrow">Why Choose Us</div>
          <h2 className="section-title">Service You Can<br /><em>Rely On</em></h2>
        </div>
        <div className="dalca-why-grid">
          {whyChoose.map((item) => (
            <article key={item.title} className="dalca-why-card cb-reveal">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="dalca-bento-range">
        <div className="dalca-section-head cb-reveal">
          <div className="section-eyebrow">Our Cuisine</div>
          <h2 className="section-title">Explore Our<br /><em>Bento Range</em></h2>
        </div>
        <div className="dalca-bento-range-grid">
          {bentoTypes.map((item) => (
            <article key={item.name} className="dalca-bento-range-card cb-reveal">
              <img src={item.img} alt={item.name} loading="lazy" />
              <h3>{item.name}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
