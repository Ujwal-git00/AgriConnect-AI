import FeatureCard from "../components/FeatureCard.jsx";
import Hero from "../components/Hero.jsx";

export default function Home() {
  return (
    <>
      <Hero />
      <section className="section-grid">
        <FeatureCard
          title="Crop Planning"
          value="Personalized recommendations"
          meta="Suggest crops from location, season, soil, and water details."
          details={[
            "Matches your farm's soil type, irrigation method, and current season against crop needs.",
            "Ranks each suggested crop with a fit score and expected profit margin.",
            "Recommendations update as season and conditions change."
          ]}
        />
        <FeatureCard
          title="Disease & Risk Advisory"
          value="Early warning signals"
          meta="Spot disease risk from weather and humidity before it spreads."
          details={[
            "Watches temperature and humidity trends that raise crop disease risk.",
            "Flags the current risk level for your primary crop with a plain-language reason.",
            "Gives concrete prevention steps, like adjusting irrigation timing or improving airflow."
          ]}
        />
        <FeatureCard
          title="Market Access"
          value="Prices and buyers"
          meta="Track trends and discover buyer-farmer marketplace offers."
          details={[
            "Shows live-style mandi prices with the trend direction for each crop.",
            "Lists open buyer offers with quantity, price, and location.",
            "Suggests the best selling window so you can time your harvest sale."
          ]}
        />
      </section>
    </>
  );
}
