import mongoose from 'mongoose';

const  ProductCategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      require: true,
    }
  },
  { timestamps: true },
);

export const ProductCategories = mongoose.model('ProductCategory', ProductCategorySchema);
