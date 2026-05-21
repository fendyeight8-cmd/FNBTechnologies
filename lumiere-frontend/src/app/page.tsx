"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MarketingMarquee from "@/components/MarketingMarquee";
import BentoGrid from "@/components/BentoGrid";
import DualPanel from "@/components/DualPanel";
import CorporateBento from "@/components/CorporateBento";
import Contact from "@/components/Contact";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import GalleryProof from "@/components/GalleryProof";
import ClientLogos from "@/components/ClientLogos";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import HeritageTaste from "@/components/HeritageTaste";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const router = useRouter();

  const handleOpenAdmin = () => {
    router.push("/admin");
  };

  return (
    <main>
      <Navbar 
        onOpenBooking={() => setIsBookingOpen(true)} 
        onOpenAdmin={handleOpenAdmin} 
      />
      
      <Hero onOpenBooking={() => setIsBookingOpen(true)} />
      
      <MarketingMarquee />
      <BentoGrid />
      <DualPanel />
      <CorporateBento onOpenBooking={() => setIsBookingOpen(true)} />
      <GalleryProof />
      <HeritageTaste />
      <Testimonials />
      <ClientLogos />
      <Contact />
      <Footer />
      <FloatingWhatsApp />

      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
      />
    </main>
  );
}
