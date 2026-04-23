import { Product } from "../product/product.entity";
export declare class Category {
    id: number;
    name: string;
    imageUrl?: string;
    isActive: boolean;
    isDeleted: boolean;
    products: Product[];
    createdAt: Date;
    updatedAt: Date;
}
