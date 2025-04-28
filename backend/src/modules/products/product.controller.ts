import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductEntity } from './product.entity';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

   @Get()
   async findAll(
     @Query('name') name: string,
     @Query('page') page: number,
     @Query('limit') limit: number
   ): Promise<{ products: ProductEntity[], totalItems: number, currentPage: number }> {
     return await this.productService.findByName(name, page, limit);
   }
 
   @Get(':id')
   async findOne(@Param('id') id: string): Promise<ProductEntity | null> {
     return await this.productService.findOne(id);
   }
 
   @Post()
   async create(@Body() body: Partial<ProductEntity>): Promise<ProductEntity> {
     return await this.productService.create(body);
   }
 
   @Patch(':id')
   async update(@Param('id') id: string, @Body() body: Partial<ProductEntity>): Promise<void> {
    console.log(id, body, 'os dois aqui')
     await this.productService.update(body);
   }
 
   @Delete(':id')
   async delete(@Param('id') id: string): Promise<void> {
     await this.productService.delete(id);
   }
}
