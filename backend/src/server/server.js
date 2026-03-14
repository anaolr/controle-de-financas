require("dotenv").config(); // Carrega as variáveis do .env
const mongoose = require("mongoose");
const app = require("../controller/controller");

const PORT = process.env.PORT || 3000;

// Conecta ao MongoDB e só depois inicia o servidor
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Conectado ao MongoDB com sucesso!");
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((erro) => {
    console.log("Erro ao conectar no MongoDB:", erro);
  });
