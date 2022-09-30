import express from "express";
import { ChangeOrderStatus, filterOrders, getAllOrders, getPaymentMethodList, getSingleOrder, PlaceOrder } from "../controllers/Order.controller.js";
const orderRoutes = express.Router();

orderRoutes.route("/order/placeOrder").post(PlaceOrder);
orderRoutes.route("/order/changeOrderStatus").post(ChangeOrderStatus);
orderRoutes.route("/order/paymentMethod/list").get(getPaymentMethodList);
orderRoutes.route("/order/all/:id").get(getAllOrders);
orderRoutes.route("/order/single/:id").get(getSingleOrder);
orderRoutes.route("/order/filter/:status").get(filterOrders);

export default orderRoutes;
