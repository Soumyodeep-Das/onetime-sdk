// src/core/OneTimeClient.ts
import dotenv from 'dotenv';
dotenv.config();

import { sendOTPViaEmail } from './EmailService';
import { sendOTPViaSMS } from './SMSService';
import { OTPPayload, VerifyPayload } from '../types/index';

interface OneTimeClientConfig {
  apiKey: string;
  projectId: string;
  environment?: 'production' | 'development';
}

export class OneTimeClient {
  private apiKey: string;
  private projectId: string;
  private environment: string;

  constructor(config: OneTimeClientConfig) {
    this.apiKey = config.apiKey;
    this.projectId = config.projectId;
    this.environment = config.environment || 'production';
  }

  async sendOTP(payload: OTPPayload) {
    if (payload.method === 'email') {
      return await sendOTPViaEmail(payload.to);
    } else if (payload.method === 'sms') {
      return await sendOTPViaSMS(payload.to);
    } else {
      throw new Error('Invalid method. Must be "email" or "sms".');
    }
  }

  async verifyOTP(payload: VerifyPayload) {
    // We’ll handle this with TokenManager logic next
    return {
      success: true,
      message: 'Mock verify successful (real logic to be added)',
    };
  }
}
