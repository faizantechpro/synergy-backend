import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const ProductVariantSchema = mongoose.Schema(
  {
    productId: {
      type: ObjectId,
      ref: "Product",
    },
    size: [
      {
        size: {
          type: String,
          trim: true,
          default: "",
        },
        mrp: {
          type: String,
          trim: true,
          default: "",
        },
        sellingPrice: {
          type: String,
          trim: true,
          default: "",
        },
      },
    ],
    color: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  { timestamps: true }
);

export const ProductVariant = mongoose.model(
  "ProductVariant",
  ProductVariantSchema
);
