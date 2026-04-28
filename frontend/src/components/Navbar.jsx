import { Link, NavLink } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useThemeStore } from "../store/useThemeStore";
import { useCartStore } from "../store/useCartStore";
import CurrencySelector from "./CurrencySelector";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/categories", label: "Categories" },
  { to: "/lookbook", label: "Lookbook" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" }
];

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const { isDarkMode, toggleTheme } = useThemeStore();
  const totalItems = useCartStore((state) => state.totalItems());

  return (
    <header className="navbar">
      <Link to="/" className="logo">
        Jafsoon
      </Link>
      <nav className="nav-links">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} className="nav-link">
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <CurrencySelector />
        <button onClick={toggleTheme} className="theme-toggle" title="Toggle Night Mode" aria-label="Toggle Night Mode">
          {isDarkMode ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          )}
        </button>
        <Link to="/cart" className="btn-outline" style={{ position: "relative" }}>
          Cart
          {totalItems > 0 && (
            <span style={{
              position: "absolute",
              top: "-8px",
              right: "-8px",
              backgroundColor: "var(--color-danger, #e74c3c)",
              color: "white",
              borderRadius: "50%",
              padding: "2px 6px",
              fontSize: "0.75rem",
              fontWeight: "bold"
            }}>
              {totalItems}
            </span>
          )}
        </Link>
        {user ? (
          <>
            <Link to="/profile" className="btn-primary">
              {user.name}
            </Link>
            <button onClick={logout} className="btn-outline">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="btn-primary">
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
