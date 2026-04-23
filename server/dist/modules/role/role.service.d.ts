import { Repository } from "typeorm";
import { Role } from "./role.entity";
import { CreateRoleDto, UpdateRoleDto } from "./role.dto";
export declare class RoleService {
    private roleRepository;
    constructor(roleRepository: Repository<Role>);
    createRole(dto: CreateRoleDto): Promise<Role>;
    getAllRoles(): Promise<Role[]>;
    getRoleById(id: number): Promise<Role>;
    updateRole(id: number, dto: UpdateRoleDto): Promise<Role>;
    deleteRole(id: number): Promise<{
        message: string;
    }>;
}
