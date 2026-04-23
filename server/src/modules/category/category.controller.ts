import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Query,
} from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CreateCategoryDto, UpdateCategoryDto } from "./category.dto";
import { SuccessResponse } from "../common/utils/successResponse";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";
import { RoleType } from "../common/utils/common.enum";
import { FileInterceptor } from "@nestjs/platform-express";
import { multerOptions } from "../common/utils/multer.config";

@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN, RoleType.SUPER_ADMIN)
  @Post()
  @UseInterceptors(FileInterceptor("image", multerOptions))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    const category = await this.categoryService.createCategory(
      createCategoryDto,
      file,
    );

    return new SuccessResponse("Category added successfully", category);
  }

  @Get()
  async findAll(
    @Query("limit") limit: number,
    @Query("offset") offset: number,
  ) {
    const result = await this.categoryService.getAllCategories(
      Number(limit) || 10,
      Number(offset) || 0,
    );
    return new SuccessResponse(
      "Categories retrieved successfully",
      result.categories,
      result.total,
    );
  }

  @Get("active")
  async findActive(
    @Query("limit") limit: number,
    @Query("offset") offset: number,
  ) {
    const result = await this.categoryService.getActiveCategories(
      Number(limit) || 10,
      Number(offset) || 0,
    );
    return new SuccessResponse(
      "Active categories retrieved successfully",
      result.categories,
      result.total,
    );
  }

  @Get(":id")
  async findOne(@Param("id") id: number) {
    const category = await this.categoryService.getCategoryById(id);
    return new SuccessResponse("Category retrieved successfully", category);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN, RoleType.SUPER_ADMIN)
  @Put(":id")
  @UseInterceptors(FileInterceptor("image", multerOptions))
  async update(
    @Param("id") id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    const category = await this.categoryService.updateCategory(
      id,
      updateCategoryDto,
      file,
    );
    return new SuccessResponse("Category updated successfully", category);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN, RoleType.SUPER_ADMIN)
  @Put(":id/status")
  async updateStatus(
    @Param("id") id: number,
    @Body("isActive") isActive: boolean,
  ) {
    const category = await this.categoryService.updateCategoryStatus(
      id,
      isActive,
    );
    return new SuccessResponse(
      "Category status updated successfully",
      category,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN, RoleType.SUPER_ADMIN)
  @Delete(":id")
  async remove(@Param("id") id: number) {
    await this.categoryService.deleteCategory(id);
    return new SuccessResponse("Category deleted successfully", null);
  }
}
