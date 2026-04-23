import { Product } from "./product.entity";
import { Repository } from "typeorm";
import { CreateProductDto, UpdateProductDto } from "./product.dto";
import { FileUploadService } from "../common/utils/common.function";
export type MulterFile = Express.Multer.File;
export declare class ProductService {
    private productRepository;
    private fileUploadService;
    private uploadDir;
    constructor(productRepository: Repository<Product>, fileUploadService: FileUploadService);
    createProduct(dto: CreateProductDto, files?: MulterFile[]): Promise<Product>;
    getAllProducts(limit?: number, offset?: number): Promise<{
        products: Product[];
        total: number;
    }>;
    getProductById(id: number): Promise<Product>;
    updateProduct(id: number, dto: UpdateProductDto, files?: MulterFile[]): Promise<Product>;
    updateStatus(id: number, isActive: boolean): Promise<Product>;
    getActiveProducts(limit?: number, offset?: number): Promise<{
        products: Product[];
        total: number;
    }>;
    deleteProduct(id: number): Promise<void>;
}
