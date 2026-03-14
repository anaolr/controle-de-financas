const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = express();

app.use(cors());
app.use(express.json());

const service = require("../service/service");
const Usuario = require("../model/Usuario");
const verificarToken = require("../middleware/auth");

// === ROTAS DE AUTENTICAÇÃO ===

app.post("/cadastro", async (req, res) => {
  try {
    const { email, senha } = req.body;
    // Criptografa a senha antes de salvar
    const senhaHash = await bcrypt.hash(senha, 10);
    await Usuario.create({ email, senha: senhaHash });
    res.status(201).json({ mensagem: "Usuário criado com sucesso!" });
  } catch (error) {
    res
      .status(400)
      .json({ erro: "Erro ao criar usuário (talvez e-mail já exista)." });
  }
});

app.post("/login", async (req, res) => {
  const { email, senha } = req.body;
  const usuario = await Usuario.findOne({ email });

  if (!usuario)
    return res.status(404).json({ erro: "Usuário não encontrado." });

  const senhaValida = await bcrypt.compare(senha, usuario.senha);
  if (!senhaValida) return res.status(401).json({ erro: "Senha incorreta." });

  // Gera o token (crachá) válido por 2 dias
  const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });
  res.json({ token, mensagem: "Login efetuado com sucesso!" });
});

// === ROTAS DA PLANILHA (PROTEGIDAS) ===

app.get("/principal", verificarToken, async (req, res) => {
  const gastos = await service.listar(req.usuarioId);
  res.json(gastos);
});

app.post("/principal", verificarToken, async (req, res) => {
  await service.adicionar(req.body, req.usuarioId);
  res.json({ mensagem: "Gasto adicionado com sucesso!" });
});

app.put("/principal/:id", verificarToken, async (req, res) => {
  await service.editar(req.params.id, req.body, req.usuarioId);
  res.json({ mensagem: "Gasto atualizado com sucesso!" });
});

app.delete("/principal/:id", verificarToken, async (req, res) => {
  await service.excluir(req.params.id, req.usuarioId);
  res.json({ mensagem: "Gasto excluído com sucesso!" });
});

module.exports = app;
