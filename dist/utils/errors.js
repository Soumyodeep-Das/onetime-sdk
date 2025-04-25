"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SMSDeliveryError = exports.EmailDeliveryError = void 0;
// src/utils/errors.ts
class EmailDeliveryError extends Error {
    constructor(message) {
        super(message);
        this.name = 'EmailDeliveryError';
    }
}
exports.EmailDeliveryError = EmailDeliveryError;
class SMSDeliveryError extends Error {
    constructor(message) {
        super(message);
        this.name = 'SMSDeliveryError';
    }
}
exports.SMSDeliveryError = SMSDeliveryError;
