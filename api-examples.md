# Exemplos de Uso da API TaskFlow

## Endpoints Disponíveis

### 1. Listar Todos os Produtos
```bash
GET /api/produtos
```

**Exemplo:**
```bash
curl http://localhost:3000/api/produtos
```

**Resposta:**
```json
[
  {
    "id": 1,
    "nome": "Pinto de Borracha",
    "preco": 129.99
  },
  {
    "id": 2,
    "nome": "Plug Anal",
    "preco": 79.99
  },
  {
    "id": 3,
    "nome": "Algemas",
    "preco": 75.99
  }
]
```

### 2. Criar Novo Produto
```bash
POST /api/produtos
```

**Exemplo:**
```bash
curl -X POST http://localhost:3000/api/produtos \
  -H "Content-Type: application/json" \
  -d '{"nome": "Produto Exemplo", "preco": 99.99}'
```

**Resposta:**
```json
{
  "id": 4,
  "nome": "Produto Exemplo",
  "preco": 99.99
}
```

### 3. Atualizar Produto
```bash
PUT /api/produtos/:id
```

**Exemplo:**
```bash
curl -X PUT http://localhost:3000/api/produtos/1 \
  -H "Content-Type: application/json" \
  -d '{"nome": "Produto Atualizado", "preco": 149.99}'
```

**Resposta:**
```json
{
  "id": 1,
  "nome": "Produto Atualizado",
  "preco": 149.99
}
```

### 4. Deletar Produto
```bash
DELETE /api/produtos/:id
```

**Exemplo:**
```bash
curl -X DELETE http://localhost:3000/api/produtos/1
```

**Resposta:**
```
Status: 204 No Content
```

## Códigos de Status HTTP

- **200 OK**: Requisição bem-sucedida
- **201 Created**: Produto criado com sucesso
- **204 No Content**: Produto deletado com sucesso
- **400 Bad Request**: Dados inválidos
- **404 Not Found**: Produto não encontrado
- **500 Internal Server Error**: Erro interno do servidor

## Exemplos com JavaScript

### Usando Fetch API
```javascript
// Listar produtos
async function getProducts() {
  try {
    const response = await fetch('/api/produtos');
    const products = await response.json();
    console.log(products);
  } catch (error) {
    console.error('Erro:', error);
  }
}

// Criar produto
async function createProduct(nome, preco) {
  try {
    const response = await fetch('/api/produtos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nome, preco })
    });
    const product = await response.json();
    console.log('Produto criado:', product);
  } catch (error) {
    console.error('Erro:', error);
  }
}

// Atualizar produto
async function updateProduct(id, nome, preco) {
  try {
    const response = await fetch(`/api/produtos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nome, preco })
    });
    const product = await response.json();
    console.log('Produto atualizado:', product);
  } catch (error) {
    console.error('Erro:', error);
  }
}

// Deletar produto
async function deleteProduct(id) {
  try {
    const response = await fetch(`/api/produtos/${id}`, {
      method: 'DELETE'
    });
    if (response.ok) {
      console.log('Produto deletado com sucesso');
    }
  } catch (error) {
    console.error('Erro:', error);
  }
}
```

### Usando Axios
```javascript
// Instalar axios: npm install axios

const axios = require('axios');

// Listar produtos
async function getProducts() {
  try {
    const response = await axios.get('/api/produtos');
    console.log(response.data);
  } catch (error) {
    console.error('Erro:', error.response.data);
  }
}

// Criar produto
async function createProduct(nome, preco) {
  try {
    const response = await axios.post('/api/produtos', { nome, preco });
    console.log('Produto criado:', response.data);
  } catch (error) {
    console.error('Erro:', error.response.data);
  }
}
```

## Testando com Postman

1. **Importe a coleção:**
   - Crie uma nova coleção no Postman
   - Adicione as requisições com os endpoints acima

2. **Configure o ambiente:**
   - Crie uma variável `base_url` com valor `http://localhost:3000`

3. **Teste os endpoints:**
   - Use `{{base_url}}/api/produtos` para os endpoints
   - Configure os headers apropriados para cada requisição

## Validações

### Campos Obrigatórios
- `nome`: String não vazia
- `preco`: Número maior ou igual a 0

### Exemplo de Erro de Validação
```bash
curl -X POST http://localhost:3000/api/produtos \
  -H "Content-Type: application/json" \
  -d '{"nome": "", "preco": -10}'
```

**Resposta:**
```json
{
  "erro": "Nome e preço são obrigatórios"
}
```