import { useEffect, useMemo, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./prontuariofuncionario.css"
import h from "../Home/Home.module.css"

const onlyDigits = (v) => (v || "").replace(/\D/g, "")
const STORAGE_KEY = "nuza.prontuarioFuncionarios.recentes"

export default function ProntuarioFuncionario() {
  const [modoBusca, setModoBusca] = useState("cpf")
  const [termo, setTermo] = useState("")
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState("")
  const [resultado, setResultado] = useState(null)
  const [recentes, setRecentes] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setRecentes(JSON.parse(raw))
    } catch {}
  }, [])

  const salvarRecente = (item) => {
    try {
      const data = [
        item,
        ...recentes.filter((r) => r.paciente.id !== item.paciente.id),
      ].slice(0, 8)
      setRecentes(data)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch {}
  }

  const termoNormalizado = useMemo(
    () => (modoBusca === "cpf" ? onlyDigits(termo).slice(0, 11) : termo),
    [termo, modoBusca]
  )

  const podeBuscar =
    (modoBusca === "cpf" && termoNormalizado.length === 11) ||
    (modoBusca === "nome" && termoNormalizado.trim().length >= 3)

  async function handleBuscar(e) {
    e?.preventDefault?.()
    if (!podeBuscar) return
    setCarregando(true)
    setErro("")
    setResultado(null)

    try {
      // Ajuste com seus endpoints reais
      let paciente
      if (modoBusca === "cpf") {
        const r = await fetch(`/api/pacientes/by-cpf/${termoNormalizado}`)
        if (!r.ok) throw new Error("Paciente não encontrado pelo CPF.")
        paciente = await r.json()
      } else {
        const r = await fetch(
          `/api/pacientes/search?nome=${encodeURIComponent(termoNormalizado)}`
        )
        if (!r.ok) throw new Error("Paciente não encontrado pelo nome.")
        paciente = await r.json()
      }

      const chk = await fetch(
        `/api/prontuarios/check?pacienteId=${encodeURIComponent(paciente.id)}`
      )
      if (!chk.ok) throw new Error("Erro ao verificar prontuário.")
      const info = await chk.json()

      const payload = {
        paciente,
        existe: !!info.existe,
        prontuarioId: info.prontuarioId || null,
        atualizadoEm: info.atualizadoEm || null,
      }
      setResultado(payload)
      salvarRecente(payload)
    } catch (err) {
      setErro(err.message || "Falha ao buscar dados.")
    } finally {
      setCarregando(false)
    }
  }

  function abrirOuCriar() {
    if (!resultado) return
    if (resultado.existe && resultado.prontuarioId) {
      navigate(`/prontuario/${resultado.prontuarioId}`)
    } else {
      navigate(`/prontuario/novo?pacienteId=${resultado.paciente.id}`)
    }
  }

  return (
    <div className="pf-container">
      {/* Topo com LOGO + Voltar */}
      <div className={`pf-top ${h.container}`}>
        <Link to="/funcionario" className="pf-back">
          ← Voltar
        </Link>

        <Link to="/" className="pf-brand">
          <img
            className={`${h.logo} pf-logo`}
            src="/brand/logo_nuza.png"
            alt="NUZA"
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
        </Link>
      </div>

      {/* Título */}
      <header className="pf-header">
        <h1>Prontuário – Funcionário</h1>
        <p>Verifique se o paciente já possui prontuário e acesse rapidamente.</p>
      </header>

      {/* Card de busca */}
      <form className="pf-card pf-elevated" onSubmit={handleBuscar}>
        <div className="pf-row">
          <div className="pf-group">
            <label>Modo de busca</label>
            <div className="pf-toggle">
              <button
                type="button"
                className={`pf-chip ${modoBusca === "cpf" ? "pf-chip--active" : ""}`}
                onClick={() => setModoBusca("cpf")}
              >
                Por CPF
              </button>
              <button
                type="button"
                className={`pf-chip ${modoBusca === "nome" ? "pf-chip--active" : ""}`}
                onClick={() => setModoBusca("nome")}
              >
                Por Nome
              </button>
            </div>
          </div>

          <div className="pf-group pf-grow">
            <label>{modoBusca === "cpf" ? "CPF do paciente" : "Nome do paciente"}</label>
            <input
              className="pf-input"
              value={termoNormalizado}
              onChange={(e) => setTermo(e.target.value)}
              placeholder={modoBusca === "cpf" ? "Somente números" : "Mínimo 3 letras"}
            />
          </div>

          <button className="pf-btn" disabled={!podeBuscar || carregando}>
            {carregando ? "Buscando..." : "Buscar"}
          </button>
        </div>

        {erro && <p className="pf-error">{erro}</p>}
      </form>

      {/* Resultado */}
      {resultado && (
        <div className="pf-card pf-result">
          <div className="pf-result-head">
            <div>
              <h2>{resultado.paciente.nome}</h2>
              <p>
                CPF: {resultado.paciente.cpf} • Nasc.: {resultado.paciente.nascimento}
              </p>
            </div>
            <div className="pf-badges">
              <span className={`pf-badge ${resultado.existe ? "ok" : "warn"}`}>
                {resultado.existe ? "Prontuário existente" : "Sem prontuário"}
              </span>
              {resultado.atualizadoEm && (
                <span className="pf-badge soft">
                  Atualizado: {new Date(resultado.atualizadoEm).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>

          <div className="pf-actions">
            <button className="pf-btn" onClick={abrirOuCriar}>
              {resultado.existe ? "Abrir prontuário" : "Criar prontuário"}
            </button>
            <Link className="pf-btn pf-btn--ghost" to={`/paciente/${resultado.paciente.id}`}>
              Ver paciente
            </Link>
          </div>
        </div>
      )}

      {/* Recentes */}
      {recentes.length > 0 && (
        <section className="pf-recentes">
          <h3>Consultas recentes</h3>
          <div className="pf-grid">
            {recentes.map((r) => (
              <div key={r.paciente.id} className="pf-recent-card">
                <div className="pf-recent-info">
                  <strong className="pf-truncate">{r.paciente.nome}</strong>
                  <span className="pf-sub">CPF: {r.paciente.cpf}</span>
                </div>
                <button className="pf-btn pf-btn--mini" onClick={() => setResultado(r)}>
                  Detalhes
                </button>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
