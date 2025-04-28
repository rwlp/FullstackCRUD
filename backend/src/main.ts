import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './config/exceptions/http-exception.filter';
import { CategoryEntity } from './modules/categories/category.entity';
import { ProductService } from './modules/products/product.service';
import { CategoryService } from './modules/categories/category.service';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  await app.init();

  
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }))

  app.useGlobalFilters(new HttpExceptionFilter())

  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
