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
  { quote: "An absolutely stunning experience. The attention to detail is unmatched.", author: "Elena R. — Michelin Guide Reviewer" },
  { quote: "Every dish tells a beautiful story of heritage and passion.", author: "Marcus T. — Gastronomy Enthusiast" },
  { quote: "Outstanding catering service. Elevated our brand event completely.", author: "Sarah K. — Corporate Event Planner" },
  { quote: "A celebration of local ingredients prepared with world-class technique.", author: "Chef Andre — Culinary Director" }
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
      className={`relative py-24 px-6 md:px-16 overflow-hidden bg-gradient-to-b from-[#0f0d0a] via-[#1a150e] to-[#0f0d0a] border-y border-[#c9a96e]/10 transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      {/* Background Parallax Overlay or Accent Gradients */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-[radial-gradient(circle,rgba(225,162,0,0.1)_0%,transparent_70%)] blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-[radial-gradient(circle,rgba(242,148,34,0.08)_0%,transparent_70%)] blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Text Area with Glassmorphism Accent */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#E1A200] block mb-3 font-semibold">
            {eyebrow}
          </span>
          <h2 className="text-3xl md:text-5xl font-light text-white mb-4 tracking-wide font-serif">
            {heading.split(" ").map((w, i, a) => 
              i === a.length - 2 || i === a.length - 1 ? (
                <span key={i} className="italic text-[#F29422]">{w} </span>
              ) : (
                <span key={i}>{w} </span>
              )
            )}
          </h2>
          <p className="text-sm text-gray-400 tracking-wider leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Video Player Container */}
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-[#c9a96e]/20 group">
          
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
            // Custom Video Thumbnail / Fallback Poster
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url('${coverImage}')` }}
            />
          )}

          {/* Luxury Overlay Gradient (Only when not playing, to not cover iframe controls) */}
          {!isPlaying && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 pointer-events-none" />
          )}

          {/* Elegant Content / CTA Overlay (Only visible before playback) */}
          {!isPlaying && (
            <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-12 text-left">
              {/* Top Row: Luxury Label */}
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-[#E1A200] rounded-full animate-ping" />
                <span className="text-xs uppercase tracking-[0.3em] text-[#E1A200] font-medium">
                  Exclusive Preview
                </span>
              </div>

              {/* Center: Large Cinematic Play Button */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <button
                  onClick={handlePlayClick}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transition-all duration-500 hover:bg-[#E1A200] hover:border-[#E1A200] hover:scale-110 shadow-[0_0_30px_rgba(225,162,0,0.3)] hover:shadow-[0_0_50px_rgba(225,162,0,0.6)] cursor-pointer"
                  aria-label="Play video"
                >
                  <svg className="w-8 h-8 md:w-10 md:h-10 fill-current ml-1.5" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
                <span className="text-xs text-white/70 uppercase tracking-[0.25em] mt-4 font-light">
                  Click to play preview
                </span>
              </div>

              {/* Bottom: Subtitle & BOOK CTA with Glassmorphism Panel */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 max-w-full">
                <div className="bg-[#1a1610]/70 backdrop-blur-md border border-[#c9a96e]/20 p-5 rounded-xl max-w-lg shadow-lg">
                  <h4 className="text-lg md:text-xl font-light text-[#E1A200] mb-1 font-serif">
                    {heading}
                  </h4>
                  <p className="text-xs text-gray-300 tracking-wider">
                    {subtitle}. Indulge in our curated gastronomic journey.
                  </p>
                </div>
                <button
                  onClick={onOpenBooking}
                  className="bg-[#E1A200] hover:bg-[#F29422] text-black font-semibold text-xs tracking-[0.2em] px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 shadow-[0_10px_20px_rgba(225,162,0,0.2)] whitespace-nowrap self-start md:self-auto cursor-pointer"
                >
                  {ctaText}
                </button>
              </div>
            </div>
          )}

          {/* Floating testimonial overlays while playing (placed at top-right to avoid blocking YouTube's bottom controls) */}
          {isPlaying && testimonials.length > 0 && (
            <div className="absolute top-4 right-4 pointer-events-none z-20 max-w-sm hidden md:block">
              <div className="bg-black/70 backdrop-blur-md border border-[#c9a96e]/30 p-4 rounded-xl shadow-xl animate-fade-in">
                <p className="text-xs italic text-gray-200 tracking-wider mb-1">
                  "{testimonials[activeTestimonial].quote}"
                </p>
                <span className="text-[10px] text-[#E1A200] uppercase tracking-widest font-semibold block text-right">
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
