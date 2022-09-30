import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

const UserProfileStatsSchema = mongoose.Schema(
  {
    followers: {
      type: Number,
      default: 0,
    },
    following: {
      type: Number,
      default: 0,
    },
    posts: {
      type: Number,
      default: 0,
    },
    userId: {
      type: ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

export const UserProfileStats = mongoose.model('UserProfileStats', UserProfileStatsSchema);
