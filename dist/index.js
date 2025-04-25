"use strict";
// src/index.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OneTimeClient = void 0;
const EmailService_1 = require("./core/EmailService");
const SMSService_1 = require("./core/SMSService");
const TokenManager_1 = require("./core/TokenManager");
const helper_1 = require("./utils/helper");
class OneTimeClient {
    constructor(config) {
        this.config = config;
    }
    sendOTP(identifier, via) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const otp = (0, helper_1.generateSecureOTP)();
            (0, TokenManager_1.storeOTP)(identifier, otp);
            if (via === 'email' && ((_a = this.config.email) === null || _a === void 0 ? void 0 : _a.enabled)) {
                return yield (0, EmailService_1.sendOTPViaEmail)(identifier);
            }
            if (via === 'sms' && ((_b = this.config.sms) === null || _b === void 0 ? void 0 : _b.enabled)) {
                return yield (0, SMSService_1.sendOTPViaSMS)(identifier);
            }
            return { success: false, message: 'Invalid delivery method or not enabled in config' };
        });
    }
    verifyOTP(identifier, otp) {
        return (0, TokenManager_1.verifyOTP)(identifier, otp);
    }
}
exports.OneTimeClient = OneTimeClient;
exports.default = OneTimeClient;
