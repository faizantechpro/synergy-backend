import mongoose from 'mongoose';

const OTPSchema = mongoose.Schema(
  {
    code: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  { timestamps: true },
);

export const OTP = mongoose.model('OTP', OTPSchema);
