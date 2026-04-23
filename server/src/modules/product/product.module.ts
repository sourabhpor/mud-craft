import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./product.entity";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { FileUploadService } from "../common/utils/common.function";

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductService, FileUploadService],
  controllers: [ProductController],
})
export class ProductModule {}
