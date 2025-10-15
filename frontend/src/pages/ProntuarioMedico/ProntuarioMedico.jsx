import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./ProntuarioMedico.css";

const onlyDigits = (v = "") => v.replace(/\D+/g, "");

const formatCPF = (v) => {
  const d = onlyDigits(v).slice(0, 11);
  return d
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1-$2");
};

const formatPhoneBR = (v) => {
  const d = onlyDigits(v).slice(0, 11);
  if (d.length <= 10) {
    return d
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d{1,4})$/, "$1-$2");
  }
  return d
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d{1,4})$/, "$1-$2");
};

export default function ProntuarioMedico() {
  const [dados, setDados] = useState(() => {
    const salvo = localStorage.getItem("prontuario-medico");
    return salvo
      ? JSON.parse(salvo)
      : {
          nome: "",
          cpf: "",
          idade: "",
          sexo: "",
          tipoSanguineo: "",
          peso: "",
          altura: "",
          telefone: "",
          email: "",
          endereco: "",
          alergias: "",
          medicamentos: "",
          historico: "",
          exames: "",
          vacinas: "",
          diagnostico: "",
          observacoes: "",
        };
  });

  const [editando, setEditando] = useState(true);
  const [erros, setErros] = useState({});
  const [justSaved, setJustSaved] = useState(false);   // ✅ banner de sucesso
  const topRef = useRef(null);                         // ✅ rolar para o topo

  useEffect(() => {
    localStorage.setItem("prontuario-medico", JSON.stringify(dados));
  }, [dados]);

  const imc = useMemo(() => {
  const peso = parseFloat(String(dados.peso).replace(",", "."));
  let altura = parseFloat(String(dados.altura).replace(",", "."));
  if (!peso || !altura) return null;

  // Se for menor que 3, assume que está em metros (ex: 1.70)
  if (altura < 3) {
    return (peso / (altura * altura)).toFixed(1);
  }

  // Caso contrário, assume cm (ex: 170)
  const alturaM = altura / 100;
  return (peso / (alturaM * alturaM)).toFixed(1);
}, [dados.peso, dados.altura]);


  const statusIMC = useMemo(() => {
    if (!imc) return "";
    const n = parseFloat(imc);
    if (n < 18.5) return "Abaixo do peso";
    if (n < 25) return "Normal";
    if (n < 30) return "Sobrepeso";
    return "Obesidade";
  }, [imc]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let v = value;

    if (name === "cpf") v = formatCPF(value);
    if (name === "telefone") v = formatPhoneBR(value);
    if (name === "peso" || name === "altura" || name === "idade") {
      v = value.replace(/[^\d.,]/g, ""); // aceita nº e vírgula/ponto
    }
    setDados((prev) => ({ ...prev, [name]: v }));
  };

  const validar = () => {
    const e = {};
    if (!dados.nome?.trim()) e.nome = "Informe o nome completo.";
    const cpfDigits = onlyDigits(dados.cpf);
    if (cpfDigits.length !== 11) e.cpf = "CPF inválido.";
    if (dados.email && !/^\S+@\S+\.\S+$/.test(dados.email)) e.email = "E-mail inválido.";
    const telDigits = onlyDigits(dados.telefone);
    if (telDigits && (telDigits.length < 10 || telDigits.length > 11)) e.telefone = "Telefone inválido.";
    setErros(e);
    return Object.keys(e).length === 0;
  };

  const salvar = () => {
    if (!validar()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setEditando(false);       // ✅ muda para visualização
    setJustSaved(true);       // ✅ mostra banner
    // rola pro topo para ver o banner/visualização
    setTimeout(() => {
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
    // oculta banner após 2.5s
    setTimeout(() => setJustSaved(false), 2500);
  };

  const editarNovamente = () => setEditando(true);

  return (
    <div className="prontuario">
      <header className="prontuario-header">
        <img src="/brand/logo_nuza.png" alt="Nuza" className="prontuario-logo" />
        <div className="prontuario-ident">
          <strong>Prontuário Médico</strong>
          <p>NUZA - Sistema de Saúde</p>
        </div>
      </header>

      <main className="prontuario-main" ref={topRef}>
        {justSaved && (
          <div className="save-banner" role="status" aria-live="polite">
            ✅ Prontuário salvo com sucesso. Você está no modo visualização.
          </div>
        )}

        <div className="prontuario-section">
          <h3>Informações do Paciente</h3>

          {editando ? (
            <>
              <div className="form-grid">
                <div className="field">
                  <input name="nome" value={dados.nome} onChange={handleChange} placeholder="Nome completo" />
                  {erros.nome && <span className="field-error">{erros.nome}</span>}
                </div>

                <div className="field">
                  <input name="cpf" value={dados.cpf} onChange={handleChange} placeholder="CPF" />
                  {erros.cpf && <span className="field-error">{erros.cpf}</span>}
                </div>

                <div className="field">
                  <input name="idade" value={dados.idade} onChange={handleChange} placeholder="Idade" />
                </div>

                <div className="field">
                  <select name="sexo" value={dados.sexo} onChange={handleChange}>
                    <option value="">Sexo</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                    <option value="Outro">Outro</option>
                  </select>
                </div>

                <div className="field">
                  <input name="tipoSanguineo" value={dados.tipoSanguineo} onChange={handleChange} placeholder="Tipo Sanguíneo (ex: O+)" />
                </div>

                <div className="field">
                  <input name="peso" value={dados.peso} onChange={handleChange} placeholder="Peso (kg)" />
                </div>

                <div className="field">
                  <input name="altura" value={dados.altura} onChange={handleChange} placeholder="Altura (cm)" />
                </div>

                <div className="field">
                  <input name="telefone" value={dados.telefone} onChange={handleChange} placeholder="Telefone" />
                  {erros.telefone && <span className="field-error">{erros.telefone}</span>}
                </div>

                <div className="field field-wide">
                  <input name="email" value={dados.email} onChange={handleChange} placeholder="E-mail" />
                  {erros.email && <span className="field-error">{erros.email}</span>}
                </div>

                <div className="field field-wide">
                  <input name="endereco" value={dados.endereco} onChange={handleChange} placeholder="Endereço completo" />
                </div>
              </div>

              <div className="imc-chip" aria-live="polite">
                {imc ? <>IMC: <strong>{imc}</strong> — {statusIMC}</> : "IMC: —"}
              </div>
            </>
          ) : (
            <>
              <ul className="dados-lista">
                <li><strong>Nome:</strong> {dados.nome}</li>
                <li><strong>CPF:</strong> {dados.cpf}</li>
                <li><strong>Idade:</strong> {dados.idade}</li>
                <li><strong>Sexo:</strong> {dados.sexo}</li>
                <li><strong>Tipo Sanguíneo:</strong> {dados.tipoSanguineo}</li>
                <li><strong>Peso:</strong> {dados.peso} kg</li>
                <li><strong>Altura:</strong> {dados.altura} cm</li>
                <li><strong>Telefone:</strong> {dados.telefone}</li>
                <li><strong>E-mail:</strong> {dados.email}</li>
                <li><strong>Endereço:</strong> {dados.endereco}</li>
              </ul>
              <div className="imc-chip">{imc ? <>IMC: <strong>{imc}</strong> — {statusIMC}</> : "IMC: —"}</div>
            </>
          )}
        </div>

        <div className="prontuario-grid">
          <section>
            <h3>Alergias</h3>
            {editando ? (
              <textarea name="alergias" value={dados.alergias} onChange={handleChange} placeholder="Descreva alergias conhecidas..." />
            ) : (<p>{dados.alergias || "— Sem registros"}</p>)}
          </section>

          <section>
            <h3>Medicamentos em uso</h3>
            {editando ? (
              <textarea name="medicamentos" value={dados.medicamentos} onChange={handleChange} placeholder="Informe os medicamentos que o paciente utiliza..." />
            ) : (<p>{dados.medicamentos || "— Sem registros"}</p>)}
          </section>

          <section>
            <h3>Histórico Clínico</h3>
            {editando ? (
              <textarea name="historico" value={dados.historico} onChange={handleChange} placeholder="Relate doenças prévias, cirurgias, internações..." />
            ) : (<p>{dados.historico || "— Sem registros"}</p>)}
          </section>

          <section>
            <h3>Diagnóstico Atual</h3>
            {editando ? (
              <textarea name="diagnostico" value={dados.diagnostico} onChange={handleChange} placeholder="Diagnóstico médico atual..." />
            ) : (<p>{dados.diagnostico || "— Sem registros"}</p>)}
          </section>

          <section>
            <h3>Exames</h3>
            {editando ? (
              <textarea name="exames" value={dados.exames} onChange={handleChange} placeholder="Resultados ou observações de exames..." />
            ) : (<p>{dados.exames || "— Sem registros"}</p>)}
          </section>

          <section>
            <h3>Vacinas</h3>
            {editando ? (
              <textarea name="vacinas" value={dados.vacinas} onChange={handleChange} placeholder="Vacinas aplicadas e datas..." />
            ) : (<p>{dados.vacinas || "— Sem registros"}</p>)}
          </section>

          <section>
            <h3>Observações Gerais</h3>
            {editando ? (
              <textarea name="observacoes" value={dados.observacoes} onChange={handleChange} placeholder="Observações médicas, condutas ou recomendações..." />
            ) : (<p>{dados.observacoes || "— Sem registros"}</p>)}
          </section>
        </div>

        <div className="prontuario-actions">
          {editando ? (
            <button className="salvar-btn" onClick={salvar}>💾 Salvar Prontuário</button>
          ) : (
            <div className="view-actions">
              <button className="editar-btn" onClick={editarNovamente}>✏️ Editar</button>
              <Link to="/medico" className="voltar-btn">← Voltar para Tela do Médico</Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
