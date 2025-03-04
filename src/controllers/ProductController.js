import Product from "../models/ProductModel.js";

const createProduct = async (req, res) => {
  try {
    const { name, image, category, price, description, rating, CountInStock } =
      req.body;
    console.log(req.body);
    const existProduct = await Product.findOne({ name });
    if (existProduct) {
      return res.status(400).json({ message: "Product already exists" });
    }
    if (
      !name ||
      !image ||
      !category ||
      !price ||
      !description ||
      !rating ||
      !CountInStock
    ) {
      return res
        .status(400)
        .json({ message: "Vui long nhap day du thong tin" });
    }
    const product = await Product.create({
      name,
      image,
      category,
      price,
      description,
      rating,
      CountInStock,
    });
    return res
      .status(201)
      .json({ message: "Product created successfully", product });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updatedproduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const data = req.body;
    const product = await Product.findByIdAndUpdate(productId, data, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res
      .status(200)
      .json({ message: "Product updated successfully", product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const detailProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    } else {
      return res
        .status(200)
        .json({ message: "Product updated successfully", product });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    } else {
      return res
        .status(200)
        .json({ message: "Product deleted successfully", product });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const getAllProducts = async (req, res) => {
  try {
    const limit = 2;
    const page = 1;
    const products = await Product.find().limit(limit);
    return res
      .status(200)
      .json({ message: "Products retrieved successfully", products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export {
  createProduct,
  updatedproduct,
  detailProduct,
  deleteProduct,
  getAllProducts,
};
