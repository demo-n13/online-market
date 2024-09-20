<<<<<<< HEAD
=======
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
>>>>>>> e8184e1b19db10c20ccc1027e8f3888d40a30e4f
