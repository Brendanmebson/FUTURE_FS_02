// seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";
import connectDB from "./config/db.js";

dotenv.config();

const products = [
  {
    productId: 1,
    title: "Essence Mascara Lash Princess",
    description:
      "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
    category: "beauty",
    price: 9.99,
    discountPercentage: 10.48,
    rating: 2.56,
    stock: 99,
    tags: ["beauty", "mascara"],
    brand: "Essence",
    sku: "BEA-ESS-ESS-001",
    weight: 4,
    dimensions: { width: 15.14, height: 13.08, depth: 22.99 },
    warrantyInformation: "1 week warranty",
    shippingInformation: "Ships in 3-5 business days",
    availabilityStatus: "In Stock",
    reviews: [
      { rating: 3, comment: "Would not recommend!", reviewerName: "Eleanor Collins" },
      { rating: 4, comment: "Very satisfied!", reviewerName: "Lucas Gordon" },
      { rating: 5, comment: "Highly impressed!", reviewerName: "Eleanor Collins" },
    ],
    returnPolicy: "No return policy",
    minimumOrderQuantity: 48,
    meta: { barcode: "5784719087687", qrCode: "https://cdn.dummyjson.com/public/qr-code.png" },
    images: [
      "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp",
    ],
    thumbnail:
      "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",
  },
  {
    productId: 2,
    title: "Eyeshadow Palette with Mirror",
    description:
      "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application.",
    category: "beauty",
    price: 19.99,
    discountPercentage: 18.19,
    rating: 2.86,
    stock: 34,
    tags: ["beauty", "eyeshadow"],
    brand: "Glamour Beauty",
    sku: "BEA-GLA-EYE-002",
    weight: 9,
    dimensions: { width: 9.26, height: 22.47, depth: 27.67 },
    warrantyInformation: "1 year warranty",
    shippingInformation: "Ships in 2 weeks",
    availabilityStatus: "In Stock",
    reviews: [
      { rating: 5, comment: "Great product!", reviewerName: "Savannah Gomez" },
      { rating: 4, comment: "Awesome product!", reviewerName: "Christian Perez" },
      { rating: 1, comment: "Poor quality!", reviewerName: "Nicholas Bailey" },
    ],
    returnPolicy: "7 days return policy",
    minimumOrderQuantity: 20,
    meta: { barcode: "9170275171413", qrCode: "https://cdn.dummyjson.com/public/qr-code.png" },
    images: [
      "https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/1.webp",
    ],
    thumbnail:
      "https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/thumbnail.webp",
  },
  {
    productId: 3,
    title: "Powder Canister",
    description:
      "The Powder Canister is a convenient and stylish container for storing loose powder makeup products. Keep your makeup collection organized with this sleek canister.",
    category: "beauty",
    price: 14.99,
    discountPercentage: 15.34,
    rating: 4.32,
    stock: 50,
    tags: ["beauty", "powder"],
    brand: "Beauty Essentials",
    sku: "BEA-BES-POW-003",
    weight: 7,
    dimensions: { width: 10.5, height: 12.8, depth: 18.3 },
    warrantyInformation: "6 months warranty",
    shippingInformation: "Ships in 5-7 business days",
    availabilityStatus: "In Stock",
    reviews: [
      { rating: 4, comment: "Very good quality!", reviewerName: "Emma Watson" },
      { rating: 5, comment: "Excellent product!", reviewerName: "Olivia Brown" },
    ],
    returnPolicy: "14 days return policy",
    minimumOrderQuantity: 10,
    meta: { barcode: "6270987654321", qrCode: "https://cdn.dummyjson.com/public/qr-code.png" },
    images: ["https://cdn.dummyjson.com/product-images/beauty/powder-canister/1.webp"],
    thumbnail: "https://cdn.dummyjson.com/product-images/beauty/powder-canister/thumbnail.webp",
  },
  {
    productId: 4,
    title: "Red Lipstick",
    description:
      "Classic red lipstick with a creamy formula that provides long-lasting color and hydration. Perfect for any occasion.",
    category: "beauty",
    price: 12.99,
    discountPercentage: 5.12,
    rating: 4.6,
    stock: 120,
    tags: ["beauty", "lipstick"],
    brand: "Lip Luxe",
    sku: "BEA-LIP-RED-004",
    weight: 3,
    dimensions: { width: 2.5, height: 7.6, depth: 2.5 },
    warrantyInformation: "No warranty",
    shippingInformation: "Ships in 2-3 business days",
    availabilityStatus: "In Stock",
    reviews: [
      { rating: 5, comment: "Perfect shade of red!", reviewerName: "Sophia Martinez" },
      { rating: 4, comment: "Very smooth application.", reviewerName: "Isabella Johnson" },
    ],
    returnPolicy: "30 days return policy",
    minimumOrderQuantity: 5,
    meta: { barcode: "1234567890123", qrCode: "https://cdn.dummyjson.com/public/qr-code.png" },
    images: ["https://cdn.dummyjson.com/product-images/beauty/red-lipstick/1.webp"],
    thumbnail: "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/thumbnail.webp",
  },
  {
    productId: 5,
    title: "Foundation Matte",
    description:
      "Full coverage matte foundation that provides a flawless finish and controls shine throughout the day.",
    category: "beauty",
    price: 24.99,
    discountPercentage: 12.3,
    rating: 4.1,
    stock: 80,
    tags: ["beauty", "foundation"],
    brand: "Flawless Face",
    sku: "BEA-FFA-FND-005",
    weight: 5,
    dimensions: { width: 4.2, height: 12.1, depth: 4.2 },
    warrantyInformation: "1 year warranty",
    shippingInformation: "Ships in 1 week",
    availabilityStatus: "In Stock",
    reviews: [
      { rating: 4, comment: "Good coverage!", reviewerName: "Liam Davis" },
      { rating: 3, comment: "A bit cakey.", reviewerName: "Ava Wilson" },
    ],
    returnPolicy: "7 days return policy",
    minimumOrderQuantity: 15,
    meta: { barcode: "9876543210987", qrCode: "https://cdn.dummyjson.com/public/qr-code.png" },
    images: ["https://cdn.dummyjson.com/product-images/beauty/foundation-matte/1.webp"],
    thumbnail: "https://cdn.dummyjson.com/product-images/beauty/foundation-matte/thumbnail.webp",
  },
  {
    productId: 6,
    title: "Nail Polish Set",
    description:
      "Set of vibrant nail polishes with quick-dry formula. Includes multiple shades for all occasions.",
    category: "beauty",
    price: 15.99,
    discountPercentage: 8.75,
    rating: 4.3,
    stock: 60,
    tags: ["beauty", "nail polish"],
    brand: "Nail Glam",
    sku: "BEA-NGL-NPS-006",
    weight: 6,
    dimensions: { width: 10.0, height: 8.0, depth: 10.0 },
    warrantyInformation: "No warranty",
    shippingInformation: "Ships in 4-6 business days",
    availabilityStatus: "In Stock",
    reviews: [
      { rating: 5, comment: "Great colors!", reviewerName: "Mia Thompson" },
      { rating: 4, comment: "Love the quick-dry.", reviewerName: "James Anderson" },
    ],
    returnPolicy: "No return policy",
    minimumOrderQuantity: 12,
    meta: { barcode: "1112233445566", qrCode: "https://cdn.dummyjson.com/public/qr-code.png" },
    images: ["https://cdn.dummyjson.com/product-images/beauty/nail-polish-set/1.webp"],
    thumbnail: "https://cdn.dummyjson.com/product-images/beauty/nail-polish-set/thumbnail.webp",
  },
  {
    productId: 7,
    title: "Perfume Spray",
    description:
      "Elegant perfume spray with a long-lasting fragrance. Perfect for daily wear or special occasions.",
    category: "fragrance",
    price: 39.99,
    discountPercentage: 7.5,
    rating: 4.5,
    stock: 70,
    tags: ["fragrance", "perfume"],
    brand: "Scent Luxe",
    sku: "FRA-SLU-PER-007",
    weight: 8,
    dimensions: { width: 6.0, height: 15.0, depth: 6.0 },
    warrantyInformation: "2 years warranty",
    shippingInformation: "Ships in 3-5 business days",
    availabilityStatus: "In Stock",
    reviews: [
      { rating: 5, comment: "Lovely scent!", reviewerName: "Emma Clark" },
      { rating: 4, comment: "Lasts all day.", reviewerName: "Daniel Lewis" },
    ],
    returnPolicy: "14 days return policy",
    minimumOrderQuantity: 8,
    meta: { barcode: "5556667778889", qrCode: "https://cdn.dummyjson.com/public/qr-code.png" },
    images: ["https://cdn.dummyjson.com/product-images/fragrance/perfume-spray/1.webp"],
    thumbnail: "https://cdn.dummyjson.com/product-images/fragrance/perfume-spray/thumbnail.webp",
  },
  {
    productId: 8,
    title: "Body Lotion",
    description:
      "Hydrating body lotion enriched with natural ingredients to keep your skin soft and moisturized all day long.",
    category: "skincare",
    price: 18.99,
    discountPercentage: 9.2,
    rating: 4.2,
    stock: 90,
    tags: ["skincare", "lotion"],
    brand: "Skin Bliss",
    sku: "SKI-SBL-LOT-008",
    weight: 10,
    dimensions: { width: 8.0, height: 20.0, depth: 8.0 },
    warrantyInformation: "1 year warranty",
    shippingInformation: "Ships in 2-4 business days",
    availabilityStatus: "In Stock",
    reviews: [
      { rating: 4, comment: "Very moisturizing!", reviewerName: "Sophia Adams" },
      { rating: 5, comment: "Smells amazing!", reviewerName: "William Scott" },
    ],
    returnPolicy: "30 days return policy",
    minimumOrderQuantity: 10,
    meta: { barcode: "4445556667778", qrCode: "https://cdn.dummyjson.com/public/qr-code.png" },
    images: ["https://cdn.dummyjson.com/product-images/skincare/body-lotion/1.webp"],
    thumbnail: "https://cdn.dummyjson.com/product-images/skincare/body-lotion/thumbnail.webp",
  },
  {
    productId: 9,
    title: "Sunscreen SPF 50",
    description:
      "High-protection sunscreen with SPF 50. Lightweight and non-greasy formula suitable for all skin types.",
    category: "skincare",
    price: 22.99,
    discountPercentage: 11.0,
    rating: 4.4,
    stock: 100,
    tags: ["skincare", "sunscreen"],
    brand: "Sun Safe",
    sku: "SKI-SUN-SSC-009",
    weight: 8,
    dimensions: { width: 5.0, height: 15.0, depth: 5.0 },
    warrantyInformation: "6 months warranty",
    shippingInformation: "Ships in 3-5 business days",
    availabilityStatus: "In Stock",
    reviews: [
      { rating: 5, comment: "Works great!", reviewerName: "Aiden Brown" },
      { rating: 4, comment: "Not sticky at all.", reviewerName: "Olivia Harris" },
    ],
    returnPolicy: "7 days return policy",
    minimumOrderQuantity: 6,
    meta: { barcode: "2223334445556", qrCode: "https://cdn.dummyjson.com/public/qr-code.png" },
    images: ["https://cdn.dummyjson.com/product-images/skincare/sunscreen-spf-50/1.webp"],
    thumbnail: "https://cdn.dummyjson.com/product-images/skincare/sunscreen-spf-50/thumbnail.webp",
  },
  {
    productId: 10,
    title: "Shampoo Anti-Dandruff",
    description:
      "Anti-dandruff shampoo that soothes the scalp and removes flakes. Gentle formula for daily use.",
    category: "haircare",
    price: 16.99,
    discountPercentage: 6.8,
    rating: 4.3,
    stock: 110,
    tags: ["haircare", "shampoo"],
    brand: "Hair Guard",
    sku: "HAI-HGU-SHA-010",
    weight: 12,
    dimensions: { width: 6.0, height: 22.0, depth: 6.0 },
    warrantyInformation: "1 year warranty",
    shippingInformation: "Ships in 2-3 business days",
    availabilityStatus: "In Stock",
    reviews: [
      { rating: 5, comment: "Helps a lot!", reviewerName: "Charlotte White" },
      { rating: 4, comment: "Very gentle.", reviewerName: "Benjamin Lee" },
    ],
    returnPolicy: "14 days return policy",
    minimumOrderQuantity: 10,
    meta: { barcode: "9998887776665", qrCode: "https://cdn.dummyjson.com/public/qr-code.png" },
    images: ["https://cdn.dummyjson.com/product-images/haircare/shampoo-anti-dandruff/1.webp"],
    thumbnail: "https://cdn.dummyjson.com/product-images/haircare/shampoo-anti-dandruff/thumbnail.webp",
  },
  {
    productId: 11,
    title: "Conditioner Smooth & Shine",
    description:
      "Conditioner that provides smoothness and shine to your hair. Makes hair soft and manageable.",
    category: "haircare",
    price: 17.99,
    discountPercentage: 7.1,
    rating: 4.5,
    stock: 95,
    tags: ["haircare", "conditioner"],
    brand: "Hair Glow",
    sku: "HAI-HGL-CON-011",
    weight: 11,
    dimensions: { width: 6.5, height: 21.0, depth: 6.5 },
    warrantyInformation: "1 year warranty",
    shippingInformation: "Ships in 3-5 business days",
    availabilityStatus: "In Stock",
    reviews: [
      { rating: 5, comment: "Hair feels amazing!", reviewerName: "Amelia Young" },
      { rating: 4, comment: "Adds real shine.", reviewerName: "Henry Hall" },
    ],
    returnPolicy: "30 days return policy",
    minimumOrderQuantity: 8,
    meta: { barcode: "8887776665554", qrCode: "https://cdn.dummyjson.com/public/qr-code.png" },
    images: ["https://cdn.dummyjson.com/product-images/haircare/conditioner-smooth-shine/1.webp"],
    thumbnail:
      "https://cdn.dummyjson.com/product-images/haircare/conditioner-smooth-shine/thumbnail.webp",
  },
];

// Seeder function
const seedProducts = async () => {
  try {
    await connectDB();

    console.log("🗑 Deleting old products...");
    await Product.deleteMany();

    console.log("🌱 Inserting new products...");
    await Product.insertMany(products);

    console.log("✅ Seeding completed!");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding products:", error);
    process.exit(1);
  }
};

seedProducts();
