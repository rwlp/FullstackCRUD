import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/modules/categories/category.entity';
import { ProductEntity } from 'src/modules/products/product.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'db', // use 'localhost' quando nao estiver usando docker-compose para rodar o projeto
  port: 5432, // Em ambiente real esses dados estariam como variaveis de ambiente mas nao faz diferenca para o teste
  username: 'user',
  password: 'password',
  database: 'database',
  entities: [CategoryEntity, ProductEntity],
  synchronize: false, // Desativar em producao para nao sobreescrever dados.
  logging: true,
};

