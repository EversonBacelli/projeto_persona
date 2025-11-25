dados = localStorage.getItem("dadosCompletos");

if (dados) {
  dados = JSON.parse(dados);
  console.log("Dados Completos", dados);
} else {
  console.log("Nenhum dado encontrado no localStorage.");
}

let sprite = document.getElementById("principalPersona");

sprite.src = dados.sprite;

const buttonAvan = document.querySelector(".areaButton button");

buttonAvan.addEventListener("click", function () {
  const respostas = {};

  for (let i = 1; i <= 9; i++) {
    const dados = JSON.parse(localStorage.getItem("resposta" + i));
    if (dados) {
      respostas["resposta" + i] = dados;
    }
  }

  localStorage.setItem("todasRespostas", JSON.stringify(respostas));
  console.log("Respostas agrupadas:", respostas);
});
