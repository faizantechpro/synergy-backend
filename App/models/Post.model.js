import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;
import { UserProfileStats } from "./UserProfileStats.model.js";

const PostSchema = mongoose.Schema(
  {
    description: {
      type: String,
      trim: true,
      default: "",
    },
    location: {
      type: String,
      trim: true,
      default: "",
    },
    creator: {
      type: ObjectId,
      ref: "User",
    },
    stats: {
      type: ObjectId,
      ref: "PostStats",
    },
    likeStats: {
      type: ObjectId,
      ref: "Like",
    },
    disableComments: {
      type: Boolean,
      default: false,
    },
    isHidden: {
      type: Boolean,
      default: false,
    },
    contents: [
      {
        type: ObjectId,
        ref: "PostContent",
      },
    ],
    birthDay: {
      type: Date,
    },
    savePost: {
      type: Boolean,
      default: false,
    },
    // story post shorts
    type: {
      type: String,
      trim: true,
      default: "post",
    },
    hashTags: {
      type: Array,
    },
    viewBy: {
      type: String,
      enum: ["onlyMe", "onlyFriends", "public"],
      default: "public",
    },
  },
  { timestamps: true }
);

PostSchema.pre("save", async function (next) {
  await UserProfileStats.findOneAndUpdate(
    { userId: this.creator },
    { $inc: { posts: 1 } }
  );
  next();
});

export const Post = mongoose.model("Post", PostSchema);
