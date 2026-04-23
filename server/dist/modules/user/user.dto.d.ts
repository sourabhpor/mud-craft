export declare class CreateUserDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone?: string;
    roleId?: number;
    address?: string;
    city?: string;
    state?: string;
    pincode?: string;
}
export declare class UpdateProfileDto {
    firstName?: string;
    lastName?: string;
    phoneNumberCountryCode?: string;
    phoneNumber?: string;
    imageUrl?: string;
}
export declare class ChangePasswordDto {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}
export declare class VerifyPhoneNumberDto {
    otp: string;
}
export declare class RequestPhoneVerificationDto {
    phoneNumberCountryCode: string;
    phoneNumber: string;
}
