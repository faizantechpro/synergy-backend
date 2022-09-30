import express from 'express';
const interestRouter = express.Router();
import { allInterests } from '../controllers/Interest.controller.js';

interestRouter.route('/interests').get(allInterests);

export default interestRouter;
