import { Role } from "../role/role.entity";
import { Address } from "../address/address.entity";
import { LoginType } from "src/modules/common/utils/common.enum";
export declare class User {
    id: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    password: string;
    phoneNumberCountryCode?: string;
    phoneNumber?: string;
    otp?: string;
    isOtpVerified: boolean;
    loginCount: number;
    isMobileVerified: boolean;
    isEmailVerified: boolean;
    role?: Role;
    roleId?: number;
    addresses: Address[];
    otpExpiry?: Date;
    isActive: boolean;
    isDeleted: boolean;
    imageUrl?: string;
    lastLoginAt?: Date;
    loginType: LoginType;
    createdAt: Date;
    updatedAt: Date;
}
