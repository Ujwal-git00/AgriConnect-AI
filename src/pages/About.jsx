export default function About() {
  return (
    <section className="content-page">
      <p className="eyebrow">About the platform</p>
      <h1>Built for practical farming decisions</h1>
      <p>
        AgriConnect AI brings farm conditions, crop tasks, weather signals, and market
        data into one simple workspace. The Week 2 version now includes a backend API,
        authentication, and a protected dashboard.
      </p>
      <div className="feature-list">
        <span>Secure login</span>
        <span>Live API data</span>
        <span>Farmer dashboard</span>
      </div>
    </section>
  );
}
