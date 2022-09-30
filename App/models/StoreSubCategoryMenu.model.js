import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const StoreSubCategoryMenuSchema = mongoose.Schema(
  {
    menuFor: {
      type: ObjectId,
      ref: "StoreCategoryMenu",
    },
    levels: [
      {
        level1: { type: String, trim: true, require: true },
        level2: [{ name: { type: String, trim: true, require: true } }],
      },
    ],
  },
  { timestamps: true }
);

export const StoreSubCategoryMenu = mongoose.model(
  "StoreSubCategoryMenu",
  StoreSubCategoryMenuSchema
);
