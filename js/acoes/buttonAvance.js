function botao() {
  const buttonAvan = document.querySelector(".areaButton button");
  const nav = document.querySelector(".areaButton a");
  const buttonIcon = document.querySelector(".areaButton button i");

  buttonAvan.disabled = false;
  buttonAvan.style.backgroundColor = "#1b1a";
  buttonIcon.className = "fa-solid fa-unlock";
  nav.setAttribute("href", "escolherFinal.html");
}

export { botao };
