import express from "express";
import {
  AddToCart,
  DecreaseProductQuantity,
  IncreaseProductQuantity,
  RemoveFromCart,
} from "../controllers/Cart.controllers.js";

const cartRoutes = express.Router();

cartRoutes.route("/cart/item/add/:id").post(AddToCart);
cartRoutes.route("/cart/item/remove/:id").post(RemoveFromCart);
cartRoutes.route("/cart/item/inc/:id").post(IncreaseProductQuantity);
cartRoutes.route("/cart/item/dec/:id").post(DecreaseProductQuantity);

export default cartRoutes;
