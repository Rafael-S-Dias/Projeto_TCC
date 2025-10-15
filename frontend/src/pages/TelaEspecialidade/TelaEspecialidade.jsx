import React from "react";
import { useNavigate } from "react-router-dom";
import "./TelaEspecialidade.modelo.css";

export default function TelaEspecialidade() {
  const navigate = useNavigate();

  // Lista de especialidades
  const especialidades = [
    { nome: "Neuropediatra", label: "Neuropediatra" },
    { nome: "Psiquiatra-infantil", label: "Psiquiatra Infantil" },
    { nome: "Psicologo", label: "Psicólogo" },
    { nome: "Fonoaudiologo", label: "Fonoaudiólogo" },
    { nome: "Terapeuta-ocupacional", label: "Terapeuta Ocupacional" },
    { nome: "Fisioterapeuta", label: "Fisioterapeuta" },
    { nome: "Psicopedagogo", label: "Psicopedagogo" },
    { nome: "Musicoterapeuta", label: "Musicoterapeuta" },
  ];

  return (
    <div className="container">
      {/* Logo + frase como no Login */}
      <img className="logo" src="/brand/logo_nuza.png" alt="NUZA" />
      <p className="subtitulo"><strong>Um sonho possível de realizar</strong></p>

      {/* Título */}
      <h2 className="title">Especializações</h2>

      {/* Botões */}
      <div className="buttons">
        {especialidades.map((esp) => (
          <button
            key={esp.nome}
            type="button"
            className="btn-especialidade"
            onClick={() =>
              navigate(`/DetalheEspecialidade/${encodeURIComponent(esp.nome)}`)
            }
            aria-label={`Abrir ${esp.label}`}
          >
            {esp.label}
          </button>
        ))}
      </div>
    </div>
  );
}
