import { Link, useLocation } from "react-router-dom";

export default function AdminLayout({ children }) {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="admin-layout-container">
      <aside className="admin-sidebar card">
        <h3>Admin Panel</h3>
        <nav className="admin-nav">
          <Link 
            to="/admin/dashboard" 
            className={`admin-nav-link ${path === '/admin/dashboard' ? 'active' : ''}`}
          >
            Dashboard
          </Link>
          <Link 
            to="/admin/orders" 
            className={`admin-nav-link ${path === '/admin/orders' ? 'active' : ''}`}
          >
            Orders
          </Link>
          <Link 
            to="/admin/products" 
            className={`admin-nav-link ${path === '/admin/products' ? 'active' : ''}`}
          >
            Products
          </Link>
          <Link 
            to="/admin/users" 
            className={`admin-nav-link ${path === '/admin/users' ? 'active' : ''}`}
          >
            Users
          </Link>
        </nav>
      </aside>
      <main className="admin-main">
        {children}
      </main>
    </div>
  );
}
