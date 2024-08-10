import { Router } from "express"
import { createCategory, getAllCategory, getCategory, removeAllCategory, removeCategory, updateCategory } from "../controller/category.controller.js"

export const categoryRoutes = Router()

categoryRoutes
.get("/categories/:categoryId", getCategory)
.get("/categories", getAllCategory)
.post("/categories/add", createCategory)
.put("/categories/update/:categoryId", updateCategory)
.delete("/categories/delete/:categoryId", removeCategory)
.delete("/categories/delete/", removeAllCategory)