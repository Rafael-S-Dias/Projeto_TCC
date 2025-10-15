import React, { useState, useEffect } from "react";
import s from "./TelaAlterar.module.css";
import { useNavigate } from "react-router-dom";

import openEyeIcon from '../../icons/open-eye.png';
import closeEyeIcon from '../../icons/close-eye.png';


export default function TelaAlterar() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nomeCompleto: "",
    dataNascimento: "",
    sexo: "",
    cpf: "",
    rg: "",
    nomePai: "",
    nomeMae: "",
    logradouro: "",
    numero: "",
    cep: "",
    cidade: "",
    complemento: "",
    emailContato: "",
    telefone: "",
    celular: "",
    emailLogin: "",
    confirmarEmailLogin: "",
    senha: "",
    confirmarSenha: "",
  });

  const [passwordsVisible, setPasswordsVisible] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (form.confirmarEmailLogin && form.emailLogin !== form.confirmarEmailLogin) {
      setEmailError("Os e-mails não são iguais.");
    } else {
      setEmailError("");
    }
  }, [form.emailLogin, form.confirmarEmailLogin]);

  useEffect(() => {
    if (form.confirmarSenha && form.senha !== form.confirmarSenha) {
      setPasswordError("As senhas não são iguais.");
    } else {
      setPasswordError("");
    }
  }, [form.senha, form.confirmarSenha]);

  const handle = (e) => {
    const { name, value } = e.target;
    let processedValue = value;

    switch (name) {
      case "nomeCompleto":
      case "nomePai":
      case "nomeMae":
      case "cidade":
        processedValue = value.replace(/[0-9]/g, "");
        break;
      case "cpf":
        processedValue = value.replace(/\D/g, "").slice(0, 11).replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        break;
      case "rg":
        processedValue = value
          .replace(/\D/g, "")
          .slice(0, 10)
          .replace(/(\d{2})(\d)/, "$1.$2")
          .replace(/(\d{3})(\d)/, "$1.$2")
          .replace(/(\d{3})(\d{2})$/, "$1-$2");
        break;
      case "cep":
        processedValue = value.replace(/\D/g, "").slice(0, 8).replace(/(\d{5})(\d)/, "$1-$2");
        break;
      case "telefone":
        processedValue = value
          .replace(/\D/g, "")
          .slice(0, 10)
          .replace(/(\d{2})(\d)/, "($1) $2")
          .replace(/(\d{4})(\d{4})$/, "$1-$2");
        break;
      case "celular":
        processedValue = value
          .replace(/\D/g, "")
          .slice(0, 11)
          .replace(/(\d{2})(\d)/, "($1) $2")
          .replace(/(\d{4,5})(\d{4})$/, "$1-$2");
        break;
      case "numero":
        processedValue = value.replace(/\D/g, "");
        break;
      default:
        break;
    }

    setForm((f) => ({ ...f, [name]: processedValue }));
  };

  const togglePasswordVisibility = () => {
    setPasswordsVisible(prevVisible => !prevVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (form.emailLogin !== form.confirmarEmailLogin) {
      setEmailError("Os e-mails precisam ser iguais para continuar.");
      return;
    }
    
    if (form.senha !== form.confirmarSenha) {
      setPasswordError("As senhas precisam ser iguais para continuar.");
      return;
    }

    setShowSuccessModal(true);
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    navigate('/alterar-usuario');
  };
  
  const handleClose = () => {
    navigate('/funcionario');
  };

  return (
    <div className={s.container}>
      <div className={s.closeButton} onClick={handleClose} title="Fechar">&times;</div>
      <header className={s.header}>
        <img className={s.logo} src="/brand/logo_nuza.png" alt="NUZA" />
        <p className={s.subtitulo}><strong>Um sonho possível de realizar</strong></p>
      </header>
      <form className={s.box} onSubmit={handleSubmit}>
        <div className={s.mainGrid}>
            <section className={s.formSection}>
                <h3 className={s.sectionTitle}>Dados do paciente</h3>
                <div className={s.fieldsGrid}>
                    <div className={s.inputGroup}><label className={s.label}>Data de Nascimento</label><input className={s.input} type="date" name="dataNascimento" value={form.dataNascimento} onChange={handle} /></div>
                    <div className={s.inputGroup}><label className={s.label}>Sexo</label><select className={s.select} name="sexo" value={form.sexo} onChange={handle}><option value="" disabled>Selecione</option><option value="masculino">Masculino</option><option value="feminino">Feminino</option><option value="outro">Outro</option></select></div>
                    <div className={s.inputGroup}><label className={s.label}>CPF</label><input className={s.input} name="cpf" value={form.cpf} onChange={handle} placeholder="000.000.000-00" /></div>
                    <div className={s.inputGroup}><label className={s.label}>RG</label><input className={s.input} name="rg" value={form.rg} onChange={handle} placeholder="00.000.000-00" /></div>
                    <div className={s.inputGroupFull}><label className={s.label}>Nome Completo</label><input className={s.input} name="nomeCompleto" value={form.nomeCompleto} onChange={handle} placeholder="Nome completo do paciente" /></div>
                    <div className={s.inputGroupFull}><label className={s.label}>Nome do Pai</label><input className={s.input} name="nomePai" value={form.nomePai} onChange={handle} placeholder="Nome completo do pai" /></div>
                </div>
            </section>
            
            <section className={s.formSection}>
                {/* ========================================================= */}
                {/* === TÍTULO ADICIONADO AQUI PARA GARANTIR O ALINHAMENTO === */}
                {/* ========================================================= */}
                <h3 className={s.sectionTitle}>󠀡󠀡󠀡</h3>
                <div className={s.fieldsGridSingle}>
                    <div className={s.inputGroupFull}><label className={s.label}>E-mail de Contato</label><input className={s.input} type="email" name="emailContato" value={form.emailContato} onChange={handle} placeholder="contato@email.com" /></div>
                    <div className={s.inputGroupFull}><label className={s.label}>Telefone Fixo</label><input className={s.input} name="telefone" value={form.telefone} onChange={handle} placeholder="(00) 0000-0000" /></div>
                    <div className={s.inputGroupFull}><label className={s.label}>Celular</label><input className={s.input} name="celular" value={form.celular} onChange={handle} placeholder="(00) 00000-0000" /></div>
                    <div className={s.inputGroupFull}><label className={s.label}>Nome da Mãe</label><input className={s.input} name="nomeMae" value={form.nomeMae} onChange={handle} placeholder="Nome completo da mãe" /></div>
                </div>
            </section>

            <section className={s.formSection}>
                <h3 className={s.sectionTitle}>Endereço</h3>
                 <div className={s.fieldsGrid}>
                    <div className={s.inputGroupFull}><label className={s.label}>Logradouro</label><input className={s.input} name="logradouro" value={form.logradouro} onChange={handle} placeholder="Ex: Rua, Avenida..." /></div>
                    <div className={s.inputGroup}><label className={s.label}>Número</label><input className={s.input} name="numero" value={form.numero} onChange={handle} placeholder="123" /></div>
                    <div className={s.inputGroup}><label className={s.label}>CEP</label><input className={s.input} name="cep" value={form.cep} onChange={handle} placeholder="00000-000" /></div>
                    <div className={s.inputGroupFull}><label className={s.label}>Cidade</label><input className={s.input} name="cidade" value={form.cidade} onChange={handle} placeholder="Sua cidade" /></div>
                    <div className={s.inputGroupFull}><label className={s.label}>Complemento</label><input className={s.input} name="complemento" value={form.complemento} onChange={handle} placeholder="Apto, Bloco, etc." /></div>
                </div>
            </section>
            
            <section className={s.formSection}>
                <h3 className={s.sectionTitle}>Login</h3>
                <div className={s.fieldsGridSingle}>
                    <div className={s.inputGroupFull}><label className={s.label}>E-mail de Login</label><input className={s.input} type="email" name="emailLogin" value={form.emailLogin} onChange={handle} placeholder="login@email.com" /></div>
                    <div className={s.inputGroupFull}>
                      <label className={s.label}>Confirme o E-mail</label>
                      <input className={s.input} type="email" name="confirmarEmailLogin" value={form.confirmarEmailLogin} onChange={handle} placeholder="Repita o e-mail de login" />
                      <p className={s.errorMessage}>{emailError}</p>
                    </div>
                    
                    <div className={s.inputGroupFull}>
                      <label className={s.label}>Senha</label>
                      <div className={s.passwordWrapper}>
                        <input 
                          className={s.input} 
                          type={passwordsVisible ? "text" : "password"} 
                          name="senha" 
                          value={form.senha} 
                          onChange={handle} 
                          placeholder="Senha" 
                        />
                        <button type="button" className={s.passwordToggle} onClick={togglePasswordVisibility}>
                          <img 
                            src={passwordsVisible ? openEyeIcon : closeEyeIcon}
                            alt="Mostrar ou ocultar senha"
                            className={s.passwordToggleIcon}
                          />
                        </button>
                      </div>
                    </div>
                    
                    <div className={s.inputGroupFull}>
                      <label className={s.label}>Confirme a Senha</label>
                      <div className={s.passwordWrapper}>
                        <input 
                          className={s.input} 
                          type={passwordsVisible ? "text" : "password"} 
                          name="confirmarSenha" 
                          value={form.confirmarSenha} 
                          onChange={handle} 
                          placeholder="Repita a senha"
                        />
                        <button type="button" className={s.passwordToggle} onClick={togglePasswordVisibility}>
                          <img
                            src={passwordsVisible ? openEyeIcon : closeEyeIcon}
                            alt="Mostrar ou ocultar senha"
                            className={s.passwordToggleIcon}
                          />
                        </button>
                      </div>
                      <p className={s.errorMessage}>{passwordError}</p>
                    </div>
                </div>
            </section>
        </div>

        <div className={s.actions}>
            <button type="submit" className={s.botao}>Alterar</button>
        </div>
      </form>

      {showSuccessModal && (
        <div className={s.modalOverlay}>
          <div className={s.modalContent}>
            <h2 className={s.modalTitle}>Sucesso!</h2>
            <p className={s.modalMessage}>Usuário alterado com sucesso.</p>
            <button onClick={handleModalClose} className={s.botao}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}