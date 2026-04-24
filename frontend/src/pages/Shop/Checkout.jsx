import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../store/useCartStore";
import { useAuthStore } from "../../store/useAuthStore";

export default function Checkout() {
  const { cartItems, itemsPrice, clearCart, coupon, applyCoupon, removeCoupon } = useCartStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [promoCodeInput, setPromoCodeInput] = useState("");
  const [promoError, setPromoError] = useState("");
  
  const basePrice = itemsPrice();
  let finalPrice = basePrice;
  let discountAmount = 0;
  
  if (coupon) {
    if (coupon.discountType === 'percentage') {
      discountAmount = basePrice * (coupon.discountValue / 100);
    } else {
      discountAmount = coupon.discountValue;
    }
    finalPrice = Math.max(0, basePrice - discountAmount);
  }

  const handleApplyCoupon = async () => {
    if (!promoCodeInput) return;
    setPromoError("");
    try {
      const res = await fetch("http://localhost:5000/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: promoCodeInput }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Invalid coupon");
      }
      applyCoupon(data);
      setPromoCodeInput("");
    } catch (err) {
      setPromoError(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login?redirect=checkout");
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      const orderData = {
        orderItems: cartItems.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          image: item.image,
          price: item.price,
          product: item._id,
        })),
        shippingAddress: { address, city, postalCode, country },
        paymentMethod: "Credit Card",
        totalPrice: finalPrice,
        couponCode: coupon ? coupon.code : "",
        discountAmount: discountAmount,
      };

      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(orderData),
      });

      if (res.ok) {
        const orderDataResult = await res.json();
        
        // Initiate Stripe Checkout
        const stripeRes = await fetch("http://localhost:5000/api/payment/create-session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ orderId: orderDataResult._id }),
        });

        const sessionData = await stripeRes.json();

        if (stripeRes.ok && sessionData.url) {
          // Redirect user to Stripe
          window.location.href = sessionData.url;
        } else {
          alert(sessionData.error || "Payment Gateway Error. Please try again.");
        }
      } else {
        alert("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Order error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <section className="checkout-page">
      <h2>Checkout</h2>
      <div className="checkout-grid">
        <form className="card checkout-form" onSubmit={handleSubmit}>
          <h3>Shipping Address</h3>
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="123 Fashion St"
            />
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="New York"
              />
            </div>
            <div className="form-group">
              <label>Postal Code</label>
              <input
                type="text"
                required
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                placeholder="10001"
              />
            </div>
          </div>
          <div className="form-group">
            <label>Country</label>
            <input
              type="text"
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="USA"
            />
          </div>

          <button type="submit" className="btn-primary block" disabled={isProcessing}>
            {isProcessing ? "Processing Payment..." : `Pay $${finalPrice.toFixed(2)}`}
          </button>
        </form>

        <div className="card checkout-summary">
          <h3>Order Summary</h3>
          {cartItems.map((item) => (
            <div key={item._id} className="summary-item">
              <span>{item.name} x {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <hr />
          
          <div className="promo-section" style={{ margin: "1rem 0" }}>
            {coupon ? (
              <div className="applied-coupon" style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '4px' }}>
                <span>Code <strong>{coupon.code}</strong> applied!</span>
                <button type="button" onClick={removeCoupon} style={{ color: 'var(--color-danger)', background: 'none', border: 'none', cursor: 'pointer' }}>Remove</button>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input 
                  type="text" 
                  placeholder="Promo Code" 
                  value={promoCodeInput}
                  onChange={(e) => setPromoCodeInput(e.target.value)}
                  style={{ flex: 1 }}
                />
                <button type="button" onClick={handleApplyCoupon} className="btn">Apply</button>
              </div>
            )}
            {promoError && <p style={{ color: 'var(--color-danger)', fontSize: '0.875rem', marginTop: '0.5rem' }}>{promoError}</p>}
          </div>
          <hr />

          <div className="summary-total" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Subtotal:</span>
              <span>${basePrice.toFixed(2)}</span>
            </div>
            {coupon && (
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--color-accent)" }}>
                <span>Discount ({coupon.code}):</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: "1.2rem", marginTop: "0.5rem" }}>
              <span>Total:</span>
              <span>${finalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
