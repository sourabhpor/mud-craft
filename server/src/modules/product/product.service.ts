import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./product.entity";
import { Repository } from "typeorm";
import { CreateProductDto, UpdateProductDto } from "./product.dto";
import * as fs from "fs";
import * as path from "path";
import { Express } from "express";
import { FileUploadService } from "../common/utils/common.function";
import multer from "multer";

export type MulterFile = Express.Multer.File;

@Injectable()
export class ProductService {
  private uploadDir = path.join(process.cwd(), "public/uploads/products");

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private fileUploadService: FileUploadService,
  ) {
    // Ensure upload directory exists
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  async createProduct(dto: CreateProductDto, files?: MulterFile[]) {
    try {
      let imageUrls: string[] = [];

      if (files && files.length > 0) {
        imageUrls = this.fileUploadService.uploadFiles(files, "products");
      }

      const product = this.productRepository.create({
        ...dto,
        imageUrl: imageUrls, // 👈 array store karo
      });

      await this.productRepository.save(product);
      return product;
    } catch (error) {
      // ❌ rollback images
      if (files) {
        files.forEach((file) => {
          const filePath = path.join(this.uploadDir, file.filename);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        });
      }
      throw error;
    }
  }

  async getAllProducts(limit: number = 10, offset: number = 0) {
    try {
      const [products, total] = await this.productRepository.findAndCount({
        where: { isDeleted: false },
        order: { id: "DESC" },
        take: limit,
        skip: offset,
        select: [
          "id",
          "name",
          "description",
          "price",
          "stock",
          "imageUrl",
          "isActive",
          "createdAt",
          "updatedAt",
        ],
      });
      return { products, total };
    } catch (error) {
      throw error;
    }
  }

  async getProductById(id: number) {
    try {
      const product = await this.productRepository.findOne({ where: { id } });
      if (!product) throw new NotFoundException("Product not found");
      return product;
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(id: number, dto: UpdateProductDto, files?: MulterFile[]) {
    try {
      const product = await this.productRepository.findOne({ where: { id } });
      if (!product) throw new NotFoundException("Product not found");

      let newImageUrls: string[] = [];

      // 👉 agar new images aayi hain
      if (files && files.length > 0) {
        // ❌ purani images delete karo
        if (product.imageUrl && product.imageUrl.length > 0) {
          product.imageUrl.forEach((img) => {
            const oldImagePath = path.join(this.uploadDir, path.basename(img));
            if (fs.existsSync(oldImagePath)) {
              fs.unlinkSync(oldImagePath);
            }
          });
        }

        // ✅ new images set karo
        newImageUrls = files.map(
          (file) => `/uploads/products/${file.filename}`,
        );

        product.imageUrl = newImageUrls;
      }

      // 👉 other fields update
      Object.assign(product, dto);

      await this.productRepository.save(product);
      return product;
    } catch (error) {
      // ❌ rollback (new uploaded files delete)
      if (files && files.length > 0) {
        files.forEach((file) => {
          const filePath = path.join(this.uploadDir, file.filename);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        });
      }
      throw error;
    }
  }

  async updateStatus(id: number, isActive: boolean) {
    try {
      const product = await this.productRepository.findOne({ where: { id } });
      if (!product) throw new NotFoundException("Product not found");

      product.isActive = isActive;

      await this.productRepository.save(product);
      return product;
    } catch (error) {
      throw error;
    }
  }

  async getActiveProducts(limit: number = 10, offset: number = 0) {
    try {
      const [products, total] = await this.productRepository.findAndCount({
        where: { isActive: true, isDeleted: false },
        order: { id: "DESC" },
        take: limit,
        skip: offset,
        select: [
          "id",
          "name",
          "description",
          "price",
          "stock",
          "imageUrl",
          "isActive",
          "createdAt",
          "updatedAt",
        ],
      });
      return { products, total };
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(id: number) {
    try {
      const product = await this.productRepository.findOne({
        where: { id: id, isDeleted: false },
      });
      if (!product) throw new NotFoundException("Product not found");

      product.isDeleted = true;

      await this.productRepository.save(product);

      return;
    } catch (error) {
      throw error;
    }
  }
}
