import { Router } from "express";
import {
  createProduct,
  getProductsByCategory,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} from "../controller/product.controller.js";

export const productRoutes = Router();

productRoutes
  .get("/products/by/category/:categoryId", getProductsByCategory)
  .get("/products/:productId", getSingleProduct)
  .post("/products/add", createProduct)
  .put("/put", updateProduct)
  .delete("/delete", deleteProduct)
