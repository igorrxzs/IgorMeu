const express = require("express");
const cors = require("cors");
const config = require("./config");

const app = express();

// Middleware
if (config.development.enableCORS) {
    app.use(cors());
}
app.use(express.json());

// Serve static files
app.use(express.static('.'));

// Logging middleware
if (config.development.enableLogging) {
    app.use((req, res, next) => {
        console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
        next();
    });
}

let produtos = [
    { id: 1, nome: "Pinto de Borracha", preco: 129.99 },
    { id: 2, nome: "Plug Anal", preco: 79.99 },
    { id: 3, nome: "Algemas", preco: 75.99 },
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
        preco
    };

    produtos.push(novoProduto);

    res.status(201).json(novoProduto);
});

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

app.delete("/api/produtos/:id", (req, res) => {
    const { id } = req.params;
    const produtoId = parseInt(id);

    const produtoIndex = produtos.findIndex(p => p.id === produtoId);
    
    if (produtoIndex === -1) {
        return res.status(404).json({ erro: "Produto não encontrado" });
    }

    produtos.splice(produtoIndex, 1);

    res.status(204).send();
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({ erro: 'Erro interno do servidor' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ erro: 'Endpoint não encontrado' });
});

const PORT = config.server.port;
const HOST = config.server.host;

app.listen(PORT, HOST, () => {
    console.log(`🚀 Servidor rodando em http://${HOST}:${PORT}`);
    console.log(`📊 API disponível em http://${HOST}:${PORT}/api`);
    console.log(`🌐 Frontend disponível em http://${HOST}:${PORT}`);
});