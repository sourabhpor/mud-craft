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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const common_1 = require("@nestjs/common");
const category_service_1 = require("./category.service");
const category_dto_1 = require("./category.dto");
const successResponse_1 = require("../common/utils/successResponse");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/roles.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const common_enum_1 = require("../common/utils/common.enum");
const platform_express_1 = require("@nestjs/platform-express");
const multer_config_1 = require("../common/utils/multer.config");
let CategoryController = class CategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    async create(file, createCategoryDto) {
        const category = await this.categoryService.createCategory(createCategoryDto, file);
        return new successResponse_1.SuccessResponse("Category added successfully", category);
    }
    async findAll(limit, offset) {
        const result = await this.categoryService.getAllCategories(Number(limit) || 10, Number(offset) || 0);
        return new successResponse_1.SuccessResponse("Categories retrieved successfully", result.categories, result.total);
    }
    async findActive(limit, offset) {
        const result = await this.categoryService.getActiveCategories(Number(limit) || 10, Number(offset) || 0);
        return new successResponse_1.SuccessResponse("Active categories retrieved successfully", result.categories, result.total);
    }
    async findOne(id) {
        const category = await this.categoryService.getCategoryById(id);
        return new successResponse_1.SuccessResponse("Category retrieved successfully", category);
    }
    async update(id, file, updateCategoryDto) {
        const category = await this.categoryService.updateCategory(id, updateCategoryDto, file);
        return new successResponse_1.SuccessResponse("Category updated successfully", category);
    }
    async updateStatus(id, isActive) {
        const category = await this.categoryService.updateCategoryStatus(id, isActive);
        return new successResponse_1.SuccessResponse("Category status updated successfully", category);
    }
    async remove(id) {
        await this.categoryService.deleteCategory(id);
        return new successResponse_1.SuccessResponse("Category deleted successfully", null);
    }
};
exports.CategoryController = CategoryController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(common_enum_1.RoleType.ADMIN, common_enum_1.RoleType.SUPER_ADMIN),
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("image", multer_config_1.multerOptions)),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, category_dto_1.CreateCategoryDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)("limit")),
    __param(1, (0, common_1.Query)("offset")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("active"),
    __param(0, (0, common_1.Query)("limit")),
    __param(1, (0, common_1.Query)("offset")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "findActive", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(common_enum_1.RoleType.ADMIN, common_enum_1.RoleType.SUPER_ADMIN),
    (0, common_1.Put)(":id"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("image", multer_config_1.multerOptions)),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, category_dto_1.UpdateCategoryDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(common_enum_1.RoleType.ADMIN, common_enum_1.RoleType.SUPER_ADMIN),
    (0, common_1.Put)(":id/status"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)("isActive")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Boolean]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(common_enum_1.RoleType.ADMIN, common_enum_1.RoleType.SUPER_ADMIN),
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "remove", null);
exports.CategoryController = CategoryController = __decorate([
    (0, common_1.Controller)("category"),
    __metadata("design:paramtypes", [category_service_1.CategoryService])
], CategoryController);
//# sourceMappingURL=category.controller.js.map