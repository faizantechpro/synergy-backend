import mongoose from 'mongoose';

const  StoreCategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      require: true,
    }
  },
  { timestamps: true },
);

export const StoreCategory = mongoose.model('StoreCategory', StoreCategorySchema);
