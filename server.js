const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let produtos = [
    { id: 1, nome: "Smartphone Premium", preco: 1299.99 },
    { id: 2, nome: "Notebook Gamer", preco: 2799.99 },
    { id: 3, nome: "Fone Bluetooth", preco: 299.99 },
    { id: 4, nome: "Smart TV 55\"", preco: 1899.99 },
    { id: 5, nome: "Console de Games", preco: 2499.99 },
    { id: 6, nome: "Tablet 10\"", preco: 899.99 },
];

app.get("/api/produtos", (req, res) => {
    res.json(produtos);
});

app.post("/api/produtos", (req, res) => {
    const { nome, preco } = req.body;

    if (!nome || !preco) {
        return res.status(400).json({ erro: "Nome e preço são obrigatórios" });
    }

    const novoProduto = {
        id: produtos.length + 1,
        nome,
        preco: parseFloat(preco)
    };

    produtos.push(novoProduto);
    res.status(201).json(novoProduto);
});

app.delete("/api/produtos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = produtos.findIndex(p => p.id === id);
    
    if (index === -1) {
        return res.status(404).json({ erro: "Produto não encontrado" });
    }
    
    produtos.splice(index, 1);
    res.status(204).send();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📡 API disponível em http://localhost:${PORT}/api/produtos`);
});