export declare enum AddressType {
    HOME = "home",
    WORK = "work",
    OTHER = "other"
}
export declare class CreateAddressDto {
    fullName: string;
    phoneNumber: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    pincode: string;
    country?: string;
    type?: AddressType;
    isDefault?: boolean;
}
export declare class UpdateAddressDto {
    fullName?: string;
    phoneNumber?: string;
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    state?: string;
    pincode?: string;
    country?: string;
    type?: AddressType;
    isDefault?: boolean;
}
