import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductsByCategory,
  getSingleProduct,
} from "../controller/product.controller.js";

export const productRoutes = Router();

productRoutes
  .get("/products/by/category/:categoryId", getProductsByCategory)
  .get("/products/:productId", getSingleProduct)
  .post("/products/add", createProduct)
  .delete("/products/:productId",deleteProduct)