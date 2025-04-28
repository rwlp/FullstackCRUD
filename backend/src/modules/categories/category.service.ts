import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CategoryEntity } from './category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  findAll: () => Promise<void>;

  // Script usado para seed no banco de dados.
  async seed() {
    const categories = [
      { name: 'Electronics' },
      { name: 'Books' },
      { name: 'Clothing' },
      { name: 'Sports' },
      { name: 'Home Appliances' },
      { name: 'Toys' },
      { name: 'Furniture' },
      { name: 'Automotive' },
      { name: 'Food' },
      { name: 'Beauty' },
    ];

    for (const category of categories) {
      const existingCategory = await this.categoryRepository.findOne({
        where: { name: category.name },
      });
      if (!existingCategory) {
        await this.categoryRepository.save(category);
      }
    }

    console.log('Categories seeded!');
  }  
}
