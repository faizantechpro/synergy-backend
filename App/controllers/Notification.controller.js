import { getUserByIdService } from '../services/User.service.js';
import { sendFCMNotification } from '../../helper/sendNotification.js';
import { saveNotification, getAllNotifications } from '../services/Notification.service.js';
import { UserRelationshipStatus } from '../models/UserRelationshipStatus.model.js';
import { relationshipStatus } from './User.controller.js';
import moment from "moment"

export const sendNotification = async (req, res) => {
  const { title, body, receiverId } = req.body;
  const user = await getUserByIdService(receiverId);
  await Promise.all(
    user.fcm.map(async (item) => {
      await sendFCMNotification(item.token, { title, body });
    }),
  );
  await saveNotification({ title: title, body: body, senderId: req.user._id, receiverId });
  return res.status(200).json({ message: 'notification sent' });
};

export const allNotifications = async (req, res) => {
  const notifications = await getAllNotifications(req.user._id);

  // for (let notification of notifications) {
  //   const relationship = await UserRelationshipStatus.findOne({
  //     me: req.user._id,
  //     them: notification.senderId,
  //   });

  //   if (relationship && notification.requestStatus !== relationship.requestStatus && relationship.requestStatus !== 0) {
  //     notification.requestStatus = 0;
  //   }
  // }

  const notificationsSorted = notifications.sort(function (a, b) {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  let finalObj = {}
  notificationsSorted.forEach((notification) => {
    const date = notification.createdAt.toISOString().split('T')[0]
    if (finalObj[date]) {
      finalObj[date].push(notification);
    } else {
      finalObj[date] = [notification];
    }
  });

  const formatDate = (date) => {
    const now = new Date().toISOString().split('T')[0]
    const yesterday = moment().subtract(1, "days").format('YYYY-MM-DD')
    if (date === now) {
      return 'Today'
    } else if (date === yesterday) {
      return 'Yesterday'
    } else {
      return moment(date).format('LL')
    }
  }

  const groupNotifications = Object.keys(finalObj)
    .map((date) => {
      return {
        date: formatDate(date),
        notifications: finalObj[date]
      }
    });

    console.log("groupNotifications", JSON.stringify(groupNotifications))

  return res.status(200).json(groupNotifications);
};
