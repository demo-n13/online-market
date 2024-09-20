import { Router } from "express";
import { gettAllOrder,getCustumerOrders,deleteOrder } from "../controllers/order.controller.js";

const orderRoutes = Router();

orderRoutes.get('/orders',gettAllOrder)

orderRoutes.get('/orders/:id',getCustumerOrders)

orderRoutes.delete('/orders/delete/:orderId',deleteOrder)

export default orderRoutes