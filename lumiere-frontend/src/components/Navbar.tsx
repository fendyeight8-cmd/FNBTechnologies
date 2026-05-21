"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar({ onOpenBooking, onOpenAdmin }: { onOpenBooking: () => void, onOpenAdmin: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <nav className={`dalca-nav ${scrolled ? "scrolled" : ""} ${mobileMenuOpen ? "menu-active" : ""}`}>
        <Link href="/" className="logo dalca-logo" onClick={closeMenu}>
          <img className="brand-mark" src="/images/nam-nams-logo.svg" alt="Nam-Nams" />
          <span className="brand-wordmark">
            <strong>Nam-Nams</strong>
            <small>Owned by F&amp;B Technologies</small>
          </span>
        </Link>

        <ul className="nav-links desktop-only">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/#specialize">Services</Link></li>
          <li><Link href="/cateringmenu">Menu</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/#contact">Contact</Link></li>
        </ul>

        <div className="nav-actions desktop-only">
          <button className="btn-primary" onClick={onOpenBooking}>Order Now</button>
          <button className="nav-admin-btn" onClick={onOpenAdmin}>Admin</button>
        </div>

        <button
          className={`mobile-menu-toggle ${mobileMenuOpen ? "active" : ""}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span className="bar line-1"></span>
          <span className="bar line-2"></span>
          <span className="bar line-3"></span>
        </button>
      </nav>

      <div className={`mobile-drawer ${mobileMenuOpen ? "open" : ""}`}>
        <div className="drawer-overlay" onClick={closeMenu}></div>
        <div className="drawer-content">
          <ul className="drawer-links">
            <li><Link href="/" onClick={closeMenu}>Home</Link></li>
            <li><Link href="/#specialize" onClick={closeMenu}>Services</Link></li>
            <li><Link href="/cateringmenu" onClick={closeMenu}>Menu</Link></li>
            <li><Link href="/about" onClick={closeMenu}>About</Link></li>
            <li><Link href="/#contact" onClick={closeMenu}>Contact</Link></li>
          </ul>
          <div className="drawer-actions">
            <button
              className="btn-primary"
              onClick={() => {
                closeMenu();
                onOpenBooking();
              }}
            >
              Order Now
            </button>
            <button
              className="nav-admin-btn"
              onClick={() => {
                closeMenu();
                onOpenAdmin();
              }}
            >
              Admin
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
