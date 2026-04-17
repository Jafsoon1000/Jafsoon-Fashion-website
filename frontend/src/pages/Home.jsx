import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ScrollReveal from "../components/ScrollReveal";

export default function Home() {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        setTrending(data.slice(0, 4));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const categories = [
    {
      name: "Spring Collection",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800",
      link: "/shop?category=Dresses",
    },
    {
      name: "Urban Essentials",
      image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800",
      link: "/shop?category=Top",
    },
    {
      name: "Accessories",
      image: "https://images.unsplash.com/photo-1509319117193-57bab727e09d?auto=format&fit=crop&q=80&w=800",
      link: "/shop?category=Accessories",
    },
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <ScrollReveal className="zoom-reveal">
        <section className="hero-v2">
          <div className="hero-content">
            <p className="eyebrow">Summer / Autumn 2026</p>
            <h1>Redefining Modern Elegance</h1>
            <p>
              Experience the fusion of streetwear and high fashion. Sustainable, 
              bold, and designed for the contemporary lifestyle.
            </p>
            <div className="hero-btns">
              <Link to="/shop" className="btn-primary">Shop Now</Link>
              <Link to="/about" className="btn-outline">Our Story</Link>
            </div>
          </div>
          <div className="hero-image-pane">
            <img 
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1200" 
              alt="Main Campaign" 
            />
          </div>
        </section>
      </ScrollReveal>

      {/* Benefits Bar */}
      <ScrollReveal>
        <section className="benefits-bar card reveal-stagger">
          <div className="benefit">
            <span>🚚</span>
            <div>
              <h4>Free Shipping</h4>
              <p>On all orders over $150</p>
            </div>
          </div>
          <div className="benefit">
            <span>🌿</span>
            <div>
              <h4>Sustainable</h4>
              <p>Eco-friendly materials</p>
            </div>
          </div>
          <div className="benefit">
            <span>🔒</span>
            <div>
              <h4>Secure Payment</h4>
              <p>SSL Encryption enabled</p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Featured Categories */}
      <section className="featured-categories">
        <ScrollReveal>
          <div className="section-header">
            <h2>Featured Categories</h2>
            <p>Discover our latest curated collections</p>
          </div>
        </ScrollReveal>
        <ScrollReveal className="reveal-stagger">
          <div className="category-grid">
            {categories.map((cat, idx) => (
              <Link key={idx} to={cat.link} className="category-card zoom-reveal">
                <img src={cat.image} alt={cat.name} />
                <div className="category-overlay">
                  <h3>{cat.name}</h3>
                  <span>View All &rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Trending Products */}
      <section className="trending-products">
        <ScrollReveal>
          <div className="section-header">
            <h2>Trending Now</h2>
            <p>The most loved pieces of the week</p>
          </div>
        </ScrollReveal>
        {loading ? (
          <p className="text-center">Loading trends...</p>
        ) : (
          <ScrollReveal className="reveal-stagger">
            <div className="grid">
              {trending.map((product) => (
                <article key={product._id} className="card product-card">
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p className="price">${product.price}</p>
                    <Link to={`/product/${product._id}`} className="btn-outline">View Item</Link>
                  </div>
                </article>
              ))}
            </div>
          </ScrollReveal>
        )}
        <ScrollReveal>
          <div className="text-center mt-3">
            <Link to="/shop" className="btn-primary">View All Products</Link>
          </div>
        </ScrollReveal>
      </section>

      {/* Brand Story */}
      <ScrollReveal className="zoom-reveal">
        <section className="brand-story grid">
          <div className="story-image">
            <img 
              src="https://images.unsplash.com/photo-1534126416832-a88fdf2911c2?auto=format&fit=crop&q=80&w=1000" 
              alt="Craftsmanship" 
            />
          </div>
          <div className="story-content card">
            <p className="eyebrow">The Veloura Way</p>
            <h2>Crafted with Precision, Worn with Pride.</h2>
            <p>
              Founded in 2024, Veloura was born from a desire to bridge the gap 
              between sustainable ethics and high-end fashion. Every piece in our 
              collection is designed in our London studio and crafted by artisans 
              who share our commitment to quality.
            </p>
            <p>
              We don't just sell clothes; we build the wardrobe of the modern icon.
            </p>
            <Link to="/about" className="btn-outline">Learn More About Us</Link>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
