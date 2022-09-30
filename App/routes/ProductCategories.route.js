import express from "express";
import { getAllProductByCategoryId, getAllProductCategories } from "../controllers/ProductCategories.controller.js";
const productCategoriesRoutes = express.Router();

productCategoriesRoutes.route("/productCategories").get(getAllProductCategories);
productCategoriesRoutes.route("/productCategories/:id").get(getAllProductByCategoryId);

export default productCategoriesRoutes;
