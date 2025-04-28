import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductEntity } from './product.entity';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  findAll: (name: string, page: number, limit: number) => Promise<{ data: ProductEntity[]; total: number }>;

  findOne: (id: string) => Promise<ProductEntity | null>;

  create: (body: Partial<ProductEntity>) => Promise<ProductEntity>;

  update: (id: string, body: Partial<ProductEntity>) => Promise<{ affected: number }>;

  delete: (id: string) => Promise<{ affected: number }>;
}
