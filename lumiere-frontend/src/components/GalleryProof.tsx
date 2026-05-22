const gallery = [
  { src: "/images/gallery1.webp", title: "Grand Reception" },
  { src: "/images/gallery2.webp", title: "Culinary Setup" },
  { src: "/images/catering.webp", title: "Buffet Catering" },
  { src: "/images/corporate_event.webp", title: "Corporate Event" },
  { src: "/images/bento_malay.webp", title: "Malay Bento" },
  { src: "/images/engagement.webp", title: "Family Event" },
];

export default function GalleryProof() {
  return (
    <section className="dalca-gallery-proof" id="gallery-preview">
      <div className="dalca-section-head">
        <div className="section-eyebrow">Gallery</div>
        <h2 className="section-title">Prepared With<br /><em>Care</em></h2>
      </div>
      <div className="dalca-proof-grid">
        {gallery.map((item) => (
          <article key={item.title} className="dalca-proof-item">
            <img src={item.src} alt={item.title} loading="lazy" />
            <span>{item.title}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
