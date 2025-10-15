import React from "react";
import { Link } from "react-router-dom";
import { Component } from "../../../components/legacy/Component";
import { PropertyDefaultWrapper } from "../../../components/legacy/PropertyDefaultWrapper";
import styles from "./Login.module.css";
import image27 from "../../../assets/imgs/image-27-1.png";

const Login = () => {
  return (
    <div className={styles.login}>
      <div className={styles["overlap_group_wrapper"]}>
        <div className={styles["overlap_group_2"]}>
          <div className={styles["rectangle_fundo"]} />

          <div className={styles["rectangle_incolor"]} />

          <Link className={styles["esqueci_a_senha_2"]} to="/esqueci_a_senha">
            {" "}
            Esqueci a senha
          </Link>

          <div className={styles["text_wrapper_18"]}>Cadastre-se</div>

          <div className={styles["login_cima"]}>Login</div>

          <div className={styles.imagem}>
            <img
              className={styles["design_sem_nome"]}
              alt="Design sem nome"
              src="/img/design_sem_nome_2_1_1.png"
            />
          </div>

          <img className={styles["line_3"]} alt="Line" src="/img/line_1-7.svg" />

          <img className={styles["line_4"]} alt="Line" src="/img/line_1-7.svg" />

          <div className={styles["div_wrapper"]}>
            <div className={styles["text_wrapper_19"]}>Login</div>
          </div>

          <Component className={styles["component_1"]} property1="default" />
          <PropertyDefaultWrapper className={styles["component_3"]} property1="default" />
          <p className={styles["text_wrapper_20"]}>Um sonho possivel de realizar</p>

          <img className={styles["image_2"]} alt="" src={image27} />
        </div>
      </div>
    </div>
  );
};

export default Login;
