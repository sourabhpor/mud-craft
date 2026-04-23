import { Category } from "../category/category.entity";
export declare class Product {
    id: number;
    name: string;
    description?: string;
    price: number;
    stock: number;
    imageUrl?: string[];
    isActive: boolean;
    isDeleted: boolean;
    categoryId: number;
    category: Category;
    createdAt: Date;
    updatedAt: Date;
}
