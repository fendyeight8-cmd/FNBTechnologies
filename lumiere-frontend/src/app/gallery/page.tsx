"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import { apiUrl } from "@/lib/api";

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  src: string;
}

export default function GalleryPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch(apiUrl("/api/gallery"))
      .then(res => res.json())
      .then(data => setGalleryItems(data))
      .catch(err => console.error("Failed to fetch gallery:", err));
  }, []);

  useEffect(() => {
    if (galleryItems.length === 0) return;
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
  }, [galleryItems]);

  const handleOpenAdmin = () => {
    router.push("/admin");
  };

  return (
    <main className="gallery-page">
      <Navbar 
        onOpenBooking={() => setIsBookingOpen(true)} 
        onOpenAdmin={handleOpenAdmin} 
      />

      <div className="gallery-hero reveal">
        <h1 className="gallery-hero-title">
          Our <em>Gallery</em>
        </h1>
        <p className="gallery-hero-subtitle">
          A curated collection of unforgettable moments — from stunning wedding spreads to elegant corporate galas, crafted by Nam-Nams.
        </p>
      </div>

      <div className="gallery-grid">
        {galleryItems.map((item, index) => (
          <div key={item.id} className={`gallery-item reveal reveal-delay-${(index % 3) + 1}`}>
            <img
              src={item.src}
              alt={item.title}
              className="gallery-item-img"
              loading="lazy"
            />
            <div className="gallery-item-content">
              <span className="gallery-item-cat">{item.category}</span>
              <h3 className="gallery-item-title">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>

      <Footer />

      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
      />
    </main>
  );
}
