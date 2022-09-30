import { saveOTPDetails, verifyOTPDetails } from '../services/OTP.service.js';
import { getRandomNumber } from '../../helper/utils.js';
import { NodeMailer } from '../../helper/nodemailer.js';

export const generateCode = async (req, res) => {
  try {
    const { email } = req.body;
    const code = getRandomNumber();
    const mailOptions = {
      from: process.env.MAIL_USERNAME,
      to: email,
      subject: 'Verification Code',
      html: `<h2>Please use this OTP to verify your email:${code}</h2>`,
    };

    NodeMailer(mailOptions);
    await saveOTPDetails({ code, email });
    return res.status(200).send({ message: 'Otp code sent', statusCode: 200 });
  } catch (error) {
    return res.status(404).send({ message: error });
  }
};

export const verifyCode = async (req, res) => {
  const { email, code } = req.body;
  try {
    const otp = await verifyOTPDetails({ email });
    if (otp) {
    return res.status(200).json({ message: 'OTP verified', statusCode: 200 });
    } else {
      return res.status(200).json({ message: 'OTP does not match', statusCode: 404 });
    }
  } catch (error) {
    return res.status(404).send({ message: error });
  }
};
