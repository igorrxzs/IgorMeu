# 📡 Exemplos de Uso da API

## Endpoints Disponíveis

### 1. Listar todos os produtos
```bash
GET http://localhost:3000/api/produtos
```

**Resposta:**
```json
[
  {
    "id": 1,
    "nome": "Smartphone Premium",
    "preco": 1299.99
  },
  {
    "id": 2,
    "nome": "Notebook Gamer",
    "preco": 2799.99
  }
]
```

### 2. Adicionar novo produto
```bash
POST http://localhost:3000/api/produtos
Content-Type: application/json

{
  "nome": "Smartwatch",
  "preco": 599.99
}
```

**Resposta:**
```json
{
  "id": 7,
  "nome": "Smartwatch",
  "preco": 599.99
}
```

### 3. Remover produto
```bash
DELETE http://localhost:3000/api/produtos/1
```

**Resposta:** Status 204 (No Content)

## Exemplos com cURL

### Listar produtos
```bash
curl http://localhost:3000/api/produtos
```

### Adicionar produto
```bash
curl -X POST http://localhost:3000/api/produtos \
  -H "Content-Type: application/json" \
  -d '{"nome": "Tablet 10\"", "preco": 899.99}'
```

### Remover produto
```bash
curl -X DELETE http://localhost:3000/api/produtos/1
```

## Exemplos com JavaScript (Fetch)

### Listar produtos
```javascript
const produtos = await fetch('http://localhost:3000/api/produtos')
  .then(response => response.json());
console.log(produtos);
```

### Adicionar produto
```javascript
const novoProduto = await fetch('http://localhost:3000/api/produtos', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    nome: 'Headset Gamer',
    preco: 299.99
  })
}).then(response => response.json());

console.log('Produto adicionado:', novoProduto);
```

### Remover produto
```javascript
await fetch('http://localhost:3000/api/produtos/1', {
  method: 'DELETE'
});
console.log('Produto removido');
```

## Tratamento de Erros

### Produto não encontrado (404)
```json
{
  "erro": "Produto não encontrado"
}
```

### Dados inválidos (400)
```json
{
  "erro": "Nome e preço são obrigatórios"
}
```

## Testando com Postman

1. **GET** `http://localhost:3000/api/produtos`
2. **POST** `http://localhost:3000/api/produtos`
   - Body: raw JSON
   - `{"nome": "Produto Teste", "preco": 99.99}`
3. **DELETE** `http://localhost:3000/api/produtos/1`