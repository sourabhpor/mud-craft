export declare class RegisterDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber?: string;
    phoneNumberCountryCode?: string;
    roleId?: number;
}
export declare class LoginDto {
    email: string;
    password: string;
}
export declare class ForgotPasswordDto {
    email: string;
}
export declare class VerifyOtpDto {
    email: string;
    otp: string;
}
export declare class ResetPasswordDto {
    email: string;
    newPassword: string;
    confirmPassword: string;
}
export declare class SendOtpDto {
    phoneNumber: string;
}
export declare class VerifyOtpLoginDto {
    phoneNumber: string;
    otp: string;
}
export declare class ResendOtpLoginDto {
    phoneNumber: string;
}
