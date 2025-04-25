// src/types/index.ts

export interface SendOTPResult {
    success: boolean;
    message: string;
}

export interface OTPVerificationResult {
    success: boolean;
    message: string;
}

export interface OneTimeClientConfig {
    email?: {
        enabled: boolean;
        sender: string;
    };
    sms?: {
        enabled: boolean;
        fromNumber: string;
    };
}

export interface OTPPayload {
    to: string;
    channel: 'email' | 'sms';
    method: string;
}

export interface VerifyPayload {
    recipient: string;
    code: string;
    channel: 'email' | 'sms';
}

