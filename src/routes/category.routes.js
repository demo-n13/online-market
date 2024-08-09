import { Router } from "express";
import {
  createCategory,
  getAllCategory,
  updateCategory,
} from "../controller/category.controller.js";

export const categoryRoutes = Router();

categoryRoutes
  .get("/categories", getAllCategory)
  .post("/categories/add", createCategory)
  .put("/categories/:categoryId",updateCategory)