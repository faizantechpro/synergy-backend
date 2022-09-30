import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Point"],
    default: "Point",
  },
  coordinates: {
    type: [Number],
  },
});

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      default: "",
    },
    handle: {
      type: String,
      trim: true,
      default: "",
    },
    email: {
      type: String,
      trim: true,
      default: "",
      unique: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    countryCode: {
      type: String,
      trim: true,
    },
    profileImage: {
      type: String,
      ref: "SynergyImage",
      default: "",
    },
    stats: {
      type: String,
      ref: "UserProfileStats",
      default: "",
    },
    bio: {
      type: String,
    },
    gender: {
      type: String,
    },
    birthDay: {
      type: String,
    },
    followers: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    friends: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    uid: {
      type: String,
    },
    fcm: [
      {
        deviceType: String,
        token: String,
      },
    ],
    interests: [
      {
        type: String,
        ref: "Interest",
      },
    ],
    favorites: [
      {
        type: ObjectId,
        ref: "Post",
      },
    ],
    // 0: Normal User, 1: business Account, 2: creator Account
    accountType: {
      type: Number,
      default: 0,
    },
    switchedAccountInfo: {
      type: ObjectId,
      ref: "SwitchAccountType",
    },
    location: {
      type: pointSchema,
      // index: "2dsphere",
    },
  },
  { timestamps: true }
);

UserSchema.index({ location: "2dsphere" });

export const User = mongoose.model("User", UserSchema);
