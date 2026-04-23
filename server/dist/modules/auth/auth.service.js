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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../user/user.entity");
const role_entity_1 = require("../role/role.entity");
const common_enum_1 = require("../common/utils/common.enum");
const bcrypt = __importStar(require("bcrypt"));
const common_function_1 = require("../common/utils/common.function");
const sms_service_1 = require("../common/services/sms.service");
let AuthService = class AuthService {
    constructor(userRepository, roleRepository, jwtService, smsService) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.jwtService = jwtService;
        this.smsService = smsService;
    }
    async register(dto) {
        try {
            const existingUser = await this.userRepository.findOne({
                where: { email: dto.email },
            });
            if (existingUser)
                throw new common_1.BadRequestException("Email already exists");
            const hashedPassword = await bcrypt.hash(dto.password, 10);
            let role = null;
            if (dto.roleId) {
                role = await this.roleRepository.findOne({
                    where: { id: dto.roleId },
                });
                if (!role)
                    throw new common_1.NotFoundException("Role not found");
            }
            else {
                role = await this.roleRepository.findOne({
                    where: { name: common_enum_1.RoleType.USER },
                });
            }
            const user = this.userRepository.create({
                ...dto,
                password: hashedPassword,
                roleId: role ? role.id : null,
                loginType: common_enum_1.LoginType.EMAIL,
            });
            await this.userRepository.save(user);
            const { password, ...result } = user;
            return result;
        }
        catch (error) {
            throw error;
        }
    }
    async login(dto) {
        try {
            const user = await this.userRepository.findOne({
                where: { email: dto.email },
                relations: ["role"],
            });
            if (!user || !(await bcrypt.compare(dto.password, user.password))) {
                throw new common_1.UnauthorizedException("Invalid credentials");
            }
            user.loginCount = (user.loginCount || 0) + 1;
            user.lastLoginAt = new Date();
            user.loginType = common_enum_1.LoginType.EMAIL;
            await this.userRepository.save(user);
            const payload = {
                sub: user.id,
                email: user.email,
                role: user.role?.name || common_enum_1.RoleType.USER,
            };
            return {
                token: this.jwtService.sign(payload),
                user: {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    role: user.role?.name,
                },
            };
        }
        catch (error) {
            throw error;
        }
    }
    async forgotPassword(dto) {
        try {
            const user = await this.userRepository.findOne({
                where: { email: dto.email },
            });
            if (!user)
                throw new common_1.NotFoundException("User not found");
            const otp = (0, common_function_1.generateOtp)();
            const expiry = (0, common_function_1.generateOtpExpiry)();
            user.otp = otp;
            user.otpExpiry = expiry;
            user.loginType = common_enum_1.LoginType.EMAIL;
            await this.userRepository.save(user);
            return { otp };
        }
        catch (error) {
            throw error;
        }
    }
    async verifyOtp(dto) {
        try {
            const user = await this.userRepository.findOne({
                where: { email: dto.email, otp: dto.otp },
            });
            if (!user)
                throw new common_1.BadRequestException("Invalid OTP");
            if (new Date() > user.otpExpiry) {
                throw new common_1.BadRequestException("OTP expired");
            }
            user.isOtpVerified = true;
            await this.userRepository.save(user);
            return;
        }
        catch (error) {
            throw error;
        }
    }
    async resetPassword(dto) {
        try {
            const user = await this.userRepository.findOne({
                where: { email: dto.email },
            });
            if (!user) {
                throw new common_1.NotFoundException("User not found");
            }
            if (!user.isOtpVerified) {
                throw new common_1.BadRequestException("OTP not verified");
            }
            if (dto.newPassword !== dto.confirmPassword) {
                throw new common_1.BadRequestException("Passwords do not match");
            }
            const hashedPassword = await bcrypt.hash(dto.newPassword, 10);
            user.password = hashedPassword;
            user.otp = null;
            user.otpExpiry = null;
            user.isOtpVerified = false;
            await this.userRepository.save(user);
            return;
        }
        catch (error) {
            throw error;
        }
    }
    async sendOtp(phoneNumber) {
        try {
            let user = await this.userRepository.findOne({
                where: { phoneNumber },
            });
            const otp = (0, common_function_1.generateOtp)();
            const expiry = (0, common_function_1.generateOtpExpiry)();
            if (!user) {
                const role = await this.roleRepository.findOne({
                    where: { name: common_enum_1.RoleType.USER },
                });
                user = this.userRepository.create({
                    phoneNumber,
                    roleId: role?.id,
                    isMobileVerified: false,
                    loginType: common_enum_1.LoginType.OTP,
                });
            }
            else {
                user.loginType = common_enum_1.LoginType.OTP;
            }
            try {
                await this.smsService.sendOtp(phoneNumber, otp);
            }
            catch (error) {
                console.error("SMS failed:", error);
                throw new common_1.BadRequestException("Failed to send OTP");
            }
            user.otp = otp;
            user.otpExpiry = expiry;
            await this.userRepository.save(user);
            return { otp };
        }
        catch (error) {
            throw error;
        }
    }
    async verifyOtpLogin(phoneNumber, otp) {
        try {
            const user = await this.userRepository.findOne({
                where: { phoneNumber, otp },
                relations: ["role"],
            });
            if (!user)
                throw new common_1.BadRequestException("Invalid OTP");
            if (new Date() > user.otpExpiry) {
                throw new common_1.BadRequestException("OTP expired");
            }
            user.isMobileVerified = true;
            user.otp = null;
            user.otpExpiry = null;
            user.loginCount = (user.loginCount || 0) + 1;
            user.lastLoginAt = new Date();
            user.loginType = common_enum_1.LoginType.OTP;
            await this.userRepository.save(user);
            const payload = {
                sub: user.id,
                role: user.role?.name || common_enum_1.RoleType.USER,
            };
            return {
                token: this.jwtService.sign(payload),
                user,
            };
        }
        catch (error) {
            throw error;
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService,
        sms_service_1.SmsService])
], AuthService);
//# sourceMappingURL=auth.service.js.map