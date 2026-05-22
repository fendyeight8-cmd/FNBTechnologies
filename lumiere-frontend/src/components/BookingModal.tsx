"use client";

import React, { useState } from "react";
import { apiUrl } from "@/lib/api";

const services = [
  { id: "bridal", name: "Bridal Makeup", icon: "BM", image: "/images/bridal_makeup.png" },
  { id: "catering", name: "Catering", icon: "CT", image: "/images/catering.png" },
  { id: "bento", name: "Corporate Bento", icon: "CB", image: "/images/corporate_event.png" },
  { id: "event", name: "Event Planning", icon: "EP", image: "/images/hero2.png" },
  { id: "engagement", name: "Engagement", icon: "EN", image: "/images/engagement.png" },
  { id: "tasting", name: "Food Tasting", icon: "FT", image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=900&q=80" },
];

const missing = "-";

export default function BookingModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: "",
    name: "",
    phone: "",
    date: "",
    time: "",
    guests: "0",
    location: "",
    notes: "",
    bentoType: "",
    bentoPax: "",
    deliveryTime: "",
    companyName: "",
    bridalPackage: "",
    trialDate: "",
    cuisineType: "",
    eventType: "",
    theme: "",
    venue: "",
    eventCategory: "",
    eventSize: "",
    budget: "",
    package: "",
    tastingMenu: "",
    tastingPax: "",
  });

  if (!isOpen) return null;

  const updateForm = (fields: Partial<typeof formData>) => {
    setFormData((current) => ({ ...current, ...fields }));
  };

  const handleNext = () => {
    if (step === 1 && !formData.service) {
      alert("Please select a service");
      return;
    }
    if (step === 2 && (!formData.name || !formData.phone || !formData.date)) {
      alert("Please fill Name, Phone & Date");
      return;
    }
    setStep((current) => current + 1);
  };

  const handleSubmit = async () => {
    const guestCount = Number.parseInt(formData.guests, 10);
    const selectedPackage = formData.package || formData.bentoType || formData.bridalPackage || formData.cuisineType || formData.eventCategory;
    const data = { ...formData, package: selectedPackage, guests: Number.isFinite(guestCount) ? guestCount : 0 };

    try {
      const res = await fetch(apiUrl("/api/booking"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Booking failed");

      let extraDetails = "";
      if (formData.service === "Corporate Bento") {
        extraDetails = `\nBento Type: ${formData.bentoType || missing}\nPax: ${formData.bentoPax || missing}\nCompany: ${formData.companyName || missing}\nDelivery Time: ${formData.deliveryTime || missing}`;
      } else if (formData.service === "Bridal Makeup") {
        extraDetails = `\nPackage: ${formData.bridalPackage || missing}\nTrial Date: ${formData.trialDate || missing}`;
      } else if (formData.service === "Catering") {
        extraDetails = `\nCuisine: ${formData.cuisineType || missing}\nEvent Type: ${formData.eventType || missing}\nGuests: ${formData.guests || missing}`;
      } else if (formData.service === "Engagement") {
        extraDetails = `\nTheme: ${formData.theme || missing}\nVenue: ${formData.venue || missing}\nGuests: ${formData.guests || missing}`;
      } else if (formData.service === "Event Planning") {
        extraDetails = `\nEvent Category: ${formData.eventCategory || missing}\nEvent Size: ${formData.eventSize || missing}\nBudget: ${formData.budget || missing}\nVenue: ${formData.venue || missing}`;
      } else if (formData.service === "Food Tasting") {
        extraDetails = `\nTasting Menu: ${formData.tastingMenu || missing}\nPax: ${formData.tastingPax || missing}`;
      }

      const whatsappMsg = `Nam-Nams Catering & Events - New Booking\n\nService: ${formData.service}\nName: ${formData.name}\nPhone: ${formData.phone}\nDate: ${formData.date}${extraDetails}\n\nNotes: ${formData.notes || "None"}`;
      window.open(`https://wa.me/601110085626?text=${encodeURIComponent(whatsappMsg)}`, "_blank");

      onClose();
    } catch (err) {
      console.error("Booking failed:", err);
      alert("Booking failed. Please try again.");
    }
  };

  const selectStyle = {
    width: "100%",
    background: "#ffffff",
    border: "none",
    borderBottom: "1px solid rgba(247, 148, 31, 0.35)",
    color: "var(--navy)",
    padding: "14px 0",
    fontFamily: "var(--font-jost), sans-serif",
    outline: "none",
  };

  const optionStyle = { background: "#ffffff", color: "#06113c" };

  const renderServiceFields = () => {
    switch (formData.service) {
      case "Corporate Bento":
        return (
          <>
            <div className="form-group">
              <select value={formData.bentoType} onChange={(e) => updateForm({ bentoType: e.target.value })} style={selectStyle}>
                <option value="" style={optionStyle}>Select Bento Type</option>
                <option value="Malay Bento" style={optionStyle}>Malay Bento</option>
                <option value="Western Bento" style={optionStyle}>Western Bento</option>
                <option value="Chinese Bento" style={optionStyle}>Chinese Bento</option>
                <option value="Japanese Bento" style={optionStyle}>Japanese Bento</option>
                <option value="Mixed / Custom" style={optionStyle}>Mixed / Custom</option>
              </select>
            </div>
            <div className="form-group">
              <select value={formData.package} onChange={(e) => updateForm({ package: e.target.value })} style={selectStyle}>
                <option value="" style={optionStyle}>Select Package Range</option>
                <option value="Essential Bento - from RM12/pax" style={optionStyle}>Essential Bento - from RM12/pax</option>
                <option value="Assorted Bento - from RM18/pax" style={optionStyle}>Assorted Bento - from RM18/pax</option>
                <option value="Executive Bento - from RM25/pax" style={optionStyle}>Executive Bento - from RM25/pax</option>
              </select>
            </div>
            <div className="form-group">
              <input type="number" placeholder="Number of Pax" min="10" value={formData.bentoPax} onChange={(e) => updateForm({ bentoPax: e.target.value })} />
              <label>Number of Pax</label>
            </div>
            <div className="form-group">
              <input type="text" placeholder="Company Name" value={formData.companyName} onChange={(e) => updateForm({ companyName: e.target.value })} />
              <label>Company Name</label>
            </div>
            <div className="form-group">
              <input type="time" value={formData.deliveryTime} onChange={(e) => updateForm({ deliveryTime: e.target.value })} />
              <label>Delivery Time</label>
            </div>
          </>
        );
      case "Bridal Makeup":
        return (
          <>
            <div className="form-group">
              <select value={formData.bridalPackage} onChange={(e) => updateForm({ bridalPackage: e.target.value })} style={selectStyle}>
                <option value="" style={optionStyle}>Select Package</option>
                <option value="Nikah Package" style={optionStyle}>Nikah Package</option>
                <option value="Reception Package" style={optionStyle}>Reception Package</option>
                <option value="Full Day Package" style={optionStyle}>Full Day Package</option>
                <option value="Bridesmaid Makeup" style={optionStyle}>Bridesmaid Makeup</option>
              </select>
            </div>
            <div className="form-group">
              <input type="date" value={formData.trialDate} onChange={(e) => updateForm({ trialDate: e.target.value })} />
              <label>Trial Makeup Date</label>
            </div>
          </>
        );
      case "Catering":
        return (
          <>
            <div className="form-group">
              <select value={formData.cuisineType} onChange={(e) => updateForm({ cuisineType: e.target.value })} style={selectStyle}>
                <option value="" style={optionStyle}>Select Cuisine</option>
                <option value="Malay" style={optionStyle}>Malay</option>
                <option value="Western" style={optionStyle}>Western</option>
                <option value="Chinese" style={optionStyle}>Chinese</option>
                <option value="Mixed Buffet" style={optionStyle}>Mixed Buffet</option>
              </select>
            </div>
            <div className="form-group">
              <select value={formData.package} onChange={(e) => updateForm({ package: e.target.value })} style={selectStyle}>
                <option value="" style={optionStyle}>Select Package Range</option>
                <option value="Classic Buffet - from RM22/pax" style={optionStyle}>Classic Buffet - from RM22/pax</option>
                <option value="Heritage Buffet - from RM32/pax" style={optionStyle}>Heritage Buffet - from RM32/pax</option>
                <option value="Premium Event Buffet - from RM45/pax" style={optionStyle}>Premium Event Buffet - from RM45/pax</option>
              </select>
            </div>
            <div className="form-group">
              <input type="text" placeholder="Event Type" value={formData.eventType} onChange={(e) => updateForm({ eventType: e.target.value })} />
              <label>Event Type (e.g. Wedding, Birthday)</label>
            </div>
            <div className="form-group">
              <input type="number" placeholder="Guests" min="10" value={formData.guests} onChange={(e) => updateForm({ guests: e.target.value })} />
              <label>Estimated Guests</label>
            </div>
          </>
        );
      case "Engagement":
        return (
          <>
            <div className="form-group">
              <input type="text" placeholder="Theme" value={formData.theme} onChange={(e) => updateForm({ theme: e.target.value })} />
              <label>Event Theme</label>
            </div>
            <div className="form-group">
              <input type="text" placeholder="Venue" value={formData.venue} onChange={(e) => updateForm({ venue: e.target.value })} />
              <label>Venue / Location</label>
            </div>
            <div className="form-group">
              <input type="number" placeholder="Guests" min="10" value={formData.guests} onChange={(e) => updateForm({ guests: e.target.value })} />
              <label>Estimated Guests</label>
            </div>
          </>
        );
      case "Event Planning":
        return (
          <>
            <div className="form-group">
              <select value={formData.eventCategory} onChange={(e) => updateForm({ eventCategory: e.target.value })} style={selectStyle}>
                <option value="" style={optionStyle}>Select Event Category</option>
                <option value="Wedding" style={optionStyle}>Wedding</option>
                <option value="Birthday Party" style={optionStyle}>Birthday Party</option>
                <option value="Corporate Dinner" style={optionStyle}>Corporate Dinner</option>
                <option value="Product Launch" style={optionStyle}>Product Launch</option>
                <option value="Charity Gala" style={optionStyle}>Charity Gala</option>
                <option value="Family Gathering" style={optionStyle}>Family Gathering</option>
                <option value="Other" style={optionStyle}>Other</option>
              </select>
            </div>
            <div className="form-group">
              <select value={formData.eventSize} onChange={(e) => updateForm({ eventSize: e.target.value })} style={selectStyle}>
                <option value="" style={optionStyle}>Event Size</option>
                <option value="Intimate (10-30 pax)" style={optionStyle}>Intimate (10-30 pax)</option>
                <option value="Medium (30-100 pax)" style={optionStyle}>Medium (30-100 pax)</option>
                <option value="Large (100-300 pax)" style={optionStyle}>Large (100-300 pax)</option>
                <option value="Grand (300+ pax)" style={optionStyle}>Grand (300+ pax)</option>
              </select>
            </div>
            <div className="form-group">
              <input type="text" placeholder="Budget" value={formData.budget} onChange={(e) => updateForm({ budget: e.target.value })} />
              <label>Estimated Budget (RM)</label>
            </div>
            <div className="form-group">
              <input type="text" placeholder="Venue" value={formData.venue} onChange={(e) => updateForm({ venue: e.target.value })} />
              <label>Venue / Location</label>
            </div>
          </>
        );
      case "Food Tasting":
        return (
          <>
            <div className="form-group">
              <select value={formData.tastingMenu} onChange={(e) => updateForm({ tastingMenu: e.target.value })} style={selectStyle}>
                <option value="" style={optionStyle}>Select Tasting Menu</option>
                <option value="Wedding Signature" style={optionStyle}>Wedding Signature</option>
                <option value="Corporate Buffet" style={optionStyle}>Corporate Buffet</option>
                <option value="Heritage Selection" style={optionStyle}>Heritage Selection</option>
                <option value="Custom Menu" style={optionStyle}>Custom Menu</option>
              </select>
            </div>
            <div className="form-group">
              <input type="number" placeholder="Number of Pax (e.g. 2, 4)" min="1" max="10" value={formData.tastingPax} onChange={(e) => updateForm({ tastingPax: e.target.value })} />
              <label>Number of Pax</label>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="booking-overlay open visible" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="booking-modal">
        <button className="booking-close" onClick={onClose}>x</button>

        <div className="booking-progress">
          {[
            { id: 1, label: "Service" },
            { id: 2, label: "Details" },
            { id: 3, label: "Confirm" },
          ].map((s, idx) => (
            <React.Fragment key={s.id}>
              <div className={`bp-step ${step >= s.id ? "active" : ""} ${step > s.id ? "done" : ""}`}>
                <div className="bp-num">{s.id}</div>
                <div className="bp-label">{s.label}</div>
              </div>
              {idx < 2 && <div className={`bp-line ${step > s.id ? "done" : ""}`} />}
            </React.Fragment>
          ))}
        </div>

        {step === 1 && (
          <div className="booking-step active">
            <h3 className="booking-step-title">Select <em>Service</em></h3>
            <p className="booking-step-sub">Choose the service you need.</p>
            <div className="service-select-grid">
              {services.map((s) => (
                <div
                  key={s.id}
                  className={`service-select-card ${formData.service === s.name ? "selected" : ""}`}
                  onClick={() => updateForm({ service: s.name })}
                  style={{ position: "relative", overflow: "hidden", minHeight: "140px", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}
                >
                  <img src={s.image} alt={s.name} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: formData.service === s.name ? 0.8 : 0.4, transition: "opacity 0.3s" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10, 8, 6, 0.9) 0%, rgba(10, 8, 6, 0.2) 100%)" }} />
                  <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
                    <div style={{ fontSize: "1rem", marginBottom: "8px", fontWeight: 800, letterSpacing: "0.14em" }}>{s.icon}</div>
                    <div className="ssc-name" style={{ fontSize: "1.1rem" }}>{s.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="booking-step active">
            <h3 className="booking-step-title">Event <em>Details</em></h3>
            <p className="booking-step-sub">
              {formData.service === "Corporate Bento" ? "Tell us about your bento order." :
               formData.service === "Bridal Makeup" ? "Tell us about your special day." :
               formData.service === "Catering" ? "Tell us about your event." :
               formData.service === "Event Planning" ? "Let us plan your event." :
               "Tell us about your celebration."}
            </p>
            <div className="booking-form-grid">
              <div className="form-group full">
                <input type="text" placeholder="Name" value={formData.name} onChange={(e) => updateForm({ name: e.target.value })} required />
                <label>Name</label>
              </div>
              <div className="form-group">
                <input type="text" placeholder="Phone" value={formData.phone} onChange={(e) => updateForm({ phone: e.target.value })} required />
                <label>Phone</label>
              </div>
              <div className="form-group">
                <input type="date" value={formData.date} onChange={(e) => updateForm({ date: e.target.value })} required />
                <label>{formData.service === "Corporate Bento" ? "Delivery Date" : "Event Date"}</label>
              </div>

              {renderServiceFields()}

              <div className="form-group full">
                <textarea placeholder="Additional notes or requests" value={formData.notes} onChange={(e) => updateForm({ notes: e.target.value })} style={{ minHeight: "60px" }} />
                <label>Additional Notes</label>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="booking-step active">
            <h3 className="booking-step-title">Final <em>Check</em></h3>
            <div className="confirm-card">
              <div className="confirm-row"><span className="confirm-label">Service</span><span className="confirm-value">{formData.service}</span></div>
              <div className="confirm-row"><span className="confirm-label">Name</span><span className="confirm-value">{formData.name}</span></div>
              <div className="confirm-row"><span className="confirm-label">Phone</span><span className="confirm-value">{formData.phone}</span></div>
              <div className="confirm-row"><span className="confirm-label">Date</span><span className="confirm-value">{formData.date}</span></div>
              {formData.package && <div className="confirm-row"><span className="confirm-label">Package</span><span className="confirm-value">{formData.package}</span></div>}

              {formData.service === "Corporate Bento" && (
                <>
                  {formData.bentoType && <div className="confirm-row"><span className="confirm-label">Bento Type</span><span className="confirm-value">{formData.bentoType}</span></div>}
                  {formData.bentoPax && <div className="confirm-row"><span className="confirm-label">Pax</span><span className="confirm-value">{formData.bentoPax}</span></div>}
                  {formData.companyName && <div className="confirm-row"><span className="confirm-label">Company</span><span className="confirm-value">{formData.companyName}</span></div>}
                  {formData.deliveryTime && <div className="confirm-row"><span className="confirm-label">Delivery Time</span><span className="confirm-value">{formData.deliveryTime}</span></div>}
                </>
              )}
              {formData.service === "Bridal Makeup" && (
                <>
                  {formData.bridalPackage && <div className="confirm-row"><span className="confirm-label">Package</span><span className="confirm-value">{formData.bridalPackage}</span></div>}
                  {formData.trialDate && <div className="confirm-row"><span className="confirm-label">Trial Date</span><span className="confirm-value">{formData.trialDate}</span></div>}
                </>
              )}
              {formData.service === "Catering" && (
                <>
                  {formData.cuisineType && <div className="confirm-row"><span className="confirm-label">Cuisine</span><span className="confirm-value">{formData.cuisineType}</span></div>}
                  {formData.eventType && <div className="confirm-row"><span className="confirm-label">Event Type</span><span className="confirm-value">{formData.eventType}</span></div>}
                  {formData.guests !== "0" && <div className="confirm-row"><span className="confirm-label">Guests</span><span className="confirm-value">{formData.guests}</span></div>}
                </>
              )}
              {formData.service === "Engagement" && (
                <>
                  {formData.theme && <div className="confirm-row"><span className="confirm-label">Theme</span><span className="confirm-value">{formData.theme}</span></div>}
                  {formData.venue && <div className="confirm-row"><span className="confirm-label">Venue</span><span className="confirm-value">{formData.venue}</span></div>}
                  {formData.guests !== "0" && <div className="confirm-row"><span className="confirm-label">Guests</span><span className="confirm-value">{formData.guests}</span></div>}
                </>
              )}
              {formData.service === "Event Planning" && (
                <>
                  {formData.eventCategory && <div className="confirm-row"><span className="confirm-label">Category</span><span className="confirm-value">{formData.eventCategory}</span></div>}
                  {formData.eventSize && <div className="confirm-row"><span className="confirm-label">Size</span><span className="confirm-value">{formData.eventSize}</span></div>}
                  {formData.budget && <div className="confirm-row"><span className="confirm-label">Budget</span><span className="confirm-value">RM {formData.budget}</span></div>}
                  {formData.venue && <div className="confirm-row"><span className="confirm-label">Venue</span><span className="confirm-value">{formData.venue}</span></div>}
                </>
              )}
              {formData.service === "Food Tasting" && (
                <>
                  {formData.tastingMenu && <div className="confirm-row"><span className="confirm-label">Menu</span><span className="confirm-value">{formData.tastingMenu}</span></div>}
                  {formData.tastingPax && <div className="confirm-row"><span className="confirm-label">Pax</span><span className="confirm-value">{formData.tastingPax}</span></div>}
                </>
              )}
              {formData.notes && <div className="confirm-row"><span className="confirm-label">Notes</span><span className="confirm-value">{formData.notes}</span></div>}
            </div>
            <button className="book-btn-whatsapp" onClick={handleSubmit}>
              Confirm & WhatsApp
            </button>
          </div>
        )}

        <div className="booking-nav">
          {step > 1 && <button className="book-btn-back" onClick={() => setStep((current) => current - 1)}>Back</button>}
          {step < 3 && <button className="book-btn-next" onClick={handleNext}>Next Step</button>}
        </div>
      </div>
    </div>
  );
}
