import { User } from "../user/user.entity";
export declare class Role {
    id: number;
    name: string;
    isActive: boolean;
    isDeleted: boolean;
    users: User[];
}
