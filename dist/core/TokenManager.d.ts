export declare function storeOTP(identifier: string, otp: string): void;
export declare function verifyOTP(identifier: string, otp: string): {
    success: boolean;
    message: string;
};
