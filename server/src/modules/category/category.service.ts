import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { CreateCategoryDto, UpdateCategoryDto } from "./category.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./category.entity";
import { Repository } from "typeorm";
import { FileUploadService } from "../common/utils/common.function";
import { Express } from "express";
import * as fs from "fs";
import * as path from "path";

type File = Express.Multer.File;

@Injectable()
export class CategoryService {
  private uploadDir = path.join(process.cwd(), "public/uploads/categories");

  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    private fileUploadService: FileUploadService,
  ) {
    // Ensure upload directory exists
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  async createCategory(dto: CreateCategoryDto, file?: File) {
    try {
      let imageUrl: string | undefined;

      if (file) {
        imageUrl = this.fileUploadService.uploadFiles([file], "categories")[0];
      }

      const category = this.categoryRepository.create({
        ...dto,
        imageUrl,
      });

      await this.categoryRepository.save(category);
      return category;
    } catch (error) {
      // Rollback image upload on error
      if (file) {
        const filePath = path.join(this.uploadDir, file.filename);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
      throw error;
    }
  }

  async getAllCategories(limit: number = 10, offset: number = 0) {
    try {
      const [categories, total] = await this.categoryRepository.findAndCount({
        where: { isDeleted: false },
        order: { id: "DESC" },
        take: limit,
        skip: offset,
        select: [
          "id",
          "name",
          "imageUrl",
          "isActive",
          "createdAt",
          "updatedAt",
        ],
      });
      return { categories, total };
    } catch (error) {
      throw error;
    }
  }

  async getCategoryById(id: number) {
    try {
      const category = await this.categoryRepository.findOne({
        where: { id, isDeleted: false },
      });
      if (!category) throw new NotFoundException("Category not found");
      return category;
    } catch (error) {
      throw error;
    }
  }

  async getActiveCategories(limit: number = 10, offset: number = 0) {
    try {
      const [categories, total] = await this.categoryRepository.findAndCount({
        where: { isActive: true, isDeleted: false },
        order: { id: "DESC" },
        take: limit,
        skip: offset,
        select: [
          "id",
          "name",
          "imageUrl",
          "isActive",
          "createdAt",
          "updatedAt",
        ],
      });
      return { categories, total };
    } catch (error) {
      throw error;
    }
  }

  async updateCategory(id: number, dto: UpdateCategoryDto, file?: File) {
    try {
      const category = await this.categoryRepository.findOne({
        where: { id, isDeleted: false },
      });
      if (!category) throw new NotFoundException("Category not found");

      let newImageUrl: string | undefined;

      // If new image is uploaded
      if (file) {
        // Delete old image if exists
        if (category.imageUrl) {
          const oldImagePath = path.join(
            this.uploadDir,
            path.basename(category.imageUrl),
          );
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }

        // Set new image
        newImageUrl = this.fileUploadService.uploadFiles(
          [file],
          "categories",
        )[0];
        category.imageUrl = newImageUrl;
      }

      // Update other fields
      Object.assign(category, dto);

      await this.categoryRepository.save(category);
      return category;
    } catch (error) {
      // Rollback image upload on error
      if (file) {
        const filePath = path.join(this.uploadDir, file.filename);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
      throw error;
    }
  }

  async updateCategoryStatus(id: number, isActive: boolean) {
    try {
      const category = await this.categoryRepository.findOne({
        where: { id, isDeleted: false },
      });
      if (!category) throw new NotFoundException("Category not found");

      category.isActive = isActive;

      await this.categoryRepository.save(category);
      return category;
    } catch (error) {
      throw error;
    }
  }

  async deleteCategory(id: number) {
    try {
      const category = await this.categoryRepository.findOne({
        where: { id, isDeleted: false },
      });
      if (!category) throw new NotFoundException("Category not found");

      category.isDeleted = true;

      await this.categoryRepository.save(category);

      return;
    } catch (error) {
      throw error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
