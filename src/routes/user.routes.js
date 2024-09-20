import { Router} from "express";
import {getAllUser, createUser} from '../controllers/user.controller.js';


export const userRoutes = Router()

userRoutes.get('/users',getAllUser)

userRoutes.post('/olcha',createUser)

