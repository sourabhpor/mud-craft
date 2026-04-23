import { CustomDecorator } from '@nestjs/common';
export declare const PERMISSION_CHECKER_KEY = "permissionId";
export declare const RequirePermissions: (params: string) => CustomDecorator<string>;
