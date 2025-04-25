"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOTPViaSMS = sendOTPViaSMS;
// src/core/SMSService.ts
const dotenv_1 = __importDefault(require("dotenv"));
const twilio_1 = __importDefault(require("twilio"));
const crypto_1 = __importDefault(require("crypto"));
dotenv_1.default.config();
const accountSid = process.env.TWILIO_ACCOUNT_SID || '';
const authToken = process.env.TWILIO_AUTH_TOKEN || '';
const fromNumber = process.env.TWILIO_PHONE_NUMBER || '';
const client = (0, twilio_1.default)(accountSid, authToken);
function sendOTPViaSMS(to) {
    return __awaiter(this, void 0, void 0, function* () {
        const otp = generateOTP();
        try {
            yield client.messages.create({
                body: `Your OneTime OTP code is ${otp}. It is valid for 2 minutes.`,
                from: fromNumber,
                to,
            });
            return { success: true, message: 'OTP sent via SMS successfully' };
        }
        catch (error) {
            return { success: false, message: `Failed to send OTP: ${error.message}` };
        }
    });
}
function generateOTP() {
    const buffer = crypto_1.default.randomBytes(3); // 3 bytes = 24 bits = up to 16777215
    const otp = buffer.readUIntBE(0, 3) % 1000000;
    return otp.toString().padStart(6, '0');
}
