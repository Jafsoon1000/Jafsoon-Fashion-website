import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useWishlistStore } from "../../store/useWishlistStore";
import { useCartStore } from "../../store/useCartStore";

export default function Shop() {
  const { wishlistItems, addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();
  const { addToCart } = useCartStore();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("newest");
  
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  const categories = ["Dresses", "Top", "Outerwear", "Accessories", "Shoes"];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const query = new URLSearchParams();
        if (keyword) query.append("keyword", keyword);
        if (category) query.append("category", category);
        if (minPrice) query.append("minPrice", minPrice);
        if (maxPrice) query.append("maxPrice", maxPrice);
        if (sort) query.append("sort", sort);
        query.append("pageNumber", page);

        const res = await fetch(`http://localhost:5000/api/products?${query.toString()}`);
        const data = await res.json();
        
        setProducts(data.products || []);
        setPages(data.pages || 1);
        setTotalProducts(data.totalProducts || 0);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchProducts, 300); // Debounce search
    return () => clearTimeout(timer);
  }, [keyword, category, minPrice, maxPrice, sort, page]);

  return (
    <section className="shop-page">
      <div className="shop-header">
        <div>
          <h2>Shop All</h2>
          <p className="eyebrow">{totalProducts} Products Found</p>
        </div>
        
        <div className="shop-filters-row">
          <input
            type="text"
            placeholder="Search products..."
            className="search-input"
            value={keyword}
            onChange={(e) => { setKeyword(e.target.value); setPage(1); }}
          />
          <div className="custom-select-wrapper">
             <select 
               className="sort-select" 
               value={sort} 
               onChange={(e) => { setSort(e.target.value); setPage(1); }}
             >
               <option value="newest">Newest Arrivals</option>
               <option value="price_asc">Price: Low to High</option>
               <option value="price_desc">Price: High to Low</option>
               <option value="rating_desc">Highest Rated</option>
             </select>
          </div>
        </div>
      </div>

      <div className="shop-layout">
        <aside className="shop-sidebar card">
          <h3>Filters</h3>
          
          <div className="filter-group">
            <h4>Category</h4>
            <div className="category-list">
              <button
                className={`sidebar-btn ${category === "" ? "active" : ""}`}
                onClick={() => { setCategory(""); setPage(1); }}
              >
                All Categories
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`sidebar-btn ${category === cat ? "active" : ""}`}
                  onClick={() => { setCategory(cat); setPage(1); }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          
          <hr className="filter-divider" />
          
          <div className="filter-group">
            <h4>Price Range</h4>
            <div className="price-inputs">
              <input 
                type="number" 
                placeholder="Min $" 
                value={minPrice}
                onChange={(e) => { setMinPrice(e.target.value); setPage(1); }}
              />
              <span>-</span>
              <input 
                type="number" 
                placeholder="Max $" 
                value={maxPrice}
                onChange={(e) => { setMaxPrice(e.target.value); setPage(1); }}
              />
            </div>
          </div>
        </aside>

        <main className="shop-main">
          {loading ? (
            <p>Loading shop...</p>
          ) : products.length === 0 ? (
            <div className="empty-state">
              <h3>No products found</h3>
              <p>Try adjusting your search or filter criteria.</p>
              <button 
                className="btn-outline"
                onClick={() => {
                  setKeyword("");
                  setCategory("");
                  setMinPrice("");
                  setMaxPrice("");
                  setSort("newest");
                }}
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid">
                {products.map((product) => (
                  <article key={product._id} className="card product-card">
                    <div className="product-image">
                      <img src={product.image} alt={product.name} />
                      <button
                        className={`wishlist-btn ${isInWishlist(product._id) ? "active" : ""}`}
                        onClick={() =>
                          isInWishlist(product._id)
                            ? removeFromWishlist(product._id)
                            : addToWishlist(product)
                        }
                      >
                        {isInWishlist(product._id) ? "❤️" : "🤍"}
                      </button>
                    </div>
                    <div className="product-info">
                      <h3>{product.name}</h3>
                      <div className="rating-row">
                         {"⭐".repeat(Math.round(product.rating || 0))}
                         <span className="review-count">({product.numReviews})</span>
                      </div>
                      <p className="price">${product.price}</p>
                      <div className="card-actions">
                        <Link to={`/product/${product._id}`} className="btn-outline">
                          Details
                        </Link>
                        <button 
                          className="btn-primary" 
                          onClick={() => addToCart(product, 1)}
                          style={{flex: 1}}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              
              {pages > 1 && (
                <div className="pagination">
                  <button 
                    className="btn-outline" 
                    disabled={page === 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                  >
                    Prev
                  </button>
                  {[...Array(pages).keys()].map((p) => (
                    <button
                      key={p + 1}
                      className={page === p + 1 ? "btn-primary" : "btn-outline"}
                      onClick={() => setPage(p + 1)}
                    >
                      {p + 1}
                    </button>
                  ))}
                  <button 
                    className="btn-outline" 
                    disabled={page === pages}
                    onClick={() => setPage((p) => Math.min(pages, p + 1))}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </section>
  );
}
