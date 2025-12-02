# 🚀 Guia de Início Rápido - Amigo Oculto

## Instalação Rápida

### 1. Pré-requisitos

- Node.js 18+ instalado
- PostgreSQL 12+ instalado e rodando
- Git instalado

### 2. Clone e Instale

```bash
# Clone o repositório
git clone <url-do-repositorio>
cd amigo-oculto

# Entre na pasta do backend
cd back

# Instale as dependências
npm install
```

### 3. Configure o Banco de Dados

```bash
# Crie um arquivo .env na pasta back/
# Adicione a URL do PostgreSQL:
DATABASE_URL="postgresql://usuario:senha@localhost:5432/amigo_oculto?schema=public"
PORT=4000
```

### 4. Execute as Migrações

```bash
# Cria o banco e as tabelas
npx prisma migrate dev

# Gera o Prisma Client
npx prisma generate
```

### 5. Inicie o Servidor

```bash
# Modo desenvolvimento (com hot reload)
npm run dev
```

Servidor rodando em: `http://localhost:4000`

### 6. Teste a API

```bash
# Health check
curl http://localhost:4000/health
```

## Exemplo de Uso

### 1. Criar Participantes

```bash
curl -X POST http://localhost:4000/api/participantes \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "evento": "Natal 2024",
    "description": "Gosta de livros"
  }'
```

### 2. Criar Grupo

```bash
curl -X POST http://localhost:4000/api/grupos \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Amigos da Empresa",
    "participantesIds": ["uuid1", "uuid2", "uuid3"]
  }'
```

### 3. Realizar Sorteio

```bash
curl -X POST http://localhost:4000/api/grupos/{grupoId}/sortear
```

### 4. Consultar Quem Tirou

```bash
curl http://localhost:4000/api/grupos/{grupoId}/sorteio/{participanteId}
```

## Comandos Úteis

```bash
# Desenvolvimento
npm run dev              # Inicia servidor com hot reload

# Build
npm run build            # Compila TypeScript
npm start                # Inicia servidor de produção

# Prisma
npx prisma studio        # Interface visual do banco
npx prisma migrate dev   # Cria nova migração
npx prisma generate      # Atualiza client

# Linting
npm run lint             # Executa ESLint
```

## Estrutura de Endpoints

```
/health                                         # Status do servidor
/api/participantes                              # CRUD participantes
/api/grupos                                     # CRUD grupos
/api/grupos/:id/sortear                        # Realizar sorteio
/api/grupos/:id/sorteio/:participanteId        # Ver resultado
/api/presentes                                  # CRUD presentes
/api/sorteios                                   # CRUD sorteios
```

## Troubleshooting

### Erro de conexão com PostgreSQL

Verifique se:
- PostgreSQL está rodando
- Credenciais estão corretas no `.env`
- Banco de dados foi criado

### Prisma Client não encontrado

Execute:
```bash
npx prisma generate
```

### Porta 4000 já em uso

Altere a porta no `.env`:
```env
PORT=3000
```

## Próximos Passos

1. ✅ Criar participantes
2. ✅ Adicionar presentes aos participantes
3. ✅ Criar grupo com participantes
4. ✅ Realizar sorteio
5. ✅ Consultar resultado individualmente

Para documentação completa, veja `DOCUMENTATION.md`
