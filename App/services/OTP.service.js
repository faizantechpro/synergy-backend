import { OTP } from '../models/OTP.model.js';

export const saveOTPDetails = async (otpCode) => {
  const otp = new OTP(otpCode);
  return await otp.save();
};

export const verifyOTPDetails = (otpDetails) => {
  return OTP.findOne(otpDetails);
};
