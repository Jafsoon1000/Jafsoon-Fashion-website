import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product.js";

dotenv.config();

const products = [
  // Women
  {
    name: "Floral Summer Wrap", price: 85,
    description: "Lightweight, breathable floral wrap perfect for warm summer days.",
    category: "Women", image: "https://images.unsplash.com/photo-1515347619252-7cd504ab5101?auto=format&fit=crop&q=80&w=1000",
    stock: 25, rating: 4.5, numReviews: 12
  },
  {
    name: "Classic Silk Blouse", price: 120,
    description: "Elegant silk blouse with a relaxed fit, ideal for both office and evening wear.",
    category: "Women", image: "https://images.unsplash.com/photo-1551163943-3f6a855d1153?auto=format&fit=crop&q=80&w=1000",
    stock: 15, rating: 4.8, numReviews: 34
  },
  {
    name: "High-Waist Trousers", price: 95,
    description: "Tailored high-waisted trousers with a wide leg and comfortable stretch.",
    category: "Women", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=1000",
    stock: 30, rating: 4.2, numReviews: 8
  },
  // Men
  {
    name: "Vintage Denim Jacket", price: 145,
    description: "Classic blue denim jacket with distressed details and a vintage wash.",
    category: "Men", image: "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?auto=format&fit=crop&q=80&w=1000",
    stock: 20, rating: 4.7, numReviews: 41
  },
  {
    name: "Oxford Cotton Shirt", price: 65,
    description: "A staple white oxford shirt, tailored for a sharp, modern silhouette.",
    category: "Men", image: "https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?auto=format&fit=crop&q=80&w=1000",
    stock: 50, rating: 4.5, numReviews: 22
  },
  {
    name: "Slim Fit Chinos", price: 75,
    description: "Comfortable slim-fit chinos in khaki, perfect for everyday wear.",
    category: "Men", image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=1000",
    stock: 40, rating: 4.3, numReviews: 15
  },
  // Dresses
  {
    name: "Velvet Evening Gown", price: 290,
    description: "Luxurious velvet gown featuring a dramatic slit and elegant draping.",
    category: "Dresses", image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&q=80&w=1000",
    stock: 5, rating: 4.9, numReviews: 19
  },
  {
    name: "Bohemian Midi Dress", price: 110,
    description: "Flowy bohemian midi dress with intricate embroidery.",
    category: "Dresses", image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=1000",
    stock: 18, rating: 4.6, numReviews: 27
  },
  // Top
  {
    name: "Ribbed Knit Sweater", price: 85,
    description: "Chunky ribbed knit sweater in a cozy oversized fit.",
    category: "Top", image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=1000",
    stock: 22, rating: 4.4, numReviews: 31
  },
  {
    name: "Graphic Cotton Tee", price: 35,
    description: "Soft cotton t-shirt featuring a minimalist retro graphic.",
    category: "Top", image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=1000",
    stock: 60, rating: 4.1, numReviews: 14
  },
  // Outerwear
  {
    name: "Standard Trench Coat", price: 320,
    description: "A luxury minimalist staple. Water-resistant fabric with a tailored fit in classic sand beige.",
    category: "Outerwear", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop",
    stock: 12, rating: 4.8, numReviews: 55
  },
  {
    name: "Leather Moto Jacket", price: 450,
    description: "Genuine leather motorcycle jacket with heavy duty hardware.",
    category: "Outerwear", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=1000",
    stock: 8, rating: 4.9, numReviews: 42
  },
  {
    name: "Tech Utility Jacket", price: 240,
    description: "Multi-pocket technical jacket with weather-sealed zippers. Functional urban aesthetic.",
    category: "Outerwear", image: "https://images.unsplash.com/photo-1604644401890-0bd678c83788?auto=format&fit=crop&q=80&w=1000",
    stock: 5, rating: 4.2, numReviews: 9
  },
  // Accessories
  {
    name: "Gold Minimalist Watch", price: 185,
    description: "Sleek gold-plated watch with a minimalist black dial.",
    category: "Accessories", image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=1000",
    stock: 15, rating: 4.7, numReviews: 28
  },
  {
    name: "Leather Crossbody Bag", price: 210,
    description: "Handcrafted Italian leather bag with adjustable strap.",
    category: "Accessories", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=1000",
    stock: 10, rating: 4.6, numReviews: 33
  },
  {
    name: "Classic Aviator Sunglasses", price: 130,
    description: "Polarized lenses with a timeless gold wire frame.",
    category: "Accessories", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=1000",
    stock: 25, rating: 4.5, numReviews: 61
  },
  // Shoes
  {
    name: "White Leather Sneakers", price: 150,
    description: "Premium leather low-top sneakers. Clean, minimalist design.",
    category: "Shoes", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=1000",
    stock: 30, rating: 4.8, numReviews: 112
  },
  {
    name: "Suede Ankle Boots", price: 195,
    description: "Comfortable Chelsea boots crafted from rich brown suede.",
    category: "Shoes", image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&q=80&w=1000",
    stock: 14, rating: 4.4, numReviews: 23
  },
  {
    name: "Strappy Stiletto Heels", price: 220,
    description: "Elegant black stilettos with delicate ankle straps.",
    category: "Shoes", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=1000",
    stock: 8, rating: 4.7, numReviews: 18
  },
  // New Arrivals
  {
    name: "Abstract Print Scarf", price: 45,
    description: "Vibrant silk scarf featuring a contemporary abstract design.",
    category: "New Arrivals", image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&q=80&w=1000",
    stock: 40, rating: 4.0, numReviews: 4
  },
  {
    name: "Oversized Graphic Hoodie", price: 95,
    description: "Heavyweight cotton with a bold back graphic.",
    category: "New Arrivals", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000&auto=format&fit=crop",
    stock: 20, rating: 4.6, numReviews: 32
  },
  // Sale
  {
    name: "Wide-Leg Cargo Pants", price: 55,
    description: "Rugged yet refined cargo pants in olive green.",
    category: "Sale", image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?q=80&w=1000&auto=format&fit=crop",
    stock: 10, rating: 4.3, numReviews: 21
  },
  {
    name: "Summer Straw Hat", price: 25,
    description: "Wide-brimmed straw hat perfect for beach days.",
    category: "Sale", image: "https://images.unsplash.com/photo-1521369909029-2afed882ba28?auto=format&fit=crop&q=80&w=1000",
    stock: 15, rating: 4.1, numReviews: 12
  },
  {
    name: "Knitted Beanie", price: 15,
    description: "Warm woolen beanie for cold winter days.",
    category: "Sale", image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&q=80&w=1000",
    stock: 5, rating: 4.5, numReviews: 44
  }
];

async function seedDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB for seeding...");
    
    await Product.deleteMany({});
    console.log("Existing products cleared.");
    
    await Product.insertMany(products);
    console.log(`${products.length} new products seeded successfully!`);
    
    await mongoose.disconnect();
    console.log("Disconnected from DB.");
  } catch (error) {
    console.error("Error during seeding:", error);
    process.exit(1);
  }
}

seedDB();
