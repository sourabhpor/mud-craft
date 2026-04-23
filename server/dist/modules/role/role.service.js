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
exports.RoleService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const role_entity_1 = require("./role.entity");
let RoleService = class RoleService {
    constructor(roleRepository) {
        this.roleRepository = roleRepository;
    }
    async createRole(dto) {
        const existingRole = await this.roleRepository.findOne({
            where: { name: dto.name },
        });
        if (existingRole) {
            throw new common_1.BadRequestException("Role with this name already exists");
        }
        const role = this.roleRepository.create({
            name: dto.name,
            isActive: dto.isActive ?? true,
            isDeleted: false,
        });
        return await this.roleRepository.save(role);
    }
    async getAllRoles() {
        return await this.roleRepository.find({
            where: { isDeleted: false },
            relations: ["users"],
        });
    }
    async getRoleById(id) {
        const role = await this.roleRepository.findOne({
            where: { id, isDeleted: false },
            relations: ["users"],
        });
        if (!role) {
            throw new common_1.NotFoundException(`Role with ID ${id} not found`);
        }
        return role;
    }
    async updateRole(id, dto) {
        const role = await this.getRoleById(id);
        if (dto.name && dto.name !== role.name) {
            const existingRole = await this.roleRepository.findOne({
                where: { name: dto.name },
            });
            if (existingRole) {
                throw new common_1.BadRequestException("Role with this name already exists");
            }
        }
        Object.assign(role, dto);
        return await this.roleRepository.save(role);
    }
    async deleteRole(id) {
        const role = await this.getRoleById(id);
        role.isDeleted = true;
        await this.roleRepository.save(role);
        return { message: "Role deleted successfully" };
    }
};
exports.RoleService = RoleService;
exports.RoleService = RoleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RoleService);
//# sourceMappingURL=role.service.js.map