import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { CategoryEntity } from './category.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('CategoryService', () => {
  let service: CategoryService;
  let repository: Repository<CategoryEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: getRepositoryToken(CategoryEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    repository = module.get<Repository<CategoryEntity>>(getRepositoryToken(CategoryEntity));
  });

  it('deve retornar todas as categorias', async () => {
    const categories = [
      new CategoryEntity(),
      new CategoryEntity(),
    ];
    jest.spyOn(repository, 'find').mockResolvedValue(categories);

    const result = await service.findAll();

    expect(result).toEqual(categories);
    expect(repository.find).toHaveBeenCalledTimes(1);
  });
});
