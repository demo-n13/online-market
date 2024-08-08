import { Router } from "express";
import { authSignUp } from "../controller/auth.controller.js";

export const authRoutes = Router()

authRoutes.post("/register", authSignUp)