import { Link } from "react-router-dom";
import s from "./ForgotPassword.module.css";

export default function ForgotPassword() {
  return (
    <main className={s.screen} role="main">
      <button
        className={s.close}
        onClick={() => history.back()}
        aria-label="Fechar"
      >
        ×
      </button>

      {/* Logo + slogan */}
      <img
        className={s.logo}
        src="/brand/logo_nuza.png"
        alt="NUZA"
        onError={(e) => (e.currentTarget.style.display = "none")}
      />
      <p className={s.slogan}>Um sonho possível de realizar</p>

      {/* Título */}
      <h1 className={s.title}>Recuperação de senha</h1>
      <p className={s.subtitle}>Informe o E-mail ou CPF do usuário</p>

      {/* Form */}
      <form className={s.form} onSubmit={(e) => e.preventDefault()}>
        <input
          className={s.input}
          type="text"
          name="emailOrCpf"
          placeholder="E-mail ou CPF"
        />
        <Link to="/mensagem-esqueci-a-senha" className={s.btn}>
          Enviar
        </Link>
      </form>

      <Link to="/login" className={s.link}>
        Voltar ao login
      </Link>
    </main>
  );
}
