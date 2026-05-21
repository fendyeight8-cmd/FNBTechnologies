import Link from "next/link";

export default function FloatingWhatsApp() {
  return (
    <Link
      href="https://wa.me/60162161632"
      target="_blank"
      rel="noopener noreferrer"
      className="dalca-whatsapp"
      aria-label="WhatsApp us"
    >
      WhatsApp us
    </Link>
  );
}
