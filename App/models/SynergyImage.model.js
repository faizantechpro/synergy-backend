import mongoose from 'mongoose';

const SynergyImageSchema = mongoose.Schema(
  {
    url: {
      type: String,
      trim: true,
      default: '',
    },
    secureUrl: {
      type: String,
      trim: true,
      default: '',
    },
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
    postId: {
      type: String,
      ref: 'Post',
    },
  },
  { timestamps: true },
);

export const SynergyImage = mongoose.model('SynergyImage', SynergyImageSchema);
