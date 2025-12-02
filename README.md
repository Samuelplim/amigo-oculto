# 🎁 Sistema de Amigo Oculto

Sistema completo para gerenciamento de sorteios de amigo oculto, desenvolvido com Node.js, TypeScript, Express e PostgreSQL.

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Tecnologias](#-tecnologias)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Funcionalidades](#-funcionalidades)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Uso](#-uso)
- [API Endpoints](#-api-endpoints)
- [Banco de Dados](#-banco-de-dados)
- [Licença](#-licença)

## 🎯 Sobre o Projeto

O Sistema de Amigo Oculto é uma aplicação web que facilita a organização de sorteios de amigo secreto. Permite criar grupos, adicionar participantes, cadastrar listas de presentes e realizar sorteios de forma automática e justa.

### Características Principais

- ✅ Gerenciamento de participantes
- ✅ Criação de grupos de sorteio
- ✅ Sistema de sorteio automático (garante que ninguém tire a si mesmo)
- ✅ Lista de presentes por participante
- ✅ Consulta individual do sorteio
- ✅ Histórico de sorteios realizados

## 🚀 Tecnologias

### Backend

- **Node.js** - Ambiente de execução JavaScript
- **TypeScript** - Superset JavaScript com tipagem estática
- **Express** - Framework web minimalista
- **Prisma ORM** - ORM moderno para Node.js e TypeScript
- **PostgreSQL** - Banco de dados relacional
- **ts-node-dev** - Desenvolvimento com hot reload

### Ferramentas

- **ESLint** - Linter para código TypeScript
- **Knex.js** - Query builder SQL
- **UUID** - Gerador de identificadores únicos
- **bcryptjs** - Hashing de senhas
- **jsonwebtoken** - Autenticação JWT
- **Helmet** - Segurança HTTP
- **CORS** - Controle de acesso HTTP

## 📁 Estrutura do Projeto

```
amigo-oculto/
├── back/                           # Backend da aplicação
│   ├── prisma/                     # Configurações do Prisma
│   │   ├── schema.prisma          # Schema do banco de dados
│   │   └── migrations/            # Histórico de migrações
│   ├── src/
│   │   ├── config/                # Configurações
│   │   │   └── database.ts        # Configuração do Prisma Client
│   │   ├── controllers/           # Controladores das rotas
│   │   │   ├── GrupoController.ts
│   │   │   ├── ParticipanteController.ts
│   │   │   ├── PresenteController.ts
│   │   │   ├── SorteioController.ts
│   │   │   └── UsuarioController.ts
│   │   ├── models/                # Modelos de dados (interfaces)
│   │   │   ├── GrupoSorteio.ts
│   │   │   ├── Participante.ts
│   │   │   ├── Presente.ts
│   │   │   ├── Sorteio.ts
│   │   │   └── Usuario.ts
│   │   ├── routes/                # Definição das rotas
│   │   │   ├── grupoRoutes.ts
│   │   │   ├── participanteRoutes.ts
│   │   │   ├── presenteRoutes.ts
│   │   │   ├── sorteioRoutes.ts
│   │   │   └── usuarioRoutes.ts
│   │   ├── Services/              # Serviços de negócio
│   │   │   └── AlocacaoService.ts
│   │   ├── index.ts               # Configuração do Express
│   │   └── server.ts              # Inicialização do servidor
│   ├── package.json
│   └── tsconfig.json
│
└── front/                          # Frontend (em desenvolvimento)
    └── package.json
```

## ⚙️ Funcionalidades

### Gerenciamento de Participantes

- Cadastro de participantes com nome, senha e descrição
- Vinculação a eventos específicos
- Associação de listas de presentes
- Consulta de participantes por ID ou listagem completa

### Grupos de Sorteio

- Criação de grupos com nome personalizado
- Adição e remoção de participantes
- Realização automática de sorteios
- Consulta de sorteios realizados

### Sistema de Sorteio

- Algoritmo inteligente que garante:
  - Ninguém sorteia a si mesmo
  - Distribuição justa entre participantes
  - Tentativas múltiplas para encontrar combinação válida
- Persistência dos resultados no banco de dados

### Lista de Presentes

- Cadastro de presentes por participante
- Inclusão de nome, descrição e imagem
- Visualização da lista do amigo sorteado

## 📥 Instalação

### Pré-requisitos

- Node.js (v18 ou superior)
- PostgreSQL (v12 ou superior)
- npm ou yarn

### Passo a Passo

1. **Clone o repositório**

```bash
git clone <url-do-repositorio>
cd amigo-oculto
```

2. **Instale as dependências do backend**

```bash
cd back
npm install
```

3. **Configure as variáveis de ambiente**

Crie um arquivo `.env` na pasta `back`:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/amigo_oculto?schema=public"
PORT=4000
```

4. **Execute as migrações do banco de dados**

```bash
npx prisma migrate dev
```

5. **Gere o Prisma Client**

```bash
npx prisma generate
```

## 🎮 Uso

### Modo Desenvolvimento

```bash
npm run dev
```

O servidor estará disponível em `http://localhost:4000`

### Modo Produção

```bash
npm run build
npm start
```

### Scripts Disponíveis

- `npm run dev` - Inicia o servidor em modo desenvolvimento com hot reload
- `npm run build` - Compila o TypeScript para JavaScript
- `npm start` - Inicia o servidor em modo produção
- `npm run lint` - Executa o ESLint
- `npx prisma studio` - Abre interface visual do banco de dados

## 🔌 API Endpoints

### Health Check

```http
GET /health
```

Retorna o status do servidor.

### Participantes

```http
GET    /api/participantes              # Lista todos os participantes
GET    /api/participantes/:id          # Busca participante por ID
POST   /api/participantes              # Cria novo participante
PUT    /api/participantes/:id          # Atualiza participante
DELETE /api/participantes/:id          # Remove participante
POST   /api/participantes/:id/presentes # Adiciona presente ao participante
```

**Exemplo de criação de participante:**

```json
POST /api/participantes
{
  "nome": "João Silva",
  "senha": "senha123",
  "description": "Gosta de livros e filmes",
  "evento": "Amigo Oculto Natal 2024"
}
```

### Grupos

```http
GET    /api/grupos                           # Lista todos os grupos
GET    /api/grupos/:id                       # Busca grupo por ID
POST   /api/grupos                           # Cria novo grupo
PUT    /api/grupos/:id                       # Atualiza grupo
DELETE /api/grupos/:id                       # Remove grupo
POST   /api/grupos/:id/participantes         # Adiciona participante ao grupo
DELETE /api/grupos/:id/participantes/:participanteId # Remove participante do grupo
POST   /api/grupos/:id/sortear               # Realiza sorteio do grupo
GET    /api/grupos/:id/sorteio/:participanteId # Consulta quem o participante tirou
```

**Exemplo de criação de grupo:**

```json
POST /api/grupos
{
  "nome": "Amigos da Empresa",
  "participantesIds": [
    "uuid-participante-1",
    "uuid-participante-2",
    "uuid-participante-3"
  ]
}
```

**Exemplo de sorteio:**

```json
POST /api/grupos/:id/sortear
```

### Presentes

```http
GET    /api/presentes              # Lista todos os presentes
GET    /api/presentes/:id          # Busca presente por ID
POST   /api/presentes              # Cria novo presente
PUT    /api/presentes/:id          # Atualiza presente
DELETE /api/presentes/:id          # Remove presente
```

**Exemplo de criação de presente:**

```json
POST /api/presentes
{
  "nome": "Livro de ficção científica",
  "descricao": "Qualquer livro de Isaac Asimov",
  "imagem": "https://exemplo.com/imagem.jpg",
  "participanteId": "uuid-do-participante"
}
```

### Sorteios

```http
GET    /api/sorteios                # Lista todos os sorteios
GET    /api/sorteios/:id            # Busca sorteio por ID
POST   /api/sorteios                # Cria novo sorteio manual
DELETE /api/sorteios/:id            # Remove sorteio
GET    /api/sorteios/grupo/:grupoId # Lista sorteios de um grupo
```

### Usuários

```http
GET    /api/usuarios              # Lista todos os usuários
GET    /api/usuarios/:id          # Busca usuário por ID
POST   /api/usuarios              # Cria novo usuário
PUT    /api/usuarios/:id          # Atualiza usuário
DELETE /api/usuarios/:id          # Remove usuário
```

## 🗄️ Banco de Dados

### Modelo de Dados

O sistema utiliza 6 tabelas principais:

#### usuarios
- Sistema de autenticação básico
- Armazena credenciais de acesso

#### participantes
- Pessoas que participam dos sorteios
- Contém informações pessoais e preferências
- Relacionamento com presentes e sorteios

#### grupos_sorteio
- Agrupa participantes para sorteios
- Permite múltiplos sorteios independentes

#### grupos_participantes
- Tabela de relacionamento N:N
- Vincula participantes aos grupos

#### presentes
- Lista de desejos de cada participante
- Inclui nome, descrição e imagem

#### sorteios
- Registra quem tirou quem em cada grupo
- Garante unicidade por grupo/participante

### Diagrama de Relacionamentos

```
usuarios (1:N) -> [não implementado ainda]

participantes (1:N) -> presentes
participantes (N:M) -> grupos_sorteio (através de grupos_participantes)
participantes (1:N) -> sorteios (como sorteador)
participantes (1:N) -> sorteios (como sorteado)

grupos_sorteio (1:N) -> sorteios
```

### Prisma Studio

Para visualizar e editar dados graficamente:

```bash
npx prisma studio
```

Abre uma interface web em `http://localhost:5555`

## 🛡️ Segurança

O projeto implementa:

- ✅ Helmet para headers HTTP seguros
- ✅ CORS configurado
- ✅ Suporte para hashing de senhas (bcryptjs)
- ✅ Estrutura preparada para JWT
- ✅ Validação de dados com Joi

## 🔄 Fluxo de Uso Típico

1. **Criar participantes**
   - Cadastrar todos que vão participar do sorteio

2. **Adicionar presentes (opcional)**
   - Cada participante pode cadastrar sua lista de desejos

3. **Criar grupo de sorteio**
   - Definir nome e adicionar participantes

4. **Realizar sorteio**
   - Sistema sorteia automaticamente

5. **Consultar resultado**
   - Cada participante consulta individualmente quem tirou

## 🧪 Testes

Para testar a conexão com o banco de dados:

```bash
ts-node src/test-database.ts
```

## 📝 Configuração do Prisma

Após alterações no schema:

```bash
# Criar nova migração
npx prisma migrate dev --name nome_da_migracao

# Aplicar migrações
npx prisma migrate deploy

# Atualizar o cliente
npx prisma generate
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC.

## 👥 Autores

- Desenvolvido para gerenciamento de sorteios de amigo oculto

## 📧 Contato

Para dúvidas ou sugestões, abra uma issue no repositório.

---

⭐ Se este projeto foi útil para você, considere dar uma estrela!
