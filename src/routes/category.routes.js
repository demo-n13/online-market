import { Router } from "express";
import {
  createCategory,
  getAllCategory,
  updateCategory
} from "../controller/category.controller.js";

export const categoryRoutes = Router();

categoryRoutes
  .get("/", getAllCategory)
  .post("/add", createCategory)
  .put("/update/:categoryId", updateCategory);
