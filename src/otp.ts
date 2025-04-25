// src/otp.ts

import { getClient } from './client';
import { SendOTPParams, VerifyOTPParams } from './types';

export const sendOTP = async (params: SendOTPParams) => {
  const client = getClient();
  const res = await client.post('/send-otp', params);
  return res.data;
};

export const verifyOTP = async (params: VerifyOTPParams) => {
  const client = getClient();
  const res = await client.post('/verify-otp', params);
  return res.data;
};
