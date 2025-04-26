
# Sumário

- [Backlog e Planejamento](#sprint)
- [Motivacoes tecnicas](#motivacoes-tecnicas)
- [Documentação do Backend](backend/Readme.md)
- [Documentação do Frontend](frontend/Readme.md)
- 

## Sprint

### Objetivo da Sprint
Desenvolver uma aplicação fullstack com backend em NodeJS (NestJS) e frontend em React (Vite), capaz de gerenciar produtos e categorias, atendendo às funcionalidades básicas de CRUD, filtros e responsividade.

### Definição de Pronto (DoD - Definition of Done)
- Backend com endpoints funcionais conforme especificação.
- Frontend com páginas de listagem e formulário de produto funcionando e integradas à API.
- Projeto rodando localmente com instruções claras no README.
- Código versionado no GitHub com organização adequada (pastas: backend e frontend).
- Tecnologias e frameworks usados devidamente justificados na documentação.

### Backlog

1. **Estruturar e documentar projetos (Frontend e Backend)**
   - Definir estrutura de pastas e arquivos para ambos os projetos. Documentar o setup, execução e fluxo do projeto.  
   - **Tags**: `DevOps`, `Frontend`, `Backend`

2. **Configurar Docker Compose para rodar o projeto localmente**  
   - Criar `docker-compose.yml` com frontend, backend e banco de dados. 
   - **Tags**: `DevOps`, `Documentação`

### Fase de Desenvolvimento

3. **Criar componentes e páginas no Frontend**  
   - Desenvolver componentes e páginas principais.  
   - **Tags**: `Frontend`

4. **Criar coleção no Postman para testar o backend**  
   - Criar uma coleção no Postman com os endpoints do backend, incluindo exemplos de requests e responses.  
   - **Tags**: `Backend`, `Documentação`

5. **Configurar e realizar migrations no banco de dados com dados iniciais**  
   - Configurar migrations do TypeORM e criar dados iniciais.
   - **Tags**: `Backend`

6. **Implementar a fase verde do Test-Driven Development (TDD) no Backend**  
   - Implementar testes unitários e/ou de integração.  
   - **Tags**: `Backend`

7. **Implementar requests Axios no Frontend para o Backend**  
   - Configurar Axios para consumir a API do backend.  
   - **Tags**: `Frontend`

9. **Desenvolver funcionalidades no Backend**
   - Criar endpoints e lógica de negócios no backend.  
   - **Tags**: `Backend`,

### Fase Final

10. **Finalizar o projeto (refatoração e deploy)**  
    - Refatorar código, corrigir bugs, otimizar desempenho e preparar para deploy.  
    - **Tags**: `DevOps`, `Frontend`, `Backend`, `Documentação`

## Motivacoes tecnicas

- As tecnologias nao citadas estao de acordo com o que foi pedido no teste diretamente.

### Banco de dados: 
  - Escolhi PostgreSQL devido ao seu excelente suporte para concorrência e paralelismo, futuras necessidades escalabilidade e robustez.
    Embora para o escopo do teste, tanto o MySQL quanto o SQLite3 poderiam ser escolhidos,a implementação seria praticamente a mesma, já que o código não depende de recursos específicos dessas tecnologias. 

### ORM
  - Escolhi o TypeORM por sua flexibilidade maior clareze e customização no gerenciamento das entidades e operações de banco. 
  O Prisma também atende às necessidades do projeto mas em um ambiente de time, a curva de aprendizado pode impactar a produtividade de novos integrantes e/ou em fases iniciais do projeto.

### Docker
  - Escolhi o docker + docker-compose  para simular uma visão mais próxima do que seria um processo de deploy em produção.
  Mencionando tambem que isso facilita a execução do projeto localmente e permite uma configuração clara e reutilizável,
  ideal para replicação em diferentes ambientes.

### SASS
  - Preferencialmente, eu utilizaria Tailwind, mas o projeto é muito simplório para aprofundamentos nesse sentido. Dentre as opções, escolhi o SASS (SCSS) por me sentir mais confiante com a ferramenta.

### Axios
  - Para requests do frontend para o backend usamos o `axios`, devido a simplicidade de sintaxe, melhor tratamento de erros em comparacao com o `fetch` e facilidade de configuracao de headers agilizado a integração com APIs RESTful.


## Convenção de Mensagens de Commit

- **`feat`**: Nova funcionalidade
  
- **`fix`**: Correção de bug

- **`docs`**: Alteração em documentação

- **`refactor`**: Refatoração de código (sem alteração de comportamento)

- **`test`**: Adição ou ajuste de testes

- **`chore`**: Tarefas que não afetam o código em produção (ex: configs, build)