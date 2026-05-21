"use client";

import { useEffect, useRef, useState } from "react";
import Calendar from "./Calendar";
import { apiUrl } from "@/lib/api";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
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
      phone: "Not provided"
    };

    try {
      const res = await fetch(apiUrl("/api/booking"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error("Submission failed");
      alert("Enquiry sent successfully!");
      setFormData({ name: "", email: "", event: "", date: "", msg: "" });
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
          <div style={{ marginTop: '60px' }}>
            <div className="contact-detail reveal reveal-delay-1">
              <div className="cd-label">Location</div>
              <div className="cd-value">11 Jalan 1A/114, Kuchai Business Centre, 58200 Kuala Lumpur</div>
            </div>
            <div className="contact-detail reveal reveal-delay-2">
              <div className="cd-label">Email</div>
              <div className="cd-value">masakanwarisan@vezion.com.my</div>
            </div>
            <div className="contact-detail reveal reveal-delay-3">
              <div className="cd-label">Phone / WhatsApp</div>
              <div className="cd-value">+60 3 6412 9763</div>
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
