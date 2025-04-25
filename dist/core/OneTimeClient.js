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
exports.OneTimeClient = void 0;
// src/core/OneTimeClient.ts
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const EmailService_1 = require("./EmailService");
const SMSService_1 = require("./SMSService");
class OneTimeClient {
    constructor(config) {
        this.apiKey = config.apiKey;
        this.projectId = config.projectId;
        this.environment = config.environment || 'production';
    }
    sendOTP(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            if (payload.method === 'email') {
                return yield (0, EmailService_1.sendOTPViaEmail)(payload.to);
            }
            else if (payload.method === 'sms') {
                return yield (0, SMSService_1.sendOTPViaSMS)(payload.to);
            }
            else {
                throw new Error('Invalid method. Must be "email" or "sms".');
            }
        });
    }
    verifyOTP(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            // We’ll handle this with TokenManager logic next
            return {
                success: true,
                message: 'Mock verify successful (real logic to be added)',
            };
        });
    }
}
exports.OneTimeClient = OneTimeClient;
