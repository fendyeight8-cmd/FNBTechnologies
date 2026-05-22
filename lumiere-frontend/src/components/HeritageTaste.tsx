"use client";

import { useEffect, useRef } from "react";

export default function HeritageTaste() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let frame = 0;

    const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

    const updateMotion = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const progress = clamp((viewport - rect.top) / (viewport + rect.height), 0, 1);
      const centerDistance = Math.abs(rect.top + rect.height / 2 - viewport / 2);
      const opacity = clamp(1 - centerDistance / (rect.height * 0.62), 0, 1);

      section.style.setProperty("--heritage-progress", progress.toFixed(3));
      section.style.setProperty("--heritage-opacity", opacity.toFixed(3));
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateMotion);
    };

    updateMotion();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  const images = [
    {
      src: "/images/bento_malay.webp",
      alt: "Malay heritage catering dish",
      className: "heritage-card heritage-card--wide",
    },
    {
      src: "/images/gallery2.webp",
      alt: "Prepared Malaysian catering spread",
      className: "heritage-card heritage-card--tall",
    },
    {
      src: "/images/bento_chinese.webp",
      alt: "Chinese inspired catering dish",
      className: "heritage-card heritage-card--wide",
    },
    {
      src: "/images/catering.webp",
      alt: "Buffet catering arrangement",
      className: "heritage-card heritage-card--large",
    },
  ];

  return (
    <section className="heritage-section" id="heritage" ref={sectionRef}>
      <div className="heritage-copy">
        <span className="section-kicker section-kicker--dark">Our Heritage</span>
        <h2>Heritage Tastes of Malaysia</h2>
        <p>
          We combine culture, hygiene, taste and quality with Malaysia&apos;s
          traditional food story. Every menu is prepared with familiar local
          flavours, careful service flow and the warm presentation expected from
          a modern corporate caterer.
        </p>
        <a className="heritage-button" href="/about">
          Learn More
        </a>
      </div>

      <div className="heritage-gallery" aria-label="Malaysian catering dishes">
        {images.map((image) => (
          <figure className={image.className} key={image.src}>
            <img src={image.src} alt={image.alt} />
          </figure>
        ))}
      </div>
    </section>
  );
}
