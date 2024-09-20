<<<<<<< HEAD
import { Router} from "express";
import { getAllCategory,createCategory,deleteCategory,updateCategory} from "../controllers/category.controller.js";
=======
import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
} from "../controller/category.controller.js";
>>>>>>> e8184e1b19db10c20ccc1027e8f3888d40a30e4f


<<<<<<< HEAD
export const categoryRoutes = Router()

// categoryRoutes.get('/products',getAllProducts)

categoryRoutes.get('/categories',getAllCategory)

categoryRoutes.post('/categories/add',createCategory)

categoryRoutes.delete('/categories/delete',deleteCategory)

categoryRoutes.put('/categories/update',updateCategory)
=======
categoryRoutes
  .get("/", getAllCategory)
  .post("/add", createCategory)
  .delete("/delete/:categoryId", deleteCategory)
>>>>>>> e8184e1b19db10c20ccc1027e8f3888d40a30e4f
