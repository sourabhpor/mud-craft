"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseSecureResolver = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../modules/common/guards/jwt-auth.guard");
const roles_guard_1 = require("../modules/auth/roles.guard");
const permissions_guard_1 = require("./permissions.guard");
let BaseSecureResolver = class BaseSecureResolver {
};
exports.BaseSecureResolver = BaseSecureResolver;
exports.BaseSecureResolver = BaseSecureResolver = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, permissions_guard_1.PermissionsGuard)
], BaseSecureResolver);
//# sourceMappingURL=base-secure.resolver.js.map