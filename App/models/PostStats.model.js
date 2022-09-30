import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

const PostStatsSchema = mongoose.Schema(
  {
    likes: {
      type: Number,
      default: 0,
    },
    comments: {
      type: Number,
      default: 0,
    },
    saves: {
      type: Number,
      default: 0,
    },
    postId: {
      type: ObjectId,
      ref: 'Post',
    },
  },
  { timestamps: true },
);

export const PostStats = mongoose.model('PostStats', PostStatsSchema);
