"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_dto_1 = require("./auth.dto");
const successResponse_1 = require("../common/utils/successResponse");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async register(dto) {
        const data = await this.authService.register(dto);
        return new successResponse_1.SuccessResponse("Registered successfully", data);
    }
    async login(dto) {
        const data = await this.authService.login(dto);
        return new successResponse_1.SuccessResponse("Logged in successfully", data);
    }
    async forgotPassword(dto) {
        const data = await this.authService.forgotPassword(dto);
        return new successResponse_1.SuccessResponse("OTP sent successfully", data);
    }
    async resendOtp(dto) {
        const data = await this.authService.forgotPassword(dto);
        return new successResponse_1.SuccessResponse("OTP sent successfully", data);
    }
    async verifyOtp(dto) {
        const data = await this.authService.verifyOtp(dto);
        return new successResponse_1.SuccessResponse("OTP verified successfully", data);
    }
    async resetPassword(dto) {
        const data = await this.authService.resetPassword(dto);
        return new successResponse_1.SuccessResponse("Password reset successfully", data);
    }
    async sendOtp(dto) {
        const data = await this.authService.sendOtp(dto.phoneNumber);
        return new successResponse_1.SuccessResponse("OTP sent successfully", data);
    }
    async verifyOtpLogin(dto) {
        const data = await this.authService.verifyOtpLogin(dto.phoneNumber, dto.otp);
        return new successResponse_1.SuccessResponse("OTP verified successfully", data);
    }
    async resendOtpLogin(dto) {
        const data = await this.authService.sendOtp(dto.phoneNumber);
        return new successResponse_1.SuccessResponse("OTP resent successfully", data);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)("register"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)("login"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)("forgot-password"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.ForgotPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)("resend-otp"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.ForgotPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resendOtp", null);
__decorate([
    (0, common_1.Post)("verify-otp"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.VerifyOtpDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyOtp", null);
__decorate([
    (0, common_1.Post)("reset-password"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Post)("send-otp-phone"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.SendOtpDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "sendOtp", null);
__decorate([
    (0, common_1.Post)("verify-otp-login"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.VerifyOtpLoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyOtpLogin", null);
__decorate([
    (0, common_1.Post)("resend-otp-phone"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.ResendOtpLoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resendOtpLogin", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)("auth"),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map