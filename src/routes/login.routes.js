import { Router} from "express";
import { login} from "../controllers/login.controller.js";

export const loginRoutes = Router()

loginRoutes.get('/login',login)
