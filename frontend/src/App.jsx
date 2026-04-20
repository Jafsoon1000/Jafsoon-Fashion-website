import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ThemeProvider } from "./context/ThemeContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import Lookbook from "./pages/Lookbook";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyPhone from "./pages/VerifyPhone";
import Profile from "./pages/Profile";
import OrderSuccess from "./pages/OrderSuccess";
import AdminProducts from "./pages/AdminProducts";
import AdminDashboard from "./pages/AdminDashboard";
import AdminOrders from "./pages/AdminOrders";
import AdminUsers from "./pages/AdminUsers";
import AdminRoute from "./components/AdminRoute";
import AdminLayout from "./components/AdminLayout";
import Wishlist from "./pages/Wishlist";
import NotFound from "./pages/NotFound";
import { WishlistProvider } from "./context/WishlistContext";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <ThemeProvider>
            <div className="app-shell">
              <Navbar />
              <main className="container">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/product/:id" element={<ProductDetails />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/lookbook" element={<Lookbook />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/order-success" element={<OrderSuccess />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/verify-phone" element={<VerifyPhone />} />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    }
                  />
                  {/* Admin Routes wrapped in Layout */}
                  <Route
                    path="/admin/*"
                    element={
                      <AdminRoute>
                        <AdminLayout>
                          <Routes>
                            <Route path="dashboard" element={<AdminDashboard />} />
                            <Route path="orders" element={<AdminOrders />} />
                            <Route path="users" element={<AdminUsers />} />
                            <Route path="products" element={<AdminProducts />} />
                          </Routes>
                        </AdminLayout>
                      </AdminRoute>
                    }
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </ThemeProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}
