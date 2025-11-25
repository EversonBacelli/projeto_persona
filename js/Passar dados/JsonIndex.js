let btn = document.querySelector(".botao-criar");

btn.addEventListener("click", function teste() {
  if (!document.getElementById("nome").checkValidity()) {
    document.getElementById("nome").reportValidity();
    return;
  }

  if (!document.getElementById("sobrenome").checkValidity()) {
    document.getElementById("sobrenome").reportValidity();
    return;
  }

  if (!document.getElementById("email").checkValidity()) {
    document.getElementById("email").reportValidity();
    return;
  }

  if (!document.getElementById("nomeprojeto").checkValidity()) {
    document.getElementById("nomeprojeto").reportValidity();
    return;
  }

  if (!document.getElementById("categoria").checkValidity()) {
    document.getElementById("categoria").reportValidity();
    return;
  }

  let nome = document.getElementById("nome").value;
  let sobrenome = document.getElementById("sobrenome").value;
  let email = document.getElementById("email").value;
  let projeto = document.getElementById("nomeprojeto").value;
  let categoria = document.getElementById("categoria").value;

  let dados = {
    nome: nome,
    sobrenome: sobrenome,
    email: email,
    projeto: projeto,
    categoria: categoria,
  };

  console.log(dados);

  let dadosJson = JSON.stringify(dados);
  console.log(dadosJson);
  localStorage.setItem("dados", dadosJson);

  location.href = "cadastroPersona.html";
});
