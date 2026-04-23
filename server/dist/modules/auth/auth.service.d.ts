import { JwtService } from "@nestjs/jwt";
import { Repository } from "typeorm";
import { User } from "../user/user.entity";
import { Role } from "../role/role.entity";
import { LoginType } from "src/modules/common/utils/common.enum";
import { RegisterDto, LoginDto, ForgotPasswordDto, ResetPasswordDto, VerifyOtpDto } from "./auth.dto";
import { SmsService } from "src/modules/common/services/sms.service";
export declare class AuthService {
    private userRepository;
    private roleRepository;
    private jwtService;
    private smsService;
    constructor(userRepository: Repository<User>, roleRepository: Repository<Role>, jwtService: JwtService, smsService: SmsService);
    register(dto: RegisterDto): Promise<{
        id: number;
        firstName?: string;
        lastName?: string;
        email?: string;
        phoneNumberCountryCode?: string;
        phoneNumber?: string;
        otp?: string;
        isOtpVerified: boolean;
        loginCount: number;
        isMobileVerified: boolean;
        isEmailVerified: boolean;
        role?: Role;
        roleId?: number;
        addresses: import("../address/address.entity").Address[];
        otpExpiry?: Date;
        isActive: boolean;
        isDeleted: boolean;
        imageUrl?: string;
        lastLoginAt?: Date;
        loginType: LoginType;
        createdAt: Date;
        updatedAt: Date;
    }>;
    login(dto: LoginDto): Promise<{
        token: string;
        user: {
            id: number;
            firstName: string;
            lastName: string;
            email: string;
            role: string;
        };
    }>;
    forgotPassword(dto: ForgotPasswordDto): Promise<{
        otp: string;
    }>;
    verifyOtp(dto: VerifyOtpDto): Promise<void>;
    resetPassword(dto: ResetPasswordDto): Promise<void>;
    sendOtp(phoneNumber: string): Promise<{
        otp: string;
    }>;
    verifyOtpLogin(phoneNumber: string, otp: string): Promise<{
        token: string;
        user: User;
    }>;
}
