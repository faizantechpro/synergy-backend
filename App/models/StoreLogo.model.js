import mongoose from 'mongoose';

const StoreLogoSchema = mongoose.Schema(
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
    storeId: {
      type: String,
      ref: 'Store',
    },
  },
  { timestamps: true },
);

export const StoreLogo = mongoose.model('StoreLogo', StoreLogoSchema);
