"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const product_entity_1 = require("./product.entity");
const typeorm_2 = require("typeorm");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const common_function_1 = require("../common/utils/common.function");
let ProductService = class ProductService {
    constructor(productRepository, fileUploadService) {
        this.productRepository = productRepository;
        this.fileUploadService = fileUploadService;
        this.uploadDir = path.join(process.cwd(), "public/uploads/products");
        if (!fs.existsSync(this.uploadDir)) {
            fs.mkdirSync(this.uploadDir, { recursive: true });
        }
    }
    async createProduct(dto, files) {
        try {
            let imageUrls = [];
            if (files && files.length > 0) {
                imageUrls = this.fileUploadService.uploadFiles(files, "products");
            }
            const product = this.productRepository.create({
                ...dto,
                imageUrl: imageUrls,
            });
            await this.productRepository.save(product);
            return product;
        }
        catch (error) {
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
    async getAllProducts(limit = 10, offset = 0) {
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
        }
        catch (error) {
            throw error;
        }
    }
    async getProductById(id) {
        try {
            const product = await this.productRepository.findOne({ where: { id } });
            if (!product)
                throw new common_1.NotFoundException("Product not found");
            return product;
        }
        catch (error) {
            throw error;
        }
    }
    async updateProduct(id, dto, files) {
        try {
            const product = await this.productRepository.findOne({ where: { id } });
            if (!product)
                throw new common_1.NotFoundException("Product not found");
            let newImageUrls = [];
            if (files && files.length > 0) {
                if (product.imageUrl && product.imageUrl.length > 0) {
                    product.imageUrl.forEach((img) => {
                        const oldImagePath = path.join(this.uploadDir, path.basename(img));
                        if (fs.existsSync(oldImagePath)) {
                            fs.unlinkSync(oldImagePath);
                        }
                    });
                }
                newImageUrls = files.map((file) => `/uploads/products/${file.filename}`);
                product.imageUrl = newImageUrls;
            }
            Object.assign(product, dto);
            await this.productRepository.save(product);
            return product;
        }
        catch (error) {
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
    async updateStatus(id, isActive) {
        try {
            const product = await this.productRepository.findOne({ where: { id } });
            if (!product)
                throw new common_1.NotFoundException("Product not found");
            product.isActive = isActive;
            await this.productRepository.save(product);
            return product;
        }
        catch (error) {
            throw error;
        }
    }
    async getActiveProducts(limit = 10, offset = 0) {
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
        }
        catch (error) {
            throw error;
        }
    }
    async deleteProduct(id) {
        try {
            const product = await this.productRepository.findOne({
                where: { id: id, isDeleted: false },
            });
            if (!product)
                throw new common_1.NotFoundException("Product not found");
            product.isDeleted = true;
            await this.productRepository.save(product);
            return;
        }
        catch (error) {
            throw error;
        }
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        common_function_1.FileUploadService])
], ProductService);
//# sourceMappingURL=product.service.js.map