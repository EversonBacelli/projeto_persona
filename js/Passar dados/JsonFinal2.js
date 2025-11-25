document.addEventListener("DOMContentLoaded", () => {
  // Carrega os dados do localStorage

  const respostas = JSON.parse(localStorage.getItem("todasRespostas")) || {};
  const dados = JSON.parse(localStorage.getItem("dadosCompletos")) || {};

  console.log("Respostas carregadas:", respostas);
  console.log("Dados carregados:", dados);

  //Nome Persona

  let nome = document.getElementById("nomePersonaFinal");
  let nomePersona = dados.projeto || "Nome não disponível";

  nomePersona = nomePersona.charAt(0).toUpperCase() + nomePersona.slice(1).toLowerCase();

  nome.textContent = nomePersona || "Nome não disponível";

  //Faixa Etária

  let faixa = document.getElementById("faixaPersonaFinal");

  let faixaPersona = dados.faixaEtaria || "Faixa não disponível";

  faixa.textContent = faixaPersona || "Faixa não disponível";

  //Descrição Persona

  let descricao = document.getElementById("descPersonaFinal");

  let descPersona = dados.descricao || "Descrição não disponível";

  descPersona = descPersona.charAt(0).toUpperCase() + descPersona.slice(1).toLowerCase();

  descricao.textContent = descPersona || "Descrição não disponível";

  //Função Persona

  let funcao = document.getElementById("funcaoPersonaFinal");

  let funcPersona = dados.funcoes || "Função não disponível";

  funcPersona = funcPersona.charAt(0).toUpperCase() + funcPersona.slice(1).toLowerCase();

  funcao.textContent = funcPersona || "Função não disponível";

  //Salario

  let salario = document.getElementById("salarioPersonaFinal");

  let salPersona = dados.salario || "Salário não disponível";

  if (salPersona === "autonomo") {
    salPersona = "Autônomo";
  }

  salario.textContent = salPersona || "Salário não disponível";

  //Categoria

  let categoria = document.getElementById("categoriaPersonaFinal");

  let cat = dados.categoria;

  cat = cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase();

  categoria.textContent = cat;

  //Imagem Persona

  let sprite = document.querySelector(".persona");

  if (dados.sprite) {
    sprite.src = dados.sprite;
  }
  // Mapeamento das perguntas para os IDs dos elementos HTML
  const mapaRespostas = {
    pensa: "resp-pensa",
    fala: "resp-fala",
    escuta: "resp-escuta",
    vê: "resp-ve",
    necessidades: "resp-necessidades",
    dores: "resp-dores",
  };

  // Preenche as respostas no HTML
  Object.values(respostas).forEach((item) => {
    if (!item.pergunta || !item.resposta) return;

    const perguntaLower = item.pergunta.toLowerCase();

    // tenta achar qual id corresponde à pergunta
    for (const chave in mapaRespostas) {
      if (perguntaLower.includes(chave)) {
        const elemento = document.getElementById(mapaRespostas[chave]);
        if (elemento) {
          elemento.textContent = item.resposta;
        }
        break; // sai do loop após encontrar a correspondência
      }
    }
  });
});
