// src/index.ts

import { sendOTPViaEmail } from './core/EmailService';
import { sendOTPViaSMS } from './core/SMSService';
import { storeOTP, verifyOTP } from './core/TokenManager';
import { generateSecureOTP } from './utils/helper';
import type { OneTimeClientConfig, SendOTPResult, OTPVerificationResult } from './types';

export class OneTimeClient {
  private config: OneTimeClientConfig;

  constructor(config: OneTimeClientConfig) {
    this.config = config;
  }

  async sendOTP(identifier: string, via: 'email' | 'sms'): Promise<SendOTPResult> {
    const otp = generateSecureOTP();
    storeOTP(identifier, otp);

    if (via === 'email' && this.config.email?.enabled) {
      return await sendOTPViaEmail(identifier);
    }

    if (via === 'sms' && this.config.sms?.enabled) {
      return await sendOTPViaSMS(identifier);
    }

    return { success: false, message: 'Invalid delivery method or not enabled in config' };
  }

  verifyOTP(identifier: string, otp: string): OTPVerificationResult {
    return verifyOTP(identifier, otp);
  }
}

export default OneTimeClient;