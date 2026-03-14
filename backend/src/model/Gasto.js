const mongoose = require('mongoose');

const GastoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    valor: { type: Number, required: true },
    data: { type: String, required: true },
    tipo: { type: String, required: true }
});

// Cria a coleção "gastos" no banco de dados
module.exports = mongoose.model('Gasto', GastoSchema);