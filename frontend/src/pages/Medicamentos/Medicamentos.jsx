import React, { useEffect, useState } from "react";
import s from "./Medicamentos.module.css";

export default function Medicamentos() {
  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    carteiraSUS: "",
    medicamento: "",
    quantidade: 1,
    unidade: "",
    dataRetirada: "",
    observacoes: ""
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem("nuza.medicamentos.form");
      if (saved) setForm(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("nuza.medicamentos.form", JSON.stringify(form));
    } catch {}
  }, [form]);

  const handle = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: name === "quantidade" ? Number(value) : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Solicitação registrada!");
  };

  return (
    <div className={s.container}>
      <header className={s.header}>
        <img className={s.logo} src="/brand/logo_nuza.png" alt="NUZA" />
        <p className={s.subtitulo}><strong>Um sonho possível de realizar</strong></p>
      </header>

      <div className={s.box}>
        <h2 className={s.titulo}>Retirada de Medicamentos</h2>

        <form onSubmit={handleSubmit}>
          <div className={s.grid}>
            <div className={s.inputGroup}>
              <label className={s.label}>Nome completo</label>
              <input className={s.input} name="nome" value={form.nome} onChange={handle} required />
            </div>

            <div className={s.inputGroup}>
              <label className={s.label}>CPF</label>
              <input className={s.input} name="cpf" value={form.cpf} onChange={handle} />
            </div>

            <div className={s.inputGroup}>
              <label className={s.label}>Cartão do SUS</label>
              <input className={s.input} name="carteiraSUS" value={form.carteiraSUS} onChange={handle} />
            </div>

            <div className={s.inputGroup}>
              <label className={s.label}>Medicamento</label>
              <input className={s.input} name="medicamento" value={form.medicamento} onChange={handle} placeholder="Ex.: Dipirona 500mg" />
            </div>

            <div className={s.inputGroup}>
              <label className={s.label}>Quantidade</label>
              <input className={s.input} type="number" min="1" name="quantidade" value={form.quantidade} onChange={handle} />
            </div>

            <div className={s.inputGroup}>
              <label className={s.label}>Unidade</label>
              <input className={s.input} name="unidade" value={form.unidade} onChange={handle} placeholder="Ex.: Farmácia Central" />
            </div>

            <div className={s.inputGroup}>
              <label className={s.label}>Data da retirada</label>
              <input className={s.input} type="date" name="dataRetirada" value={form.dataRetirada} onChange={handle} />
            </div>

            <div className={s.inputGroupFull}>
              <label className={s.label}>Observações</label>
              <textarea className={s.textarea} name="observacoes" value={form.observacoes} onChange={handle} rows={4}></textarea>
            </div>
          </div>

          <div className={s.actions}>
            <button type="submit" className={s.botao}>Confirmar Retirada</button>
            <button type="button" className={s.botaoSec}
              onClick={() => { localStorage.removeItem("nuza.medicamentos.form"); alert("Rascunho limpo."); }}>
              Limpar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
