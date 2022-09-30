import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log("process.env.NODE_ENV", process.env.NODE_ENV);
let dotenvPath = path.join(__dirname, `.env.${process.env.NODE_ENV}`);

console.log("dotenvPath", dotenvPath);
dotenv.config({
  path: dotenvPath,
});

import express from "express";
import bearerToken from "express-bearer-token";
import bodyParser from "body-parser";

import DB from "./db.js";
import bootstrap from "./bootstrap.js";
import OTPRoutes from "./App/routes/OTP.route.js";
import userRoutes from "./App/routes/User.route.js";
import postRoutes from "./App/routes/Post.route.js";
import storyRoutes from "./App/routes/Story.route.js";
import interestRoutes from "./App/routes/Interest.route.js";
import notificationRoutes from "./App/routes/Notification.route.js";
import verifyFirebaseToken from "./helper/verifyFireBaseToken.js";
import categoryRoutes from "./App/routes/Categorise.route.js";
import SwitchAccountTypeRoutes from "./App/routes/SwitchAccountType.route.js";
import chatRoutes from "./App/routes/Chat.route.js";

import storeRoutes from "./App/routes/Store.route.js";
import productRoutes from "./App/routes/Product.route.js";
import productCategoriesRoutes from "./App/routes/ProductCategories.route.js";
import stripeRoutes from "./App/routes/Stripe.route.js";

import appConfigRoutes from "./App/routes/AppConfig.route.js";
import cartRoutes from "./App/routes/Cart.route.js";
import orderRoutes from "./App/routes/Order.route.js";

import { createServer } from "http";
import { Server } from "socket.io";
import { socketio } from "./socketio.js";
import storeDashboardRoutes from "./App/routes/StoreDashboard.route.js";

const { PORT } = process.env;

console.log("PORT", PORT);
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

DB()
  .then(() => {
    console.log("Database connected successfully");
    bootstrap();
  })
  .catch((error) => {
    console.log("There is some error connecting to database", error);
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log(
    "calling url",
    req.url,
    "method",
    req.method,
    "headers",
    req.headers,
    "body",
    req.body
  );
  if (req.url === "/" && req.method === "GET") {
    return res.send("welcome to the synergy api");
  }
  next();
});

app.use(bearerToken());
app.use(verifyFirebaseToken);

app.use("/api", userRoutes);
app.use("/api", postRoutes);
app.use("/api", storyRoutes);
app.use("/api", OTPRoutes);
app.use("/api", interestRoutes);
app.use("/api", notificationRoutes);
app.use("/api", categoryRoutes);
app.use("/api", SwitchAccountTypeRoutes);
app.use("/api", chatRoutes);
app.use("/api", storeRoutes);
app.use("/api", productRoutes);
app.use("/api", productCategoriesRoutes);
app.use("/api", stripeRoutes);
app.use("/api", appConfigRoutes);
app.use('/api', cartRoutes);
app.use('/api', orderRoutes);
app.use('/api', storeDashboardRoutes);

socketio(io);

httpServer.listen({ port: PORT }, () => {
  console.log(`🚀 Server ready at http://0.0.0.0:${PORT}`);
});
