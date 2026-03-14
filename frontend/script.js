const API_URL = "https://controle-de-financas-9zvz.onrender.com";

// Função principal para buscar e desenhar a tabela
async function carregarDados() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    const fixosBody = document.querySelector("#table-fixos tbody");
    const variaveisBody = document.querySelector("#table-variaveis tbody");

    // Limpa a tabela antes de preencher
    fixosBody.innerHTML = "";
    variaveisBody.innerHTML = "";

    let somaFixos = 0;
    let somaVariaveis = 0;

    data.forEach((element) => {
      const tr = document.createElement("tr");
      const valorNumerico = parseFloat(element.valor);
      const valorFormatado = valorNumerico.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
      const dataFormatada = element.data.split("-").reverse().join("/");

      tr.innerHTML = `
        <td>${element.nome}</td>
        <td>${valorFormatado}</td>
        <td>${dataFormatada}</td>
        <td>
            <button class="btn-editar" onclick="editarGasto(${element._id})">✏️ Editar</button>
            <button class="btn-excluir" onclick="excluirGasto(${element._id})">🗑️ Excluir</button>
        </td>
      `;

      if (element.tipo === "Fixos") {
        fixosBody.appendChild(tr);
        somaFixos += valorNumerico;
      } else if (element.tipo === "Variáveis") {
        variaveisBody.appendChild(tr);
        somaVariaveis += valorNumerico;
      }
    });

    // Atualiza os Totais na tela
    document.getElementById("total-fixos").textContent =
      somaFixos.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    document.getElementById("total-variaveis").textContent =
      somaVariaveis.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    document.getElementById("total-geral").textContent = (
      somaFixos + somaVariaveis
    ).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  } catch (error) {
    console.error("Erro ao carregar os dados:", error);
  }
}

// ADICIONAR (POST)
document
  .getElementById("form-gasto")
  .addEventListener("submit", async function (e) {
    e.preventDefault(); // Evita que a página recarregue

    const novoGasto = {
      nome: document.getElementById("nome").value,
      valor: parseFloat(document.getElementById("valor").value),
      data: document.getElementById("data").value,
      tipo: document.getElementById("tipo").value,
    };

    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoGasto),
    });

    document.getElementById("form-gasto").reset(); // Limpa o formulário
    carregarDados(); // Recarrega a tabela atualizada
  });

// DELETAR (DELETE)
async function excluirGasto(id) {
  if (confirm("Tem certeza que deseja excluir este gasto?")) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    carregarDados(); // Recarrega a tabela atualizada
  }
}

// EDITAR (PUT) - Usando prompt simples para facilitar
async function editarGasto(id) {
  const novoNome = prompt(
    "Digite o novo nome (ou deixe em branco para manter):",
  );
  if (!novoNome) return; // Cancela se o usuário não digitar nada

  const novoValor = prompt(
    "Digite o novo valor (use ponto para centavos. Ex: 150.50):",
  );
  const novaData = prompt("Digite a nova data (Formato AAAA-MM-DD):");
  const novoTipo = prompt(
    "Digite o novo tipo (Exatamente: 'Fixos' ou 'Variáveis'):",
  );

  const gastoAtualizado = {
    id: id,
    nome: novoNome,
    valor: parseFloat(novoValor),
    data: novaData,
    tipo: novoTipo,
  };

  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(gastoAtualizado),
  });

  carregarDados();
}

// Carrega os dados assim que a tela abre
window.onload = carregarDados;
