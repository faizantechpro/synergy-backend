import express from 'express';
import { allCategorire } from '../controllers/categorise.controller.js';
const categoriseRoutes = express.Router();

categoriseRoutes.route('/categorise').get(allCategorire);

export default categoriseRoutes;
