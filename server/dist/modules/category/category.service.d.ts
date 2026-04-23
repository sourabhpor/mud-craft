import { CreateCategoryDto, UpdateCategoryDto } from "./category.dto";
import { Category } from "./category.entity";
import { Repository } from "typeorm";
import { FileUploadService } from "../common/utils/common.function";
type File = Express.Multer.File;
export declare class CategoryService {
    private categoryRepository;
    private fileUploadService;
    private uploadDir;
    constructor(categoryRepository: Repository<Category>, fileUploadService: FileUploadService);
    createCategory(dto: CreateCategoryDto, file?: File): Promise<Category>;
    getAllCategories(limit?: number, offset?: number): Promise<{
        categories: Category[];
        total: number;
    }>;
    getCategoryById(id: number): Promise<Category>;
    getActiveCategories(limit?: number, offset?: number): Promise<{
        categories: Category[];
        total: number;
    }>;
    updateCategory(id: number, dto: UpdateCategoryDto, file?: File): Promise<Category>;
    updateCategoryStatus(id: number, isActive: boolean): Promise<Category>;
    deleteCategory(id: number): Promise<void>;
    findOne(id: number): string;
    update(id: number, updateCategoryDto: UpdateCategoryDto): string;
    remove(id: number): string;
}
export {};
