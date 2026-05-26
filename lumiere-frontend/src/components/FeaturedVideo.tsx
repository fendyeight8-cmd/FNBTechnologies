"use client";

import { useState, useRef, useEffect } from "react";

export interface Testimonial {
  quote: string;
  author: string;
}

interface FeaturedVideoProps {
  videoId?: string;
  heading?: string;
  subtitle?: string;
  eyebrow?: string;
  coverImage?: string;
  ctaText?: string;
  testimonials?: Testimonial[];
  onOpenBooking: () => void;
}

const defaultTestimonials: Testimonial[] = [
  { quote: "Nam-Nams elevated our corporate gala with an impeccable menu and flawless execution.", author: "Elena R. — Event Director, KK" },
  { quote: "The fusion of Malaysian heritage flavors and luxury presentation is unmatched.", author: "Marcus T. — Gastronomy Enthusiast" },
  { quote: "Outstanding hospitality. The team handled our 500-guest function with absolute grace.", author: "Sarah K. — Corporate Planner" },
  { quote: "A masterpiece of local Sabah ingredients elevated with refined culinary techniques.", author: "Chef Andre — Culinary Advisor" }
];

export default function FeaturedVideo({
  videoId = "dhHro644Z1c",
  heading = "Experience Dining At Its Best",
  subtitle = "Discover the taste and unforgettable moments with us",
  eyebrow = "Cinematic Preview",
  coverImage = "/images/video_thumbnail.png",
  ctaText = "BOOK WITH US",
  testimonials = defaultTestimonials,
  onOpenBooking
}: FeaturedVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Intersection observer for scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Cycle through testimonials while video is playing
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && testimonials.length > 0) {
      interval = setInterval(() => {
        setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, testimonials]);

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  return (
    <section 
      ref={sectionRef}
      className={`relative py-28 px-6 md:px-16 overflow-hidden bg-gradient-to-b from-[#0e0c09] via-[#16120e] to-[#0e0c09] border-y border-[#c9a96e]/15 transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      {/* Background Ambient Glow Accents */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-[radial-gradient(circle,rgba(225,162,0,0.08)_0%,transparent_70%)] blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-[radial-gradient(circle,rgba(242,148,34,0.06)_0%,transparent_70%)] blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Text Area */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span 
            className="text-[10px] uppercase tracking-[0.45em] text-[#E1A200] block mb-3 font-semibold"
            style={{ fontFamily: "var(--font-jost), sans-serif" }}
          >
            {eyebrow}
          </span>
          <h2 
            className="text-4xl md:text-5xl font-light text-white mb-5 tracking-wide leading-tight"
            style={{ fontFamily: "var(--font-cormorant), serif" }}
          >
            {heading.split(" ").map((w, i, a) => 
              i === a.length - 2 || i === a.length - 1 ? (
                <span key={i} className="italic text-[#F29422]">{w} </span>
              ) : (
                <span key={i}>{w} </span>
              )
            )}
          </h2>
          <p 
            className="text-xs md:text-sm text-gray-400 tracking-widest leading-relaxed"
            style={{ fontFamily: "var(--font-jost), sans-serif" }}
          >
            {subtitle}
          </p>
        </div>

        {/* Video Player Container */}
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.85)] border border-[#c9a96e]/20 group bg-black">
          
          {/* Main Video Iframe */}
          {isPlaying ? (
            <iframe
              className="absolute inset-0 w-full h-full object-cover"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&controls=1&rel=0&showinfo=0&iv_load_policy=3&cc_load_policy=1&playsinline=1`}
              title="Cinematic Promotional Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            // Custom Video Thumbnail
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
              style={{ backgroundImage: `url('${coverImage}')` }}
            />
          )}

          {/* Luxury Overlay Gradient (Only when not playing, to not cover iframe controls) */}
          {!isPlaying && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/45 pointer-events-none" />
          )}

          {/* Elegant Content / CTA Overlay */}
          {!isPlaying && (
            <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-12 text-left">
              {/* Top Row: Luxury Live Signal */}
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-[#E1A200] rounded-full animate-ping" />
                <span 
                  className="text-[10px] uppercase tracking-[0.3em] text-[#E1A200] font-medium"
                  style={{ fontFamily: "var(--font-jost), sans-serif" }}
                >
                  Exclusive Preview
                </span>
              </div>

              {/* Center: Play Button */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <button
                  onClick={handlePlayClick}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/5 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all duration-500 hover:bg-[#E1A200] hover:border-[#E1A200] hover:scale-110 shadow-[0_0_30px_rgba(225,162,0,0.25)] hover:shadow-[0_0_50px_rgba(225,162,0,0.5)] cursor-pointer"
                  aria-label="Play video"
                >
                  <svg className="w-8 h-8 md:w-10 md:h-10 fill-current ml-1.5" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
                <span 
                  className="text-[10px] text-white/60 uppercase tracking-[0.3em] mt-5 font-light"
                  style={{ fontFamily: "var(--font-jost), sans-serif" }}
                >
                  Click to play preview
                </span>
              </div>

              {/* Bottom Row */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 max-w-full">
                <div className="bg-[#120f0a]/80 backdrop-blur-md border border-[#c9a96e]/20 p-6 rounded-xl max-w-lg shadow-lg">
                  <h4 
                    className="text-lg md:text-xl font-light text-[#E1A200] mb-2"
                    style={{ fontFamily: "var(--font-cormorant), serif" }}
                  >
                    {heading}
                  </h4>
                  <p 
                    className="text-xs text-gray-300 tracking-wider leading-relaxed"
                    style={{ fontFamily: "var(--font-jost), sans-serif" }}
                  >
                    {subtitle}. Indulge in our curated culinary and event services.
                  </p>
                </div>
                <button
                  onClick={onOpenBooking}
                  className="bg-[#E1A200] hover:bg-[#F29422] text-black font-semibold text-[10px] tracking-[0.25em] px-9 py-4.5 rounded-lg transition-all duration-300 hover:scale-105 shadow-[0_10px_25px_rgba(225,162,0,0.15)] whitespace-nowrap self-start md:self-auto cursor-pointer"
                  style={{ fontFamily: "var(--font-jost), sans-serif" }}
                >
                  {ctaText}
                </button>
              </div>
            </div>
          )}

          {/* Floating testimonials overlay (top-right, only on desktop) */}
          {isPlaying && testimonials.length > 0 && (
            <div className="absolute top-6 right-6 pointer-events-none z-20 max-w-xs hidden md:block">
              <div className="bg-black/75 backdrop-blur-md border border-[#c9a96e]/25 p-5 rounded-xl shadow-2xl animate-fade-in">
                <p 
                  className="text-xs italic text-gray-200 tracking-wider mb-2 leading-relaxed"
                  style={{ fontFamily: "var(--font-jost), sans-serif" }}
                >
                  "{testimonials[activeTestimonial].quote}"
                </p>
                <span 
                  className="text-[9px] text-[#E1A200] uppercase tracking-widest font-semibold block text-right"
                  style={{ fontFamily: "var(--font-jost), sans-serif" }}
                >
                  — {testimonials[activeTestimonial].author}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
