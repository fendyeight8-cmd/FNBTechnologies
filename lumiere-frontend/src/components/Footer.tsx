import Link from "next/link";

export default function Footer() {
  return (
    <footer className="dalca-footer">
      <div className="dalca-footer-brand">
        <div className="footer-logo footer-brand-lockup">
          <img className="brand-mark" src="/images/nam-nams-logo.svg" alt="Nam-Nams" />
          <span>
            <strong>Nam-Nams</strong>
            <small>Owned by F&amp;B Technologies</small>
          </span>
        </div>
        <p>Heritage catering, corporate meals, and event food service.</p>
      </div>

      <div className="dalca-footer-col">
        <h3>SiteMap</h3>
        <Link href="/">Home</Link>
        <Link href="/#specialize">Services</Link>
        <Link href="/cateringmenu">Menu</Link>
        <Link href="/about">About</Link>
        <Link href="/#contact">Contact</Link>
      </div>

      <div className="dalca-footer-col">
        <h3>Our Menus</h3>
        <Link href="/cateringmenu">Buffet Catering</Link>
        <Link href="/cateringmenu">Assorted Bento</Link>
        <Link href="/cateringmenu">Assorted Kuih</Link>
      </div>

      <div className="dalca-footer-col">
        <h3>Contact Information</h3>
        <p>Kota Kinabalu Sabah.</p>
        <Link href="mailto:fendyight8@gmail.com">fendyight8@gmail.com</Link>
        <Link href="tel:+601110085626">+601110085626</Link>
      </div>

      <div className="dalca-footer-bottom">
        <span>© 2024 Nam-Nams. All Rights Reserved.</span>
        <div>
          <Link href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">Facebook</Link>
          <Link href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">Instagram</Link>
          <Link href="https://wa.me/601110085626" target="_blank" rel="noopener noreferrer">WhatsApp</Link>
        </div>
      </div>
    </footer>
  );
}
