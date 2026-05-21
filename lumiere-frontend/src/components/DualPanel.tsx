export default function DualPanel() {
  return (
    <section className="dalca-about-band" id="about">
      <div className="dalca-about-image">
        <img src="/images/catering.png" alt="Prepared Malaysian catering spread" loading="lazy" />
      </div>

      <div className="dalca-about-copy">
        <div className="section-eyebrow">About Us</div>
        <h2 className="section-title">
          Malaysian Catering<br /><em>Made For Everyone</em>
        </h2>
        <p className="section-body">
          Nam-Nams Catering Malaysia prepares familiar Malaysian favourites for corporate events, family gatherings, schools, offices, and factory canteens. Our food philosophy is simple: fresh ingredients, consistent preparation, and warm service.
        </p>

        <div className="dalca-progress-list">
          <div>
            <div className="dalca-progress-head">
              <span>Quality Food</span>
              <strong>100%</strong>
            </div>
            <div className="dalca-progress-track"><span style={{ width: "100%" }} /></div>
          </div>
          <div>
            <div className="dalca-progress-head">
              <span>Freshly Prepared</span>
              <strong>100%</strong>
            </div>
            <div className="dalca-progress-track"><span style={{ width: "100%" }} /></div>
          </div>
        </div>

        <a href="/about" className="dalca-text-link">Learn More</a>
      </div>
    </section>
  );
}
