import {
  Controller,
  Post,
  Put,
  Body,
  Get,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Query,
} from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import * as multer from "multer";
import { multerOptions } from "../common/utils/multer.config";
import { ProductService } from "./product.service";
import { CreateProductDto, UpdateProductDto } from "./product.dto";
import { SuccessResponse } from "../common/utils/successResponse";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { RolesGuard } from "../common/guards/role.guard";
import { RoleType } from "src/modules/common/utils/common.enum";
import { Roles } from "src/middleware/decorators/roles.decorator";

@Controller("products")
export class ProductController {
  constructor(private productService: ProductService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN, RoleType.SUPER_ADMIN)
  @Post()
  @UseInterceptors(FilesInterceptor("images", 5, multerOptions)) // max 5 images
  async create(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() dto: CreateProductDto,
  ) {
    const product = await this.productService.createProduct(dto, files);
    return new SuccessResponse("Product created successfully", product);
  }

  @Get()
  async findAll(
    @Query("limit") limit: number,
    @Query("offset") offset: number,
  ) {
    const result = await this.productService.getAllProducts(
      Number(limit) || 10,
      Number(offset) || 0,
    );
    return new SuccessResponse(
      "Products retrieved successfully",
      result.products,
      result.total,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN, RoleType.SUPER_ADMIN)
  @Put(":id")
  @UseInterceptors(FilesInterceptor("images", 5, multerOptions))
  async update(
    @Param("id") id: number,
    @UploadedFiles() files: Express.Multer.File[],
    @Body() dto: UpdateProductDto,
  ) {
    const product = await this.productService.updateProduct(id, dto, files);
    return new SuccessResponse("Product updated successfully", product);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN, RoleType.SUPER_ADMIN)
  @Put(":id/status")
  async updateStatus(
    @Param("id") id: number,
    @Body("isActive") isActive: boolean,
  ) {
    const product = await this.productService.updateStatus(id, isActive);
    return new SuccessResponse("Product status updated successfully", product);
  }

  @Get("active")
  async findActive(
    @Query("limit") limit: number,
    @Query("offset") offset: number,
  ) {
    const result = await this.productService.getActiveProducts(
      Number(limit) || 10,
      Number(offset) || 0,
    );
    return new SuccessResponse(
      "Active products retrieved successfully",
      result.products,
      result.total,
    );
  }

  @Get(":id")
  async findOne(@Param("id") id: number) {
    const product = await this.productService.getProductById(id);
    return new SuccessResponse("Product retrieved successfully", product);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN, RoleType.SUPER_ADMIN)
  @Delete(":id")
  async delete(@Param("id") id: number) {
    await this.productService.deleteProduct(id);
    return new SuccessResponse("Product deleted successfully", null);
  }
}
