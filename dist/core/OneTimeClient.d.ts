import { OTPPayload, VerifyPayload } from '../types/index';
interface OneTimeClientConfig {
    apiKey: string;
    projectId: string;
    environment?: 'production' | 'development';
}
export declare class OneTimeClient {
    private apiKey;
    private projectId;
    private environment;
    constructor(config: OneTimeClientConfig);
    sendOTP(payload: OTPPayload): Promise<{
        success: boolean;
        message: string;
    }>;
    verifyOTP(payload: VerifyPayload): Promise<{
        success: boolean;
        message: string;
    }>;
}
export {};
