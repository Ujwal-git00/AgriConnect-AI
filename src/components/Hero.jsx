export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow">AI support for smarter farms</p>
        <h1>AgriConnect AI</h1>
        <p>
          A farmer-first dashboard for weather alerts, crop advisories, market prices,
          and quick decisions from one connected place.
        </p>
        <div className="hero-actions">
          <a className="primary-button" href="#/login">
            Open Dashboard
          </a>
          <a className="secondary-button" href="#/about">
            Learn More
          </a>
        </div>
      </div>
      <div className="hero-panel" aria-label="Farm insight preview">
        <div>
          <span>Crop Health</span>
          <strong>Good</strong>
        </div>
        <div>
          <span>Rain Chance</span>
          <strong>42%</strong>
        </div>
        <div>
          <span>Best Action</span>
          <strong>Irrigate early</strong>
        </div>
      </div>
    </section>
  );
}
