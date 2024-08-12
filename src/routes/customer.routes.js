
import { Router } from "express";
import { getCustomerData } from "../controller/customer.controller.js";


const customerRoutes = Router()

customerRoutes
  .get('/', getCustomerData)


export default customerRoutes;