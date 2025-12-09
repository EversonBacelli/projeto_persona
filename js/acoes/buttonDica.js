import dicas from "../../model/dicas.js";

function buttonHelp(btn, perguntaAtual) {

  const cardsActive = document.querySelector(".cardsActive");
  const conteudoTemp = document.querySelector(".conteudoTemp");
  const btnActivo = document.querySelector(".btnActivo");
  const dicasBox = document.querySelector(".btnActivo .dicas");

  const textarea = document.querySelector(".cardsActive textarea");
  const aceita = document.querySelector(".boxOpcoes .aceita");
  const negar = document.querySelector(".boxOpcoes .negar");

   cardsActive.style.paddingBottom = "10%";
  conteudoTemp.style.display = "none";
  btnActivo.style.display = "flex";

   const item = dicas.find(v => perguntaAtual.includes(v.pergunta));

   const dica = item?.dica || "Nenhuma dica disponível para esta pergunta.";
  dicasBox.textContent = dica;

   aceita.onclick = e => {
    e.stopPropagation();
    textarea.value = dica;
  };

   negar.onclick = e => {
    e.stopPropagation();
    conteudoTemp.style.display = "flex";
    btnActivo.style.display = "none";
    cardsActive.style.paddingBottom = "0%";
    btn.classList.remove("expandida");
  };
}

export { buttonHelp };
