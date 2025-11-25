document.addEventListener("DOMContentLoaded", () => {
  localStorage.removeItem("infosCadP1");
  localStorage.removeItem("infosCadP2");
  localStorage.removeItem("infosCadP3");
  const etapas = [
    {
      container: document.getElementById("etapa1"),
      step: document.getElementById("step1"),
      btnProximo: document.getElementById("btnProximo1"),
      map: {
        objetivo: "descricao",
        empresa: "empresa",
        status: "status",
        faixa: "faixaEtaria",
      },
      key: "infosCadP1",
    },
    {
      container: document.getElementById("etapa2"),
      step: document.getElementById("step2"),
      btnProximo: document.getElementById("btnProximo2"),
      map: {
        objetivo: "funcoes",
        empresa: "estadoCivil",
        status: "genero",
        faixa: "salario",
      },
      key: "infosCadP2",
    },
  ];

  const etapa3 = {
    container: document.getElementById("etapa3"),
    step: document.getElementById("step3"),
  };
  const btnPronto = document.getElementById("btnPronto");
  const btnLateral = document.getElementById("btnProsseguir");

  btnPronto.classList.add("inactive");

  function salvar(chave, novosDados) {
    const antigos = JSON.parse(localStorage.getItem(chave)) || {};
    const atualizados = { ...antigos, ...novosDados };
    localStorage.setItem(chave, JSON.stringify(atualizados));
    return atualizados;
  }

  function configurarEtapa(etapa) {
    const objetivo = etapa.container.querySelector("input, textarea");
    const faixa = etapa.container.querySelector("select");
    const empresaBtns = etapa.container.querySelectorAll(".empresa-btn");
    const statusBtns = etapa.container.querySelectorAll(".status-btn");
    let empresa = "",
      status = "";

    function validar() {
      etapa.btnProximo.disabled = !(objetivo.value && empresa && status && faixa.value);
    }

    objetivo.addEventListener("input", validar);
    faixa.addEventListener("change", validar);

    empresaBtns.forEach((btn) =>
      btn.addEventListener("click", () => {
        empresa = btn.dataset.valor;
        empresaBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        salvar(etapa.key, { [etapa.map.empresa]: empresa });
        validar();
      })
    );

    statusBtns.forEach((btn) =>
      btn.addEventListener("click", () => {
        status = btn.dataset.valor;
        statusBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        salvar(etapa.key, { [etapa.map.status]: status });
        validar();
      })
    );

    faixa.addEventListener("change", () => salvar(etapa.key, { [etapa.map.faixa]: faixa.value }));
    objetivo.addEventListener("input", () =>
      salvar(etapa.key, { [etapa.map.objetivo]: objetivo.value })
    );

    etapa.btnProximo.addEventListener("click", () => {
      const dadosSalvos = salvar(etapa.key, {
        [etapa.map.objetivo]: objetivo.value,
        [etapa.map.empresa]: empresa,
        [etapa.map.status]: status,
        [etapa.map.faixa]: faixa.value,
      });

      // --- LOG apenas ao passar para a próxima etapa ---
      console.log(`Etapa concluída (${etapa.key}):`, dadosSalvos);

      etapa.container.classList.add("hidden");
      const nextStepIndex = etapas.indexOf(etapa) + 1;
      if (etapas[nextStepIndex]) {
        etapas[nextStepIndex].container.classList.remove("hidden");
        etapas[nextStepIndex].step.classList.add("active");
      } else {
        etapa3.container.classList.remove("hidden");
        etapa3.step.classList.add("active");
      }
      etapa.step.classList.add("completed");
    });
  }

  etapas.forEach(configurarEtapa);

  let spriteItems = document.querySelectorAll(".sprite-item");
  let spriteSelecionado = JSON.parse(localStorage.getItem("infosCadP3"))?.sprite || null;
  if (spriteSelecionado != null) {
    spriteItems.forEach((item) => {
      let img = item.querySelector("img");
      if (img && img.src === spriteSelecionado) item.classList.add("selected");
    });
    spriteSelecionado = JSON.parse(localStorage.getItem("infosCadP3"))?.sprite;
    btnPronto.disabled = false;
    btnLateral.disabled = false;
    btnLateral.classList.add("active");
    btnLateral.onclick = () => (window.location.href = "perguntas.html");
  } else {
  }

  spriteItems.forEach((item) => {
    item.addEventListener("click", () => {
      spriteItems.forEach((i) => i.classList.remove("selected"));
      item.classList.add("selected");
      const img = item.querySelector("img");
      if (img) spriteSelecionado = img.src;
      salvar("infosCadP3", { sprite: spriteSelecionado });

      console.log("Sprite selecionado (infosCadP3):", spriteSelecionado);

      btnPronto.disabled = false;
    });
  });

  btnPronto.addEventListener("click", () => {
    btnLateral.disabled = false;
    btnLateral.classList.add("active");
    btnLateral.onclick = () => (window.location.href = "perguntas.html");
  });

  window.scrollCarousel = function (direction) {
    const gallery = document.getElementById("spriteGallery");
    gallery.scrollBy({ left: direction * 120, behavior: "smooth" });
  };
});
