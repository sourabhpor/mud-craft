import { CategoryService } from "./category.service";
import { CreateCategoryDto, UpdateCategoryDto } from "./category.dto";
import { SuccessResponse } from "../common/utils/successResponse";
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    create(file: Express.Multer.File, createCategoryDto: CreateCategoryDto): Promise<SuccessResponse>;
    findAll(limit: number, offset: number): Promise<SuccessResponse>;
    findActive(limit: number, offset: number): Promise<SuccessResponse>;
    findOne(id: number): Promise<SuccessResponse>;
    update(id: number, file: Express.Multer.File, updateCategoryDto: UpdateCategoryDto): Promise<SuccessResponse>;
    updateStatus(id: number, isActive: boolean): Promise<SuccessResponse>;
    remove(id: number): Promise<SuccessResponse>;
}
