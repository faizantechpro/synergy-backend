import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const CreatorProfileSchema = mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: "User",
    },
    // accountType: {
    //   type: Number,
    //   default: 1,
    // },
    companyName: {
      type: String,
      trim: true,
      default: "",
    },
    tagline: {
      type: String,
      trim: true,
      default: "",
    },
    profileImageUrl: {
      type: String,
      trim: true,
      default: "",
    },
    coverImageUrl: {
      type: String,
      trim: true,
      default: "",
    },
    email: {
      type: String,
      trim: true,
      default: "",
    },
    categories: [
      {
        type: ObjectId,
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
      type: ObjectId,
      ref: "Industry",
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
    specialities: [
      {
        type: ObjectId,
        ref: "Speciality",
      },
    ],
    locations: [
      {
        address: {
          type: String,
          trim: true,
        },
        type: {
          type: String,
          enum: ["Primary", "Secondary"],
          default: "Primary",
        },
        coordinates: {
          type: [Number],
        },
      },
    ],
  },
  { timestamps: true }
);

export const CreatorProfile = mongoose.model(
  "CreatorProfile",
  CreatorProfileSchema
);
