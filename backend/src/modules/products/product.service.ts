import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { ProductEntity } from './product.entity';
import { CategoryEntity } from '../categories/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  // Usado para seed no banco de dados. Gera 100 produtos aleatorios
  async seed() {
    const categories = await this.categoryRepository.find();

    for (let i = 0; i < 100; i++) {
      const product = this.productRepository.create({
        name: `Product ${i + 1}`,
        qty: Math.floor(Math.random() * 100) + 1,
        price: parseFloat((Math.random() * 100).toFixed(2)),
        photo: 'https://picsum.photos/200',
      });

      const randomCategories = this.getRandomCategories(categories);
      product.categories = randomCategories;

      await this.productRepository.save(product);
    }

    console.log('Products seeded!');
  }

  private getRandomCategories(categories: CategoryEntity[]): CategoryEntity[] {
    const shuffled = categories.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  }

  findByName: (name: string, page: number, limit: number) => Promise<{ data: ProductEntity[]; total: number }>;

  findOne: (id: string) => Promise<ProductEntity | null>;

  create: (data: Partial<ProductEntity>) => Promise<ProductEntity>;

  update: (id: string, data: Partial<ProductEntity>) => Promise<{ affected: number }>;

  delete: (id: string) => Promise<{ affected: number }>;

}
