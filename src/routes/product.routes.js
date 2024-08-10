import { Router } from "express";
import { createProduct, getAllProduct, getProduct, getProductsByCategory, removeAllProduct, removeProduct, updateProduct } from "../controller/product.controller.js";

export const productRoutes = Router()

productRoutes
.get("/products/by/category/:categoryId", getProductsByCategory)
.get("/products/:productId", getProduct)
.get("/products/", getAllProduct)
.post("/products/add", createProduct)
.put("/products/update/:productId", updateProduct)
.delete("/products/delete/:productId", removeProduct)
.delete("/products/delete/", removeAllProduct)