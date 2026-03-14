const Gasto = require("../model/Gasto");

class Service {
  async listar() {
    return await Gasto.find(); // Busca todos os gastos no Mongo
  }

  async adicionar(gasto) {
    return await Gasto.create(gasto); // Cria um novo
  }

  async editar(id, gasto) {
    // Atualiza e retorna o dado novo
    return await Gasto.findByIdAndUpdate(id, gasto, { new: true });
  }

  async excluir(id) {
    return await Gasto.findByIdAndDelete(id); // Deleta pelo ID
  }
}

module.exports = new Service();
