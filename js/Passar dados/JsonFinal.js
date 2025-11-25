dados = localStorage.getItem("dadosCompletos");

if (dados) {
  dados = JSON.parse(dados);

  console.log("Dados Completos", dados);
} else {
  console.log("Nenhum dado encontrado no localStorage.");
}

let sprite = document.querySelector(".sprite");
let nome = document.querySelector(".nome");
let profissao = document.querySelector(".profissao");
let idade = document.querySelector(".idade");
let descricao = document.querySelector(".descricao");
let funcoes = document.querySelector(".funcao");

sprite.src = dados.sprite;
nome.textContent = dados.projeto;
profissao.textContent = dados.categoria;
idade.textContent = dados.faixaEtaria + " anos";
descricao.textContent = dados.descricao;
funcoes.textContent = dados.funcoes;

// Recupera o objeto do localStorage
const respostas = JSON.parse(localStorage.getItem("todasRespostas")) || {};

// Seleciona o container onde vai renderizar
const container = document.getElementById("perguntas-container");

// Limpa antes de renderizar (opcional)
container.innerHTML = "";

// Percorre cada resposta
Object.values(respostas).forEach((item) => {
  // Garante que existe pergunta e resposta
  if (item.pergunta && item.pergunta.trim() !== "") {
    // Corta o texto no "-" e pega a primeira parte
    const tituloPergunta = item.pergunta.split("-")[0].trim();

    // Cria os elementos
    const bloco = document.createElement("div");
    bloco.classList.add("coluna");

    const titulo = document.createElement("h3");
    titulo.textContent = tituloPergunta;

    const resposta = document.createElement("p");
    resposta.textContent = item.resposta.trim();

    // Monta o bloco e adiciona ao container
    bloco.appendChild(titulo);
    bloco.appendChild(resposta);
    container.appendChild(bloco);
  }
});
