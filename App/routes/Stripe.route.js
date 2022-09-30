import express from "express";
import { createCheckoutSession } from "../controllers/Stripe.controller.js";
const stripeRoutes = express.Router();

stripeRoutes.route("/stripe/create-checkout-session").post(createCheckoutSession);

export default stripeRoutes;
