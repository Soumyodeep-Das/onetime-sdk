// src/utils/helpers.ts
import crypto from 'crypto';

export function generateSecureOTP(): string {
  const buffer = crypto.randomBytes(3); // 3 bytes = 24 bits
  const otp = buffer.readUIntBE(0, 3) % 1000000;
  return otp.toString().padStart(6, '0');
}

export function getCurrentTimestamp(): number {
  return Date.now();
}

export function isExpired(timestamp: number, expiryMs: number): boolean {
  return getCurrentTimestamp() > timestamp + expiryMs;
}