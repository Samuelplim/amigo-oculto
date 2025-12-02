# 🔌 Documentação da API - Amigo Oculto

## Base URL

```
http://localhost:4000/api
```

---

## 📋 Índice

1. [Health Check](#health-check)
2. [Participantes](#participantes)
3. [Grupos](#grupos)
4. [Presentes](#presentes)
5. [Sorteios](#sorteios)
6. [Usuários](#usuários)

---

## Health Check

### Verificar Status do Servidor

```http
GET /health
```

**Response 200**

```json
{
  "status": "OK",
  "message": "Server is running"
}
```

---

## Participantes

### Listar Todos os Participantes

```http
GET /api/participantes
```

**Response 200**

```json
[
  {
    "id": "uuid-123",
    "nome": "João Silva",
    "senha": null,
    "description": "Gosta de livros e tecnologia",
    "evento": "Natal 2024",
    "created": "2024-12-01T10:00:00Z",
    "updated": "2024-12-01T10:00:00Z",
    "presentes": [
      {
        "id": "uuid-presente-1",
        "nome": "Livro de programação",
        "descricao": "Qualquer livro sobre TypeScript",
        "imagem": "https://...",
        "participanteId": "uuid-123"
      }
    ],
    "grupos": []
  }
]
```

### Buscar Participante por ID

```http
GET /api/participantes/:id
```

**Parâmetros**

| Nome | Tipo   | Descrição                |
|------|--------|--------------------------|
| id   | string | UUID do participante     |

**Response 200**

```json
{
  "id": "uuid-123",
  "nome": "João Silva",
  "senha": null,
  "description": "Gosta de livros e tecnologia",
  "evento": "Natal 2024",
  "created": "2024-12-01T10:00:00Z",
  "updated": "2024-12-01T10:00:00Z",
  "presentes": [...],
  "sorteiosFeitos": [
    {
      "id": "uuid-sorteio-1",
      "grupoId": "uuid-grupo-1",
      "participanteSorteado": {
        "id": "uuid-456",
        "nome": "Maria Santos"
      }
    }
  ],
  "grupos": [...]
}
```

**Response 404**

```json
{
  "message": "Participante não encontrado"
}
```

### Criar Participante

```http
POST /api/participantes
```

**Body**

```json
{
  "nome": "João Silva",
  "senha": "senha123",  // opcional
  "description": "Gosta de livros e tecnologia",  // opcional
  "evento": "Natal 2024"
}
```

**Response 201**

```json
{
  "id": "uuid-123",
  "nome": "João Silva",
  "senha": "senha123",
  "description": "Gosta de livros e tecnologia",
  "evento": "Natal 2024",
  "created": "2024-12-01T10:00:00Z",
  "updated": "2024-12-01T10:00:00Z"
}
```

### Atualizar Participante

```http
PUT /api/participantes/:id
```

**Body**

```json
{
  "nome": "João Pedro Silva",
  "senha": "novaSenha",
  "description": "Atualizado",
  "evento": "Natal 2024"
}
```

**Response 200**

```json
{
  "id": "uuid-123",
  "nome": "João Pedro Silva",
  ...
}
```

### Deletar Participante

```http
DELETE /api/participantes/:id
```

**Response 204**

Sem conteúdo

### Adicionar Presente ao Participante

```http
POST /api/participantes/:id/presentes
```

**Body**

```json
{
  "nome": "Livro de programação",
  "descricao": "Qualquer livro sobre TypeScript",
  "imagem": "https://exemplo.com/livro.jpg"  // opcional
}
```

**Response 201**

```json
{
  "id": "uuid-presente-1",
  "nome": "Livro de programação",
  "descricao": "Qualquer livro sobre TypeScript",
  "imagem": "https://exemplo.com/livro.jpg",
  "participanteId": "uuid-123"
}
```

---

## Grupos

### Listar Todos os Grupos

```http
GET /api/grupos
```

**Response 200**

```json
[
  {
    "id": "uuid-grupo-1",
    "nome": "Amigos da Empresa",
    "created": "2024-12-01T10:00:00Z",
    "updated": "2024-12-01T10:00:00Z",
    "participantes": [
      {
        "id": "uuid-gp-1",
        "grupoId": "uuid-grupo-1",
        "participanteId": "uuid-123",
        "participante": {
          "id": "uuid-123",
          "nome": "João Silva",
          ...
        }
      }
    ],
    "sorteios": [
      {
        "id": "uuid-sorteio-1",
        "grupoId": "uuid-grupo-1",
        "participanteId": "uuid-123",
        "participanteSorteadoId": "uuid-456",
        "participante": {
          "id": "uuid-123",
          "nome": "João Silva"
        },
        "participanteSorteado": {
          "id": "uuid-456",
          "nome": "Maria Santos"
        }
      }
    ]
  }
]
```

### Buscar Grupo por ID

```http
GET /api/grupos/:id
```

**Response 200**

Igual ao item da lista acima.

**Response 404**

```json
{
  "message": "Grupo não encontrado"
}
```

### Criar Grupo

```http
POST /api/grupos
```

**Body**

```json
{
  "nome": "Amigos da Empresa",
  "participantesIds": [
    "uuid-123",
    "uuid-456",
    "uuid-789"
  ]  // opcional
}
```

**Response 201**

```json
{
  "id": "uuid-grupo-1",
  "nome": "Amigos da Empresa",
  "created": "2024-12-01T10:00:00Z",
  "updated": "2024-12-01T10:00:00Z",
  "participantes": [...]
}
```

### Atualizar Grupo

```http
PUT /api/grupos/:id
```

**Body**

```json
{
  "nome": "Novo Nome do Grupo"
}
```

**Response 200**

```json
{
  "id": "uuid-grupo-1",
  "nome": "Novo Nome do Grupo",
  "updated": "2024-12-01T11:00:00Z"
}
```

### Deletar Grupo

```http
DELETE /api/grupos/:id
```

**Response 204**

Sem conteúdo. Deleta também todos os sorteios e relacionamentos.

### Adicionar Participante ao Grupo

```http
POST /api/grupos/:id/participantes
```

**Body**

```json
{
  "participanteId": "uuid-456"
}
```

**Response 200**

```json
{
  "id": "uuid-grupo-1",
  "nome": "Amigos da Empresa",
  "participantes": [
    // todos os participantes, incluindo o novo
  ]
}
```

### Remover Participante do Grupo

```http
DELETE /api/grupos/:id/participantes/:participanteId
```

**Parâmetros**

| Nome           | Tipo   | Descrição                |
|----------------|--------|--------------------------|
| id             | string | UUID do grupo            |
| participanteId | string | UUID do participante     |

**Response 204**

Sem conteúdo.

### Realizar Sorteio

```http
POST /api/grupos/:id/sortear
```

**Regras**:
- Mínimo de 2 participantes
- Ninguém sorteia a si mesmo
- Sorteio só pode ser feito uma vez por grupo

**Response 200**

```json
{
  "id": "uuid-grupo-1",
  "nome": "Amigos da Empresa",
  "participantes": [...],
  "sorteios": [
    {
      "id": "uuid-sorteio-1",
      "grupoId": "uuid-grupo-1",
      "participanteId": "uuid-123",
      "participanteSorteadoId": "uuid-456",
      "participante": {
        "id": "uuid-123",
        "nome": "João Silva"
      },
      "participanteSorteado": {
        "id": "uuid-456",
        "nome": "Maria Santos"
      }
    },
    // outros sorteios...
  ]
}
```

**Response 400**

```json
{
  "message": "Sorteio já foi realizado para este grupo"
}
```

ou

```json
{
  "message": "É necessário pelo menos 2 participantes para realizar o sorteio"
}
```

**Response 404**

```json
{
  "message": "Grupo não encontrado"
}
```

**Response 500**

```json
{
  "message": "Não foi possível realizar um sorteio válido"
}
```

### Consultar Quem o Participante Tirou

```http
GET /api/grupos/:id/sorteio/:participanteId
```

**Parâmetros**

| Nome           | Tipo   | Descrição                |
|----------------|--------|--------------------------|
| id             | string | UUID do grupo            |
| participanteId | string | UUID do participante     |

**Response 200**

```json
{
  "id": "uuid-sorteio-1",
  "grupoId": "uuid-grupo-1",
  "participanteId": "uuid-123",
  "participanteSorteadoId": "uuid-456",
  "created": "2024-12-01T10:00:00Z",
  "participanteSorteado": {
    "id": "uuid-456",
    "nome": "Maria Santos",
    "presentes": [
      {
        "id": "uuid-presente-1",
        "nome": "Perfume",
        "descricao": "Qualquer perfume floral",
        "imagem": null
      }
    ]
  }
}
```

**Response 404**

```json
{
  "message": "Sorteio não encontrado"
}
```

---

## Presentes

### Listar Todos os Presentes

```http
GET /api/presentes
```

**Response 200**

```json
[
  {
    "id": "uuid-presente-1",
    "nome": "Livro de programação",
    "descricao": "Qualquer livro sobre TypeScript",
    "imagem": "https://exemplo.com/livro.jpg",
    "participanteId": "uuid-123",
    "participante": {
      "id": "uuid-123",
      "nome": "João Silva"
    }
  }
]
```

### Buscar Presente por ID

```http
GET /api/presentes/:id
```

**Response 200**

```json
{
  "id": "uuid-presente-1",
  "nome": "Livro de programação",
  "descricao": "Qualquer livro sobre TypeScript",
  "imagem": "https://exemplo.com/livro.jpg",
  "participanteId": "uuid-123"
}
```

### Criar Presente

```http
POST /api/presentes
```

**Body**

```json
{
  "nome": "Livro de programação",
  "descricao": "Qualquer livro sobre TypeScript",  // opcional
  "imagem": "https://exemplo.com/livro.jpg",      // opcional
  "participanteId": "uuid-123"
}
```

**Response 201**

```json
{
  "id": "uuid-presente-1",
  "nome": "Livro de programação",
  "descricao": "Qualquer livro sobre TypeScript",
  "imagem": "https://exemplo.com/livro.jpg",
  "participanteId": "uuid-123"
}
```

### Atualizar Presente

```http
PUT /api/presentes/:id
```

**Body**

```json
{
  "nome": "Livro atualizado",
  "descricao": "Nova descrição",
  "imagem": "https://exemplo.com/nova-imagem.jpg"
}
```

**Response 200**

```json
{
  "id": "uuid-presente-1",
  "nome": "Livro atualizado",
  ...
}
```

### Deletar Presente

```http
DELETE /api/presentes/:id
```

**Response 204**

Sem conteúdo.

---

## Sorteios

### Listar Todos os Sorteios

```http
GET /api/sorteios
```

**Response 200**

```json
[
  {
    "id": "uuid-sorteio-1",
    "grupoId": "uuid-grupo-1",
    "participanteId": "uuid-123",
    "participanteSorteadoId": "uuid-456",
    "created": "2024-12-01T10:00:00Z",
    "grupo": {
      "id": "uuid-grupo-1",
      "nome": "Amigos da Empresa"
    },
    "participante": {
      "id": "uuid-123",
      "nome": "João Silva"
    },
    "participanteSorteado": {
      "id": "uuid-456",
      "nome": "Maria Santos",
      "presentes": [...]
    }
  }
]
```

### Buscar Sorteio por ID

```http
GET /api/sorteios/:id
```

**Response 200**

Igual ao item da lista acima.

**Response 404**

```json
{
  "message": "Sorteio não encontrado"
}
```

### Criar Sorteio Manual

```http
POST /api/sorteios
```

**Body**

```json
{
  "grupoId": "uuid-grupo-1",
  "participanteId": "uuid-123",
  "participanteSorteadoId": "uuid-456"
}
```

**Response 201**

```json
{
  "id": "uuid-sorteio-1",
  "grupoId": "uuid-grupo-1",
  "participanteId": "uuid-123",
  "participanteSorteadoId": "uuid-456",
  "created": "2024-12-01T10:00:00Z"
}
```

**⚠️ Nota**: Recomenda-se usar `POST /api/grupos/:id/sortear` para sorteios automáticos.

### Deletar Sorteio

```http
DELETE /api/sorteios/:id
```

**Response 204**

Sem conteúdo.

### Listar Sorteios de um Grupo

```http
GET /api/sorteios/grupo/:grupoId
```

**Response 200**

```json
[
  {
    "id": "uuid-sorteio-1",
    "grupoId": "uuid-grupo-1",
    "participanteId": "uuid-123",
    "participanteSorteadoId": "uuid-456",
    "created": "2024-12-01T10:00:00Z",
    "participante": {
      "id": "uuid-123",
      "nome": "João Silva"
    },
    "participanteSorteado": {
      "id": "uuid-456",
      "nome": "Maria Santos",
      "presentes": [...]
    }
  }
]
```

---

## Usuários

### Listar Todos os Usuários

```http
GET /api/usuarios
```

**Response 200**

```json
[
  {
    "id": 1,
    "nome": "Admin",
    "senha": "hash_da_senha"
  }
]
```

### Buscar Usuário por ID

```http
GET /api/usuarios/:id
```

**Response 200**

```json
{
  "id": 1,
  "nome": "Admin",
  "senha": "hash_da_senha"
}
```

### Criar Usuário

```http
POST /api/usuarios
```

**Body**

```json
{
  "nome": "Admin",
  "senha": "senha123"
}
```

**Response 201**

```json
{
  "id": 1,
  "nome": "Admin",
  "senha": "senha123"
}
```

### Atualizar Usuário

```http
PUT /api/usuarios/:id
```

**Body**

```json
{
  "nome": "Admin Atualizado",
  "senha": "novaSenha123"
}
```

**Response 200**

```json
{
  "id": 1,
  "nome": "Admin Atualizado",
  "senha": "novaSenha123"
}
```

### Deletar Usuário

```http
DELETE /api/usuarios/:id
```

**Response 204**

Sem conteúdo.

---

## Códigos de Status HTTP

| Código | Significado                 | Uso                                    |
|--------|-----------------------------|----------------------------------------|
| 200    | OK                          | Requisição bem-sucedida                |
| 201    | Created                     | Recurso criado com sucesso             |
| 204    | No Content                  | Recurso deletado com sucesso           |
| 400    | Bad Request                 | Dados inválidos ou regra de negócio    |
| 404    | Not Found                   | Recurso não encontrado                 |
| 500    | Internal Server Error       | Erro no servidor                       |

---

## Exemplos com cURL

### Criar Participante

```bash
curl -X POST http://localhost:4000/api/participantes \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "evento": "Natal 2024",
    "description": "Gosta de livros"
  }'
```

### Criar Grupo com Participantes

```bash
curl -X POST http://localhost:4000/api/grupos \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Amigos da Empresa",
    "participantesIds": ["uuid-1", "uuid-2", "uuid-3"]
  }'
```

### Realizar Sorteio

```bash
curl -X POST http://localhost:4000/api/grupos/uuid-grupo-1/sortear
```

### Consultar Sorteio

```bash
curl http://localhost:4000/api/grupos/uuid-grupo-1/sorteio/uuid-participante-1
```

---

## Exemplos com JavaScript (Fetch)

### Criar Participante

```javascript
const response = await fetch('http://localhost:4000/api/participantes', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    nome: 'João Silva',
    evento: 'Natal 2024',
    description: 'Gosta de livros'
  })
});

const participante = await response.json();
console.log(participante);
```

### Realizar Sorteio

```javascript
const response = await fetch(`http://localhost:4000/api/grupos/${grupoId}/sortear`, {
  method: 'POST'
});

const resultado = await response.json();
console.log(resultado);
```

### Consultar Sorteio

```javascript
const response = await fetch(
  `http://localhost:4000/api/grupos/${grupoId}/sorteio/${participanteId}`
);

const sorteio = await response.json();
console.log('Você tirou:', sorteio.participanteSorteado.nome);
```

---

## Rate Limiting

⚠️ **Nota**: Atualmente não há rate limiting implementado. Recomenda-se implementar para produção.

## Autenticação

⚠️ **Nota**: Atualmente não há autenticação implementada. As rotas estão abertas. Para produção, implemente JWT.

---

**Versão da API**: 1.0.0  
**Última Atualização**: Dezembro 2024
