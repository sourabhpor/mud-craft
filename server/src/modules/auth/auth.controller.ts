import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import {
  RegisterDto,
  LoginDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  VerifyOtpDto,
  SendOtpDto,
  VerifyOtpLoginDto,
  ResendOtpLoginDto,
} from "./auth.dto";
import { SuccessResponse } from "src/modules/common/utils/successResponse";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("register")
  async register(@Body() dto: RegisterDto) {
    const data = await this.authService.register(dto);
    return new SuccessResponse("Registered successfully", data);
  }

  @Post("login")
  async login(@Body() dto: LoginDto) {
    const data = await this.authService.login(dto);
    return new SuccessResponse("Logged in successfully", data);
  }

  @Post("forgot-password")
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    const data = await this.authService.forgotPassword(dto);
    return new SuccessResponse("OTP sent successfully", data);
  }

  @Post("resend-otp")
  async resendOtp(@Body() dto: ForgotPasswordDto) {
    const data = await this.authService.forgotPassword(dto);
    return new SuccessResponse("OTP sent successfully", data);
  }

  @Post("verify-otp")
  async verifyOtp(@Body() dto: VerifyOtpDto) {
    const data = await this.authService.verifyOtp(dto);
    return new SuccessResponse("OTP verified successfully", data);
  }

  @Post("reset-password")
  async resetPassword(@Body() dto: ResetPasswordDto) {
    const data = await this.authService.resetPassword(dto);
    return new SuccessResponse("Password reset successfully", data);
  }

  @Post("send-otp-phone")
  async sendOtp(@Body() dto: SendOtpDto) {
    const data = await this.authService.sendOtp(dto.phoneNumber);
    return new SuccessResponse("OTP sent successfully", data);
  }

  @Post("verify-otp-login")
  async verifyOtpLogin(@Body() dto: VerifyOtpLoginDto) {
    const data = await this.authService.verifyOtpLogin(
      dto.phoneNumber,
      dto.otp,
    );
    return new SuccessResponse("OTP verified successfully", data);
  }

  @Post("resend-otp-phone")
  async resendOtpLogin(@Body() dto: ResendOtpLoginDto) {
    const data = await this.authService.sendOtp(dto.phoneNumber);
    return new SuccessResponse("OTP resent successfully", data);
  }
}
