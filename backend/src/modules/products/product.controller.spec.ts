import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductEntity } from './product.entity';

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: {
            findByName: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
  });

  it('deve listar produtos com filtro de nome', async () => {
    const products = { data: [new ProductEntity()], total: 1 };
    (service.findByName as jest.Mock).mockResolvedValue(products);

    const result = await controller.findAll('test', 1, 10);

    expect(result).toEqual(products);
    expect(service.findByName).toHaveBeenCalledWith('test', 1, 10);
  });

  it('deve pegar um produto pelo id', async () => {
    const product = new ProductEntity();
    (service.findOne as jest.Mock).mockResolvedValue(product);

    const result = await controller.findOne('some-id');

    expect(result).toEqual(product);
    expect(service.findOne).toHaveBeenCalledWith('some-id');
  });

  it('deve criar um novo produto', async () => {
    const product = new ProductEntity();
    (service.create as jest.Mock).mockResolvedValue(product);

    const result = await controller.create({ name: 'Produto' });

    expect(result).toEqual(product);
    expect(service.create).toHaveBeenCalledWith({ name: 'Produto' });
  });

  it('deve atualizar um produto', async () => {
    (service.update as jest.Mock).mockResolvedValue({ affected: 1 });

    const result = await controller.update('some-id', { name: 'Novo Produto' });

    expect(service.update).toHaveBeenCalledWith('some-id', { name: 'Novo Produto' });
  });

  it('deve excluir um produto', async () => {
    (service.delete as jest.Mock).mockResolvedValue({ affected: 1 });

    const result = await controller.delete('some-id');

    expect(service.delete).toHaveBeenCalledWith('some-id');
  });
});
