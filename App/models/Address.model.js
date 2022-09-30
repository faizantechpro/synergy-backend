import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const AddressSchema = mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: "User",
    },
    fullName: {
      type: String,
      default: "",
    },
    phoneNumber: {
      type: Number,
      default: 0,
    },
    AlternatePhoneNumber: {
      type: Number,
    },
    pincode: {
      type: Number,
      default: 0,
    },
    state: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    addressLine1: {
      type: String,
      default: "",
    },
    addressLine2: {
      type: String,
      default: "",
    },
    typeOfAddress: {
      enum: ["home", "office"],
      type: String,
      default: "home",
    },
  },
  { timestamps: true }
);

export const Address = mongoose.model("Address", AddressSchema);
