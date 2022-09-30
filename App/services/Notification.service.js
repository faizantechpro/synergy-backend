import { Notification } from '../models/Notification.model.js';

export const saveNotification = async (notificationDetail) => {
  const notification = new Notification(notificationDetail);
  return await notification.save();
};

export const getAllNotifications = async (receiverId) => {
  const notifications = Notification.find({ receiverId }).populate([
    {
      path: 'senderId',
      populate: [
        {
          path: 'profileImage',
        }]
    },
    {
      path: 'receiverId',
      populate: [
        {
          path: 'profileImage',
        }]
    },
  ]);
  return await notifications;
};
