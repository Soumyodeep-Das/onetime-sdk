"use strict";
// src/core/TokenManager.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeOTP = storeOTP;
exports.verifyOTP = verifyOTP;
const tokenStore = new Map();
const OTP_EXPIRY_MS = 2 * 60 * 1000; // 2 minutes
function storeOTP(identifier, otp) {
    const expiresAt = Date.now() + OTP_EXPIRY_MS;
    tokenStore.set(identifier, { otp, expiresAt });
}
function verifyOTP(identifier, otp) {
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
