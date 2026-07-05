import { useEffect, useState } from "react";
import Card from "../components/Card.jsx";

export default function Dashboard({ apiUrl, token }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        const response = await fetch(`${apiUrl}/api/dashboard`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload.message || "Could not load dashboard");
        }

        setData(payload);
      } catch (err) {
        setError(err.message);
      }
    }

    loadDashboard();
  }, [apiUrl, token]);

  if (error) {
    return (
      <section className="content-page">
        <p className="error">{error}</p>
      </section>
    );
  }

  if (!data) {
    return (
      <section className="content-page">
        <p>Loading dashboard...</p>
      </section>
    );
  }

  return (
    <section className="dashboard">
      <div className="dashboard-header">
        <div>
          <p className="eyebrow">{data.user.location}</p>
          <h1>Smart Farmer Dashboard</h1>
          <p className="dashboard-subtitle">
            AI recommendations, market signals, disease risk, schemes, and buyer opportunities for {data.user.name}.
          </p>
        </div>
        <span className="status-pill">AI backend connected</span>
      </div>

      <div className="metrics-grid">
        <Card title="Weather" value={`${data.weather.temperature} C`} meta={data.weather.summary} />
        <Card title="Humidity" value={`${data.weather.humidity}%`} meta="Disease risk signal" />
        <Card title="Selling Window" value={data.marketIntelligence.bestSellingWindow} meta="Market intelligence" />
      </div>

      <div className="profile-strip">
        <span>{data.farmProfile.farmSize}</span>
        <span>{data.farmProfile.soilType}</span>
        <span>{data.farmProfile.irrigation}</span>
        <span>{data.farmProfile.season} season</span>
      </div>

      <div className="dashboard-grid feature-grid">
        <Card title="AI Crop Recommendation System">
          <div className="recommendation-list">
            {data.cropRecommendations.map((item) => (
              <div className="recommendation-card" key={item.crop}>
                <div>
                  <strong>{item.crop}</strong>
                  <p>{item.reason}</p>
                </div>
                <span>{item.score}%</span>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Market Intelligence">
          <p className="insight">{data.marketIntelligence.insight}</p>
          <p>{data.marketIntelligence.action}</p>
          <ul className="stack-list compact">
            {data.marketIntelligence.demandSignals.map((signal) => (
              <li key={signal}>{signal}</li>
            ))}
          </ul>
        </Card>

        <Card title="Disease & Risk Advisory">
          <div className="risk-banner">
            <span>{data.diseaseRisk.crop}</span>
            <strong>{data.diseaseRisk.riskLevel} risk</strong>
          </div>
          <p>{data.diseaseRisk.condition}</p>
          <ul className="stack-list compact">
            {data.diseaseRisk.prevention.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Card>

        <Card title="Government Scheme Guidance">
          <div className="scheme-list">
            {data.schemes.map((scheme) => (
              <div className="scheme-row" key={scheme.name}>
                <strong>{scheme.name}</strong>
                <span>{scheme.fit} fit</span>
                <p>{scheme.benefit}</p>
                <small>{scheme.nextStep}</small>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Buyer-Farmer Marketplace">
          <div className="marketplace-list">
            {data.marketplace.map((deal) => (
              <div className="marketplace-row" key={`${deal.buyer}-${deal.crop}`}>
                <div>
                  <strong>{deal.buyer}</strong>
                  <p>{deal.quantity} {deal.crop} in {deal.location}</p>
                </div>
                <span>Rs. {deal.offer}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="dashboard-grid">
        <Card title="Real-Time Market Price Tracking">
          <div className="price-list">
            {data.marketPrices.map((item) => (
              <div key={item.crop} className="price-row">
                <span>{item.crop}</span>
                <strong>Rs. {item.price}</strong>
                <small>{item.market} - {item.trend}</small>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Daily Farm Advisories">
          <ul className="stack-list">
            {data.advisories.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Card>

        <Card title="Farm Tasks">
          <ul className="stack-list">
            {data.tasks.map((task) => (
              <li key={task.id} className={task.done ? "done" : ""}>
                {task.label}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </section>
  );
}
