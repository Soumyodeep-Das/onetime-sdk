// src/core/TokenManager.ts

interface OTPRecord {
    otp: string;
    expiresAt: number;
  }
  
  const tokenStore: Map<string, OTPRecord> = new Map();
  const OTP_EXPIRY_MS = 2 * 60 * 1000; // 2 minutes
  
  export function storeOTP(identifier: string, otp: string): void {
    const expiresAt = Date.now() + OTP_EXPIRY_MS;
    tokenStore.set(identifier, { otp, expiresAt });
  }
  
  export function verifyOTP(identifier: string, otp: string): { success: boolean; message: string } {
    const record = tokenStore.get(identifier);
    if (!record) {
      return { success: false, message: 'OTP not found or expired' };
    }
  
    if (Date.now() > record.expiresAt) {
      tokenStore.delete(identifier);
      return { success: false, message: 'OTP has expired' };
    }
  
    if (record.otp !== otp) {
      return { success: false, message: 'Invalid OTP' };
    }
  
    tokenStore.delete(identifier);
    return { success: true, message: 'OTP verified successfully' };
  }