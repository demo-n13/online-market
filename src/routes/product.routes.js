import { Router } from "express";
import {
  createProduct,
  getProductsByCategory,
  getSingleProduct,
} from "../controller/product.controller.js";

export const productRoutes = Router();

productRoutes
  .get("/by/category/:categoryId", getProductsByCategory)
  .get("/:productId", getSingleProduct)
  .post("/add", createProduct);
