// src/core/SMSService.ts
import dotenv from 'dotenv';
import twilio from 'twilio';
import crypto from 'crypto';
dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID || '';
const authToken = process.env.TWILIO_AUTH_TOKEN || '';
const fromNumber = process.env.TWILIO_PHONE_NUMBER || '';

const client = twilio(accountSid, authToken);

export async function sendOTPViaSMS(to: string): Promise<{ success: boolean; message: string }> {
  const otp = generateOTP();

  try {
    await client.messages.create({
      body: `Your OneTime OTP code is ${otp}. It is valid for 2 minutes.`,
      from: fromNumber,
      to,
    });
    return { success: true, message: 'OTP sent via SMS successfully' };
  } catch (error: any) {
    return { success: false, message: `Failed to send OTP: ${error.message}` };
  }
}

function generateOTP(): string {
  const buffer = crypto.randomBytes(3); // 3 bytes = 24 bits = up to 16777215
  const otp = buffer.readUIntBE(0, 3) % 1000000;
  return otp.toString().padStart(6, '0');
}
