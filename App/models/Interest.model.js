import mongoose from 'mongoose';

const InterestSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      require: true,
    },
    type: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);

export const Interest = mongoose.model('Interest', InterestSchema);
