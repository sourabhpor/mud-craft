import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Role } from "./role.entity";
import { CreateRoleDto, UpdateRoleDto } from "./role.dto";

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}

  async createRole(dto: CreateRoleDto): Promise<Role> {
    const existingRole = await this.roleRepository.findOne({
      where: { name: dto.name },
    });

    if (existingRole) {
      throw new BadRequestException("Role with this name already exists");
    }

    const role = this.roleRepository.create({
      name: dto.name,
      isActive: dto.isActive ?? true,
      isDeleted: false,
    });

    return await this.roleRepository.save(role);
  }

  async getAllRoles(): Promise<Role[]> {
    return await this.roleRepository.find({
      where: { isDeleted: false },
      relations: ["users"],
    });
  }

  async getRoleById(id: number): Promise<Role> {
    const role = await this.roleRepository.findOne({
      where: { id, isDeleted: false },
      relations: ["users"],
    });

    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }

    return role;
  }

  async updateRole(id: number, dto: UpdateRoleDto): Promise<Role> {
    const role = await this.getRoleById(id);

    if (dto.name && dto.name !== role.name) {
      const existingRole = await this.roleRepository.findOne({
        where: { name: dto.name },
      });

      if (existingRole) {
        throw new BadRequestException("Role with this name already exists");
      }
    }

    Object.assign(role, dto);
    return await this.roleRepository.save(role);
  }

  async deleteRole(id: number): Promise<{ message: string }> {
    const role = await this.getRoleById(id);

    role.isDeleted = true;
    await this.roleRepository.save(role);

    return { message: "Role deleted successfully" };
  }
}
