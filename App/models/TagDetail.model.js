import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

const TagDetailSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      default: '',
    },
    userId: {
      type: ObjectId,
      ref: 'User',
    },
    postContentId: {
      type: ObjectId,
      ref: 'PostContent',
    },
    xOffset: {
      type: Number,
    },
    yOffset: {
      type: Number,
    },
    postId: {
      type: ObjectId,
      ref: 'Post',
    },
  },
  { timestamps: true },
);

export const TagDetail = mongoose.model('TagDetail', TagDetailSchema);
