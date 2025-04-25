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
const logger_1 = require("../utils/logger");
const errors_1 = require("../utils/errors");
const helper_1 = require("../utils/helper");
dotenv_1.default.config();
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.ONETIME_EMAIL_SENDER,
        pass: process.env.ONETIME_EMAIL_PASSWORD,
    },
});
function sendOTPViaEmail(to) {
    return __awaiter(this, void 0, void 0, function* () {
        const otp = (0, helper_1.generateSecureOTP)();
        const mailOptions = {
            from: process.env.ONETIME_EMAIL_SENDER,
            to,
            subject: 'Your OneTime OTP Code',
            text: `Your OTP code is ${otp}. It is valid for 2 minutes.`,
        };
        try {
            yield transporter.sendMail(mailOptions);
            logger_1.logger.info(`OTP sent to ${to} via email`);
            return { success: true, message: 'OTP sent via email successfully' };
        }
        catch (error) {
            logger_1.logger.error(`Failed to send OTP to ${to} via email: ${error.message}`);
            throw new errors_1.EmailDeliveryError(`Failed to send OTP: ${error.message}`);
        }
    });
}
