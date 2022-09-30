import 'dotenv/config';
import nodemailer from 'nodemailer';

export const NodeMailer = (mailOptions) => {
  const transporter = nodemailer.createTransport({
    service: 'Outlook365',
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log('Error ' + err);
    } else {
      console.log('Email sent successfully');
    }
  });
};
