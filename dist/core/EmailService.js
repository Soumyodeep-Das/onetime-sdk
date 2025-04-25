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
exports.sendOTPViaEmail = sendOTPViaEmail;
// src/core/EmailService.ts
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
const crypto_1 = __importDefault(require("crypto"));
dotenv_1.default.config();
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail', // You can change this based on your setup
    auth: {
        user: process.env.ONETIME_EMAIL_SENDER,
        pass: process.env.ONETIME_EMAIL_PASSWORD, // must be set in .env
    },
});
function sendOTPViaEmail(to) {
    return __awaiter(this, void 0, void 0, function* () {
        const otp = generateOTP();
        const mailOptions = {
            from: process.env.ONETIME_EMAIL_SENDER,
            to,
            subject: 'Your OneTime OTP Code',
            text: `Your OTP code is ${otp}. It is valid for 2 minutes.`,
        };
        try {
            yield transporter.sendMail(mailOptions);
            return { success: true, message: 'OTP sent via email successfully' };
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
