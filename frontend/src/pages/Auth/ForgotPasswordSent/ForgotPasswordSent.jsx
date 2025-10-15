import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import s from "./ForgotPasswordSent.module.css";

export default function ForgotPasswordSent() {
  const navigate = useNavigate();

  // redireciona após 3 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 3000);

    return () => clearTimeout(timer); // limpa se desmontar antes
  }, [navigate]);

  return (
    <main className={s.screen} role="status" aria-live="polite">
      <img className={s.logo} src="/brand/logo_nuza.png" alt="NUZA" />
      <p className={s.subtitulo}>
        <strong>Um sonho possível de realizar</strong>
      </p>
      <p className={s.message}>
        Um link de recuperação de senha foi enviado para seu E-mail
      </p>
      <p className={s.message}>
        Você será redirecionado para o login em instantes...
      </p>
    </main>
  );
}
