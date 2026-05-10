import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="footer-logo" style={{fontSize: '1.5rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--gold)'}}>Nums-Nums Catering & Event</div>
        <div className="footer-ownership" style={{ fontSize: '0.7rem', opacity: 0.5, marginTop: '6px', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Owned by Food & Beverage Technologies</div>
      </div>
      <div className="footer-copy">© 2025 Nums-Nums Catering & Event. A subsidiary of Food & Beverage Technologies. All rights reserved.</div>
      <div className="social-links">
        <Link href="#">Instagram</Link>
        <Link href="#">Facebook</Link>
        <Link href="https://wa.me/601110085626" target="_blank" rel="noopener noreferrer">WhatsApp</Link>
      </div>
    </footer>
  );
}
