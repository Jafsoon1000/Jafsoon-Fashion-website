import { Link } from "react-router-dom";

export default function OrderSuccess() {
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
        <p>Thank you for your purchase. Your order has been placed successfully.</p>
        <p>We'll send you an email with the tracking information once your items ship.</p>
        <div className="actions">
          <Link to="/shop" className="btn-primary">Continue Shopping</Link>
          <Link to="/profile" className="btn-outline">View My Orders</Link>
        </div>
      </div>
    </section>
  );
}
