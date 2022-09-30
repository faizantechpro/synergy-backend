import express from "express";
import { getChatClientToken } from "../controllers/Chat.controller.js";

const chatRouter = express.Router();

chatRouter.route("/chat/token").get(getChatClientToken);

export default chatRouter;
