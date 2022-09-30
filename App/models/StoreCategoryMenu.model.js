import mongoose from 'mongoose';

const  StoreCategoryMenuSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      require: true,
    }
  },
  { timestamps: true },
);

export const StoreCategoryMenu = mongoose.model('StoreCategoryMenu', StoreCategoryMenuSchema);
