import admin from './firebaseAuth/index.js';

export const notificationOptions = {
  priority: 'high',
  timeToLive: 60 * 60 * 24,
};

export const sendFCMNotification = async (token, { title, body }) => {
  try {
    const notificationToSend = await admin.messaging().sendToDevice(token, {
      data: {
        title,
        body: body
      },
      notification: {
        title: title,
        body: body,
      }
    }, notificationOptions);

    console.log('notification sent', JSON.stringify(notificationToSend));
    return notificationToSend;
  } catch (error) {
    console.error("firebase notification error: ", error);
    return error;
  }
};
