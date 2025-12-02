# Integração PostgreSQL com Prisma - Amigo Oculto

## ✅ Configuração Concluída

A integração do PostgreSQL com o backend TypeScript foi realizada com sucesso usando o Prisma ORM.

## 📦 O que foi instalado

- **prisma**: CLI e ferramentas de desenvolvimento
- **@prisma/client**: Cliente para acesso ao banco de dados

## 🗄️ Estrutura do Banco de Dados

As seguintes tabelas foram criadas:

### 1. **usuarios**

- `id` (INT, autoincrement)
- `nome` (STRING)
- `senha` (STRING)

### 2. **participantes**

- `id` (UUID)
- `nome` (STRING)
- `senha` (STRING, opcional)
- `description` (STRING, opcional)
- `evento` (STRING)
- `created` (DATETIME)
- `updated` (DATETIME)

### 3. **grupos_sorteio**

- `id` (UUID)
- `nome` (STRING)
- `updated` (DATETIME)

### 4. **grupos_participantes** (tabela de relacionamento)

- `id` (UUID)os_participantes** (tabela de relacionamento)
- `participanteId` (UUID, FK)

### 5. **presentes**

- `id` (UUID)
### 5. **presentes**
- `id` (UUID)
- `nome` (STRING)
- `participanteId` (UUID, FK)

### 6. **sorteios**

- `id` (UUID)
### 6. **sorteios**
- `id` (UUID)
- `grupoId` (UUID, FK)
- `participanteId` (UUID, FK)
## 📁 Arquivos Criados

### Configuração

- `prisma/schema.prisma` - Schema do banco de dados
- `src/config/database.ts` - Instância singleton do PrismaClient

### Controllers com Prisma (exemplos)

- `src/controllers/UsuarioController.prisma.ts`
- `src/config/database.ts` - Instância singleton do PrismaClient

### Controllers com Prisma (exemplos)
- `src/controllers/UsuarioController.prisma.ts`
- `src/controllers/ParticipanteController.prisma.ts`
- `src/controllers/GrupoController.prisma.ts`

## 🚀 Como usar o Prisma Client

### Importar o Prisma Client

### Exemplos de Uso

#### Criar um usuário

```typescript
### Exemplos de Uso

#### Criar um usuário
```typescript
const novoUsuario = await prisma.usuario.create({
});
```

#### Buscar todos os usuários

const usuarios = await prisma.usuario.findMany();
```

#### Buscar um usuário por ID

```typescript
const usuarios = await prisma.usuario.findMany();
});
```

#### Atualizar um usuário

```typescript = await prisma.usuario.findUnique({
  where: { id: 1 }
});
```

#### Atualizar um usuário
});
```

#### Deletar um usuário

```typescriptão Silva Junior'
  }
});
```

#### Buscar com relacionamentos

```typescript
await prisma.usuario.delete({
  where: { id: 1 }
});
```

#### Buscar com relacionamentos
```typescript
const participante = await prisma.participante.findUnique({
  where: { id: 'uuid-do-participante' },
  include: {
    presentes: true,
    sorteiosFeitos: true,
    grupos: {
## 🔄 Comandos úteis do Prisma

### Criar uma nova migration

```bash
  }
```

### Aplicar migrations em produção

```bashomandos úteis do Prisma
```

### Resetar banco de dados (CUIDADO: apaga todos os dados)

```bashsma migrate dev --name nome_da_migration
```
```

### Visualizar banco de dados com Prisma Studio

```bashsma migrate deploy
```

### Gerar Prisma Client após mudanças no schema

```bash
npx prisma migrate reset
```

### Verificar status das migrations

```bash
npx prisma studio
```

### Gerar Prisma Client após mudanças no schema
```bash
npx prisma generate
```

### Verificar status das migrations
```bash
## 📝 Próximos Passos

1. **Substitua os controllers antigos** pelos novos que usam Prisma (arquivos `*.prisma.ts`)
2. **Remova as dependências antigas** se não estiver mais usando Knex:

   ```bash
   npm uninstall knex
   ```

3. **Adicione validação** usando bibliotecas como Zod ou Joi
DATABASE_URL="postgresql://postgres:Alissonkiss@12@localhost:5432/amigo_oculto"
```

## 📝 Próximos Passos

1. **Substitua os controllers antigos** pelos novos que usam Prisma (arquivos `*.prisma.ts`)
1. Substitua `connection('tabela')` por `prisma.tabela`
2. Use métodos do Prisma:

   - `select('*')` → `findMany()`
   ```
3. **Adicione validação** usando bibliotecas como Zod ou Joi
4. **Implemente autenticação** para proteger as rotas
5. **Adicione tratamento de erros** mais robusto

## 🛠️ Migrando Controllers Existentes

Para migrar seus controllers existentes para usar Prisma:

1. Substitua `connection('tabela')` por `prisma.tabela`
2. Use métodos do Prisma:
   - `select('*')` → `findMany()`
   - `where()` → `findUnique()` ou `findFirst()`
   - `insert()` → `create()`
   - `update()` → `update()`
   - `delete()` → `delete()`

## 📚 Documentação

- [Prisma Docs](https://www.prisma.io/docs)
- [Prisma Client API](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference)
- [Prisma Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)
