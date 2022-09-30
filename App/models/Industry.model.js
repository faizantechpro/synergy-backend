import mongoose from 'mongoose';

const  IndustrySchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      require: true,
    }
  },
  { timestamps: true },
);

export const Industry = mongoose.model('Industry', IndustrySchema);
