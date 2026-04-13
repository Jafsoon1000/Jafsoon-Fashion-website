import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");

  const categories = ["Dresses", "Top", "Outerwear", "Accessories", "Shoes"];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const query = new URLSearchParams();
        if (keyword) query.append("keyword", keyword);
        if (category) query.append("category", category);

        const res = await fetch(`http://localhost:5000/api/products?${query.toString()}`);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchProducts, 300); // Debounce search
    return () => clearTimeout(timer);
  }, [keyword, category]);

  return (
    <section className="shop-page">
      <div className="shop-header">
        <h2>Shop All</h2>
        <div className="shop-filters">
          <input
            type="text"
            placeholder="Search products..."
            className="search-input"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <div className="category-tags">
            <button
              className={`tag ${category === "" ? "active" : ""}`}
              onClick={() => setCategory("")}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`tag ${category === cat ? "active" : ""}`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <p>Loading shop...</p>
      ) : products.length === 0 ? (
        <p>No products found matching your criteria.</p>
      ) : (
        <div className="grid">
          {products.map((product) => (
            <article key={product._id} className="card product-card">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="price">${product.price}</p>
                <Link to={`/product/${product._id}`} className="btn-outline">
                  View Details
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
