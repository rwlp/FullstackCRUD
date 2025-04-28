import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryEntity } from './category.entity';

describe('CategoryController', () => {
  let controller: CategoryController;
  let service: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: CategoryService,
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
    service = module.get<CategoryService>(CategoryService);
  });

  it('deve listar todas as categorias', async () => {
    const categories = [new CategoryEntity()];
    (service.findAll as jest.Mock).mockResolvedValue(categories);

    const result = await controller.findAll();

    expect(result).toEqual(categories);
    expect(service.findAll).toHaveBeenCalled();
  });
});
