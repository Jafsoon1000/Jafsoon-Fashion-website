import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure?")) {
      // Mock delete
      setProducts(products.filter((p) => p._id !== id));
      alert("Product deleted (Mocked)");
    }
  };

  return (
    <section className="admin-page">
      <div className="admin-header">
        <h2>Admin: Manage Products</h2>
        <button className="btn-primary">Add New Product</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="card">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id.substring(0, 8)}...</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>
                    <button className="btn-outline btn-sm">Edit</button>
                    <button
                      className="btn-outline btn-sm btn-danger"
                      onClick={() => deleteHandler(product._id)}
                    >
                      Delete
                    </button>
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
