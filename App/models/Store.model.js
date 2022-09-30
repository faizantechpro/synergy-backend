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

const StoreSchema = mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
    },
    storeLink: {
      type: String,
      trim: true,
      default: "",
    },
    businessName: {
      type: String,
      trim: true,
      default: "",
    },
    businessCategory: {
      type: String,
      trim: true,
      default: "",
    },
    country: {
      type: String,
      trim: true,
      default: "",
    },
    phoneNumber: {
      type: String,
      trim: true,
      default: "",
    },
    email: {
      type: String,
      trim: true,
      default: "",
    },
    address: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: Boolean,
      default: true,
    },
    storeLogo: {
      type: String,
      trim: true,
      default: "",
    },
    categories: [
      {
        type: ObjectId,
        ref: "StoreCategory",
      },
    ],
    devileryCharges: {
      chargesPerOrder: {
        type: Number,
        default: 0,
      },
      freeDeliveryAbove: {
        type: Number,
        default: 0,
      },
    },
    location: {
      type: pointSchema,
      // index: "2dsphere",
    },
  },
  { timestamps: true }
);

StoreSchema.index({ location: "2dsphere" });

export const Store = mongoose.model("Store", StoreSchema);
