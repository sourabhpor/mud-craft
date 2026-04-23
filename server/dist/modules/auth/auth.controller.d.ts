import { AuthService } from "./auth.service";
import { RegisterDto, LoginDto, ForgotPasswordDto, ResetPasswordDto, VerifyOtpDto, SendOtpDto, VerifyOtpLoginDto, ResendOtpLoginDto } from "./auth.dto";
import { SuccessResponse } from "src/modules/common/utils/successResponse";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<SuccessResponse>;
    login(dto: LoginDto): Promise<SuccessResponse>;
    forgotPassword(dto: ForgotPasswordDto): Promise<SuccessResponse>;
    resendOtp(dto: ForgotPasswordDto): Promise<SuccessResponse>;
    verifyOtp(dto: VerifyOtpDto): Promise<SuccessResponse>;
    resetPassword(dto: ResetPasswordDto): Promise<SuccessResponse>;
    sendOtp(dto: SendOtpDto): Promise<SuccessResponse>;
    verifyOtpLogin(dto: VerifyOtpLoginDto): Promise<SuccessResponse>;
    resendOtpLogin(dto: ResendOtpLoginDto): Promise<SuccessResponse>;
}
