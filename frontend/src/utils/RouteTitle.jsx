import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function RouteTitle() {  // ✅ precisa do "default"
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    let titulo = "Nuza | Início";

    switch (path) {
      case "/":
        titulo = "Nuza | Início";
        break;
      case "/login":
        titulo = "Nuza | Login";
        break;
      case "/cadastro":
        titulo = "Nuza | Cadastro";
        break;
      case "/medico":
        titulo = "Nuza | Painel do Médico";
        break;
      case "/prontuariomedico":
        titulo = "Nuza | Prontuário Médico";
        break;
      case "/mapa-saude":
        titulo = "Nuza | Mapa de Saúde";
        break;
      case "/configuracoes":
        titulo = "Nuza | Configurações";
        break;
      default:
        const nome = path.replace("/", "");
        if (nome) titulo = `Nuza | ${nome.charAt(0).toUpperCase() + nome.slice(1)}`;
        break;
    }

    document.title = titulo;
  }, [location]);

  return null;
}
