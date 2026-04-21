export default function Categories() {
  return (
    <section>
      <h2>Categories</h2>
      <div className="grid">
        {["Women", "Men", "Accessories", "Shoes", "New Arrivals", "Sale"].map((item) => (
          <article key={item} className="card">
            <h3>{item}</h3>
            <p>Explore exclusive {item.toLowerCase()} collection.</p>
          </article>
        ))}
      </div>
    </section>
  );
}
