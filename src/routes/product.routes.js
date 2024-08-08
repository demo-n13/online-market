import { Router } from "express";
import {
  createProduct,
  getProductsByCategory,
  getSingleProduct,
  deleteProduct,
  updateProduct
} from "../controller/product.controller.js";

export const productRoutes = Router();

productRoutes
  .get("/products/by/category/:categoryId", getProductsByCategory)
  .get("/products/:productId", getSingleProduct)
  .post("/products/add", createProduct)
  .delete('/product/:id',deleteProduct)
  .put('/product/:id',updateProduct)
  
