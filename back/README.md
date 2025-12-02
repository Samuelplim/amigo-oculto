# 🎁 Sistema de Amigo Oculto

> API REST para gerenciamento de sorteios de amigo secreto com Node.js, TypeScript, Express e PostgreSQL.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18-lightgrey.svg)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.22-2D3748.svg)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-12+-316192.svg)](https://www.postgresql.org/)

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Arquitetura](#-arquitetura)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Executando o Projeto](#-executando-o-projeto)
- [Endpoints da API](#-endpoints-da-api)
- [Estrutura do Banco de Dados](#-estrutura-do-banco-de-dados)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Exemplo de Uso](#-exemplo-de-uso)
- [Contribuindo](#-contribuindo)

## 🎯 Sobre o Projeto

O **Sistema de Amigo Oculto** é uma API RESTful completa para organizar e gerenciar sorteios de amigo secreto. O sistema permite:

- Cadastrar participantes e suas listas de presentes
- Criar grupos de sorteio
- Realizar sorteios automáticos (garantindo que ninguém tire a si mesmo)
- Consultar individualmente quem cada participante tirou
- Gerenciar múltiplos eventos simultaneamente

**Ideal para:** Eventos corporativos, festas de fim de ano, confraternizações e celebrações em grupo.

## ✨ Funcionalidades

### Gerenciamento de Participantes
- ✅ CRUD completo de participantes
- ✅ Cadastro de listas de presentes
- ✅ Vinculação a eventos específicos
- ✅ Descrição de preferências

### Grupos de Sorteio
- ✅ Criação de grupos com nome personalizado
- ✅ Adição/remoção de participantes
- ✅ Suporte a múltiplos grupos simultâneos
- ✅ Validação de mínimo de participantes

### Sistema de Sorteio
- ✅ Sorteio automático inteligente
- ✅ Garantia de que ninguém sorteia a si mesmo
- ✅ Algoritmo com múltiplas tentativas
- ✅ Sorteio único por grupo (não pode repetir)
- ✅ Consulta individual de resultados

### Lista de Presentes
- ✅ Cadastro de presentes por participante
- ✅ Nome, descrição e imagem
- ✅ Visualização da lista do amigo sorteado

## 🚀 Tecnologias

### Backend
- **[Node.js](https://nodejs.org/)** v18+ - Runtime JavaScript
- **[TypeScript](https://www.typescriptlang.org/)** v5.9 - Superset JavaScript com tipagem
- **[Express](https://expressjs.com/)** v4.18 - Framework web minimalista
- **[Prisma ORM](https://www.prisma.io/)** v5.22 - ORM moderno e type-safe

### Banco de Dados
- **[PostgreSQL](https://www.postgresql.org/)** v12+ - Banco de dados relacional

### Ferramentas de Desenvolvimento
- **ts-node-dev** - Hot reload para desenvolvimento
- **ESLint** - Linter para TypeScript
- **Prisma Studio** - Interface visual para o banco

### Segurança & Utilitários
- **Helmet** - Segurança de headers HTTP
- **CORS** - Controle de acesso cross-origin
- **bcryptjs** - Hashing de senhas
- **JWT** - Autenticação (preparado)
- **Joi** - Validação de dados (preparado)

## 🏗️ Arquitetura

O projeto segue o padrão **MVC** (Model-View-Controller) adaptado para APIs REST:

```
┌─────────────────┐
│     Cliente     │
└────────┬────────┘
         │ HTTP Request
         ▼
┌─────────────────┐
│     Routes      │ → Define endpoints
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Controllers   │ → Processa requisições
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│    Services     │ → Lógica de negócio
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Prisma ORM    │ → Acesso aos dados
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   PostgreSQL    │ → Banco de dados
└─────────────────┘
```

### Estrutura de Diretórios

```
amigo-oculto/
├── back/
│   ├── prisma/
│   │   ├── schema.prisma         # Schema do banco de dados
│   │   └── migrations/           # Histórico de migrações
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts       # Configuração Prisma Client
│   │   ├── controllers/          # Controladores das rotas
│   │   │   ├── GrupoController.ts
│   │   │   ├── ParticipanteController.ts
│   │   │   ├── PresenteController.ts
│   │   │   ├── SorteioController.ts
│   │   │   └── UsuarioController.ts
│   │   ├── models/               # Interfaces TypeScript
│   │   ├── routes/               # Definição das rotas
│   │   ├── Services/             # Lógica de negócio
│   │   ├── index.ts              # Configuração Express
│   │   └── server.ts             # Inicialização do servidor
│   ├── package.json
│   └── tsconfig.json
└── front/                        # Frontend (em desenvolvimento)
```

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** v18 ou superior ([Download](https://nodejs.org/))
- **PostgreSQL** v12 ou superior ([Download](https://www.postgresql.org/download/))
- **npm** ou **yarn** (vem com Node.js)
- **Git** ([Download](https://git-scm.com/))

### Verificar Instalação

```bash
node --version  # deve retornar v18.x.x ou superior
npm --version   # deve retornar 9.x.x ou superior
psql --version  # deve retornar PostgreSQL 12.x ou superior
```

## 📥 Instalação

### 1. Clone o Repositório

```bash
git clone https://github.com/Samuelplim/amigo-oculto.git
cd amigo-oculto
```

### 2. Instale as Dependências

```bash
cd back
npm install
```

Este comando irá instalar todas as dependências necessárias listadas no `package.json`.

## ⚙️ Configuração

### 1. Configure o Banco de Dados PostgreSQL

Crie um banco de dados no PostgreSQL:

```sql
CREATE DATABASE amigo_oculto;
```

### 2. Configure as Variáveis de Ambiente

Crie um arquivo `.env` na pasta `back/`:

```env
# Configuração do Banco de Dados
DATABASE_URL="postgresql://usuario:senha@localhost:5432/amigo_oculto?schema=public"

# Porta do Servidor
PORT=4000

# Ambiente
NODE_ENV=development
```

**Importante:** Substitua `usuario` e `senha` pelas credenciais do seu PostgreSQL.

### 3. Execute as Migrações

Crie as tabelas no banco de dados:

```bash
npx prisma migrate dev
```

### 4. Gere o Prisma Client

```bash
npx prisma generate
```

## 🎮 Executando o Projeto

### Modo Desenvolvimento

```bash
npm run dev
```

O servidor iniciará em `http://localhost:4000` com hot reload ativado.

### Modo Produção

```bash
# 1. Compile o TypeScript
npm run build

# 2. Inicie o servidor
npm start
```

### Verificar se está funcionando

```bash
curl http://localhost:4000/health
```

Resposta esperada:
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

## 📡 Endpoints da API

### Base URL
```
http://localhost:4000/api
```

### Health Check

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/health` | Verifica status do servidor |

### Participantes

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/participantes` | Lista todos os participantes |
| GET | `/api/participantes/:id` | Busca participante por ID |
| POST | `/api/participantes` | Cria novo participante |
| PUT | `/api/participantes/:id` | Atualiza participante |
| DELETE | `/api/participantes/:id` | Remove participante |
| POST | `/api/participantes/:id/presentes` | Adiciona presente ao participante |

### Grupos

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/grupos` | Lista todos os grupos |
| GET | `/api/grupos/:id` | Busca grupo por ID |
| POST | `/api/grupos` | Cria novo grupo |
| PUT | `/api/grupos/:id` | Atualiza grupo |
| DELETE | `/api/grupos/:id` | Remove grupo |
| POST | `/api/grupos/:id/participantes` | Adiciona participante ao grupo |
| DELETE | `/api/grupos/:id/participantes/:participanteId` | Remove participante do grupo |
| POST | `/api/grupos/:id/sortear` | **Realiza sorteio do grupo** |
| GET | `/api/grupos/:id/sorteio/:participanteId` | **Consulta quem o participante tirou** |

### Presentes

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/presentes` | Lista todos os presentes |
| GET | `/api/presentes/:id` | Busca presente por ID |
| POST | `/api/presentes` | Cria novo presente |
| PUT | `/api/presentes/:id` | Atualiza presente |
| DELETE | `/api/presentes/:id` | Remove presente |

### Sorteios

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/sorteios` | Lista todos os sorteios |
| GET | `/api/sorteios/:id` | Busca sorteio por ID |
| GET | `/api/sorteios/grupo/:grupoId` | Lista sorteios de um grupo |
| DELETE | `/api/sorteios/:id` | Remove sorteio |

### Usuários

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/usuarios` | Lista todos os usuários |
| GET | `/api/usuarios/:id` | Busca usuário por ID |
| POST | `/api/usuarios` | Cria novo usuário |
| PUT | `/api/usuarios/:id` | Atualiza usuário |
| DELETE | `/api/usuarios/:id` | Remove usuário |

## 🗄️ Estrutura do Banco de Dados

### Diagrama de Relacionamentos

```
┌─────────────────┐
│    usuarios     │
├─────────────────┤
│ id (PK)         │
│ nome            │
│ senha           │
└─────────────────┘

┌──────────────────────┐      ┌─────────────────┐
│   participantes      │      │   presentes     │
├──────────────────────┤      ├─────────────────┤
│ id (PK)              │──┐   │ id (PK)         │
│ nome                 │  │   │ nome            │
│ senha                │  │   │ descricao       │
│ description          │  │   │ imagem          │
│ evento               │  └──→│ participanteId  │
│ created              │      └─────────────────┘
│ updated              │
└──────────┬───────────┘
           │
           │ N:M
           │
┌──────────┴───────────┐
│ grupos_participantes │
├──────────────────────┤      ┌─────────────────┐
│ id (PK)              │      │ grupos_sorteio  │
│ grupoId (FK)         │←────→├─────────────────┤
│ participanteId (FK)  │      │ id (PK)         │
└──────────────────────┘      │ nome            │
                              │ created         │
           ┌──────────────────│ updated         │
           │                  └─────────────────┘
           │
           ▼
┌──────────────────────┐
│      sorteios        │
├──────────────────────┤
│ id (PK)              │
│ grupoId (FK)         │
│ participanteId (FK)  │
│ participanteSorteado │
│ created              │
└──────────────────────┘
```

### Modelos Principais

#### 👤 Participante
- ID único (UUID)
- Nome, senha opcional
- Descrição/preferências
- Evento que está participando
- Lista de presentes desejados

#### 👥 Grupo de Sorteio
- ID único (UUID)
- Nome do grupo
- Lista de participantes
- Sorteios realizados

#### 🎁 Presente
- ID único (UUID)
- Nome e descrição
- Imagem opcional
- Vinculado a um participante

#### 🎲 Sorteio
- ID único (UUID)
- Grupo do sorteio
- Quem sorteou
- Quem foi sorteado
- Data de criação
- **Constraint:** Um participante só pode ter um sorteio por grupo

## 📜 Scripts Disponíveis

### Desenvolvimento
```bash
npm run dev              # Inicia servidor com hot reload
npm run build            # Compila TypeScript para JavaScript
npm start                # Inicia servidor de produção
npm run lint             # Executa ESLint
```

### Prisma
```bash
npx prisma studio        # Abre interface visual do banco
npx prisma migrate dev   # Cria nova migração
npx prisma generate      # Atualiza Prisma Client
npx prisma migrate reset # Reseta banco (CUIDADO: apaga dados)
```

## 💡 Exemplo de Uso

### Fluxo Completo de Sorteio

#### 1. Criar Participantes

```bash
# Criar primeiro participante
curl -X POST http://localhost:4000/api/participantes \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "evento": "Natal 2024",
    "description": "Gosta de livros e tecnologia"
  }'

# Criar segundo participante
curl -X POST http://localhost:4000/api/participantes \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Maria Santos",
    "evento": "Natal 2024",
    "description": "Adora plantas e decoração"
  }'

# Criar terceiro participante
curl -X POST http://localhost:4000/api/participantes \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Pedro Costa",
    "evento": "Natal 2024",
    "description": "Fã de jogos e filmes"
  }'
```

#### 2. Adicionar Presentes (opcional)

```bash
# Adicionar presente para João
curl -X POST http://localhost:4000/api/participantes/{id-joao}/presentes \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Livro de programação",
    "descricao": "Qualquer livro sobre TypeScript ou Node.js",
    "imagem": "https://exemplo.com/livro.jpg"
  }'

# Adicionar presente para Maria
curl -X POST http://localhost:4000/api/participantes/{id-maria}/presentes \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Planta suculenta",
    "descricao": "Suculenta ou cacto pequeno"
  }'
```

#### 3. Criar Grupo de Sorteio

```bash
curl -X POST http://localhost:4000/api/grupos \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Amigo Oculto Empresa 2024",
    "participantesIds": [
      "{id-joao}",
      "{id-maria}",
      "{id-pedro}"
    ]
  }'
```

#### 4. Realizar Sorteio

```bash
curl -X POST http://localhost:4000/api/grupos/{id-grupo}/sortear
```

**Resposta:**
```json
{
  "id": "uuid-grupo",
  "nome": "Amigo Oculto Empresa 2024",
  "participantes": [...],
  "sorteios": [
    {
      "id": "uuid-sorteio-1",
      "participante": { "id": "uuid-joao", "nome": "João Silva" },
      "participanteSorteado": { "id": "uuid-maria", "nome": "Maria Santos" }
    },
    {
      "id": "uuid-sorteio-2",
      "participante": { "id": "uuid-maria", "nome": "Maria Santos" },
      "participanteSorteado": { "id": "uuid-pedro", "nome": "Pedro Costa" }
    },
    {
      "id": "uuid-sorteio-3",
      "participante": { "id": "uuid-pedro", "nome": "Pedro Costa" },
      "participanteSorteado": { "id": "uuid-joao", "nome": "João Silva" }
    }
  ]
}
```

#### 5. Consultar Resultado Individual

```bash
# João consulta quem ele tirou
curl http://localhost:4000/api/grupos/{id-grupo}/sorteio/{id-joao}
```

**Resposta:**
```json
{
  "id": "uuid-sorteio",
  "participanteSorteado": {
    "id": "uuid-maria",
    "nome": "Maria Santos",
    "presentes": [
      {
        "id": "uuid-presente",
        "nome": "Planta suculenta",
        "descricao": "Suculenta ou cacto pequeno",
        "imagem": null
      }
    ]
  }
}
```

## 🔒 Regras de Negócio

### Sorteio
- ✅ Mínimo de **2 participantes** por grupo
- ✅ Ninguém pode sortear **a si mesmo**
- ✅ Sorteio pode ser realizado **apenas uma vez** por grupo
- ✅ Algoritmo tenta até **100 vezes** encontrar combinação válida
- ✅ Participante só pode ver **quem ele tirou** (não vê outros sorteios)

### Participantes
- ✅ Podem participar de **múltiplos grupos**
- ✅ Senha é **opcional**
- ✅ Lista de presentes é **opcional**

### Grupos
- ✅ Podem ter **N participantes**
- ✅ Sorteio é **único** por grupo
- ✅ Exclusão do grupo **remove sorteios** em cascata

## 🛠️ Tecnologias Auxiliares

### Prisma Studio
Interface visual para gerenciar o banco de dados:

```bash
npx prisma studio
```

Abre em `http://localhost:5555`

### Testando Endpoints
Recomendamos usar:
- **[Postman](https://www.postman.com/)** - Cliente API completo
- **[Insomnia](https://insomnia.rest/)** - Cliente API minimalista
- **[Thunder Client](https://www.thunderclient.com/)** - Extensão VSCode

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

### Padrão de Commits

Seguimos o padrão [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Mudanças na documentação
- `style:` Formatação, ponto e vírgula, etc
- `refactor:` Refatoração de código
- `test:` Adição de testes
- `chore:` Tarefas de manutenção

## 📝 Próximos Passos

### Features Planejadas
- [ ] Sistema de autenticação JWT completo
- [ ] Validação de dados com Zod
- [ ] Testes unitários e de integração
- [ ] Rate limiting
- [ ] Upload de imagens para presentes
- [ ] Notificações por email
- [ ] Frontend React/Next.js
- [ ] Dashboard administrativo
- [ ] Documentação OpenAPI/Swagger

## 📄 Licença

Este projeto está sob a licença ISC.

## 👥 Autores

- **Samuel** - [@Samuelplim](https://github.com/Samuelplim)

## 📞 Contato

Para dúvidas ou sugestões, abra uma [issue](https://github.com/Samuelplim/amigo-oculto/issues) no repositório.

---

⭐ Se este projeto foi útil para você, considere dar uma estrela!

**Desenvolvido com ❤️ usando TypeScript e Node.js**
