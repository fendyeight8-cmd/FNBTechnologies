"use client";

import { useEffect, useRef, useState } from "react";
import Calendar from "./Calendar";
import { apiUrl } from "@/lib/api";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    event: "",
    date: "",
    msg: ""
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const reveals = sectionRef.current?.querySelectorAll(".reveal");
    reveals?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      name: formData.name,
      email: formData.email,
      service: formData.event || "Enquiry",
      date: formData.date || "Not specified",
      notes: formData.msg || "No message",
      phone: formData.phone || "Not provided"
    };

    try {
      const res = await fetch(apiUrl("/api/booking"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error("Submission failed");
      alert("Enquiry sent successfully!");
      setFormData({ name: "", email: "", phone: "", event: "", date: "", msg: "" });
    } catch (err) {
      console.error("Submission failed:", err);
    }
  };

  return (
    <section className="contact-section" id="contact" ref={sectionRef}>
      <div className="contact-inner">
        <div>
          <div className="section-eyebrow reveal">Contact Us</div>
          <h2 className="section-title reveal reveal-delay-1">Let&apos;s Create<br /><em>Together</em></h2>
          <p className="section-body reveal reveal-delay-2">
            Ready to make your event extraordinary? Contact us and let&apos;s start creating something beautiful.
          </p>
          <div style={{ marginTop: '50px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div className="contact-detail reveal reveal-delay-1" style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              <div style={{ color: 'var(--gold)', marginTop: '4px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              </div>
              <div>
                <div className="cd-label" style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.15em', color: 'var(--gold)', marginBottom: '8px', textTransform: 'uppercase' }}>Location</div>
                <div className="cd-value" style={{ fontSize: '1.2rem', color: 'var(--navy)', lineHeight: 1.5 }}>Kota Kinabalu Sabah.</div>
              </div>
            </div>
            
            <div className="contact-detail reveal reveal-delay-2" style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              <div style={{ color: 'var(--gold)', marginTop: '4px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </div>
              <div>
                <div className="cd-label" style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.15em', color: 'var(--gold)', marginBottom: '8px', textTransform: 'uppercase' }}>Email</div>
                <div className="cd-value" style={{ fontSize: '1.2rem', color: 'var(--navy)' }}><a href="mailto:fendyight8@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>fendyight8@gmail.com</a></div>
              </div>
            </div>
            
            <div className="contact-detail reveal reveal-delay-3" style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              <div style={{ color: 'var(--gold)', marginTop: '4px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              </div>
              <div>
                <div className="cd-label" style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.15em', color: 'var(--gold)', marginBottom: '8px', textTransform: 'uppercase' }}>Phone / WhatsApp</div>
                <div className="cd-value" style={{ fontSize: '1.2rem', color: 'var(--navy)' }}><a href="https://wa.me/601110085626" style={{ color: 'inherit', textDecoration: 'none' }}>+601110085626</a></div>
              </div>
            </div>
          </div>
        </div>

        <form className="contact-form reveal reveal-delay-2" onSubmit={handleSubmit}>
          <div className="form-group">
            <input 
              type="text" 
              placeholder="Your Name" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
            <label>Full Name</label>
          </div>
          <div className="form-group">
            <input 
              type="email" 
              placeholder="Email Address" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
            <label>Email Address</label>
          </div>
          <div className="form-group">
            <input 
              type="tel" 
              placeholder="Phone Number" 
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              required
            />
            <label>Phone Number</label>
          </div>
          <div className="form-group">
            <input 
              type="text" 
              placeholder="Event Type" 
              value={formData.event}
              onChange={(e) => setFormData({...formData, event: e.target.value})}
            />
            <label>Event Type</label>
          </div>
          <div className="form-group">
            <input 
              type="date" 
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
            />
            <label>Event Date</label>
          </div>
          <div className="form-group">
            <textarea 
              placeholder="Your Message"
              value={formData.msg}
              onChange={(e) => setFormData({...formData, msg: e.target.value})}
            />
            <label>Message</label>
          </div>
          <button type="submit" className="form-submit">Send Enquiry</button>
        </form>

        <Calendar />
      </div>
    </section>
  );
}
