# Desafio:
* Faça o deploy da sua aplicação BackEnd ou FrontEnd dos desafios das monitorias passadas utilizando uma das plataformas mostradas na monitoria. Coloque o Link do Github usado no deploy, e o link da aplicação/api para testes. 




### Exemplo de deploy Backend utilizado na monitoria:
Uma API RESTful simples para gerenciamento de usuários usando Node.js, Express e MongoDB Atlas.

## 🚀 Estrutura do Projeto

```
MESSI/
├── models/
│   └── Usuario.js          # Modelo de dados do usuário
├── routes/
│   └── usuarios.js         # Rotas da API
├── server.js               # Servidor principal
├── package.json            # Dependências do projeto
├── .env                    # Variáveis de ambiente
└── README.md              # Este arquivo
```

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn
- Conta no MongoDB Atlas

## 🔧 Instalação

### 1. Clone/Baixe o projeto e instale as dependências

```bash
npm install
```

### 2. Configure o MongoDB Atlas

1. Acesse [MongoDB Atlas](https://cloud.mongodb.com/)
2. Crie uma conta gratuita
3. Crie um novo cluster
4. Configure um usuário de banco de dados
5. Obtenha a string de conexão

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
MONGODB_URI=mongodb+srv://seuusuario:suasenha@cluster0.xxxxx.mongodb.net/MessiUsers?retryWrites=true&w=majority
PORT=3000
NODE_ENV=development
```

**Substitua:**
- `seuusuario` pelo nome do usuário do MongoDB
- `suasenha` pela senha do usuário
- `cluster0.xxxxx` pelo endereço do seu cluster
- O database será **MessiUsers** e a coleção será **users**

### 4. Execute o servidor

```bash
npm start
```

Para desenvolvimento com auto-reload:

```bash
npm run dev
```

## 📡 Endpoints da API

### Status da API
- **GET /** - Verificar se a API está funcionando

### Usuários
- **POST /usuarios** - Criar novo usuário
- **GET /usuarios** - Listar todos os usuários (para testes)

## 🧪 Testando a API

Use os comandos CURL fornecidos ou ferramentas como Postman/Insomnia.

### Exemplo de requisição POST:

```json
{
  "nome": "João Silva",
  "email": "joao@exemplo.com",
  "senha": "123456"
}
```

### Exemplo de resposta de sucesso:

```json
{
  "success": true,
  "message": "Usuário criado com sucesso",
  "data": {
    "_id": "64f...",
    "nome": "João Silva",
    "email": "joao@exemplo.com",
    "createdAt": "2023-09-06T...",
    "updatedAt": "2023-09-06T...",
    "__v": 0
  }
}
```

## 🔒 Segurança

- Senhas são automaticamente criptografadas usando bcrypt
- Validação de dados de entrada
- Emails únicos no banco de dados
- Tratamento de erros adequado

## 🛠️ Funcionalidades Implementadas

- ✅ Conexão com MongoDB Atlas
- ✅ Modelo de usuário com validações
- ✅ Endpoint POST /usuarios
- ✅ Criptografia de senhas
- ✅ Validação de dados
- ✅ Tratamento de erros
- ✅ Middleware CORS
- ✅ Estrutura modular

## 📦 Dependências

- **express**: Framework web
- **mongoose**: ODM para MongoDB
- **bcryptjs**: Criptografia de senhas
- **cors**: Middleware para CORS
- **dotenv**: Gerenciamento de variáveis de ambiente
- **express-validator**: Validação de dados

## 🚧 Próximos Passos

Para um ambiente de produção, considere adicionar:
- Autenticação JWT
- Rate limiting
- Logs estruturados
- Testes unitários
- Documentação da API (Swagger)
- Validação de ambiente
