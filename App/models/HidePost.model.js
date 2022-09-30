import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const HidePostSchema = mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: "User",
    },
    hiddenPosts: [
      {
        type: ObjectId,
        ref: "Post",
      },
    ],
  },
  { timestamps: true }
);

export const HidePosts = mongoose.model("HidePost", HidePostSchema);
