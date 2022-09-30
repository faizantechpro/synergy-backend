import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

export const AccountTypeMapping = {
  creater: 1,
  business: 2,
};

const SwitchAccountTypeSchema = mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: "User",
    },
    // 1: business Account, 2: creator Account
    accountType: {
      type: Number,
      default: 1,
    },
    categories: [
      {
        type: String,
        ref: "Category",
      },
    ],
    overView: {
      type: String,
      trim: true,
      default: "",
    },
    website: {
      type: String,
      trim: true,
      default: "",
    },
    industry: {
      type: String,
      trim: true,
      default: "",
    },
    companySize: {
      type: String,
      trim: true,
      default: "",
    },
    headquaters: {
      type: String,
      trim: true,
      default: "",
    },
    type: {
      type: String,
      trim: true,
      default: "",
    },
    specialities: {
      type: String,
      trim: true,
      default: "",
    },
    locations: [
      {
        type: String,
        trim: true,
      },
    ],
    deActivate: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const SwitchAccountType = mongoose.model(
  "SwitchAccountType",
  SwitchAccountTypeSchema
);
