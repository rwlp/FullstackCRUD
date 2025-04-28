import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { ProductEntity } from './product.entity';
import { CategoryEntity } from '../categories/category.entity';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) { }

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

  async findByName(name: string, page: number, limit: number): Promise<{ data: ProductEntity[]; total: number }> {
    const [data, total] = await this.productRepository.findAndCount({
      where: { name: ILike(`%${name}%`) }, // Usando ILike para busca case-insensitive
      take: limit, // Limita a quantidade de resultados
      skip: (page - 1) * limit, // Pula os itens da página anterior
    });

    return { data, total };
  }


  async findOne(id: string): Promise<ProductEntity | null> {
    return await this.productRepository.findOne({
      where: { id },
      relations: ['categories'], // Se quiser retornar também as categorias relacionadas
    });
  }

  async create(data: Partial<ProductEntity>): Promise<ProductEntity> {
    const product = this.productRepository.create(data); // Cria uma instância da entidade com os dados
    return await this.productRepository.save(product); // Salva o produto no banco
  }

  async update(id: string, data: Partial<ProductEntity>): Promise<void> {
    const result = await this.productRepository.update(id, data); // Atualiza o produto com base no ID
  }

  async delete(id: string): Promise<void> {
    const result = await this.productRepository.delete(id); // Exclui o produto com o ID
  }
}
