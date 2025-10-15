import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ConfigPage.css";

export default function ConfigPage() {
  const [selected, setSelected] = useState("geral");
  const navigate = useNavigate();

  const renderContent = () => {
    switch (selected) {
      case "geral":
        return (
          <>
            <h2>Geral</h2>
            <ul className="options-list">
              <li>
                Tema Escuro <span className="link">Ativar</span>
              </li>
              <li>
                Idioma <span className="link">Alterar</span>
              </li>
              <li>
                Notificações <span className="link">Gerenciar</span>
              </li>
            </ul>
          </>
        );
      case "design":
        return (
          <>
            <h2>Design</h2>
            <ul className="options-list">
              <li>
                Cores do site <span className="link">Alterar cores</span>
              </li>
              <li>
                Fontes do site <span className="link">Alterar fontes</span>
              </li>
              <li>
                Layout do site <span className="link">Alterar layout</span>
              </li>
              <li>
                Botões <span className="link">Editar botões</span>
              </li>
              <li>
                Imagens <span className="link">Ajustar imagens</span>
              </li>
              <li>
                Formulários <span className="link">Ajustar</span>
              </li>
              <li>
                Favicon <span className="link">Trocar ícone</span>
              </li>
            </ul>
          </>
        );
      case "contas":
        return (
          <>
            <h2>Contas e E-mail</h2>
            <ul className="options-list">
              <li>
                Alterar senha <span className="link">Gerenciar</span>
              </li>
              <li>
                E-mail de recuperação <span className="link">Configurar</span>
              </li>
            </ul>
          </>
        );
      default:
        return <h2>Selecione uma opção no menu</h2>;
    }
  };

  return (
    <div className="config-layout">
      {/* Botão X pra voltar */}
      <button className="btn-fechar" onClick={() => navigate(-1)}>
        ✕
      </button>

      {/* Sidebar */}
      <aside className="sidebar">
        <h3>Configurações</h3>
        <ul>
          <li
            className={selected === "geral" ? "active" : ""}
            onClick={() => setSelected("geral")}
          >
            Geral
          </li>
          <li
            className={selected === "contas" ? "active" : ""}
            onClick={() => setSelected("contas")}
          >
            Contas e E-mail
          </li>
          <li
            className={selected === "design" ? "active" : ""}
            onClick={() => setSelected("design")}
          >
            Design
          </li>
        </ul>
      </aside>

      {/* Conteúdo */}
      <main className="content">{renderContent()}</main>
    </div>
  );
}
