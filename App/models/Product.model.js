import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const ProductVariantSchema = new mongoose.Schema({
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
});

const ProductSchema = mongoose.Schema(
  {
    store: {
      type: ObjectId,
      ref: "Store",
    },
    productName: {
      type: String,
      trim: true,
      default: "",
    },
    productCategory: {
      type: ObjectId,
      ref: "ProductCategory",
    },
    category: {
      type: ObjectId,
    },
    categoryChild1: {
      type: ObjectId,
    },
    categoryChild2: {
      type: ObjectId,
    },
    categoryChild3: {
      type: ObjectId,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    price: {
      type: Number,
      trim: true,
      default: 0,
    },
    discountedPrice: {
      type: Number,
      trim: true,
    },
    items: {
      type: Number,
      default: 0,
    },
    images: {
      type: [String],
      default: [],
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    inHidden: {
      type: Boolean,
      default: false,
    },
    variants: {
      type: ProductVariantSchema,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    content: [
      {
        url: {
          type: String,
          trim: true,
          default: "",
        },
      },
    ],
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", ProductSchema);
