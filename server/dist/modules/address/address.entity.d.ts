import { User } from "../user/user.entity";
export declare class Address {
    id: number;
    user: User;
    userId: number;
    fullName: string;
    phoneNumber: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
    type: string;
    isDefault: boolean;
    createdAt: Date;
    updatedAt: Date;
}
