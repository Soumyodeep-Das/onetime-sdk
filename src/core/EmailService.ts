// src/core/EmailService.ts
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import crypto from 'crypto';
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail', // You can change this based on your setup
  auth: {
    user: process.env.ONETIME_EMAIL_SENDER,
    pass: process.env.ONETIME_EMAIL_PASSWORD, // must be set in .env
  },
});

export async function sendOTPViaEmail(to: string): Promise<{ success: boolean; message: string }> {
  const otp = generateOTP();
  const mailOptions = {
    from: process.env.ONETIME_EMAIL_SENDER,
    to,
    subject: 'Your OneTime OTP Code',
    text: `Your OTP code is ${otp}. It is valid for 2 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: 'OTP sent via email successfully' };
  } catch (error: any) {
    return { success: false, message: `Failed to send OTP: ${error.message}` };
  }
}

function generateOTP(): string {
  const buffer = crypto.randomBytes(3); // 3 bytes = 24 bits = up to 16777215
  const otp = buffer.readUIntBE(0, 3) % 1000000;
  return otp.toString().padStart(6, '0');
}
