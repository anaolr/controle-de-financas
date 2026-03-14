const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const service = require("../service/service");

app.get("/principal", async (req, res) => {
  const gastos = await service.listar();
  res.send(gastos);
});

app.post("/principal", async (req, res) => {
  const gasto = req.body;
  await service.adicionar(gasto);
  res.send("Gasto adicionado com sucesso!");
});

// Agora o ID é uma string gerada pelo MongoDB, não precisamos fazer parseInt
app.put("/principal/:id", async (req, res) => {
  const id = req.params.id; 
  const gasto = req.body;
  await service.editar(id, gasto);
  res.send("Gasto atualizado com sucesso!");
});

app.delete("/principal/:id", async (req, res) => {
  const id = req.params.id;
  await service.excluir(id);
  res.send("Gasto excluído com sucesso!");
});

module.exports = app;