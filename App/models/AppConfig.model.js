import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const AppConfigSchema = mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
    },
    accountType: {
      type: Number,
      default: 0,
    },
    isProductCreated: {
      type: Boolean,
      default: false,
    },
    isStoreCreated: {
      type: Boolean,
      default: false,
    },
    stores: [
      {
        type: ObjectId,
        ref: "Store",
      },
    ],
  },
  { timestamps: true }
);

export const AppConfig = mongoose.model("AppConfig", AppConfigSchema);
