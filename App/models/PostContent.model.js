import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

const PostContentSchema = mongoose.Schema(
  {
    large: {
      type: ObjectId,
      ref: 'SynergyImage',
    },
    brightness: {
      type: Number,
      default: 0,
    },
    saturation: {
      type: Number,
      default: 0,
    },
    exposure: {
      type: Number,
      default: 0,
    },
    visibility: {
      type: Number,
      default: 1,
    },
    thumbnail: {
      type: ObjectId,
      ref: 'SynergyImage',
    },
    tags: [
      {
        type: ObjectId,
        ref: 'TagDetail',
      },
    ],
    interests: [
      {
        type: String,
        ref: 'Interest',
      },
    ],
    // image video
    type: {
      type: String,
      trim: true,
      default: '',
    },
    filter: {
      type: String,
    },
    postId: {
      type: ObjectId,
      ref: 'Post',
    },
  },
  { timestamps: true },
);

export const PostContent = mongoose.model('PostContent', PostContentSchema);
