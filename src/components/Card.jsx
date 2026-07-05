export default function Card({ title, value, meta, children }) {
  return (
    <article className="card">
      {title && <p className="card-title">{title}</p>}
      {value && <h3>{value}</h3>}
      {meta && <p className="muted">{meta}</p>}
      {children}
    </article>
  );
}
