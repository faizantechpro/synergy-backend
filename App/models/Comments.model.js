import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

const CommentsSchema = mongoose.Schema(
  {
    comment: {
      type: String,
      trim: true,
      require: true,
    },
    postId: {
      type: ObjectId,
      ref: 'Post',
    },
    parentCommentId: {
      type: ObjectId,
      ref: 'Comments',
    },
    userId: {
      type: ObjectId,
      ref: 'User',
    },
    likedBy: [
      {
        type: ObjectId,
        ref: 'User',
      },
    ],
    subComments: [
      {
        type: ObjectId,
        ref: 'Comments',
      },
    ],
  },
  { timestamps: true },
);

export const Comments = mongoose.model('Comments', CommentsSchema);
