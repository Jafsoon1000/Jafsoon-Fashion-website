export default function Lookbook() {
  return (
    <section>
      <h2>Lookbook</h2>
      <p>Get inspired by our curated seasonal styles.</p>
      <div className="grid">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <article className="card" key={n}>
            <h3>Look #{n}</h3>
            <p>Street luxe styling for day-to-night transitions.</p>
          </article>
        ))}
      </div>
    </section>
  );
}
