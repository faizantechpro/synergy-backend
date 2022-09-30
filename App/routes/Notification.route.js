import express from 'express';
const notificationRouter = express.Router();
import { sendNotification, allNotifications } from '../controllers/Notification.controller.js';

notificationRouter.route('/notification/AllNotification').get(allNotifications);
notificationRouter.route('/notification/sendNotification').post(sendNotification);

export default notificationRouter;
