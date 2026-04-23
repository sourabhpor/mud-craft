import {
  Controller,
  Get,
  Put,
  Post,
  Body,
  UseGuards,
  Request,
} from "@nestjs/common";
import { UserService } from "./user.service";
import {
  UpdateProfileDto,
  ChangePasswordDto,
  VerifyPhoneNumberDto,
  RequestPhoneVerificationDto,
} from "./user.dto";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { SuccessResponse } from "src/modules/common/utils/successResponse";

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  async getProfile(@Request() req: any) {
    const data = await this.userService.getProfile(req.user.id);
    return new SuccessResponse("Profile retrieved successfully", data);
  }

  @UseGuards(JwtAuthGuard)
  @Put("update-profile")
  async updateProfile(@Request() req: any, @Body() dto: UpdateProfileDto) {
    const data = await this.userService.updateProfile(req.user.id, dto);
    return new SuccessResponse("Profile updated successfully", data);
  }

  @UseGuards(JwtAuthGuard)
  @Put("change-password")
  async changePassword(@Request() req: any, @Body() dto: ChangePasswordDto) {
    const data = await this.userService.changePassword(req.user.id, dto);
    return new SuccessResponse("Password changed successfully", data);
  }

  @UseGuards(JwtAuthGuard)
  @Post("request-phone-verification")
  async requestPhoneVerification(
    @Request() req: any,
    @Body() dto: RequestPhoneVerificationDto,
  ) {
    const data = await this.userService.requestPhoneVerification(
      req.user.id,
      dto,
    );
    return new SuccessResponse("OTP sent successfully", data);
  }

  @UseGuards(JwtAuthGuard)
  @Put("verify-phone-number")
  async verifyPhoneNumber(
    @Request() req: any,
    @Body() dto: VerifyPhoneNumberDto,
  ) {
    const data = await this.userService.verifyPhoneNumber(req.user.id, dto);
    return new SuccessResponse("Phone number verified successfully", data);
  }
}
