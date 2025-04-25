"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSecureOTP = generateSecureOTP;
exports.getCurrentTimestamp = getCurrentTimestamp;
exports.isExpired = isExpired;
// src/utils/helpers.ts
const crypto_1 = __importDefault(require("crypto"));
function generateSecureOTP() {
    const buffer = crypto_1.default.randomBytes(3); // 3 bytes = 24 bits
    const otp = buffer.readUIntBE(0, 3) % 1000000;
    return otp.toString().padStart(6, '0');
}
function getCurrentTimestamp() {
    return Date.now();
}
function isExpired(timestamp, expiryMs) {
    return getCurrentTimestamp() > timestamp + expiryMs;
}
