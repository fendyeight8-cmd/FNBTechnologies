"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const menuSections = [
  {
    eyebrow: "Our Menu",
    title: "Buffet Catering",
    minimum: "Minimum 30 pax",
    image: "/images/buffet_catering.jpg",
    description:
      "A flexible buffet service for events, parties, family gatherings, and corporate functions. Guests can enjoy generous portions, casual movement, and a warm dining experience.",
    items: ["Breakfast Catering Buffet", "Lunch Catering Buffet", "Dinner Buffet"],
    packages: [
      { name: "Classic Buffet", price: "From RM22/pax", pax: "30 pax minimum", includes: "Main dishes, sides, drinks, basic buffet setup" },
      { name: "Heritage Buffet", price: "From RM32/pax", pax: "50 pax minimum", includes: "Expanded menu, dessert, service crew, buffet setup" },
      { name: "Premium Event Buffet", price: "From RM45/pax", pax: "80 pax minimum", includes: "Premium menu, service crew, styled setup, coordination" },
    ],
  },
  {
    eyebrow: "Our Menu",
    title: "Nam-Nams Bento Choices",
    minimum: "Minimum 20 pax",
    image: "/images/nam_nams_bento.jpg",
    description:
      "Individually packed meals designed for organised events, office meetings, training sessions, and occasions where clean presentation and reliable portions matter.",
    items: ["Bento for Breakfast", "Bento for Lunch or Teatime", "Bento for Dinner"],
    packages: [
      { name: "Essential Bento", price: "From RM12/pax", pax: "20 pax minimum", includes: "Single protein, rice/noodles, vegetable, packed cutlery" },
      { name: "Nam-Nams Bento Choices", price: "From RM18/pax", pax: "30 pax minimum", includes: "Balanced set, dessert or kuih, drink option" },
      { name: "Executive Bento", price: "From RM25/pax", pax: "50 pax minimum", includes: "Premium menu, branded label option, delivery planning" },
    ],
  },
  {
    eyebrow: "Our Menu",
    title: "Assorted Kuih",
    minimum: "Standard Menu",
    image: "/images/gallery2.png",
    description:
      "Traditional Malaysian kuih prepared for meetings, celebrations, open houses, and dessert tables. A simple way to add heritage taste to any event.",
    items: ["Standard Kuih Selection", "Event Dessert Table", "Corporate Refreshments"],
    packages: [
      { name: "Meeting Kuih", price: "From RM3.50/pax", pax: "30 pax minimum", includes: "Assorted kuih, simple packed presentation" },
      { name: "Kuih Platter", price: "From RM6/pax", pax: "40 pax minimum", includes: "Mixed kuih platter, labels, table-ready setup" },
      { name: "Dessert Table", price: "Custom quote", pax: "Event based", includes: "Kuih, desserts, styling, service coordination" },
    ],
  },
];

export default function CateringMenuPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const router = useRouter();

  return (
    <main className="catering-menu-page">
      <Navbar
        onOpenBooking={() => setIsBookingOpen(true)}
        onOpenAdmin={() => router.push("/admin")}
      />

      <section className="menu-hero">
        <div className="section-eyebrow">Our Menu</div>
        <h1>Discover Our<br /><em>Delectable Menu</em></h1>
        <p>
          Choose from buffet catering, Nam-Nams Bento Choices sets, and Malaysian kuih selections for corporate events, schools, offices, factories, and family gatherings.
        </p>
      </section>

      <section className="menu-section-list">
        {menuSections.map((section, index) => (
          <article key={section.title} className={`menu-feature ${index % 2 === 1 ? "reverse" : ""}`}>
            <div className="menu-feature-media">
              <img src={section.image} alt={section.title} loading="lazy" />
            </div>
            <div className="menu-feature-copy">
              <div className="section-eyebrow">{section.eyebrow}</div>
              <h2>{section.title}</h2>
              <h3>({section.minimum})</h3>
              <p>{section.description}</p>
              <div className="menu-provide-label">We Provide Exceptional:</div>
              <ul>
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="menu-package-grid">
                {section.packages.map((pkg) => (
                  <div className="menu-package-card" key={pkg.name}>
                    <div className="menu-package-name">{pkg.name}</div>
                    <div className="menu-package-price">{pkg.price}</div>
                    <div className="menu-package-pax">{pkg.pax}</div>
                    <p>{pkg.includes}</p>
                  </div>
                ))}
              </div>
              <button className="btn-primary" onClick={() => setIsBookingOpen(true)}>Order Now</button>
            </div>
          </article>
        ))}
      </section>

      <section className="menu-cta-band">
        <div>
          <div className="section-eyebrow">Need Help Choosing?</div>
          <h2>Tell Us Your Event Size</h2>
          <p>We will recommend the right package based on pax, service style, time, and venue.</p>
        </div>
        <button className="btn-primary" onClick={() => setIsBookingOpen(true)}>Enquire Now</button>
      </section>

      <Footer />
      <FloatingWhatsApp />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </main>
  );
}
