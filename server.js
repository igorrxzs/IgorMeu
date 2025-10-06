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

// Simple chat endpoint powered by a basic rule-based agent
app.post("/api/chat", (req, res) => {
  const { messages } = req.body || {};
  const lastUser = Array.isArray(messages)
    ? [...messages].reverse().find((m) => m && m.role === "user")
    : null;

  let reply = "Posso ajudar com dúvidas sobre os produtos.";

  if (lastUser && typeof lastUser.content === "string") {
    const text = lastUser.content.toLowerCase();
    if (text.includes("preço") || text.includes("quanto")) {
      reply = "Os preços estão listados junto aos produtos.";
    } else if (text.includes("recomenda") || text.includes("sugest")) {
      const maisBarato = produtos.reduce((acc, p) => (p.preco < acc.preco ? p : acc), produtos[0]);
      reply = `Sugestão: ${maisBarato.nome} por R$ ${maisBarato.preco.toFixed(2)}.`;
    } else if (text.includes("lista") || text.includes("produtos")) {
      reply = `Temos: ${produtos.map((p) => p.nome).join(", ")}.`;
    } else {
      reply = "Entendi. Você pode pedir sugestões ou perguntar sobre preços.";
    }
  }

  res.json({ reply: { role: "assistant", content: reply } });
});

// Serve frontend build if available
const path = require("path");
const frontendDist = path.join(__dirname, "frontend", "dist");
app.use(express.static(frontendDist));
app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api/")) return next();
  res.sendFile(path.join(frontendDist, "index.html"), (err) => {
    if (err) next();
  });
});

// Start server if not already started by a parent
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Servidor ouvindo em http://localhost:${PORT}`));
}

module.exports = app;