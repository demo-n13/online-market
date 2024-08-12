import { Router } from "express";
import {
  createProduct,
  getAllProduct,
  getProductsByCategory,
  getSingleProduct,
} from "../controller/product.controller.js";

export const productRoutes = Router();

productRoutes
  .get("/", getAllProduct)
  .get("/by/category/:categoryId", getProductsByCategory)
  .get("/:productId", getSingleProduct)
  .post("/add", createProduct);
