import express from 'express';
const OTPRouter = express.Router();
import { generateCode, verifyCode } from '../controllers/OTP.controller.js';

OTPRouter.route('/otp/sendCode').post(generateCode);
OTPRouter.route('/otp/verifyCode').post(verifyCode);

export default OTPRouter;
