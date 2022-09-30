import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const WishlistSchema = mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: "User",
    },
    productId: [
      {
        type: ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

export const Wishlist = mongoose.model("Wishlist", WishlistSchema);
