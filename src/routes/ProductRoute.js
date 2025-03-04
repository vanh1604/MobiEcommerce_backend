import express from "express";
import {
  createProduct,
  detailProduct,
  updatedproduct,
  deleteProduct,
  getAllProducts
} from "../controllers/ProductController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const productRoute = express.Router();
productRoute.post("/create-product", createProduct);
productRoute.post("/product-update/:productId", authMiddleware, updatedproduct);
productRoute.get("/product-detail/:productId", detailProduct);
productRoute.delete("/product-delete/:productId", deleteProduct);
productRoute.get("/get-product", getAllProducts);
export default productRoute;
