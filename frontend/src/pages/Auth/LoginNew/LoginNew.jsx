import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

export default function LoginNew() {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const navigate = useNavigate();

  const handleEntrar = () => navigate("/usuario");

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {/* LOGO transparente, sem wrapper com fundo */}
        <img className={styles.logo} src="/brand/logo_nuza.png" alt="NUZA" />
        <p className={styles.subtitulo}>
          <strong>Um sonho possível de realizar</strong>
        </p>
      </div>

      <div className={styles.loginBox}>
        <h2 className={styles.loginTitulo}>Login</h2>

        <div className={styles.inputGroup}>
          <label htmlFor="user" className={styles.label}>
            Usuário
          </label>
          <input
            id="user"
            type="text"
            className={styles.input}
            placeholder="Seu usuário ou e-mail"
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="pass" className={styles.label}>
            Senha
          </label>
          <div className={styles.inputContainer}>
            <input
              id="pass"
              type={mostrarSenha ? "text" : "password"}
              className={styles.input}
              placeholder="Digite sua senha"
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
        </div>

        <button
          className={styles.botao}
          type="button"
          onClick={handleEntrar}
        >
          Entrar
        </button>

        <div className={styles.links}>
          <Link to="/cadastro" className={styles.link}>
            Cadastre-se
          </Link>
          <Link to="/esqueci-a-senha" className={styles.link}>
            Esqueci a senha
          </Link>
        </div>
      </div>
    </div>
  );
}
