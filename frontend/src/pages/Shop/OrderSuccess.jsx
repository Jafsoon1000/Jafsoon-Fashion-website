import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useCartStore } from "../../store/useCartStore";

export default function OrderSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const orderId = searchParams.get("order_id");
  
  const clearCart = useCartStore((state) => state.clearCart);
  
  const [status, setStatus] = useState(sessionId ? "verifying" : "success"); // 'verifying', 'success', 'failed'

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId || !orderId) return;

      try {
        const res = await fetch("http://localhost:5000/api/payment/verify-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ session_id: sessionId, order_id: orderId }),
        });

        const data = await res.json();

        if (res.ok && data.success) {
          setStatus("success");
          clearCart(); // Payment verified, clear the cart
        } else {
          setStatus("failed");
        }
      } catch (error) {
        console.error("Verification error:", error);
        setStatus("failed");
      }
    };

    verifyPayment();
  }, [sessionId, orderId, clearCart]);

  if (status === "verifying") {
    return (
      <section className="order-success-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <div className="card text-center">
          <h2>Verifying Payment...</h2>
          <p>Please wait while we confirm your payment with Stripe.</p>
        </div>
      </section>
    );
  }

  if (status === "failed") {
    return (
      <section className="order-success-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <div className="card text-center">
          <div className="success-icon" style={{ borderColor: 'red' }}>
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
          </div>
          <h2>Payment Verification Failed</h2>
          <p>We could not verify your payment. If you were charged, please contact support.</p>
          <div className="actions">
            <Link to="/checkout" className="btn-primary">Return to Checkout</Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="order-success-page">
      <div className="card text-center">
        <div className="success-icon">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="green" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        <h2>Order Confirmed!</h2>
        <p>Thank you for your purchase. Your payment was successful.</p>
        <p>We'll send you an email with the tracking information once your items ship.</p>
        <div className="actions">
          <Link to="/shop" className="btn-primary">Continue Shopping</Link>
          <Link to="/profile" className="btn-outline">View My Orders</Link>
        </div>
      </div>
    </section>
  );
}
