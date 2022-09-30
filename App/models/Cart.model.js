import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const CartSchema = mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: "User",
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
          default: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

export const Cart = mongoose.model("Cart", CartSchema);
