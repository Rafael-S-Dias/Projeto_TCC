import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./RegisterSent.module.css";

const RegisterSent = () => {
  const navigate = useNavigate();

  // redireciona depois de 3 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 3000);

    // limpa o timer se o componente desmontar antes
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={styles.container}>
      {/* Logo centralizada */}
      <img className={styles.logo} src="/brand/logo_nuza.png" alt="NUZA" />
      <p className={styles.subtitulo}>
        <strong>Um sonho possível de realizar</strong>
      </p>

      <h2 className={styles.titulo}>Cadastro realizado com sucesso!</h2>

      <p className={styles.mensagem}>
        Seu cadastro foi efetuado com sucesso! <br />
        Você será redirecionado para a tela de login em instantes.
      </p>
    </div>
  );
};

export default RegisterSent;
