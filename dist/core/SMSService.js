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
const twilio_1 = __importDefault(require("twilio"));
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = require("../utils/logger");
const errors_1 = require("../utils/errors");
const helper_1 = require("../utils/helper");
dotenv_1.default.config();
const client = (0, twilio_1.default)(process.env.ONETIME_TWILIO_ACCOUNT_SID, process.env.ONETIME_TWILIO_AUTH_TOKEN);
function sendOTPViaSMS(to) {
    return __awaiter(this, void 0, void 0, function* () {
        const otp = (0, helper_1.generateSecureOTP)();
        const messageBody = `Your OTP code is ${otp}. It is valid for 2 minutes.`;
        try {
            yield client.messages.create({
                body: messageBody,
                from: process.env.ONETIME_TWILIO_PHONE_NUMBER,
                to,
            });
            logger_1.logger.info(`OTP sent to ${to} via SMS`);
            return { success: true, message: 'OTP sent via SMS successfully' };
        }
        catch (error) {
            logger_1.logger.error(`Failed to send OTP to ${to} via SMS: ${error.message}`);
            throw new errors_1.SMSDeliveryError(`Failed to send OTP: ${error.message}`);
        }
    });
}
