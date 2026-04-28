import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCartStore } from "../../store/useCartStore";
import { useWishlistStore } from "../../store/useWishlistStore";
import { useAuthStore } from "../../store/useAuthStore";
import StarRating from "../../components/StarRating";
import { useFormattedPrice } from "../../utils/formatPrice";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCartStore();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();
  const { user } = useAuthStore();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const formatPrice = useFormattedPrice();

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    Promise.all([
      fetch(`http://localhost:5000/api/products/${id}`).then(res => res.json()),
      fetch(`http://localhost:5000/api/products/${id}/related`).then(res => res.json())
    ])
      .then(([productData, relatedData]) => {
        setProduct(productData);
        setRelatedProducts(relatedData);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, qty);
    navigate("/cart");
  };

  const submitReviewHandler = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Assumes token is in localStorage
        },
        body: JSON.stringify({ rating, comment }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Review submitted!");
        setComment("");
        // Refresh product
        const updated = await fetch(`http://localhost:5000/api/products/${id}`).then(r => r.json());
        setProduct(updated);
      } else {
        alert(data.error || "Failed to submit review");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p>Loading product details...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <section className="product-details-container">
      <div className="card product-detail-card">
        <div className="product-detail-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-detail-info">
          <h2>{product.name}</h2>
          <div style={{ display: "flex", gap: "8px", alignItems: "center", margin: "10px 0" }}>
            <StarRating rating={product.rating} />
            <span style={{ fontSize: "0.9em", color: "gray" }}>({product.numReviews} Reviews)</span>
          </div>
          <p className="category">{product.category}</p>
          <p className="description">{product.description}</p>
          <p className="price">Price: {formatPrice(product.price)}</p>
          
          <div className="qty-selector">
            <label>Quantity:</label>
            <select value={qty} onChange={(e) => setQty(Number(e.target.value))}>
              {[...Array(product.stock || 10).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </select>
          </div>

          <div className="product-detail-actions">
            <button className="btn-primary" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button
              className={`btn-wishlist ${isInWishlist(product._id) ? "active" : ""}`}
              onClick={() =>
                isInWishlist(product._id)
                  ? removeFromWishlist(product._id)
                  : addToWishlist(product)
              }
            >
              {isInWishlist(product._id) ? "❤️ Added to Wishlist" : "🤍 Add to Wishlist"}
            </button>
          </div>
        </div>
      </div>

      <div className="reviews-section card">
        <h3>Reviews ({product.numReviews})</h3>
        {product.reviews.length === 0 && <p>No reviews yet. Be the first to review!</p>}
        <ul className="reviews-list">
          {product.reviews.map((review) => (
            <li key={review._id} className="review-item">
              <strong>{review.name}</strong>
              <div className="rating" style={{ margin: "6px 0" }}>
                <StarRating rating={review.rating} />
              </div>
              <p className="date">{new Date(review.createdAt).toLocaleDateString()}</p>
              <p className="comment">{review.comment}</p>
            </li>
          ))}
        </ul>

        <div className="add-review">
          <h4>Write a Customer Review</h4>
          {user ? (
            <form onSubmit={submitReviewHandler} className="review-form">
              <div className="form-group">
                <label>Rating</label>
                <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                  <option value="1">1 - Poor</option>
                  <option value="2">2 - Fair</option>
                  <option value="3">3 - Good</option>
                  <option value="4">4 - Very Good</option>
                  <option value="5">5 - Excellent</option>
                </select>
              </div>
              <div className="form-group">
                <label>Comment</label>
                <textarea
                  rows="3"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn-primary" disabled={submitting}>
                {submitting ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          ) : (
            <p>
              Please <Link to="/login">login</Link> to write a review.
            </p>
          )}
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="related-products card" style={{ marginTop: "2rem", padding: "2rem" }}>
          <h3 style={{ marginBottom: "1.5rem" }}>You Might Also Like</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1.5rem" }}>
            {relatedProducts.map(rp => (
              <Link to={`/product/${rp._id}`} key={rp._id} style={{ textDecoration: "none", color: "inherit" }} className="related-product-card card hover-scale">
                <img src={rp.image} alt={rp.name} style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px 8px 0 0" }} />
                <div style={{ padding: "1rem" }}>
                  <h4 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>{rp.name}</h4>
                  <p style={{ color: "var(--primary-color)", fontWeight: "bold" }}>{formatPrice(rp.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
