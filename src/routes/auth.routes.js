import { Router } from "express";
import { authSignIn } from "../controller/auth.controller.js";

export const authRoutes = Router()

authRoutes.post("/login", authSignIn);