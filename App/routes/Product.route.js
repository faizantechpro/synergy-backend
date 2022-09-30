import express from "express";
import multer from "multer";
import { ProductImages } from "../../helper/cloudinaryUtils.js";
import {
  addProduct,
  deleteProduct,
  getSingleProduct,
  getAllProducts,
  getAllProductsByStoreId,
  editProduct,
  addRemoveWishlist,
  getWishlist,
  getProductsFilterList,
  getAllAndFilteredProducts,
} from "../controllers/Product.controller.js";
const productRoutes = express.Router();

productRoutes.route("/products").get(getAllProducts);
productRoutes.route("/productsFilterList").get(getProductsFilterList);
productRoutes.route("/product/wishlist").get(getWishlist);
productRoutes.route("/product/:id").get(getSingleProduct);
productRoutes.route("/productsFilter/:id").get(getAllAndFilteredProducts);
productRoutes.route("/product/wishlist/:id").post(addRemoveWishlist);
productRoutes.route("/products/store/:id").get(getAllProductsByStoreId);
productRoutes.route("/product/:id/add").post(addProduct);
productRoutes.route("/product/:id/edit").put(editProduct);
productRoutes.route("/product/:id/delete").delete(deleteProduct);

export default productRoutes;
