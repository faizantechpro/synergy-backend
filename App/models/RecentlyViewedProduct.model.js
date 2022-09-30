import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const RecentlyViewedProductSchema = mongoose.Schema(
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

export const RecentlyViewedProduct = mongoose.model("RecentlyViewedProduct", RecentlyViewedProductSchema);
