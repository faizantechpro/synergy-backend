import mongoose from 'mongoose';

const  CategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      require: true,
    }
  },
  { timestamps: true },
);

export const Categories = mongoose.model('Category', CategorySchema);
