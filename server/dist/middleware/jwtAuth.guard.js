"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const config_1 = require("@nestjs/config");
const public_decorator_1 = require("./decorators/public.decorator");
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)("jwt") {
    constructor(reflector, jwtService, configService) {
        super();
        this.reflector = reflector;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride(public_decorator_1.IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }
        const request = this.getRequest(context);
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new common_1.UnauthorizedException("Token not found");
        }
        try {
            const decoded = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get("JWT_SECRET"),
            });
            request["user"] = decoded;
            request["token"] = token;
            return (await super.canActivate(context));
        }
        catch (error) {
            if (error && error.name === "TokenExpiredError") {
                throw new common_1.UnauthorizedException("Token has expired");
            }
            else if (error && error.name === "JsonWebTokenError") {
                throw new common_1.UnauthorizedException("Invalid token");
            }
            else if (error instanceof common_1.UnauthorizedException) {
                throw new common_1.UnauthorizedException(error.message);
            }
            throw error;
        }
    }
    extractTokenFromHeader(request) {
        const [type, token] = request.headers["authorization"]?.split(" ") ?? [];
        return type === "Bearer" ? token : undefined;
    }
    getRequest(context) {
        return context.switchToHttp().getRequest();
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        jwt_1.JwtService,
        config_1.ConfigService])
], JwtAuthGuard);
//# sourceMappingURL=jwtAuth.guard.js.map