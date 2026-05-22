"use client";

import { useCallback, useState, useEffect } from "react";
import Link from "next/link";
import { apiUrl } from "@/lib/api";

interface Booking {
  id: number;
  service: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests?: number;
  package?: string;
  budget?: string;
  status?: string;
  notes?: string;
  created_at: string;
}

interface MarketingMaterial {
  id: number;
  title: string;
  description: string;
  image_url?: string;
  created_at: string;
}

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  src: string;
  created_at: string;
}

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState("");
  const [marketingMaterials, setMarketingMaterials] = useState<MarketingMaterial[]>([]);
  const [newPromoTitle, setNewPromoTitle] = useState("");
  const [newPromoDesc, setNewPromoDesc] = useState("");
  const [newPromoImage, setNewPromoImage] = useState("");
  const [token, setToken] = useState("");
  const [galleryItemsAdmin, setGalleryItemsAdmin] = useState<GalleryItem[]>([]);

  const [galleryTitle, setGalleryTitle] = useState("");
  const [galleryCategory, setGalleryCategory] = useState("");
  const [galleryFile, setGalleryFile] = useState<File | null>(null);
  const [bookingSearch, setBookingSearch] = useState("");
  const [bookingStatus, setBookingStatus] = useState("All");

  const bookingStatuses = ["New", "Contacted", "Quoted", "Confirmed", "Cancelled"];

  const filteredBookings = bookings.filter((booking) => {
    const matchesStatus = bookingStatus === "All" || (booking.status || "New") === bookingStatus;
    const haystack = [
      booking.id,
      booking.service,
      booking.name,
      booking.email,
      booking.phone,
      booking.date,
      booking.package,
      booking.status,
    ].join(" ").toLowerCase();
    return matchesStatus && haystack.includes(bookingSearch.toLowerCase());
  });

  const dashboardStats = {
    total: bookings.length,
    new: bookings.filter((booking) => (booking.status || "New") === "New").length,
    confirmed: bookings.filter((booking) => booking.status === "Confirmed").length,
    upcoming: bookings.filter((booking) => booking.date && new Date(booking.date) >= new Date(new Date().toDateString())).length,
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(apiUrl("/api/login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user, password: pass })
      });
      if (res.ok) {
        const data = await res.json();
        setToken(data.token);
        setIsLoggedIn(true);
        setError("");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch {
      setError("Server error. Please try again later.");
    }
  };

  const fetchBookings = useCallback(async (authToken: string) => {
    try {
      const res = await fetch(apiUrl("/admin/bookings"), {
        headers: { "Authorization": `Bearer ${authToken}` }
      });
      if (res.ok) setBookings(await res.json());
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
    }
  }, []);

  const fetchMarketing = useCallback(async (authToken: string) => {
    try {
      const res = await fetch(apiUrl("/admin/marketing"), {
        headers: { "Authorization": `Bearer ${authToken}` }
      });
      if (res.ok) setMarketingMaterials(await res.json());
    } catch (err) {
      console.error("Failed to fetch marketing:", err);
    }
  }, []);

  const fetchGalleryAdmin = useCallback(async () => {
    try {
      const res = await fetch(apiUrl("/api/gallery"));
      if (res.ok) setGalleryItemsAdmin(await res.json());
    } catch (err) {
      console.error("Failed to fetch gallery:", err);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn && token) {
      const loadAdminData = async () => {
        await Promise.all([
          fetchBookings(token),
          fetchMarketing(token),
          fetchGalleryAdmin(),
        ]);
      };
      void loadAdminData();
    }
  }, [fetchBookings, fetchGalleryAdmin, fetchMarketing, isLoggedIn, token]);

  const handleMarketingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(apiUrl("/admin/marketing"), {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          title: newPromoTitle,
          description: newPromoDesc,
          image_url: newPromoImage,
        }),
      });
      if (!res.ok) throw new Error("Failed to add marketing material");
      setNewPromoTitle("");
      setNewPromoDesc("");
      setNewPromoImage("");
      await fetchMarketing(token);
    } catch (err) {
      console.error("Failed to add marketing material:", err);
    }
  };

  const handleGalleryUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryFile) return;
    
    const formData = new FormData();
    formData.append("title", galleryTitle);
    formData.append("category", galleryCategory);
    formData.append("image", galleryFile);

    try {
      const res = await fetch(apiUrl("/admin/gallery"), {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
        body: formData,
      });
      if (res.ok) {
        setGalleryTitle("");
        setGalleryCategory("");
        setGalleryFile(null);
        alert("Image uploaded to gallery successfully!");
        await fetchGalleryAdmin();
      } else {
        alert("Upload failed.");
      }
    } catch (err) {
      console.error("Failed to upload gallery image:", err);
    }
  };

  const handleGalleryDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this image?")) return;
    try {
      const res = await fetch(apiUrl(`/admin/gallery/${id}`), {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        await fetchGalleryAdmin();
      } else {
        alert("Failed to delete image.");
      }
    } catch (err) {
      console.error("Failed to delete gallery image:", err);
    }
  };

  const handleBookingStatus = async (id: number, status: string) => {
    try {
      const res = await fetch(apiUrl(`/admin/bookings/${id}/status`), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      await fetchBookings(token);
    } catch (err) {
      console.error("Failed to update booking status:", err);
      alert("Failed to update booking status.");
    }
  };

  const exportBookingsCsv = () => {
    const headers = ["ID", "Status", "Service", "Package", "Client", "Email", "Phone", "Date", "Time", "Guests", "Budget", "Notes", "Created"];
    const rows = filteredBookings.map((booking) => [
      booking.id,
      booking.status || "New",
      booking.service,
      booking.package || "",
      booking.name,
      booking.email || "",
      booking.phone || "",
      booking.date || "",
      booking.time || "",
      booking.guests || "",
      booking.budget || "",
      booking.notes || "",
      booking.created_at,
    ]);
    const csv = [headers, ...rows]
      .map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "nam-nams-bookings.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const bookingWhatsappUrl = (booking: Booking) => {
    const phone = (booking.phone || "").replace(/[^\d]/g, "");
    const target = phone.startsWith("60") ? phone : `60${phone.replace(/^0/, "")}`;
    const text = `Hi ${booking.name}, this is Nam-Nams regarding your ${booking.service} enquiry for ${booking.date}. May we confirm your event details?`;
    return `https://wa.me/${target || "601110085626"}?text=${encodeURIComponent(text)}`;
  };

  if (!isLoggedIn) {
    return (
      <div className="admin-overlay open">
        <div className="admin-modal">
          <Link href="/" className="admin-modal-close" aria-label="Back to homepage">X</Link>
          <h2 className="admin-title">Admin <em>Login</em></h2>
          <p className="admin-sub">Authorized access only.</p>
          <form onSubmit={handleLogin} style={{ marginTop: '40px' }}>
            <div className="form-group">
              <input type="text" placeholder=" " value={user} onChange={(e) => setUser(e.target.value)} required />
              <label>Username</label>
            </div>
            <div className="form-group">
              <input type="password" placeholder=" " value={pass} onChange={(e) => setPass(e.target.value)} required />
              <label>Password</label>
            </div>
            <button type="submit" className="form-submit" style={{ width: '100%', marginTop: '20px' }}>Secure Login</button>
            {error && <div className="admin-error" style={{ display: 'block', marginTop: '15px', color: '#ff4d4d', fontSize: '0.85rem', textAlign: 'center', letterSpacing: '0.1em' }}>{error}</div>}
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard open">
      <header className="dash-header">
        <div className="dash-brand">
          <img className="brand-mark" src="/images/nam-nams-logo.svg" alt="Nam-Nams" />
          <span>
            <strong>Nam-Nams</strong>
            <small>F&amp;B Technologies Dashboard</small>
          </span>
        </div>
        <button className="dash-close-btn" onClick={() => setIsLoggedIn(false)}>Logout</button>
      </header>

      <main className="dash-body">
        <section className="admin-stats-grid">
          <div className="admin-stat-card"><span>Total Leads</span><strong>{dashboardStats.total}</strong></div>
          <div className="admin-stat-card"><span>New Leads</span><strong>{dashboardStats.new}</strong></div>
          <div className="admin-stat-card"><span>Confirmed</span><strong>{dashboardStats.confirmed}</strong></div>
          <div className="admin-stat-card"><span>Upcoming</span><strong>{dashboardStats.upcoming}</strong></div>
        </section>

        <div className="dash-section-header">
          <h2 className="dash-section-title">Marketing & Promotions</h2>
          <p className="dash-section-sub">Upload marketing materials and change promotion descriptions.</p>
        </div>
        <div className="marketing-upload-container" style={{ marginBottom: '50px' }}>
          <div className="marketing-card">
            <h3 style={{ color: 'var(--gold)', marginBottom: '20px', fontSize: '1.2rem' }}>Add New Promotion</h3>
            <form onSubmit={handleMarketingSubmit}>
              <input type="text" placeholder="Promotion Title" value={newPromoTitle} onChange={(e) => setNewPromoTitle(e.target.value)} required />
              <input type="text" placeholder="Image URL (e.g. Unsplash link)" value={newPromoImage} onChange={(e) => setNewPromoImage(e.target.value)} required />
              <textarea placeholder="Promotion Description" rows={4} value={newPromoDesc} onChange={(e) => setNewPromoDesc(e.target.value)} required></textarea>
              <button type="submit" className="form-submit" style={{ width: '100%' }}>Publish Promotion</button>
            </form>
          </div>
          <div className="marketing-card">
            <h3 style={{ color: 'var(--gold)', marginBottom: '20px', fontSize: '1.2rem' }}>Active Materials</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {marketingMaterials.map((m) => (
                <div key={m.id} style={{ padding: '15px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px' }}>
                  <div style={{ fontWeight: 'bold' }}>{m.title}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>{m.description}</div>
                  {m.image_url && <a href={m.image_url} target="_blank" rel="noreferrer" style={{ fontSize: '0.75rem', color: 'var(--gold)' }}>View Image</a>}
                  <div style={{ fontSize: '0.75rem', opacity: 0.6, marginTop: '5px' }}>Added: {m.created_at}</div>
                </div>
              ))}
              {marketingMaterials.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No marketing materials yet.</p>}
            </div>
          </div>
        </div>

        <div className="dash-section-header">
          <h2 className="dash-section-title">Gallery Upload</h2>
          <p className="dash-section-sub">Upload new high-resolution images to the public gallery.</p>
        </div>
        <div className="marketing-upload-container" style={{ marginBottom: '50px' }}>
          <div className="marketing-card">
            <h3 style={{ color: 'var(--gold)', marginBottom: '20px', fontSize: '1.2rem' }}>Upload Image</h3>
            <form onSubmit={handleGalleryUpload} style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
              <input type="text" placeholder="Image Title" value={galleryTitle} onChange={(e) => setGalleryTitle(e.target.value)} required />
              <input type="text" placeholder="Category (e.g. Fine Dining)" value={galleryCategory} onChange={(e) => setGalleryCategory(e.target.value)} required />
              <div style={{ position: 'relative' }}>
                <input type="file" id="gallery-file" accept="image/*" onChange={(e) => setGalleryFile(e.target.files ? e.target.files[0] : null)} required style={{ opacity: 0, position: 'absolute', inset: 0, zIndex: 2, cursor: 'pointer', width: '100%', height: '100%' }} />
                <div style={{ padding: '20px', border: '1px dashed rgba(201, 169, 110, 0.4)', borderRadius: '4px', textAlign: 'center', color: galleryFile ? 'var(--gold-light)' : 'var(--text-muted)', background: 'rgba(201, 169, 110, 0.05)', transition: 'all 0.3s' }}>
                  {galleryFile ? `Selected: ${galleryFile.name}` : "Click or Drag to Upload Image"}
                </div>
              </div>
              <button type="submit" className="form-submit">Upload to Gallery</button>
            </form>
          </div>
          <div className="marketing-card">
            <h3 style={{ color: 'var(--gold)', marginBottom: '20px', fontSize: '1.2rem' }}>Active Gallery Images</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxHeight: '400px', overflowY: 'auto', paddingRight: '10px' }}>
              {galleryItemsAdmin.map((m) => (
                <div key={m.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <img src={m.src} alt={m.title} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                    <div>
                      <div style={{ fontWeight: 'bold' }}>{m.title}</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--gold)', marginBottom: '4px' }}>{m.category}</div>
                      <div style={{ fontSize: '0.75rem', opacity: 0.6 }}>Added: {m.created_at}</div>
                    </div>
                  </div>
                  <button onClick={() => handleGalleryDelete(m.id)} style={{ background: 'transparent', border: '1px solid #ff4d4d', color: '#ff4d4d', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', transition: 'all 0.3s' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#ff4d4d'; e.currentTarget.style.color = '#fff'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#ff4d4d'; }}>Delete</button>
                </div>
              ))}
              {galleryItemsAdmin.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No gallery images found.</p>}
            </div>
          </div>
        </div>

        <div className="dash-section-header">
          <h2 className="dash-section-title">Recent Bookings</h2>
          <p className="dash-section-sub">Manage your latest client enquiries.</p>
        </div>
        <div className="admin-booking-toolbar">
          <input
            type="search"
            placeholder="Search bookings, phone, package..."
            value={bookingSearch}
            onChange={(e) => setBookingSearch(e.target.value)}
          />
          <select value={bookingStatus} onChange={(e) => setBookingStatus(e.target.value)}>
            <option value="All">All Status</option>
            {bookingStatuses.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          <button type="button" className="dash-close-btn" onClick={exportBookingsCsv}>Export CSV</button>
        </div>

        <div className="booking-table-container">
          <table className="booking-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Status</th>
                <th>Service</th>
                <th>Package</th>
                <th>Client</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Date</th>
                <th>Time</th>
                <th>Action</th>
                <th>Enquired At</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((b) => (
                <tr key={b.id}>
                  <td>#{b.id}</td>
                  <td>
                    <select className="admin-status-select" value={b.status || "New"} onChange={(e) => handleBookingStatus(b.id, e.target.value)}>
                      {bookingStatuses.map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </td>
                  <td style={{ color: 'var(--gold)' }}>{b.service}</td>
                  <td style={{ fontSize: '0.85rem' }}>{b.package || '-'}</td>
                  <td style={{ fontWeight: 500 }}>{b.name}</td>
                  <td style={{ fontSize: '0.85rem' }}>{b.email || '-'}</td>
                  <td>{b.phone}</td>
                  <td>{b.date}</td>
                  <td>{b.time}</td>
                  <td><a className="admin-whatsapp-link" href={bookingWhatsappUrl(b)} target="_blank" rel="noreferrer">WhatsApp</a></td>
                  <td style={{ opacity: 0.6 }}>{b.created_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
