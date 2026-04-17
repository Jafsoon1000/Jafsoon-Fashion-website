import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

const products = [
  {
    name: "Standard Trench Coat",
    price: 320,
    description: "A luxury minimalist staple. Water-resistant fabric with a tailored fit in classic sand beige.",
    category: "minimalist",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop",
    stock: 12
  },
  {
    name: "Silk Evening Blouse",
    price: 145,
    description: "Premium Mulberry silk with a relaxed drape. Effortless elegance for any occasion.",
    category: "minimalist",
    image: "https://images.unsplash.com/photo-1551163943-3f6a855d1153?q=80&w=1000&auto=format&fit=crop",
    stock: 8
  },
  {
    name: "Tailored Wool Trousers",
    price: 180,
    description: "High-waisted minimalist trousers in charcoal wool. Perfect silhouette for professional wear.",
    category: "minimalist",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1000&auto=format&fit=crop",
    stock: 15
  },
  {
    name: "Oversized Graphic Hoodie",
    price: 95,
    description: "Heavyweight cotton with a bold back graphic. The ultimate piece for modern streetwear enthusiasts.",
    category: "streetwear",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000&auto=format&fit=crop",
    stock: 20
  },
  {
    name: "Tech Utility Jacket",
    price: 240,
    description: "Multi-pocket technical jacket with weather-sealed zippers. Functional urban aesthetic.",
    category: "streetwear",
    image: "https://images.unsplash.com/photo-1604644401890-0bd678c83788?auto=format&fit=crop&q=80&w=1000",
    stock: 5
  },
  {
    name: "Wide-Leg Cargo Pants",
    price: 110,
    description: "Rugged yet refined cargo pants in olive green. Feature adjustable ankle straps and soft-touch canvas.",
    category: "streetwear",
    image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?q=80&w=1000&auto=format&fit=crop",
    stock: 10
  }
];

async function seedDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB for seeding...");
    
    await Product.deleteMany({});
    console.log("Existing products cleared.");
    
    await Product.insertMany(products);
    console.log("6 new products seeded successfully!");
    
    await mongoose.disconnect();
    console.log("Disconnected from DB.");
  } catch (error) {
    console.error("Error during seeding:", error);
    process.exit(1);
  }
}

seedDB();
