import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

const LikeSchema = mongoose.Schema(
  {
    userId: [
      {
        type: ObjectId,
        ref: 'User',
      },
    ],
    postId: {
      type: ObjectId,
      ref: 'Post',
    },
  },
  { timestamps: true },
);

export const Like = mongoose.model('Like', LikeSchema);
