import { useState } from "react";

export default function FeatureCard({ title, value, meta, details }) {
  const [open, setOpen] = useState(false);

  return (
    <article className={`card feature-card ${open ? "open" : ""}`}>
      <button
        type="button"
        className="feature-card-toggle"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
      >
        <div>
          <p className="card-title">{title}</p>
          {value && <h3>{value}</h3>}
          {meta && <p className="muted">{meta}</p>}
        </div>
        <span className="feature-card-chevron" aria-hidden="true">
          {open ? "-" : "+"}
        </span>
      </button>

      {open && (
        <div className="feature-card-details">
          <ul className="stack-list compact">
            {details.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <a className="link-button" href="#/login">
            See it on your dashboard
          </a>
        </div>
      )}
    </article>
  );
}
