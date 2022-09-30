import mongoose from "mongoose";

const ProductContentSchema = mongoose.Schema(
  {
    content: [
      {
        url: {
          type: String,
          trim: true,
          default: "",
        },
        secureUrl: {
          type: String,
          trim: true,
          default: "",
        },
        width: {
          type: Number,
        },
        height: {
          type: Number,
        },
      },
    ],
  },
  { timestamps: true }
);

export const ProductContent = mongoose.model(
  "ProductContent",
  ProductContentSchema
);
