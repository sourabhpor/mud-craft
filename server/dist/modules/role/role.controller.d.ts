import { RoleService } from "./role.service";
import { CreateRoleDto, UpdateRoleDto } from "./role.dto";
import { SuccessResponse } from "src/modules/common/utils/successResponse";
export declare class RoleController {
    private roleService;
    constructor(roleService: RoleService);
    createRole(dto: CreateRoleDto): Promise<SuccessResponse>;
    getAllRoles(): Promise<SuccessResponse>;
    getRoleById(id: number): Promise<SuccessResponse>;
    updateRole(id: number, dto: UpdateRoleDto): Promise<SuccessResponse>;
    deleteRole(id: number): Promise<SuccessResponse>;
}
