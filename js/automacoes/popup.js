import videos from "../../model/dicas.js";
import { botao } from "../acoes/buttonAvance.js";
import { buttonHelp } from "../acoes/buttonDica.js";

let contador = 0;
const tela = document.querySelector(".tela");
const espacoEscuro = document.querySelector(".espacoEscuro");
const buttonAvan = document.querySelector(".areaButton button");
if (buttonAvan) buttonAvan.disabled = true;

function popUp(pergText) {
  return `
    <div class="cardsActive">
      <h1>${pergText}</h1>
      <textarea name="textarea" rows="6" cols="50" placeholder="Escreva aqui..." ></textarea>
      <button class="questButton" id="resp"><i class="fa-solid fa-angles-right"></i>RESPONDER</button>
      <button class="questButton" id="videoBtn">VER VÍDEO EXPLICATIVO <i class="fa-solid fa-video"></i></button>
      <button class="questButton" id="help">
        <div class="conteudoTemp">
          "Ainda Preciso de dicas"
          <img id="lampada" src="./img/lampada_dicas.png" alt="">
        </div>
        <div class="btnActivo">
          <p class="dicas"></p>
          <div class="boxOpcoes">
            <div class="aceita"><i class="fa-solid fa-circle-check"></i></div>
            <div class="negar"><i class="fa-solid fa-circle-xmark"></i></div>
          </div>
        </div>
      </button>
    </div>
  `;
}

function abrirPopup(cardPerg) {
  const pergText = cardPerg.querySelector("p").textContent;

   const itemVideo = videos.find(v => pergText.includes(v.pergunta));

  tela.style.display = "flex";
  espacoEscuro.style.display = "flex";
  tela.innerHTML = popUp(pergText);

  const fundoCor = document.querySelector(".cardsActive");
  const textarea = tela.querySelector("textarea");
  const resp = tela.querySelector("#resp");
  const help = tela.querySelector("#help");

   const videoBtn = tela.querySelector("#videoBtn");

  videoBtn.onclick = () => {
    if (!itemVideo || !itemVideo.video) {
      alert("Nenhum vídeo disponível para esta pergunta.");
      return;
    }
    window.open(itemVideo.video, "_blank");
  };

  help.onclick = () => buttonHelp(help, pergText);
 
  if (
    cardPerg.classList.contains("cardPerguntasVermelho") ||
    cardPerg.classList.contains("pergVerm") ||
    cardPerg.classList.contains("vermelho")
  ) {
    fundoCor.style.backgroundImage = "url('../../img/cardActive_fundo.png')";
  }
  if (
    cardPerg.classList.contains("cardPerguntasAzul") ||
    cardPerg.classList.contains("pergAzul") ||
    cardPerg.classList.contains("azul")
  ) {
    fundoCor.style.backgroundImage = "url('../../img/cardActive_fundo_azul.png')";
    textarea.style.borderColor = "#1b1a92";
    document
      .querySelectorAll(".cardsActive button")
      .forEach((btn) => (btn.style.backgroundColor = "#1b1a92"));
  }

  resp.onclick = () => {
    if (!textarea.value.trim()) {
      alert("O campo não pode ficar vazio!");
      return;
    }

    const respName = `resposta${contador + 1}`;
    const respData = {
      pergunta: cardPerg.querySelector("p").textContent,
      resposta: textarea.value.trim(),
    };

    localStorage.setItem(respName, JSON.stringify(respData));

    if (
      cardPerg.classList.contains("cardPerguntasVermelho") ||
      cardPerg.classList.contains("pergVerm")
    ) {
      cardPerg.style.backgroundColor = "#ae0f0a";
    } else {
      cardPerg.style.backgroundColor = "#1b1a92";
    }

    const cardIcon = cardPerg.querySelector(".resposta i");
    const txt = cardPerg.querySelector(".resposta p");
    const cardRespondido = cardPerg.querySelector(".resposta");

    if (cardIcon) cardIcon.className = "fa-solid fa-check";
    if (txt) txt.textContent = "Respondido";
    if (cardRespondido) cardRespondido.style.color = "white";

    contador++;
    if (contador >= 9) botao();

    fecharPopup();
  };

  espacoEscuro.onclick = fecharPopup;

  function onEsc(e) {
    if (e.key === "Escape") {
      fecharPopup();
      document.removeEventListener("keydown", onEsc);
    }
  }

  document.addEventListener("keydown", onEsc);
}

 function fecharPopup() {
  tela.style.display = "none";
  espacoEscuro.style.display = "none";
  tela.replaceChildren();
}

document.addEventListener("click", (e) => {
  const card = e.target.closest(".cards");
  if (!card) return;
  abrirPopup(card);
});
