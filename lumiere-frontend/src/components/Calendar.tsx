"use client";

import { useEffect, useState } from "react";
import { apiUrl } from "@/lib/api";

interface BookedData {
  [key: string]: Array<{
    service: string;
    time: string;
    status: string;
  }>;
}

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [bookedDates, setBookedDates] = useState<BookedData>({});
  const [hoveredEvent, setHoveredEvent] = useState<{ service: string; time: string; x: number; y: number } | null>(null);

  useEffect(() => {
    let active = true;

    const fetchDates = async () => {
      try {
        const res = await fetch(apiUrl("/api/booked-dates"));
        if (!res.ok) throw new Error("Failed to fetch booked dates");
        const data = await res.json();
        if (!active) return;

        const normalized: BookedData = {};
        Object.entries(data).forEach(([date, value]) => {
          normalized[date] = Array.isArray(value) ? value as BookedData[string] : [value as BookedData[string][number]];
        });
        setBookedDates(normalized);
      } catch (err) {
        console.error("Failed to fetch booked dates:", err);
      }
    };

    void fetchDates();
    return () => {
      active = false;
    };
  }, []);

  const renderDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const days = [];
    // Empty slots
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty" />);
    }

    // Actual days
    for (let i = 1; i <= daysInMonth; i++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      const thisDate = new Date(year, month, i);
      const isBooked = !!bookedDates[dateStr];
      const bookings = bookedDates[dateStr] || [];
      const eventSummary = bookings[0];

      days.push(
        <div
          key={i}
          className={`calendar-day ${isBooked ? "booked-red" : ""} ${thisDate < today ? "past" : ""} ${thisDate.getTime() === today.getTime() ? "today" : ""}`}
          onMouseEnter={(e) => {
            if (eventSummary) {
              const rect = e.currentTarget.getBoundingClientRect();
              setHoveredEvent({
                service: bookings.length > 1 ? `${eventSummary.service} +${bookings.length - 1} more` : eventSummary.service,
                time: eventSummary.time,
                x: rect.left + rect.width / 2,
                y: rect.top,
              });
            }
          }}
          onMouseLeave={() => setHoveredEvent(null)}
        >
          {i}
        </div>
      );
    }
    return days;
  };

  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));

  return (
    <div className="availability-container reveal" style={{ marginTop: 0 }}>
      <div className="calendar-header">
        <button className="calendar-nav-btn" onClick={prevMonth}>←</button>
        <div className="calendar-month">
          {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
        </div>
        <button className="calendar-nav-btn" onClick={nextMonth}>→</button>
      </div>
      <div className="calendar-grid">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="calendar-weekday">{d}</div>
        ))}
        {renderDays()}
      </div>
      <div className="calendar-legend">
        <div className="legend-item"><span className="legend-dot dot-available"></span> Available</div>
        <div className="legend-item"><span className="legend-dot dot-booked"></span> Booked</div>
      </div>

      {hoveredEvent && (
        <div 
          className="booking-detail-card show" 
          style={{ 
            left: `${hoveredEvent.x - 120}px`, 
            top: `${hoveredEvent.y - 120}px` 
          }}
        >
          <div className="bdc-header">Event Details</div>
          <div className="bdc-service">{hoveredEvent.service}</div>
          <div className="bdc-time">{hoveredEvent.time}</div>
        </div>
      )}
    </div>
  );
}
