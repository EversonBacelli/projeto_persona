const btnLateral = document.getElementById("btnProsseguir");

btnLateral.addEventListener("click", () => {
  let p1 = JSON.parse(localStorage.getItem("infosCadP1")) || {};
  let p2 = JSON.parse(localStorage.getItem("infosCadP2")) || {};
  let p3 = JSON.parse(localStorage.getItem("infosCadP3")) || {};

  console.log(p1);
  console.log(p2);
  console.log(p3);

  let dados = JSON.parse(localStorage.getItem("dados")) || {};

  dados = { ...dados, ...p1, ...p2, ...p3 };

  let Dados = JSON.stringify(dados);

  localStorage.setItem("dadosCompletos", Dados);
});
