# 👗 Jafsoon Fashion Store

A premium, full-stack e-commerce experience built for modern fashion brands. Jafsoon combines a sleek obsidian-dark aesthetic with a robust Mongoose/Express backend and a responsive React frontend.

![Jafsoon Banner](https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1200&h=400)

## ✨ Key Features

- **🛍️ Complete Shopping Flow**: Persistent cart management, dynamic product listing, and a multi-step checkout experience.
- **🏷️ Promo Code System**: Admin-managed discount codes (percentage or fixed amount) that users can apply at checkout.
- **🔍 Advanced Search & Filter**: Real-time product searching and category-based filtering.
- **💖 Wishlist System**: Users can save their favorite items for later with instant localStorage persistence.
- **⭐ Product Reviews & Ratings**: Full feedback system with star ratings and customer comments.
- **📦 Order Tracking**: Personal profile page with a complete history of past purchases and statuses.
- **🔐 Secure Authentication**: JWT-based login/register with route protection.
- **🌗 Dynamic Theming**: Smooth transition between light and obsidian-dark modes.
- **📱 Responsive Design**: Fully optimized for mobile, tablet, and desktop viewing.
- **🛠️ Admin Dashboard**: Manage products, users, orders, and promo codes from a secure interface.

## 🚀 Tech Stack

- **Frontend**: React 18, Vite, React Router 6, Zustand (Auth, Cart, Theme & Wishlist).
- **Backend**: Node.js, Express, MongoDB/Mongoose.
- **Styling**: Vanilla CSS with HSL variables and CSS Grid/Flexbox.
- **Auth**: JSON Web Tokens (JWT).

## 🛠️ Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB (Local or Atlas)

### 1. Clone the repository
```bash
git clone https://github.com/Jafsoon1000/Jafsoon-Fashion-website.git
cd Jafsoon-Fashion-website
```

### 2. Setup Backend
```bash
cd backend
npm install
# Create a .env file based on .env.example
npm run dev
```

### 3. Setup Frontend
```bash
cd ../frontend
npm install
npm run dev
```

## 📂 Project Structure

```text
├── backend
│   ├── controllers     # Business logic
│   ├── models          # Mongoose schemas (User, Product, Order)
│   ├── routes          # API endpoints
│   └── server.js      # Entry point
├── frontend
│   ├── src
│   │   ├── components  # Navbar, Footer (with Newsletter)
│   │   ├── context     # Global state (Cart, Auth, Wishlist)
│   │   ├── pages       # Route components (Shop, Wishlist, Profile, etc.)
│   │   └── styles.css  # Premium design system
└── README.md
```

## 🤝 Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
