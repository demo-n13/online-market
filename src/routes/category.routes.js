import { Router } from "express";
import {
  createCategory,
  getAllCategory,
  deleteCategory,
  updateCategory
} from "../controller/category.controller.js";

export const categoryRoutes = Router();

categoryRoutes
  .get("/categories", getAllCategory)
  .post("/categories/add", createCategory)
  .delete('/categories/:id',deleteCategory)
  .put('/categories/:id',updateCategory)
