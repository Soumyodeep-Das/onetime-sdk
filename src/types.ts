// src/types.ts

export type Channel = 'email' | 'sms';

export interface InitOTPClientOptions {
  apiKey: string;
  baseURL?: string;
  timeout?: number;
  retries?: number;
}

export interface SendOTPParams {
  channel: Channel;
  recipient: string;
  template?: string; // Optional message template
  metadata?: Record<string, any>; // Optional metadata (e.g., userId)
}

export interface VerifyOTPParams {
  channel: Channel;
  recipient: string;
  code: string;
}
