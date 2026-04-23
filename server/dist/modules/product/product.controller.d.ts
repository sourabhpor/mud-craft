import { ProductService } from "./product.service";
import { CreateProductDto, UpdateProductDto } from "./product.dto";
import { SuccessResponse } from "../common/utils/successResponse";
export declare class ProductController {
    private productService;
    constructor(productService: ProductService);
    create(files: Express.Multer.File[], dto: CreateProductDto): Promise<SuccessResponse>;
    findAll(limit: number, offset: number): Promise<SuccessResponse>;
    update(id: number, files: Express.Multer.File[], dto: UpdateProductDto): Promise<SuccessResponse>;
    updateStatus(id: number, isActive: boolean): Promise<SuccessResponse>;
    findActive(limit: number, offset: number): Promise<SuccessResponse>;
    findOne(id: number): Promise<SuccessResponse>;
    delete(id: number): Promise<SuccessResponse>;
}
