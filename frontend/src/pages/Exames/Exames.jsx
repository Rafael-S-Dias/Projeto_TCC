import React, { useEffect, useState } from "react";
import s from "./Exames.module.css";

export default function Exames() {
  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    dataNascimento: "",
    telefone: "",
    email: "",
    unidade: "",
    exame: "",
    data: "",
    horario: "",
    observacoes: "",
    sexo: "",               // ✅ adicionado
  });

  // rascunho local
  useEffect(() => {
    try {
      const saved = localStorage.getItem("nuza.exames.form");
      if (saved) setForm(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("nuza.exames.form", JSON.stringify(form));
    } catch {}
  }, [form]);

  const handle = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Agendamento enviado!");
    // aqui você chama o backend
  };

  return (
    <div className={s.container}>
      {/* Header igual ao Login */}
      <header className={s.header}>
        <img className={s.logo} src="/brand/logo_nuza.png" alt="NUZA" />
        <p className={s.subtitulo}>
          <strong>Um sonho possível de realizar</strong>
        </p>
      </header>

      {/* Card do formulário */}
      <div className={s.box}>
        <h2 className={s.titulo}>Agendamento de Exames</h2>

        <form onSubmit={handleSubmit}>
          <div className={s.grid}>
            <div className={s.inputGroup}>
              <label className={s.label}>Nome completo</label>
              <input
                className={s.input}
                name="nome"
                value={form.nome}
                onChange={handle}
                placeholder="Ex.: Maria Silva"
                required
              />
            </div>

            <div className={s.inputGroup}>
              <label className={s.label}>CPF</label>
              <input
                className={s.input}
                name="cpf"
                value={form.cpf}
                onChange={handle}
                placeholder="000.000.000-00"
              />
            </div>

            <div className={s.inputGroup}>
              <label className={s.label}>Data de nascimento</label>
              <input
                className={s.input}
                type="date"
                name="dataNascimento"
                value={form.dataNascimento}
                onChange={handle}
              />
            </div>

            <div className={s.inputGroup}>
              <label className={s.label}>Telefone</label>
              <input
                className={s.input}
                name="telefone"
                value={form.telefone}
                onChange={handle}
                placeholder="(00) 00000-0000"
              />
            </div>

            <div className={s.inputGroup}>
              <label className={s.label}>E-mail</label>
              <input
                className={s.input}
                type="email"
                name="email"
                value={form.email}
                onChange={handle}
                placeholder="email@exemplo.com"
              />
            </div>

            <div className={s.inputGroup}>
              <label className={s.label}>Unidade</label>
              <input
                className={s.input}
                name="unidade"
                value={form.unidade}
                onChange={handle}
                placeholder="Escolha a unidade"
              />
            </div>

            <div className={s.inputGroup}>
              <label className={s.label}>Exame</label>
              <input
                className={s.input}
                name="exame"
                value={form.exame}
                onChange={handle}
                placeholder="Ex.: Hemograma completo"
              />
            </div>

            <div className={s.inputGroup}>
              <label className={s.label}>Data</label>
              <input
                className={s.input}
                type="date"
                name="data"
                value={form.data}
                onChange={handle}
              />
            </div>

            <div className={s.inputGroup}>
              <label className={s.label}>Horário</label>
              <input
                className={s.input}
                type="time"
                name="horario"
                value={form.horario}
                onChange={handle}
              />
            </div>

            {/* ✅ Sexo igual ao da Consulta */}
            <div className={s.inputGroup}>
              <label className={s.label}>Sexo</label>
              <select
                className={s.select}
                name="sexo"
                value={form.sexo}
                onChange={handle}
                required
              >
                <option value="" disabled hidden>Sexo</option>
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
                <option value="outro">Outro</option>
              </select>
            </div>

            <div className={s.inputGroupFull}>
              <label className={s.label}>Observações</label>
              <textarea
                className={s.textarea}
                name="observacoes"
                value={form.observacoes}
                onChange={handle}
                rows={4}
                placeholder="Alguma informação adicional?"
              />
            </div>
          </div>

          <div className={s.actions}>
            <button type="submit" className={s.botao}>Agendar</button>
            <button
              type="button"
              className={s.botaoSec}
              onClick={() => {
                localStorage.removeItem("nuza.exames.form");
                setForm({
                  nome: "",
                  cpf: "",
                  dataNascimento: "",
                  telefone: "",
                  email: "",
                  unidade: "",
                  exame: "",
                  data: "",
                  horario: "",
                  observacoes: "",
                  sexo: "",
                });
              }}
            >
              Limpar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
