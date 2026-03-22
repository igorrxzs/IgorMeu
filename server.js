const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let produtos = [
    { id: 1, nome: "Pinto de Borracha", preco: 129.99 },
    { id: 2, nome: "Plug Anal", preco: 79.99 },
    { id: 3, nome: "Algemas", preco: 75.99 },
];

// Rota para listar todos os produtos
app.get("/api/produtos", (req, res) => {
    res.json(produtos);
});

// Rota para criar um novo produto
app.post("/api/produtos", (req, res) => {
    const { nome, preco } = req.body;

    if (!nome || !preco) {
        return res.status(400).json({ erro: "Nome e preço são obrigatórios" });
    }

    const novoProduto = {
        id: produtos.length + 1,
        nome,
        preco
    };

    produtos.push(novoProduto);

    res.status(201).json(novoProduto);
});

// Rota para atualizar um produto
app.put("/api/produtos/:id", (req, res) => {
    const { id } = req.params;
    const { nome, preco } = req.body;
    const produtoId = parseInt(id);

    if (!nome || !preco) {
        return res.status(400).json({ erro: "Nome e preço são obrigatórios" });
    }

    const produtoIndex = produtos.findIndex(p => p.id === produtoId);
    
    if (produtoIndex === -1) {
        return res.status(404).json({ erro: "Produto não encontrado" });
    }

    produtos[produtoIndex] = {
        id: produtoId,
        nome,
        preco
    };

    res.json(produtos[produtoIndex]);
});

// Rota para deletar um produto
app.delete("/api/produtos/:id", (req, res) => {
    const { id } = req.params;
    const produtoId = parseInt(id);

    const produtoIndex = produtos.findIndex(p => p.id === produtoId);
    
    if (produtoIndex === -1) {
        return res.status(404).json({ erro: "Produto não encontrado" });
    }

    const produtoRemovido = produtos.splice(produtoIndex, 1)[0];

    res.json({ mensagem: "Produto removido com sucesso", produto: produtoRemovido });
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});