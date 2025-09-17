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

app.get("/api/produtos", (req, res) => {
    res.json(produtos);
});

app.post("/api/produtos", (req, res) => {
    const { nome, preco} = req.body;
;

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
})