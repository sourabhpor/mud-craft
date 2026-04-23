"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
const bcrypt = __importStar(require("bcrypt"));
const common_function_1 = require("../common/utils/common.function");
const sms_service_1 = require("../common/services/sms.service");
let UserService = class UserService {
    constructor(userRepository, smsService) {
        this.userRepository = userRepository;
        this.smsService = smsService;
    }
    async getProfile(userId) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ["role"],
        });
        if (!user)
            throw new common_1.NotFoundException("User not found");
        const { password, otp, otpExpiry, isDeleted, ...result } = user;
        return result;
    }
    async updateProfile(userId, dto) {
        try {
            const user = await this.userRepository.findOne({ where: { id: userId } });
            if (!user)
                throw new common_1.NotFoundException("User not found");
            if (dto.phoneNumber && dto.phoneNumber !== user.phoneNumber) {
                const existingUser = await this.userRepository.findOne({
                    where: { phoneNumber: dto.phoneNumber },
                });
                if (existingUser) {
                    throw new common_1.BadRequestException("Phone number already registered");
                }
            }
            if (dto.firstName !== undefined)
                user.firstName = dto.firstName;
            if (dto.lastName !== undefined)
                user.lastName = dto.lastName;
            if (dto.phoneNumberCountryCode !== undefined)
                user.phoneNumberCountryCode = dto.phoneNumberCountryCode;
            if (dto.phoneNumber !== undefined)
                user.phoneNumber = dto.phoneNumber;
            if (dto.imageUrl !== undefined)
                user.imageUrl = dto.imageUrl;
            await this.userRepository.save(user);
            const { password, otp, otpExpiry, isDeleted, ...result } = user;
            return result;
        }
        catch (error) {
            throw error;
        }
    }
    async changePassword(userId, dto) {
        try {
            if (dto.newPassword !== dto.confirmPassword) {
                throw new common_1.BadRequestException("New password and confirm password do not match");
            }
            if (dto.oldPassword === dto.newPassword) {
                throw new common_1.BadRequestException("New password must be different from old password");
            }
            const user = await this.userRepository.findOne({ where: { id: userId } });
            if (!user)
                throw new common_1.NotFoundException("User not found");
            const isPasswordValid = await bcrypt.compare(dto.oldPassword, user.password);
            if (!isPasswordValid) {
                throw new common_1.UnauthorizedException("Old password is incorrect");
            }
            user.password = await bcrypt.hash(dto.newPassword, 10);
            await this.userRepository.save(user);
            const { password, otp, otpExpiry, isDeleted, ...result } = user;
            return result;
        }
        catch (error) {
            throw error;
        }
    }
    async requestPhoneVerification(userId, dto) {
        try {
            const user = await this.userRepository.findOne({ where: { id: userId } });
            if (!user)
                throw new common_1.NotFoundException("User not found");
            if (dto.phoneNumber !== user.phoneNumber) {
                const existingUser = await this.userRepository.findOne({
                    where: { phoneNumber: dto.phoneNumber },
                });
                if (existingUser) {
                    throw new common_1.BadRequestException("Phone number already registered");
                }
            }
            const otp = (0, common_function_1.generateOtp)();
            const otpExpiry = (0, common_function_1.generateOtpExpiry)(10);
            user.otp = otp;
            user.otpExpiry = otpExpiry;
            user.phoneNumberCountryCode = dto.phoneNumberCountryCode;
            user.phoneNumber = dto.phoneNumber;
            await this.userRepository.save(user);
            return {
                message: "OTP sent to your phone number",
                phoneNumber: dto.phoneNumber,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async verifyPhoneNumber(userId, dto) {
        try {
            const user = await this.userRepository.findOne({ where: { id: userId } });
            if (!user)
                throw new common_1.NotFoundException("User not found");
            if (!user.otp || user.otp !== dto.otp) {
                throw new common_1.BadRequestException("Invalid OTP");
            }
            if (!user.otpExpiry || new Date() > user.otpExpiry) {
                throw new common_1.BadRequestException("OTP has expired");
            }
            user.isMobileVerified = true;
            user.otp = null;
            user.otpExpiry = null;
            await this.userRepository.save(user);
            const { password, otp, otpExpiry, isDeleted, ...result } = user;
            return result;
        }
        catch (error) {
            throw error;
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        sms_service_1.SmsService])
], UserService);
//# sourceMappingURL=user.service.js.map