import { execSync } from "child_process";
import fs from "fs";

if (!fs.existsSync("./node_modules")) {
  console.log("🧩 Instalando dependências...");
  execSync("npm install", { stdio: "inherit" });
  console.log("✅ Tudo pronto! Iniciando o servidor...");
} else {
  console.log("🚀 Dependências já instaladas. Iniciando o servidor...");
}
