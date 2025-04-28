import { IsString, IsInt, IsPositive, IsArray, IsOptional, IsUUID, ArrayMaxSize } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsInt()
  @IsPositive()
  qty: number;

  @IsInt()
  @IsPositive()
  price: number;

  @IsString()
  photo: string;

  @IsArray()
  @IsUUID('4', { each: true })
  @ArrayMaxSize(3)
  @Type(() => String)
  categories: string[];
}

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  qty?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  price?: number;

  @IsOptional()
  @IsString()
  photo?: string;

  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  @ArrayMaxSize(3)
  @Type(() => String)
  categories?: string[];
}