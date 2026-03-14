const BASE_URL = "https://controle-de-financas-f52a.onrender.com";

// Pega o token salvo no navegador
function getHeaderAuth() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

// ==== LÓGICA DE AUTENTICAÇÃO ====

async function fazerCadastro() {
  const email = document.getElementById("email-auth").value;
  const senha = document.getElementById("senha-auth").value;

  if (!email || !senha) return alert("Preencha e-mail e senha!");

  const res = await fetch(`${BASE_URL}/cadastro`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha }),
  });
  const data = await res.json();
  alert(data.mensagem || data.erro);
}

async function fazerLogin() {
  const email = document.getElementById("email-auth").value;
  const senha = document.getElementById("senha-auth").value;

  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha }),
  });

  const data = await res.json();
  if (res.ok) {
    localStorage.setItem("token", data.token); // Salva o crachá
    mudarTela(true);
    carregarDados();
  } else {
    alert(data.erro);
  }
}

function fazerLogout() {
  localStorage.removeItem("token");
  mudarTela(false);
}

function mudarTela(logado) {
  document.getElementById("tela-login").style.display = logado
    ? "none"
    : "block";
  document.getElementById("tela-app").style.display = logado ? "block" : "none";
}

// Verifica se a pessoa já estava logada antes
function checarSessao() {
  if (localStorage.getItem("token")) {
    mudarTela(true);
    carregarDados();
  } else {
    mudarTela(false);
  }
}

// ==== LÓGICA DO CRUD (Atualizada com o Header) ====

async function carregarDados() {
  try {
    const response = await fetch(`${BASE_URL}/principal`, {
      headers: getHeaderAuth(),
    });

    if (response.status === 401 || response.status === 403) {
      fazerLogout(); // Se o token expirou, desloga
      return;
    }
    const data = await response.json();

    const fixosBody = document.querySelector("#table-fixos tbody");
    const variaveisBody = document.querySelector("#table-variaveis tbody");
    fixosBody.innerHTML = "";
    variaveisBody.innerHTML = "";
    let somaFixos = 0;
    let somaVariaveis = 0;

    data.forEach((element) => {
      const tr = document.createElement("tr");
      const valorFormatado = parseFloat(element.valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
      const dataFormatada = element.data.split("-").reverse().join("/");

      tr.innerHTML = `
        <td>${element.nome}</td>
        <td>${valorFormatado}</td>
        <td>${dataFormatada}</td>
        <td>
            <button class="btn-editar" onclick="editarGasto('${element._id}')">✏️ Editar</button>
            <button class="btn-excluir" onclick="excluirGasto('${element._id}')">🗑️ Excluir</button>
        </td>
      `;

      if (element.tipo === "Fixos") {
        fixosBody.appendChild(tr);
        somaFixos += parseFloat(element.valor);
      } else {
        variaveisBody.appendChild(tr);
        somaVariaveis += parseFloat(element.valor);
      }
    });

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
    console.error(error);
  }
}

document
  .getElementById("form-gasto")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const novoGasto = {
      nome: document.getElementById("nome").value,
      valor: parseFloat(document.getElementById("valor").value),
      data: document.getElementById("data").value,
      tipo: document.getElementById("tipo").value,
    };

    await fetch(`${BASE_URL}/principal`, {
      method: "POST",
      headers: getHeaderAuth(), // MANDA O TOKEN JUNTO
      body: JSON.stringify(novoGasto),
    });

    document.getElementById("form-gasto").reset();
    carregarDados();
  });

async function excluirGasto(id) {
  if (confirm("Tem certeza que deseja excluir?")) {
    await fetch(`${BASE_URL}/principal/${id}`, {
      method: "DELETE",
      headers: getHeaderAuth(),
    });
    carregarDados();
  }
}

async function editarGasto(id) {
  // A mesma lógica que você já tinha de prompts, mas no final no fetch:
  const novoNome = prompt("Digite o novo nome:");
  if (!novoNome) return;
  const novoValor = prompt("Digite o novo valor:");
  const novaData = prompt("Digite a nova data (AAAA-MM-DD):");
  const novoTipo = prompt("Digite o novo tipo (Fixos ou Variáveis):");

  await fetch(`${BASE_URL}/principal/${id}`, {
    method: "PUT",
    headers: getHeaderAuth(), // MANDA O TOKEN AQUI TAMBÉM
    body: JSON.stringify({
      nome: novoNome,
      valor: parseFloat(novoValor),
      data: novaData,
      tipo: novoTipo,
    }),
  });
  carregarDados();
}

// Inicia checando se tem login ativo
window.onload = checarSessao;
