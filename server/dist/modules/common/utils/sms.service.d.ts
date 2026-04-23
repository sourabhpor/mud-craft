export declare class SmsService {
    private client;
    constructor();
    sendOtp(phone: string, otp: string): Promise<any>;
}
