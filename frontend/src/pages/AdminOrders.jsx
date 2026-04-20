import { useEffect, useState } from "react";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/orders", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeliver = async (id) => {
    if (window.confirm("Mark this order as delivered?")) {
      try {
        const token = localStorage.getItem("token");
        await fetch(`http://localhost:5000/api/orders/${id}/deliver`, {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchOrders();
      } catch (error) {
        alert("Failed to update status");
      }
    }
  };

  return (
    <section>
      <h2>Manage Orders</h2>
      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="card table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>USER</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>DELIVERED</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id.substring(0, 8)}</td>
                  <td>{order.user && order.user.name}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>${order.totalPrice.toFixed(2)}</td>
                  <td>
                    {order.isDelivered ? (
                      <span className="badge success">Yes</span>
                    ) : (
                      <span className="badge warning">No</span>
                    )}
                  </td>
                  <td>
                    {!order.isDelivered && (
                      <button 
                        className="btn-outline btn-sm"
                        onClick={() => handleDeliver(order._id)}
                      >
                        Mark Delivered
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
