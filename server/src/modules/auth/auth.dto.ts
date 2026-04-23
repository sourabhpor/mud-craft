import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  Matches,
  IsInt,
} from "class-validator";

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  firstName!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  lastName!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsNotEmpty()
  @MinLength(6)
  password!: string;

  @IsOptional()
  @Matches(/^[0-9]{10}$/, {
    message: "Phone number must be 10 digits",
  })
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  phoneNumberCountryCode?: string;

  @IsOptional()
  @IsInt()
  roleId?: number;
}

export class LoginDto {
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  password!: string;
}

export class ForgotPasswordDto {
  @IsEmail()
  email!: string;
}

export class VerifyOtpDto {
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  otp!: string;
}

export class ResetPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsNotEmpty()
  @MinLength(6)
  newPassword!: string;

  @IsNotEmpty()
  confirmPassword!: string;
}

export class SendOtpDto {
  @IsNotEmpty()
  @Matches(/^[0-9]{10}$/, {
    message: "Phone number must be 10 digits",
  })
  phoneNumber!: string;
}

export class VerifyOtpLoginDto {
  @IsNotEmpty()
  @Matches(/^[0-9]{10}$/, {
    message: "Phone number must be 10 digits",
  })
  phoneNumber!: string;

  @IsNotEmpty()
  @IsString()
  otp!: string;
}

export class ResendOtpLoginDto {
  @IsNotEmpty()
  @Matches(/^[0-9]{10}$/, {
    message: "Phone number must be 10 digits",
  })
  phoneNumber!: string;
}
