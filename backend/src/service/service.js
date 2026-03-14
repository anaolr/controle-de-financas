const Gasto = require("../model/Gasto");

class Service {
  async listar(usuarioId) {
    return await Gasto.find({ usuarioId: usuarioId }); // Busca SÓ os gastos deste usuário
  }

  async adicionar(gasto, usuarioId) {
    gasto.usuarioId = usuarioId; // Garante que o gasto pertence a quem está logado
    return await Gasto.create(gasto);
  }

  async editar(id, gasto, usuarioId) {
    // Atualiza apenas se o ID bater E for do usuário logado
    return await Gasto.findOneAndUpdate(
      { _id: id, usuarioId: usuarioId },
      gasto,
      { new: true },
    );
  }

  async excluir(id, usuarioId) {
    return await Gasto.findOneAndDelete({ _id: id, usuarioId: usuarioId });
  }
}

module.exports = new Service();
