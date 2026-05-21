const clients = [
  "Corporate",
  "Schools",
  "Factories",
  "Family Events",
  "Open Houses",
  "Seminars",
  "Canteens",
  "Private Parties",
];

export default function ClientLogos() {
  return (
    <section className="dalca-client-strip">
      <div className="dalca-section-head">
        <div className="section-eyebrow">Our Client</div>
        <h2 className="section-title">Trusted For<br /><em>Many Occasions</em></h2>
      </div>
      <div className="dalca-client-grid">
        {clients.map((client) => (
          <div key={client} className="dalca-client-logo">{client}</div>
        ))}
      </div>
    </section>
  );
}
