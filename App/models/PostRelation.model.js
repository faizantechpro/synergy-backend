import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

const PostRelationSchema = mongoose.Schema(
  {
    liked: {
      type: Boolean,
      default: false,
    },
    post: {
      type: ObjectId,
      ref: 'Post',
    },
    user: {
      type: ObjectId,
      ref: 'User',
    },
    // mine related, followers, following, un-related
    relationship: {
      type: String,
      trim: true,
      default: 'post:unrelated',
    },
  },
  { timestamps: true },
);

export const PostRelation = mongoose.model('PostRelation', PostRelationSchema);
