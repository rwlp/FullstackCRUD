
# Sumário

- [Requisitos Backend](#requisitos-backend)
- [Tecnologias](#tecnologias)
- [Como rodar o front-end](#rodar-backend-localmente)

## Requisitos Backend

### Categoria
`Categoria` (id: string, parent: Category|null, name: string)
- `GET /category` — Listar todas as categorias de produtos.
  - Obs.: Adicione as categorias diretamente no banco de dados.

### Produto
`Produto` (id: string, categories: Category[], name: string, qty: number, price: number, photo: string)
- `GET /product` — Listar todos os produtos com um filtro por nome.
- `GET /product/:id` — Buscar um produto específico.
- `POST /product` — Criar um produto novo.
- `PATCH /product/:id` — Atualizar um produto existente.

## Tecnologias

## Gerais
- NodeJS_20 + NestJS (https://nestjs.com)

### Banco de dados: 
  - Escolhi PostgreSQL devido ao seu suporte para concorrência e paralelismo, escalabilidade e robustez(Na pratica geralmente mais caro)
    Para o escopo do teste, tanto o MySQL quanto o SQLite3 poderiam ser escolhidos, a implementação seria praticamente a mesma, já que o código não depende de recursos específicos dessas tecnologias.

### ORM
  - Escolhi o TypeORM por sua flexibilidade maior clareza e customização no gerenciamento das entidades e operações de banco. 
  O Prisma também atende às necessidades do projeto mas em um ambiente de time, a curva de aprendizado pode impactar a produtividade de novos integrantes e/ou em fases iniciais do projeto.

### Docker
  - Escolhi o docker + docker-compose  para simular uma visão mais próxima do que seria um processo de deploy em produção.
  Mencionando tambem que isso facilita a execução do projeto localmente e permite uma configuração clara e reutilizável,
  ideal para replicação em diferentes ambientes.


## Estrutura de Diretorios 

```src/
├── modules/           # Módulos da aplicação, organizados por domínio
│   ├── moduleName/
│   │   ├── moduleName.entity.ts        # Entidade que representa a tabela no banco de dados
│   │   ├── moduleName.service.ts       # Lógica de negócio do módulo
│   │   ├── moduleName.controller.ts    # Controlador que expõe as rotas HTTP
│   │   ├── moduleName.repository.ts    # Camada de acesso ao banco de dados
│   │   └── moduleName.module.ts        # Definição e injeção de dependências do módulo
├── shared/            # Recursos compartilhados entre os módulos (middlewares, guards, pipes, interceptors, decorators)
├── database/          # Configurações de conexão, entidades globais e migrations do banco de dados
├── config/            # Configurações da aplicação (ex: variáveis de ambiente, settings globais)
├── app.module.ts      # Módulo raiz que integra todos os módulos
├── main.ts            # Ponto de entrada da aplicação NestJS
```

## Rodar Backend localmente 
  - Com o utilitario docker-compose instalado: comando `docker-compose up` na raiz do projeto