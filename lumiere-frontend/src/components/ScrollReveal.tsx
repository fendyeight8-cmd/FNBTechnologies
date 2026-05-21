"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const revealSelector = [
  ".dalca-section-head",
  ".bento-item",
  ".dalca-about-image",
  ".dalca-about-copy",
  ".dalca-tabs",
  ".dalca-why-card",
  ".dalca-bento-range-card",
  ".dalca-proof-item",
  ".heritage-copy",
  ".heritage-card",
  ".dalca-client-logo",
  ".contact-detail",
  ".contact-form",
  ".availability-container",
  ".dalca-footer-brand",
  ".dalca-footer-col",
].join(",");

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(revealSelector));

    elements.forEach((element, index) => {
      element.classList.add("motion-reveal");
      element.style.setProperty("--reveal-delay", `${Math.min(index % 6, 5) * 80}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px 0px -8% 0px",
        threshold: 0.12,
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
