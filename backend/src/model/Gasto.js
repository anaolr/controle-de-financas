const mongoose = require("mongoose");

const GastoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  valor: { type: Number, required: true },
  data: { type: String, required: true },
  tipo: { type: String, required: true },
  usuarioId: { type: String, required: true }, // <-- Nova linha vinculando o dono
});

module.exports = mongoose.model("Gasto", GastoSchema);
