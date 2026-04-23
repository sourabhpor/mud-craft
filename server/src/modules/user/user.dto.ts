import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  MinLength,
  IsMobilePhone,
} from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  firstName!: string;

  @IsNotEmpty()
  @IsString()
  lastName!: string;

  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @MinLength(6)
  password!: string;

  @IsOptional()
  phone?: string;

  @IsOptional()
  @IsNumber()
  roleId?: number;

  @IsOptional()
  address?: string;

  @IsOptional()
  city?: string;

  @IsOptional()
  state?: string;

  @IsOptional()
  pincode?: string;
}

// Update profile - only updates fields that exist in User entity
export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  phoneNumberCountryCode?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}

// Change password API
export class ChangePasswordDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  oldPassword!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  newPassword!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  confirmPassword!: string;
}

// Verify phone number API
export class VerifyPhoneNumberDto {
  @IsNotEmpty()
  @IsString()
  otp!: string;
}

// Request phone verification (to generate OTP)
export class RequestPhoneVerificationDto {
  @IsNotEmpty()
  @IsString()
  phoneNumberCountryCode!: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber!: string;
}
