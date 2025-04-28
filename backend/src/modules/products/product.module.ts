import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { CategoryEntity } from '../categories/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity, CategoryEntity]),
  ],
  providers: [
    ProductService,
  ],
  controllers: [ProductController],
})
export class ProductModule {}