import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './modules/categories/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database/databaseConfig';
import { ProductModule } from './modules/products/product.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    CategoryModule,
    ProductModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
