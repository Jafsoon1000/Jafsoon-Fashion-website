import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, itemsPrice } = useCart();

  return (
    <section className="cart-page">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <div className="card text-center">
          <p>Your cart is empty.</p>
          <Link to="/shop" className="btn-primary">Go Shopping</Link>
        </div>
      ) : (
        <div className="cart-container">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item._id} className="card cart-item">
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="cart-item-details">
                  <Link to={`/product/${item._id}`}><h3>{item.name}</h3></Link>
                  <p className="price">${item.price}</p>
                </div>
                <div className="cart-item-actions">
                  <select
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item._id, Number(e.target.value))}
                  >
                    {[...Array(item.stock || 10).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                  <button
                    className="btn-outline btn-sm"
                    onClick={() => removeFromCart(item._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary card">
            <h3>Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)} items)</h3>
            <p className="total-price">${itemsPrice.toFixed(2)}</p>
            <Link to="/checkout" className="btn-primary block text-center">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
