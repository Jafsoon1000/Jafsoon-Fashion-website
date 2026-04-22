import { Link } from "react-router-dom";

export default function Categories() {
  const categories = [
    { name: "Women", desc: "Explore our exclusive women's collection." },
    { name: "Men", desc: "Discover premium menswear styles." },
    { name: "Accessories", desc: "Complete your look with luxury accessories." },
    { name: "Shoes", desc: "Step out in style with our latest footwear." },
    { name: "New Arrivals", desc: "Be the first to wear our newest pieces." },
    { name: "Sale", desc: "Shop premium fashion at discounted prices." },
  ];

  return (
    <section className="categories-page">
      <div style={{ marginBottom: "2rem", textAlign: "center" }}>
        <h2>Categories</h2>
        <p className="eyebrow" style={{ marginTop: "0.5rem", color: "var(--text-muted)" }}>Browse our collections to find your perfect style</p>
      </div>
      <div className="grid">
        {categories.map((item) => (
          <Link 
            to={`/shop?category=${encodeURIComponent(item.name)}`} 
            key={item.name} 
            style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
          >
            <article 
              className="card category-card" 
              style={{ cursor: 'pointer', height: '100%', transition: 'transform 0.3s ease' }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <h3>{item.name}</h3>
              <p style={{ marginTop: '0.5rem', color: 'var(--text-muted)' }}>{item.desc}</p>
              <span style={{ display: 'inline-block', marginTop: '1rem', color: 'var(--primary)', fontWeight: 'bold' }}>
                Shop Now →
              </span>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
