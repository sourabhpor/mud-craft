import { UserService } from "./user.service";
import { UpdateProfileDto, ChangePasswordDto, VerifyPhoneNumberDto, RequestPhoneVerificationDto } from "./user.dto";
import { SuccessResponse } from "src/modules/common/utils/successResponse";
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getProfile(req: any): Promise<SuccessResponse>;
    updateProfile(req: any, dto: UpdateProfileDto): Promise<SuccessResponse>;
    changePassword(req: any, dto: ChangePasswordDto): Promise<SuccessResponse>;
    requestPhoneVerification(req: any, dto: RequestPhoneVerificationDto): Promise<SuccessResponse>;
    verifyPhoneNumber(req: any, dto: VerifyPhoneNumberDto): Promise<SuccessResponse>;
}
