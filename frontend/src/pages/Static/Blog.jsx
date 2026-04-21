export default function Blog() {
  return (
    <section>
      <h2>Style Journal</h2>
      <div className="grid">
        {[
          "Top 10 Capsule Wardrobe Pieces",
          "How to Style Monochrome Looks",
          "Runway Trends That Work Daily"
        ].map((title) => (
          <article key={title} className="card">
            <h3>{title}</h3>
            <p>Read our latest tips from in-house stylists.</p>
          </article>
        ))}
      </div>
    </section>
  );
}
