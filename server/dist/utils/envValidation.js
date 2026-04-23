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
exports.EnvVariablesDto = exports.Environment = void 0;
exports.validate = validate;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
var Environment;
(function (Environment) {
    Environment["Local"] = "";
    Environment["Development"] = "development";
    Environment["Production"] = "production";
    Environment["Staging"] = "staging";
})(Environment || (exports.Environment = Environment = {}));
class EnvVariablesDto {
}
exports.EnvVariablesDto = EnvVariablesDto;
__decorate([
    (0, class_validator_1.IsEnum)(Environment),
    __metadata("design:type", String)
], EnvVariablesDto.prototype, "NODE_ENV", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], EnvVariablesDto.prototype, "APP_URL", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], EnvVariablesDto.prototype, "PORT", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Boolean)
], EnvVariablesDto.prototype, "CREDENTIALS", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], EnvVariablesDto.prototype, "ORIGIN", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], EnvVariablesDto.prototype, "ACCESS_TOKEN_SECRET", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], EnvVariablesDto.prototype, "FORGET_PASSWORD_TOKEN_EXPIRATION", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], EnvVariablesDto.prototype, "ACCESS_TOKEN_EXPIRATION", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], EnvVariablesDto.prototype, "REACT_APP_URL", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], EnvVariablesDto.prototype, "LOG_FORMAT", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], EnvVariablesDto.prototype, "LOG_DIR", void 0);
function validate(config) {
    const validatedConfig = (0, class_transformer_1.plainToInstance)(EnvVariablesDto, config, {
        enableImplicitConversion: true,
    });
    const errors = ([] = (0, class_validator_1.validateSync)(validatedConfig, {
        skipMissingProperties: false,
    }));
    if (errors.length > 0) {
        throw new common_1.ServiceUnavailableException(errors[0]['constraints'][Object.keys(errors[0]['constraints'])[0]]);
    }
    return validatedConfig;
}
//# sourceMappingURL=envValidation.js.map