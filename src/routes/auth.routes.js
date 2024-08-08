import { Router } from "express";
import { login } from "../controller/auth.controller";


const authRoutes = Router()

authRoutes
    .post("/login", login)