import { Router } from "express";
import {
  createCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
} from "../controller/category.controller.js";

export const categoryRoutes = Router();

categoryRoutes
  .get("/categories", getAllCategory)
  .post("/categories/add", createCategory)
  .put("/update/:categoryId", updateCategory)
  .delete("/:categoryId", deleteCategory);
