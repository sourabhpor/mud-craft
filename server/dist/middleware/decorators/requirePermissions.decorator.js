"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequirePermissions = exports.PERMISSION_CHECKER_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.PERMISSION_CHECKER_KEY = 'permissionId';
const RequirePermissions = (params) => (0, common_1.SetMetadata)(exports.PERMISSION_CHECKER_KEY, params);
exports.RequirePermissions = RequirePermissions;
//# sourceMappingURL=requirePermissions.decorator.js.map