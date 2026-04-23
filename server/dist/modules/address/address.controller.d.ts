import { AddressService } from "./address.service";
import { CreateAddressDto, UpdateAddressDto } from "./address.dto";
export declare class AddressController {
    private readonly addressService;
    constructor(addressService: AddressService);
    create(createAddressDto: CreateAddressDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateAddressDto: UpdateAddressDto): string;
    remove(id: string): string;
}
