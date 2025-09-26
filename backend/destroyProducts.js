import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import Product from "./models/Product.js";

connectDB();

const destroyProducts = async () => {
  try {
    await Product.deleteMany(); // Deletes all products
    console.log("All products have been removed!");
    process.exit();
  } catch (error) {
    console.error("Error deleting products:", error);
    process.exit(1);
  }
};

destroyProducts();
