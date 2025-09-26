import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, index: true }, // product name
    description: { type: String, default: "" }, // detailed info
    price: { type: Number, required: true }, // base price
    discountPrice: { type: Number }, // optional discounted price
    images: [{ type: String }], // array of image URLs
    category: { type: String, required: true, index: true }, // category (electronics, fashion, etc.)
    brand: { type: String, default: "Generic" },
    stock: { type: Number, default: 9999 },
    rating: { type: Number, default: 0, min: 0, max: 5 }, // average rating
    numReviews: { type: Number, default: 0 },
    tags: [{ type: String }], // e.g. ["gaming", "laptop", "4k"]
    variants: [
      {
        name: { type: String }, // e.g. "Size", "Color"
        options: [{ type: String }], // e.g. ["S", "M", "L"] or ["Red", "Blue"]
      },
    ],
    isFeatured: { type: Boolean, default: false }, // highlight products
    sku: { type: String, unique: true }, // product code
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
