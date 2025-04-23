# NestJS Backend - Authentication & MongoDB
 Este é o backend para a aplicação de autenticação e gerenciamento de usuários de uma centro de aulas de natação, utilizando NestJS e MongoDB.

### Tecnologias Utilizadas
* **NestJS:**  Framework para Node.js para construir APIs escaláveis e de fácil manutenção.

* **MongoDB:** Banco de dados NoSQL utilizado para armazenar informações dos usuários da piscina.

* **Prisma:** ORM utilizado para o gerenciamento de dados de usuários de login.

* **JWT:** Token para autenticação segura.

* **Passport:** Estratégia de autenticação com JWT.

* **bcryptjs:** Para hashing de senhas.

* **Joi:** Validação de dados.

* **Mongoose:** ORM para MongoDB, utilizado para gerenciar os dados dos usuários da piscina.

### Instalação
**1. Clone o repositório:**

Via https:
```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
```
Via SSH:
```
git clone git@github.com:emoises/nest-auth-prisma.git
```
```
cd nest-auth-prisma
```
**2. Instale as dependências:**
```
npm install
```
**3. Configuração do Banco de Dados**
Crie uma conta no [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database?tck=exp-815) e gere a URI de conexão.
Adicione a URI no arquivo .env:
```
MONGO_URI="mongodb+srv://usuario:senha@cluster.mongodb.net/seu-banco-de-dados"
```
**4. Configuração do Prisma (caso use Prisma para autenticação de usuários):**
Se você usa o Prisma para o gerenciamento de dados de usuários para login, certifique-se de rodar as migrações:
```
npx prisma migrate dev
```
### Scripts
**1. Executar o Servidor em Desenvolvimento**
Para rodar o servidor em modo de desenvolvimento:

```
npm run start:dev
```
**2. Executar em Produção**
Para rodar o servidor em produção:
```
npm run start:prod
```
**3. Executar Testes Unitários**
Para rodar os testes unitários:
```
npm run test
```
**4. Executar Testes E2E (End-to-End)**
Para rodar os testes de integração:

```
npm run test:e2e
```
<!-- ### Estrutura de Pastas
```
├── src
│   ├── app.module.ts
│   ├── auth/             # Lógica de autenticação (login, registro, JWT)
│   ├── config/
│   ├── pool-user/
│   ├── prisma/
│   ├── types/
│   └── validator/
│   ├── main.ts
├── test
│   ├── auth/
│   └── mocks/


src/
  ├── auth/            # Lógica de autenticação (login, registro, JWT)
  ├── pool-user/       # Gerenciamento dos usuários da piscina
  ├── common/          # Serviços e módulos compartilhados
  └── config/          # Arquivo de configuração do banco e variáveis de ambiente
test/
  ├── e2e/             # Testes de integração
  └── unit/            # Testes unitários
``` -->
### Endpoints
**1. POST /auth/login**
Realiza o login de um usuário e retorna um token JWT.

Exemplo de Request:

````json
{
  "email": "usuario@dominio.com",
  "password": "senha"
}
````

Exemplo de Response:

````json
{
  "user": {
    "id": "123",
    "email": "usuario@dominio.com"
  },
  "token": "JWT_TOKEN_AQUI"
}
````

**2. POST /auth/register**
Registra um novo usuário no sistema.

Exemplo de Request:

```json
{
  "name": "João",
  "email": "joao@dominio.com",
  "password": "senha123",
  "activityType": "Natação"
}
```
**3. GET /pool-users**
Retorna todos os usuários da piscina.

Exemplo de Response:

```json
[
  {
    "id": "123",
    "name": "João",
    "status": "Ativo",
    "activityType": "Natação",
    "daysOfActivity": ["2025-04-22T00:00:00Z"]
  }
]
```
Contribuindo
Sinta-se à vontade para abrir issues e pull requests!