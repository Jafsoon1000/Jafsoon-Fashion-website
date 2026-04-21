import { useWishlistStore } from "../../store/useWishlistStore";
import { Link } from "react-router-dom";
import { useCartStore } from "../../store/useCartStore";

export default function Wishlist() {
  const { wishlistItems, removeFromWishlist } = useWishlistStore();
  const { addToCart } = useCartStore();

  return (
    <section className="wishlist-page">
      <div className="section-header">
        <h2>My Wishlist</h2>
        <p>Save your favorite items for later.</p>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="empty-state">
          <p>Your wishlist is empty.</p>
          <Link to="/shop" className="btn-primary">
            Explore Shop
          </Link>
        </div>
      ) : (
        <div className="grid">
          {wishlistItems.map((product) => (
            <article key={product._id} className="card product-card">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                <button
                  className="remove-wishlist"
                  onClick={() => removeFromWishlist(product._id)}
                  title="Remove from wishlist"
                >
                  &times;
                </button>
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="price">${product.price}</p>
                <div className="card-actions">
                  <Link to={`/product/${product._id}`} className="btn-outline">
                    View
                  </Link>
                  <button
                    className="btn-primary"
                    onClick={() => addToCart(product, 1)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
