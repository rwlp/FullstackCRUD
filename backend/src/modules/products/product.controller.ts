import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductEntity } from './product.entity';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

   // Buscar produtos por nome com paginação
   @Get()
   async findAll(
     @Query('name') name: string,  // Parametro de busca por nome
     @Query('page') page: number,  // Parametro de página
     @Query('limit') limit: number // Parametro de limite de resultados por página
   ): Promise<{ data: ProductEntity[]; total: number }> {
     return await this.productService.findByName(name, page, limit);
   }
 
   // Buscar um único produto por ID
   @Get(':id')
   async findOne(@Param('id') id: string): Promise<ProductEntity | null> {
     return await this.productService.findOne(id);
   }
 
   // Criar um novo produto
   @Post()
   async create(@Body() body: Partial<ProductEntity>): Promise<ProductEntity> {
     return await this.productService.create(body);
   }
 
   // Atualizar um produto existente
   @Patch(':id')
   async update(@Param('id') id: string, @Body() body: Partial<ProductEntity>): Promise<void> {
     await this.productService.update(id, body);
   }
 
   // Excluir um produto
   @Delete(':id')
   async delete(@Param('id') id: string): Promise<void> {
     await this.productService.delete(id);
   }
}
