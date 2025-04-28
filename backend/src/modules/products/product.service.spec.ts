import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { ProductEntity } from './product.entity';
import { CategoryEntity } from '../categories/category.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('ProductService', () => {
  let service: ProductService;
  let productRepository: Repository<ProductEntity>;
  let categoryRepository: Repository<CategoryEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(ProductEntity),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(CategoryEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    productRepository = module.get<Repository<ProductEntity>>(getRepositoryToken(ProductEntity));
    categoryRepository = module.get<Repository<CategoryEntity>>(getRepositoryToken(CategoryEntity));
  });

  it('deve listar produtos com filtro de nome paginado', async () => {
    const products = [new ProductEntity()];
    const name = 'produto';
    const page = 1;
    const limit = 10;

    jest.spyOn(productRepository, 'findAndCount').mockResolvedValue([products, 1]);

    const result = await service.findByName(name, page, limit);

    expect(result.data).toEqual(products);
    expect(result.total).toEqual(1);
    expect(productRepository.findAndCount).toHaveBeenCalled();
  });

  it('deve pegar um produto pelo id', async () => {
    const product = new ProductEntity();
    jest.spyOn(productRepository, 'findOneBy').mockResolvedValue(product);

    const result = await service.findOne('some-id');

    expect(result).toEqual(product);
    expect(productRepository.findOneBy).toHaveBeenCalledWith({ id: 'some-id' });
  });

  it('deve criar um novo produto', async () => {
    const product = new ProductEntity();
    jest.spyOn(productRepository, 'save').mockResolvedValue(product);

    const result = await service.create(product);

    expect(result).toEqual(product);
    expect(productRepository.save).toHaveBeenCalledWith(product);
  });

  it('deve atualizar um produto', async () => {
    const product = new ProductEntity();
    jest.spyOn(productRepository, 'update').mockResolvedValue({ affected: 1 } as any);

    const result = await service.update('some-id', { name: 'novo nome' });

    expect(result.affected).toEqual(1);
    expect(productRepository.update).toHaveBeenCalledWith('some-id', { name: 'novo nome' });
  });

  it('deve excluir um produto', async () => {
    jest.spyOn(productRepository, 'delete').mockResolvedValue({ affected: 1 } as any);

    const result = await service.delete('some-id');

    expect(result.affected).toEqual(1);
    expect(productRepository.delete).toHaveBeenCalledWith('some-id');
  });
});
