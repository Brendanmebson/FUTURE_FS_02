// seedMore.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";
import connectDB from "./config/db.js";

dotenv.config();

const products = [
  {
    title: "Gaming Laptop 4K",
    description: "High-end gaming laptop with 4K display and RGB keyboard.",
    price: 2500,
    discountPrice: 2200,
    images: ["https://example.com/laptop1.jpg", "https://example.com/laptop2.jpg"],
    category: "Electronics",
    brand: "GamerTech",
    stock: 50,
    rating: 4.8,
    numReviews: 12,
    tags: ["gaming", "laptop", "4k"],
    variants: [{ name: "Color", options: ["Black", "Red"] }],
    isFeatured: true,
    sku: "GAMELAP-001"
  },
  {
    title: "Wireless Headphones",
    description: "Noise-cancelling over-ear headphones with 20h battery life.",
    price: 300,
    discountPrice: 250,
    images: ["https://example.com/headphones1.jpg", "https://example.com/headphones2.jpg"],
    category: "Electronics",
    brand: "SoundMax",
    stock: 200,
    rating: 4.6,
    numReviews: 32,
    tags: ["audio", "headphones", "wireless"],
    variants: [{ name: "Color", options: ["Black", "White", "Blue"] }],
    isFeatured: true,
    sku: "HEADPH-002"
  },
  {
    title: "Smart Watch Pro",
    description: "Fitness smartwatch with heart rate monitoring and GPS.",
    price: 180,
    images: ["https://images.unsplash.com/photo-1576243345690-4e4b79b63288?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
    category: "Wearables",
    brand: "TimeTech",
    stock: 100,
    rating: 4.3,
    numReviews: 18,
    tags: ["fitness", "watch", "smartwatch"],
    variants: [{ name: "Band Color", options: ["Black", "Grey", "Red"] }],
    isFeatured: false,
    sku: "WATCH-003"
  },
  {
    title: "4K Action Camera",
    description: "Waterproof action camera with 4K recording at 60fps.",
    price: 220,
    discountPrice: 199,
    images: ["https://example.com/camera1.jpg", "https://example.com/camera2.jpg"],
    category: "Electronics",
    brand: "AdventureCam",
    stock: 80,
    rating: 4.5,
    numReviews: 21,
    tags: ["camera", "action", "4k", "waterproof"],
    variants: [{ name: "Accessories Pack", options: ["Basic", "Pro"] }],
    isFeatured: true,
    sku: "CAM-004"
  },
  {
    title: "Bluetooth Speaker",
    description: "Portable Bluetooth speaker with deep bass.",
    price: 120,
    images: ["https://example.com/speaker1.jpg"],
    category: "Audio",
    brand: "SoundMax",
    stock: 150,
    rating: 4.4,
    numReviews: 40,
    tags: ["speaker", "bluetooth", "portable"],
    variants: [{ name: "Color", options: ["Black", "Blue", "Red"] }],
    isFeatured: false,
    sku: "SPEAKER-005"
  },
  {
    title: "4K Smart TV 55inch",
    description: "55inch 4K UHD Smart TV with HDR and built-in apps.",
    price: 700,
    discountPrice: 650,
    images: ["https://example.com/tv1.jpg", "https://example.com/tv2.jpg"],
    category: "Electronics",
    brand: "VisionTech",
    stock: 35,
    rating: 4.7,
    numReviews: 28,
    tags: ["tv", "4k", "smarttv", "55inch"],
    variants: [],
    isFeatured: true,
    sku: "TV-006"
  },
  {
    title: "Mechanical Keyboard",
    description: "RGB mechanical keyboard with tactile switches.",
    price: 110,
    images: ["https://example.com/keyboard1.jpg"],
    category: "Computers",
    brand: "KeyPro",
    stock: 100,
    rating: 4.6,
    numReviews: 15,
    tags: ["keyboard", "mechanical", "rgb"],
    variants: [{ name: "Switch Type", options: ["Blue", "Red", "Brown"] }],
    isFeatured: false,
    sku: "KEYB-007"
  },
  {
    title: "Gaming Mouse",
    description: "Ergonomic gaming mouse with customizable DPI.",
    price: 60,
    images: ["https://example.com/mouse1.jpg"],
    category: "Computers",
    brand: "GamerTech",
    stock: 120,
    rating: 4.5,
    numReviews: 30,
    tags: ["mouse", "gaming", "ergonomic"],
    variants: [{ name: "Color", options: ["Black", "White"] }],
    isFeatured: true,
    sku: "MOUSE-008"
  },
  {
    title: "Laptop Backpack",
    description: "Water-resistant backpack with laptop compartment.",
    price: 80,
    images: ["https://example.com/backpack1.jpg"],
    category: "Accessories",
    brand: "BagPro",
    stock: 200,
    rating: 4.4,
    numReviews: 22,
    tags: ["backpack", "laptop", "travel"],
    variants: [{ name: "Color", options: ["Black", "Grey", "Blue"] }],
    isFeatured: false,
    sku: "BAG-009"
  },
  {
    title: "Noise-Cancelling Earbuds",
    description: "Compact wireless earbuds with active noise cancellation.",
    price: 150,
    discountPrice: 130,
    images: ["https://example.com/earbuds1.jpg", "https://example.com/earbuds2.jpg"],
    category: "Audio",
    brand: "SoundMax",
    stock: 90,
    rating: 4.5,
    numReviews: 25,
    tags: ["earbuds", "wireless", "noise-cancelling"],
    variants: [{ name: "Color", options: ["White", "Black"] }],
    isFeatured: true,
    sku: "EARBUD-010"
  },
  {
    title: "Smartphone X1",
    description: "Latest flagship smartphone with triple camera and AMOLED display.",
    price: 900,
    discountPrice: 850,
    images: ["https://example.com/phone1.jpg"],
    category: "Electronics",
    brand: "PhoneTech",
    stock: 75,
    rating: 4.7,
    numReviews: 30,
    tags: ["smartphone", "amoleddisplay", "triplecamera"],
    variants: [{ name: "Storage", options: ["128GB", "256GB"] }],
    isFeatured: true,
    sku: "PHONE-011"
  },
  {
    title: "Tablet Pro 12inch",
    description: "12inch tablet with stylus support and high-resolution display.",
    price: 600,
    images: ["https://example.com/tablet1.jpg"],
    category: "Electronics",
    brand: "TabTech",
    stock: 60,
    rating: 4.5,
    numReviews: 18,
    tags: ["tablet", "stylus", "12inch"],
    variants: [{ name: "Color", options: ["Silver", "Space Grey"] }],
    isFeatured: true,
    sku: "TABLET-012"
  },
  {
    title: "External SSD 1TB",
    description: "Portable 1TB SSD with fast read/write speeds.",
    price: 180,
    images: ["https://example.com/ssd1.jpg"],
    category: "Computers",
    brand: "StoragePro",
    stock: 100,
    rating: 4.6,
    numReviews: 12,
    tags: ["ssd", "storage", "portable"],
    variants: [],
    isFeatured: false,
    sku: "SSD-013"
  },
  {
    title: "Fitness Tracker Band",
    description: "Waterproof fitness tracker with step, sleep, and heart rate monitoring.",
    price: 50,
    images: ["https://images.unsplash.com/photo-1576243345690-4e4b79b63288?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
    category: "Wearables",
    brand: "FitPro",
    stock: 150,
    rating: 4.4,
    numReviews: 20,
    tags: ["fitness", "tracker", "wearable"],
    variants: [{ name: "Band Color", options: ["Black", "Green", "Pink"] }],
    isFeatured: false,
    sku: "FITBAND-014"
  },
  {
    title: "Drone X200",
    description: "Quadcopter drone with 4K camera and GPS stability.",
    price: 500,
    images: ["https://images.unsplash.com/photo-1527977966376-1c8408f9f108?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
    category: "Electronics",
    brand: "DroneTech",
    stock: 40,
    rating: 4.7,
    numReviews: 15,
    tags: ["drone", "camera", "gps"],
    variants: [],
    isFeatured: true,
    sku: "DRONE-015"
  },
  {
    title: "VR Headset",
    description: "Immersive VR headset compatible with multiple platforms.",
    price: 400,
    images: ["https://images.unsplash.com/photo-1702471897393-47ec1ba1192b?q=80&w=440&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
    category: "Gaming",
    brand: "VirtualPlay",
    stock: 30,
    rating: 4.5,
    numReviews: 10,
    tags: ["vr", "headset", "gaming"],
    variants: [],
    isFeatured: true,
    sku: "VR-016"
  },
  {
    title: "Portable Projector",
    description: "Mini projector for movies and presentations, 1080p support.",
    price: 220,
    images: ["https://images.unsplash.com/photo-1638154320403-1bc308a01398?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9ydGFibGUlMjBwcm9qZWN0b3J8ZW58MHx8MHx8fDA%3D"],
    category: "Electronics",
    brand: "ViewMax",
    stock: 55,
    rating: 4.4,
    numReviews: 12,
    tags: ["projector", "portable", "1080p"],
    variants: [],
    isFeatured: false,
    sku: "PROJ-017"
  },
  {
    title: "Gaming Chair",
    description: "Ergonomic chair with adjustable height and lumbar support.",
    price: 300,
    images: ["https://images.unsplash.com/photo-1636487658609-28282bb5a3a0?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z2FtaW5nJTIwY2hhaXJ8ZW58MHx8MHx8fDA%3D"],
    category: "Furniture",
    brand: "ChairPro",
    stock: 20,
    rating: 4.6,
    numReviews: 8,
    tags: ["gaming", "chair", "ergonomic"],
    variants: [{ name: "Color", options: ["Black", "Red"] }],
    isFeatured: true,
    sku: "CHAIR-018"
  },
  {
    title: "Electric Scooter",
    description: "Foldable electric scooter with 20km range.",
    price: 450,
    images: ["https://images.unsplash.com/photo-1597260491619-bab87197869f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZWxlY3RyaWMlMjBzY29vdGVyfGVufDB8fDB8fHww"],
    category: "Transport",
    brand: "ScootTech",
    stock: 25,
    rating: 4.5,
    numReviews: 10,
    tags: ["scooter", "electric", "foldable"],
    variants: [],
    isFeatured: false,
    sku: "SCOOT-019"
  },
  {
    title: "Smart Thermostat",
    description: "Wi-Fi connected thermostat with scheduling and voice control.",
    price: 200,
    images: ["https://images.unsplash.com/photo-1636569608385-58efc32690ea?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c21hcnQlMjB0aGVybW9zdGF0fGVufDB8fDB8fHww"],
    category: "Home",
    brand: "HomeTech",
    stock: 60,
    rating: 4.6,
    numReviews: 15,
    tags: ["thermostat", "smart", "home"],
    variants: [],
    isFeatured: true,
    sku: "THERMO-020"
  },
  {
    title: "Robot Vacuum",
    description: "Automatic robot vacuum cleaner with mapping and scheduling.",
    price: 350,
    images: ["https://plus.unsplash.com/premium_photo-1729006559482-d289e4385b1e?q=80&w=812&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
    category: "Home",
    brand: "CleanBot",
    stock: 35,
    rating: 4.7,
    numReviews: 18,
    tags: ["vacuum", "robot", "cleaning"],
    variants: [],
    isFeatured: true,
    sku: "VAC-021"
  },
  {
    title: "Electric Kettle",
    description: "Fast-boiling electric kettle with auto shut-off.",
    price: 60,
    images: ["https://images.unsplash.com/photo-1738520420652-0c47cea3922b?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
    category: "Home Appliances",
    brand: "KitchenPro",
    stock: 100,
    rating: 4.4,
    numReviews: 20,
    tags: ["kettle", "electric", "kitchen"],
    variants: [],
    isFeatured: false,
    sku: "KETTLE-022"
  },
  {
    title: "Air Purifier",
    description: "HEPA air purifier with real-time air quality display.",
    price: 180,
    images: ["https://images.unsplash.com/photo-1632928274371-878938e4d825?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
    category: "Home Appliances",
    brand: "AirMax",
    stock: 50,
    rating: 4.5,
    numReviews: 12,
    tags: ["airpurifier", "hepa", "home"],
    variants: [],
    isFeatured: true,
    sku: "AIRPUR-023"
  },
  {
    title: "Digital Camera DSLR",
    description: "DSLR camera with 24MP sensor and full HD video.",
    price: 1200,
    images: ["https://images.unsplash.com/photo-1603208234872-619ffa1209cb?q=80&w=374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
    category: "Electronics",
    brand: "PhotoPro",
    stock: 25,
    rating: 4.8,
    numReviews: 10,
    tags: ["camera", "dslr", "photography"],
    variants: [{ name: "Lens", options: ["18-55mm", "50mm"] }],
    isFeatured: true,
    sku: "DSLR-024"
  },
  {
    title: "Portable Charger 20000mAh",
    description: "High-capacity portable charger for multiple devices.",
    price: 70,
    images: ["https://images.unsplash.com/photo-1619489646924-b4fce76b1db5?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
    category: "Accessories",
    brand: "PowerMax",
    stock: 150,
    rating: 4.5,
    numReviews: 30,
    tags: ["charger", "portable", "powerbank"],
    variants: [],
    isFeatured: false,
    sku: "CHARGER-025"
  },
  {
    title: "Smart Light Bulb",
    description: "Wi-Fi smart light bulb with color changing and scheduling.",
    price: 35,
    images: ["https://images.unsplash.com/photo-1738512509101-ce10c202a9d0?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
    category: "Home",
    brand: "LightTech",
    stock: 100,
    rating: 4.4,
    numReviews: 25,
    tags: ["smart", "light", "wifi"],
    variants: [{ name: "Color", options: ["White", "RGB"] }],
    isFeatured: true,
    sku: "BULB-026"
  }
];


// Seeder function
const seedProducts = async () => {
  try {
    await connectDB();
       console.log("🗑 Deleting old products...");
    await Product.deleteMany();
    // optional: you can skip deletion if you want to append
    // await Product.deleteMany();

    console.log("🌱 Inserting new products...");
    await Product.insertMany(products);

    console.log("✅ Seeding more products completed!");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding more products:", error);
    process.exit(1);
  }
};

seedProducts();
