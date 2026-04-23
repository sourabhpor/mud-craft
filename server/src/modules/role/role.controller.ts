import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  ParseIntPipe,
} from "@nestjs/common";
import { RoleService } from "./role.service";
import { CreateRoleDto, UpdateRoleDto } from "./role.dto";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";
import { SuccessResponse } from "src/modules/common/utils/successResponse";
import { RoleType } from "../common/utils/common.enum";

@Controller("roles")
export class RoleController {
  constructor(private roleService: RoleService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN, RoleType.SUPER_ADMIN)
  @Post()
  async createRole(@Body() dto: CreateRoleDto) {
    const data = await this.roleService.createRole(dto);
    return new SuccessResponse("Role created successfully", data);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllRoles() {
    const data = await this.roleService.getAllRoles();
    return new SuccessResponse("Roles retrieved successfully", data);
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  async getRoleById(@Param("id", ParseIntPipe) id: number) {
    const data = await this.roleService.getRoleById(id);
    return new SuccessResponse("Role retrieved successfully", data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN, RoleType.SUPER_ADMIN)
  @Put(":id")
  async updateRole(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateRoleDto,
  ) {
    const data = await this.roleService.updateRole(id, dto);
    return new SuccessResponse("Role updated successfully", data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN, RoleType.SUPER_ADMIN)
  @Delete(":id")
  async deleteRole(@Param("id", ParseIntPipe) id: number) {
    const data = await this.roleService.deleteRole(id);
    return new SuccessResponse("Role deleted successfully", data);
  }
}
