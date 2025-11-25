import dicas from "../../model/dicas.js";

function buttonHelp(btn) {
  document.querySelector(".cardsActive").style.paddingBottom = "10%";
  document.querySelector(".conteudoTemp").style.display = "none";
  document.querySelector(".btnActivo").style.display = "flex";

  btn.classList.add("expandida");
  var dica = dicas[Math.floor(Math.random() * dicas.length)];
  document.querySelector(".btnActivo .dicas").textContent = dica.dica;

  document.querySelector(".boxOpcoes .aceita").addEventListener("click", (e) => {
    e.stopPropagation();
    document.querySelector(".cardsActive textarea").value = dica.dica;
  });

  document.querySelector(".boxOpcoes .negar").addEventListener("click", (e) => {
    e.stopPropagation();
    document.querySelector(".conteudoTemp").style.display = "flex";
    document.querySelector(".btnActivo").style.display = "none";
    btn.classList.remove("expandida");
    document.querySelector(".cardsActive").style.paddingBottom = "0%";
  });
}

export { buttonHelp };
