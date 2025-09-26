import Product from "../models/Product.js";

/**
 * GET /api/products
 * Query params:
 *  - page (default 1)
 *  - limit (default 12)
 *  - q (search in title + description + tags)
 *  - category
 *  - brand
 *  - minPrice, maxPrice
 */
export const getProducts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 12;
    const q = req.query.q ? req.query.q.trim() : "";
    const category = req.query.category;
    const brand = req.query.brand;
    const minPrice = parseFloat(req.query.minPrice) || 0;
    const maxPrice = parseFloat(req.query.maxPrice) || Number.MAX_SAFE_INTEGER;

    const filter = {
      price: { $gte: minPrice, $lte: maxPrice },
    };
    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
        { tags: { $regex: q, $options: "i" } },
      ];
    }
    if (category) filter.category = category;
    if (brand) filter.brand = brand;

    const total = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.json({
      products,
      page,
      pages: Math.ceil(total / limit),
      total,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/**
 * GET /api/products/:id
 */
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/**
 * POST /api/products
 */
export const createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      discountPrice,
      images,
      category,
      brand,
      stock,
      tags,
      variants,
      sku,
      isFeatured,
    } = req.body;

    if (!title || !price)
      return res.status(400).json({ message: "Title and price required" });

    const product = await Product.create({
      title,
      description,
      price,
      discountPrice,
      images,
      category,
      brand,
      stock,
      tags,
      variants,
      sku,
      isFeatured,
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/**
 * PUT /api/products/:id
 */
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    const updatableFields = [
      "title",
      "description",
      "price",
      "discountPrice",
      "images",
      "category",
      "brand",
      "stock",
      "tags",
      "variants",
      "sku",
      "isFeatured",
    ];

    updatableFields.forEach((f) => {
      if (req.body[f] !== undefined) product[f] = req.body[f];
    });

    const updated = await product.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/**
 * DELETE /api/products/:id
 */
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product not found" });
    await product.deleteOne();
    res.json({ message: "Product removed" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
