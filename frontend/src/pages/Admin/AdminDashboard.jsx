import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, orders: 0, products: 0, revenue: 0 });
  const [ordersDataRaw, setOrdersDataRaw] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const [usersRes, ordersRes, productsRes] = await Promise.all([
          fetch("http://localhost:5000/api/users", { headers }),
          fetch("http://localhost:5000/api/orders", { headers }),
          fetch("http://localhost:5000/api/products?pageNumber=1&sort=newest")
        ]);

        const usersData = await usersRes.json();
        const ordersData = await ordersRes.json();
        const productsData = await productsRes.json();

        setOrdersDataRaw(ordersData);

        const totalRevenue = ordersData.reduce((acc, order) => acc + (order.isPaid ? order.totalPrice : 0), 0);

        setStats({
          users: usersData.length || 0,
          orders: ordersData.length || 0,
          products: productsData.totalProducts || 0,
          revenue: totalRevenue
        });
      } catch (error) {
        console.error("Failed to load dashboard stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const chartData = useMemo(() => {
    const dataMap = {};
    ordersDataRaw.forEach((order) => {
      const date = new Date(order.createdAt).toLocaleDateString();
      if (!dataMap[date]) {
        dataMap[date] = { date, revenue: 0, ordersCount: 0 };
      }
      dataMap[date].ordersCount += 1;
      if (order.isPaid) {
        dataMap[date].revenue += order.totalPrice;
      }
    });
    return Object.values(dataMap).sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [ordersDataRaw]);

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <section>
      <h2>Dashboard Overview</h2>
      
      <div className="admin-stat-grid">
        <div className="stat-card card">
          <div className="stat-title">Total Sales</div>
          <div className="stat-value">${stats.revenue.toFixed(2)}</div>
          <Link to="/admin/orders" className="stat-link">View Orders &rarr;</Link>
        </div>
        <div className="stat-card card">
          <div className="stat-title">Total Orders</div>
          <div className="stat-value">{stats.orders}</div>
          <Link to="/admin/orders" className="stat-link">Manage Orders &rarr;</Link>
        </div>
        <div className="stat-card card">
          <div className="stat-title">Total Customers</div>
          <div className="stat-value">{stats.users}</div>
          <Link to="/admin/users" className="stat-link">View Users &rarr;</Link>
        </div>
        <div className="stat-card card">
          <div className="stat-title">Active Products</div>
          <div className="stat-value">{stats.products}</div>
          <Link to="/admin/products" className="stat-link">Manage Products &rarr;</Link>
        </div>
      </div>

      <div className="admin-charts" style={{ marginTop: "2rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
        <div className="card" style={{ padding: "1.5rem" }}>
          <h3 style={{ marginBottom: "1rem" }}>Revenue Over Time</h3>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="card" style={{ padding: "1.5rem" }}>
          <h3 style={{ marginBottom: "1rem" }}>Orders Over Time</h3>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="ordersCount" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
