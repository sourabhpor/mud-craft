import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsBoolean,
  IsPositive,
} from "class-validator";
import { Transform } from "class-transformer";

export class CreateProductDto {
  @IsNotEmpty({ message: "Product name is required" })
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty({ message: "Price is required" })
  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => parseFloat(value))
  price!: number;

  @IsNotEmpty({ message: "Stock is required" })
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  stock!: number;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => parseFloat(value))
  price?: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  stock?: number;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === "true" || value === true)
  isActive?: boolean;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
