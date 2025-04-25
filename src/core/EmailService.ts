// src/core/EmailService.ts
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { logger } from '../utils/logger';
import { EmailDeliveryError } from '../utils/errors';
import { generateSecureOTP } from '../utils/helper';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.ONETIME_EMAIL_SENDER,
    pass: process.env.ONETIME_EMAIL_PASSWORD,
  },
});

export async function sendOTPViaEmail(to: string): Promise<{ success: boolean; message: string }> {
  const otp = generateSecureOTP();
  const mailOptions = {
    from: process.env.ONETIME_EMAIL_SENDER,
    to,
    subject: 'Your OneTime OTP Code',
    text: `Your OTP code is ${otp}. It is valid for 2 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    logger.info(`OTP sent to ${to} via email`);
    return { success: true, message: 'OTP sent via email successfully' };
  } catch (error: any) {
    logger.error(`Failed to send OTP to ${to} via email: ${error.message}`);
    throw new EmailDeliveryError(`Failed to send OTP: ${error.message}`);
  }
}
