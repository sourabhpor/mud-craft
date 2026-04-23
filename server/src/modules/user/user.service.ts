import {
  Injectable,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import {
  UpdateProfileDto,
  ChangePasswordDto,
  VerifyPhoneNumberDto,
  RequestPhoneVerificationDto,
} from "./user.dto";
import * as bcrypt from "bcrypt";
import {
  generateOtp,
  generateOtpExpiry,
} from "src/modules/common/utils/common.function";
import { SmsService } from "src/modules/common/services/sms.service";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private smsService: SmsService,
  ) {}

  async getProfile(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ["role"],
    });
    if (!user) throw new NotFoundException("User not found");

    const { password, otp, otpExpiry, isDeleted, ...result } = user;
    return result;
  }

  async updateProfile(userId: number, dto: UpdateProfileDto) {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) throw new NotFoundException("User not found");

      // Check if phoneNumber is being updated and if it's already taken by another user
      if (dto.phoneNumber && dto.phoneNumber !== user.phoneNumber) {
        const existingUser = await this.userRepository.findOne({
          where: { phoneNumber: dto.phoneNumber },
        });
        if (existingUser) {
          throw new BadRequestException("Phone number already registered");
        }
      }

      // Update only the fields that are provided
      if (dto.firstName !== undefined) user.firstName = dto.firstName;
      if (dto.lastName !== undefined) user.lastName = dto.lastName;
      if (dto.phoneNumberCountryCode !== undefined)
        user.phoneNumberCountryCode = dto.phoneNumberCountryCode;
      if (dto.phoneNumber !== undefined) user.phoneNumber = dto.phoneNumber;
      if (dto.imageUrl !== undefined) user.imageUrl = dto.imageUrl;

      await this.userRepository.save(user);

      const { password, otp, otpExpiry, isDeleted, ...result } = user;
      return result;
    } catch (error) {
      throw error;
    }
  }

  async changePassword(userId: number, dto: ChangePasswordDto) {
    try {
      if (dto.newPassword !== dto.confirmPassword) {
        throw new BadRequestException(
          "New password and confirm password do not match",
        );
      }

      if (dto.oldPassword === dto.newPassword) {
        throw new BadRequestException(
          "New password must be different from old password",
        );
      }

      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) throw new NotFoundException("User not found");

      // Verify old password
      const isPasswordValid = await bcrypt.compare(
        dto.oldPassword,
        user.password!,
      );
      if (!isPasswordValid) {
        throw new UnauthorizedException("Old password is incorrect");
      }

      // Hash and update new password
      user.password = await bcrypt.hash(dto.newPassword, 10);
      await this.userRepository.save(user);

      const { password, otp, otpExpiry, isDeleted, ...result } = user;
      return result;
    } catch (error) {
      throw error;
    }
  }

  async requestPhoneVerification(
    userId: number,
    dto: RequestPhoneVerificationDto,
  ) {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) throw new NotFoundException("User not found");

      // Check if phone number is already registered by another user
      if (dto.phoneNumber !== user.phoneNumber) {
        const existingUser = await this.userRepository.findOne({
          where: { phoneNumber: dto.phoneNumber },
        });
        if (existingUser) {
          throw new BadRequestException("Phone number already registered");
        }
      }

      // Generate OTP
      const otp = generateOtp();
      const otpExpiry = generateOtpExpiry(10); // 10 minutes expiry

      user.otp = otp;
      user.otpExpiry = otpExpiry;
      user.phoneNumberCountryCode = dto.phoneNumberCountryCode;
      user.phoneNumber = dto.phoneNumber;

      await this.userRepository.save(user);

      // Send OTP via SMS (if SMS service is configured)
      // await this.smsService.sendOtp(dto.phoneNumber, otp);

      return {
        message: "OTP sent to your phone number",
        phoneNumber: dto.phoneNumber,
      };
    } catch (error) {
      throw error;
    }
  }

  async verifyPhoneNumber(userId: number, dto: VerifyPhoneNumberDto) {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) throw new NotFoundException("User not found");

      if (!user.otp || user.otp !== dto.otp) {
        throw new BadRequestException("Invalid OTP");
      }

      if (!user.otpExpiry || new Date() > user.otpExpiry) {
        throw new BadRequestException("OTP has expired");
      }

      // Mark phone as verified
      user.isMobileVerified = true;
      user.otp = null;
      user.otpExpiry = null;

      await this.userRepository.save(user);

      const { password, otp, otpExpiry, isDeleted, ...result } = user;
      return result;
    } catch (error) {
      throw error;
    }
  }
}
