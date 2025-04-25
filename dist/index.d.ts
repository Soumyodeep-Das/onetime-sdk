import type { OneTimeClientConfig, SendOTPResult, OTPVerificationResult } from './types';
export declare class OneTimeClient {
    private config;
    constructor(config: OneTimeClientConfig);
    sendOTP(identifier: string, via: 'email' | 'sms'): Promise<SendOTPResult>;
    verifyOTP(identifier: string, otp: string): OTPVerificationResult;
}
export default OneTimeClient;
