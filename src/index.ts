// src/index.ts

import { initClient } from './client';
import { InitOTPClientOptions, SendOTPParams, VerifyOTPParams } from './types';
import { sendOTP, verifyOTP } from './otp';

export const initOTPClient = (options: InitOTPClientOptions) => {
  initClient(options);
};

export { sendOTP, verifyOTP };
