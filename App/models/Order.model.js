import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const OrderSchema = mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: "User",
    },
    storeId: {
      type: ObjectId,
      ref: "Store",
    },
    status: {
      type: String,
      enum: [
        "pending",
        "shipped",
        "accepted",
        "delivered",
        "rejecte",
        "cancelled",
      ],
      default:"pending",
      lowercase: true,
    },
    paymentMethod: {
      type: String,
      default: "cod",
    },
    paymentStatus: {
      type: String,
      default: "unPaid",
    },
    address: {
      type: ObjectId,
      ref: "Address",
    },
    products: [
      {
        product: {
          type: ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
        },
      },
    ],
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", OrderSchema);
