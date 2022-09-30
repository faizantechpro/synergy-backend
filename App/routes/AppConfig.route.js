import express from "express";
import { AppConfigurations } from "../controllers/AppConfig.controller.js";
const appConfigRoutes = express.Router();

appConfigRoutes.route("/config").get(AppConfigurations);

export default appConfigRoutes;
