# Sumário

- [Como rodar o front-end](#rodar-frontend-localmente)
- [Requisitos Frontend](#requisitos-frontend)
- [Diretorios](#estrutura-de-diretorios)

## Requisitos Frontend

### Listagem de Produtos (`/product`)

- Layout em 4 colunas na versão desktop.
- Layout responsivo: diminuir o número de colunas conforme reduz a largura da tela até chegar a 1 coluna.
- Cada produto deve ser exibido em um card.
- Link para o formulário de edição de produto, passando o ID do produto.
- Botão para remover o produto.
- Link para adicionar um novo produto, enviando para o formulário de produto (`/product/0`).
- Campo de filtro pelo nome do produto.

### Formulário de Produto (`/product/:id`)

- Permite adicionar ou atualizar um produto, conforme o ID fornecido.

> **Nota:** O frontend deve estar integrado à API (backend).

## Tecnologias

### Gerais
- Vite (https://vite.dev) com o template react-ts
- React router dom

### SASS
  - Preferencialmente, eu utilizaria Tailwind, mas o projeto é muito simplório para aprofundamentos nesse sentido. Dentre as opções, escolhi o SASS (SCSS) por me sentir mais confiante com a ferramenta.

### React Query
  - Para requests do frontend para o backend usamos ReactQuery devido a facilidade e rapidez no gerenciamento da requisicao e estados de erro.

## Estrutura de Diretorios
```
src/
├── services/         # Funções responsáveis por requisições a APIs externas
├── pages/            # Páginas da aplicação, estruturadas para uso com react-router-dom
├── config/           # Configuracao de frameworks e/ou libs de terceiros utilizados globalmente
├── components/       # Componentes reutilizáveis da interface (React)
├── types/            # Tipos e interfaces globais utilizados no front-end
```

## Rodar Frontend localmente

- Com o utilitario docker-compose instalado:
 - comando `docker-compose up` na raiz do projeto