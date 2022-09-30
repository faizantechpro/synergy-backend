import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

const NotificationSchema = mongoose.Schema(
  {
    type: {
      type: Number,
      trim: true,
    },
    image: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      trim: true,
      require: true,
    },
    body: {
      type: String,
      trim: true,
      require: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
    status: {
      type: Number,
      default: 0
    },
    requestStatus: {
      type: Number,
      default: 0
    },
    senderId: {
      type: ObjectId,
      ref: 'User',
    },
    receiverId: {
      type: ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

export const Notification = mongoose.model('Notification', NotificationSchema);
