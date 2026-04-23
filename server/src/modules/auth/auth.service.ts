import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../user/user.entity";
import { Role } from "../role/role.entity";
import { LoginType, RoleType } from "src/modules/common/utils/common.enum";
import {
  RegisterDto,
  LoginDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  VerifyOtpDto,
} from "./auth.dto";
import * as bcrypt from "bcrypt";
import {
  generateOtp,
  generateOtpExpiry,
} from "src/modules/common/utils/common.function";
import { SmsService } from "src/modules/common/services/sms.service";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    private jwtService: JwtService,
    private smsService: SmsService,
  ) {}

  async register(dto: RegisterDto) {
    try {
      const existingUser = await this.userRepository.findOne({
        where: { email: dto.email },
      });
      if (existingUser) throw new BadRequestException("Email already exists");

      const hashedPassword = await bcrypt.hash(dto.password, 10);

      let role = null;

      if (dto.roleId) {
        role = await this.roleRepository.findOne({
          where: { id: dto.roleId },
        });

        if (!role) throw new NotFoundException("Role not found");
      } else {
        role = await this.roleRepository.findOne({
          where: { name: RoleType.USER },
        });
      }

      const user = this.userRepository.create({
        ...dto,
        password: hashedPassword,
        roleId: role ? role.id : null,
        loginType: LoginType.EMAIL,
      });

      await this.userRepository.save(user);
      const { password, ...result } = user;
      return result;
    } catch (error) {
      throw error;
    }
  }

  async login(dto: LoginDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { email: dto.email },
        relations: ["role"],
      });

      if (!user || !(await bcrypt.compare(dto.password, user.password!))) {
        throw new UnauthorizedException("Invalid credentials");
      }

      user.loginCount = (user.loginCount || 0) + 1;
      user.lastLoginAt = new Date();

      user.loginType = LoginType.EMAIL;
      await this.userRepository.save(user);

      const payload = {
        sub: user.id,
        email: user.email,
        role: user.role?.name || RoleType.USER,
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
    } catch (error) {
      throw error;
    }
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { email: dto.email },
      });
      if (!user) throw new NotFoundException("User not found");

      const otp = generateOtp();
      const expiry = generateOtpExpiry();

      user.otp = otp;
      user.otpExpiry = expiry;
      user.loginType = LoginType.EMAIL;
      await this.userRepository.save(user);

      return { otp };
    } catch (error) {
      throw error;
    }
  }

  async verifyOtp(dto: VerifyOtpDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { email: dto.email, otp: dto.otp },
      });
      if (!user) throw new BadRequestException("Invalid OTP");

      if (new Date() > user.otpExpiry!) {
        throw new BadRequestException("OTP expired");
      }
      user.isOtpVerified = true;
      await this.userRepository.save(user);

      return;
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(dto: ResetPasswordDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { email: dto.email },
      });
      if (!user) {
        throw new NotFoundException("User not found");
      }
      if (!user.isOtpVerified) {
        throw new BadRequestException("OTP not verified");
      }
      if (dto.newPassword !== dto.confirmPassword) {
        throw new BadRequestException("Passwords do not match");
      }
      const hashedPassword = await bcrypt.hash(dto.newPassword, 10);
      user.password = hashedPassword;
      user.otp = null;
      user.otpExpiry = null;
      user.isOtpVerified = false;
      await this.userRepository.save(user);

      return;
    } catch (error) {
      throw error;
    }
  }

  async sendOtp(phoneNumber: string) {
    try {
      let user = await this.userRepository.findOne({
        where: { phoneNumber },
      });

      const otp = generateOtp();
      const expiry = generateOtpExpiry();

      if (!user) {
        const role = await this.roleRepository.findOne({
          where: { name: RoleType.USER },
        });

        user = this.userRepository.create({
          phoneNumber,
          roleId: role?.id,
          isMobileVerified: false,
          loginType: LoginType.OTP,
        });
      } else {
        user.loginType = LoginType.OTP;
      }

      try {
        await this.smsService.sendOtp(phoneNumber, otp);
      } catch (error) {
        console.error("SMS failed:", error);
        throw new BadRequestException("Failed to send OTP");
      }

      user.otp = otp;
      user.otpExpiry = expiry;

      await this.userRepository.save(user);

      return { otp };
    } catch (error) {
      throw error;
    }
  }

  async verifyOtpLogin(phoneNumber: string, otp: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { phoneNumber, otp },
        relations: ["role"],
      });
      if (!user) throw new BadRequestException("Invalid OTP");

      if (new Date() > user.otpExpiry!) {
        throw new BadRequestException("OTP expired");
      }

      user.isMobileVerified = true;
      user.otp = null;
      user.otpExpiry = null;
      user.loginCount = (user.loginCount || 0) + 1;
      user.lastLoginAt = new Date();
      user.loginType = LoginType.OTP;

      await this.userRepository.save(user);

      const payload = {
        sub: user.id,
        role: user.role?.name || RoleType.USER,
      };

      return {
        token: this.jwtService.sign(payload),
        user,
      };
    } catch (error) {
      throw error;
    }
  }
}
