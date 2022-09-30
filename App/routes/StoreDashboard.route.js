import express from "express";
import {
  getStoreCategory,
  SetProductStock,
  setStoreDeliveryCharges,
  SetStoreStatus,
} from "../controllers/StoreDashboard.controller.js";
const storeDashboardRoutes = express.Router();

storeDashboardRoutes.route("/storeDashboard/category").get(getStoreCategory);
storeDashboardRoutes.route("/storeDashboard/deliveryCharges/:id").post(setStoreDeliveryCharges);
storeDashboardRoutes.route("/storeDashboard/status/:id").post(SetStoreStatus);
storeDashboardRoutes.route("/storeDashboard/product/stock/:id").post(SetProductStock);

export default storeDashboardRoutes;
