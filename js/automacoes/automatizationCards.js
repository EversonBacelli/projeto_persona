var arr = [4, 1, 4];
var a = 0,
  corCard = "cardPerguntasAzul",
  cardNum,
  pergNum,
  num = 1,
  cardParagra = "pergAzul";

import perguntas from "../../model/perguntas.js";

const boxCards = document.querySelectorAll(".boxCards div");

function box() {
  return `
        <div class="cards ${corCard}" id="${cardNum}">
            <p class="${cardParagra}">${pergNum}</p>
            <div class="resposta">
                <p>RESPONDER</p>
                <i class="fa-solid fa-up-right-from-square"></i>
            </div>
        </div>
    `;
}

const cor = ["cardPerguntasAzul", "cardPerguntasVermelho"];

boxCards.forEach((boxCards, index) => {
  for (let i = 0; i < arr[a]; i++) {
    corCard = cor[Math.floor(Math.random() * cor.length)];
    if (corCard === "cardPerguntasVermelho") {
      cardParagra = "pergVerm";
    } else {
      cardParagra = "pergAzul";
    }
    cardNum = "card" + num;
    pergNum = perguntas[num - 1].perg;
    boxCards.innerHTML += box(corCard, cardNum);
    num++;
  }
  a++;
});
