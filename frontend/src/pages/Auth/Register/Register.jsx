import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";

export default function Register() {
  // toggles de senha
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirma, setMostrarConfirma] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/mensagem-de-cadastro");
  };

  return (
    <div className={styles.container}>
      {/* Header com logo + frase */}
      <div className={styles.header}>
        <img className={styles.logo} src="/brand/logo_nuza.png" alt="NUZA" />
        <p className={styles.subtitulo}>Um sonho possível de realizar</p>
      </div>

      {/* Botão fechar (X) */}
      <button
        type="button"
        className={styles.closeBtn}
        onClick={() => history.back()}
        aria-label="Fechar"
        title="Fechar"
      >
        ×
      </button>

      {/* Formulário */}
      <form className={styles.form} onSubmit={handleSubmit}>
        <input type="email" placeholder="E-mail" className={styles.input} />
        <input type="email" placeholder="Confirme seu e-mail" className={styles.input} />

        {/* Senha com botão 🙉/🙈 */}
        <div className={styles.inputContainer}>
          <input
            type={mostrarSenha ? "text" : "password"}
            placeholder="Senha"
            className={styles.input}
          />
          <button
            type="button"
            className={styles.olho}
            onClick={() => setMostrarSenha((v) => !v)}
            aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
            title={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
          >
            {mostrarSenha ? "🙉" : "🙈"}
          </button>
        </div>

        {/* Confirmar senha com botão 🙉/🙈 */}
        <div className={styles.inputContainer}>
          <input
            type={mostrarConfirma ? "text" : "password"}
            placeholder="Confirme sua senha"
            className={styles.input}
          />
          <button
            type="button"
            className={styles.olho}
            onClick={() => setMostrarConfirma((v) => !v)}
            aria-label={mostrarConfirma ? "Ocultar senha" : "Mostrar senha"}
            title={mostrarConfirma ? "Ocultar senha" : "Mostrar senha"}
          >
            {mostrarConfirma ? "🙉" : "🙈"}
          </button>
        </div>

        <button type="submit" className={styles.btnCadastrar}>
          CADASTRE-SE
        </button>
      </form>
    </div>
  );
}
