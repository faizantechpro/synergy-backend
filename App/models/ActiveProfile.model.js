import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

export const AccountTypeMapping = {
  user: 0,
  business: 1,
  creater: 2,
};

const ActiveProfileSchema = mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: "User",
    },
    // 0: Normal User, 1: business Account, 2: creator Account
    accountType: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const ActiveProfile = mongoose.model(
  "ActiveProfile",
  ActiveProfileSchema
);
