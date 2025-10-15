import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./RetornoPaciente.css";

const Logo = () => (
  <div className="rp-logo-wrap">
    <img
      src="/brand/logo_nuza.png"
      alt="NUZA"
      className="rp-logo-img"
      onError={(e) => {
        e.currentTarget.style.display = "none";
        const fb = e.currentTarget.nextElementSibling;
        if (fb) fb.style.display = "inline-flex";
      }}
    />
    <span className="rp-logo-fallback" aria-hidden="true">NUZA</span>
  </div>
);

export default function RetornoPaciente() {
  const [form, setForm] = useState({
    paciente: "",
    especialidade: "",
    data: "",
    observacoes: "",
  });

  // Lista de retornos marcados (compartilhado entre médico e funcionário)
  const [agendados, setAgendados] = useState([]);

  const STORAGE_KEY = "retornos_agendados";

  // Carrega os agendados ao abrir a tela
  useEffect(() => {
    try {
      const arr = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      setAgendados(Array.isArray(arr) ? arr : []);
    } catch {
      setAgendados([]);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  // Agora marca diretamente (não há mais solicitação ao funcionário)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.paciente || !form.especialidade || !form.data) {
      alert("Preencha nome do paciente, especialidade e data.");
      return;
    }

    const novoRetorno = {
      id: crypto.randomUUID(),
      paciente: form.paciente.trim(),
      especialidade: form.especialidade,
      data: form.data, // ISO de <input type="date">
      observacoes: form.observacoes?.trim() || "",
      criadoEm: new Date().toISOString(),
    };

    // salva no storage compartilhado
    const atual = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    atual.push(novoRetorno);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(atual));
    setAgendados(atual);

    alert("Retorno marcado com sucesso!");
    setForm({ paciente: "", especialidade: "", data: "", observacoes: "" });
  };

  const temAgendados = agendados.length > 0;

  return (
    <div className="rp-screen">
      <div className="rp-statusbar" />

      <header className="rp-header">
        <Logo />
        <p className="rp-slogan">Agendar retorno do paciente</p>
      </header>

      <main className="rp-main">
        {/* FORMULÁRIO */}
        <form className="rp-form" onSubmit={handleSubmit}>
          <div className="rp-field">
            <label>Nome do Paciente</label>
            <input
              type="text"
              name="paciente"
              value={form.paciente}
              onChange={handleChange}
              placeholder="Digite o nome do paciente"
              required
            />
          </div>

          <div className="rp-field">
            <label>Especialidade</label>
            <select
              name="especialidade"
              value={form.especialidade}
              onChange={handleChange}
              required
            >
              <option value="">Selecione</option>
              <option value="Pediatria">Pediatria</option>
              <option value="Neurologia">Neurologia</option>
              <option value="Clínico Geral">Clínico Geral</option>
              <option value="Psicologia">Psicologia</option>
              <option value="Fonoaudiologia">Fonoaudiologia</option>
              <option value="Terapia Ocupacional">Terapia Ocupacional</option>
            </select>
          </div>

          <div className="rp-field">
            <label>Data do Retorno</label>
            <input
              type="date"
              name="data"
              value={form.data}
              onChange={handleChange}
              required
            />
          </div>

          <div className="rp-field">
            <label>Observações</label>
            <textarea
              name="observacoes"
              value={form.observacoes}
              onChange={handleChange}
              placeholder="Ex: Revisar exames, avaliação de evolução..."
              rows={3}
            />
          </div>

          <button type="submit" className="rp-submit">
            Marcar Retorno
          </button>
        </form>

        {/* VISUALIZAR RETORNOS */}
        <section className="rp-list-wrap">
          <h3 className="rp-list-title">Retornos Agendados</h3>

          {!temAgendados ? (
            <div className="rp-empty">
              <p>Não há retornos agendados ainda.</p>
            </div>
          ) : (
            <div className="rp-table">
              <div className="rp-thead">
                <div>Paciente</div>
                <div>Especialidade</div>
                <div>Data</div>
                <div>Observações</div>
              </div>

              <div className="rp-tbody">
                {agendados.map((r) => (
                  <div key={r.id} className="rp-row">
                    <div className="rp-col rp-col-paciente">{r.paciente}</div>
                    <div className="rp-col">{r.especialidade}</div>
                    <div className="rp-col">
                      {r.data ? new Date(r.data).toLocaleDateString("pt-BR") : "—"}
                    </div>
                    <div className="rp-col rp-col-obs">{r.observacoes || "—"}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        <div className="rp-actions">
          <Link to="/medico" className="rp-back-btn">← Voltar ao Painel Médico</Link>
        </div>
      </main>

      <footer className="rp-bottom-shadow" />
    </div>
  );
}
