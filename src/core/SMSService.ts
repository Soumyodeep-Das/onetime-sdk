// src/core/SMSService.ts
import twilio from 'twilio';
import dotenv from 'dotenv';
import { logger } from '../utils/logger';
import { SMSDeliveryError } from '../utils/errors';
import { generateSecureOTP } from '../utils/helper';

dotenv.config();

const client = twilio(
  process.env.ONETIME_TWILIO_ACCOUNT_SID!,
  process.env.ONETIME_TWILIO_AUTH_TOKEN!
);

export async function sendOTPViaSMS(to: string): Promise<{ success: boolean; message: string }> {
  const otp = generateSecureOTP();
  const messageBody = `Your OTP code is ${otp}. It is valid for 2 minutes.`;

  try {
    await client.messages.create({
      body: messageBody,
      from: process.env.ONETIME_TWILIO_PHONE_NUMBER!,
      to,
    });

    logger.info(`OTP sent to ${to} via SMS`);
    return { success: true, message: 'OTP sent via SMS successfully' };
  } catch (error: any) {
    logger.error(`Failed to send OTP to ${to} via SMS: ${error.message}`);
    throw new SMSDeliveryError(`Failed to send OTP: ${error.message}`);
  }
}
