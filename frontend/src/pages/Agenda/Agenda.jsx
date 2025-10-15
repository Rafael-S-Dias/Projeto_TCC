import React, { useMemo, useState } from "react";
import s from "./Agenda.module.css";

/** Tipos possíveis:
 *  - consulta
 *  - exame
 *  - retirada (medicamento)
 *  - retorno (consulta de retorno solicitada)
 *
 * Status possíveis (exemplos):
 *  - agendado | confirmado | realizado | cancelado
 */
const MOCK = [
  {
    id: "a1",
    tipo: "consulta",
    titulo: "Consulta – Pediatria",
    profissional: "Dra. Ana Souza",
    local: "UBS Centro",
    dataISO: "2025-09-01T09:30:00-03:00",
    status: "confirmado",
    observacao: "Levar carteira de vacinação."
  },
  {
    id: "a2",
    tipo: "exame",
    titulo: "Exame – Hemograma",
    profissional: "Lab. Vida",
    local: "Laboratório Vida",
    dataISO: "2025-08-20T07:45:00-03:00",
    status: "realizado",
    observacao: "Jejum de 8h."
  },
  {
    id: "a3",
    tipo: "retirada",
    titulo: "Retirada de Medicamentos",
    profissional: "Farmácia Popular",
    local: "Farmácia Municipal",
    dataISO: "2025-08-28T14:00:00-03:00",
    status: "agendado",
    observacao: "Levar receita original."
  },
  {
    id: "a4",
    tipo: "retorno",
    titulo: "Retorno – Ortopedia",
    profissional: "Dr. Paulo Lima",
    local: "Policlínica Sul",
    dataISO: "2025-07-15T10:00:00-03:00",
    status: "cancelado",
    observacao: "Consulta remarcada para outra data."
  },
  {
    id: "a5",
    tipo: "consulta",
    titulo: "Consulta – Clinico Geral",
    profissional: "Dra. Carla Menezes",
    local: "UBS Centro",
    dataISO: "2025-08-30T11:00:00-03:00",
    status: "agendado",
    observacao: ""
  }
];

const tipoLabel = {
  consulta: "Consulta",
  exame: "Exame",
  retirada: "Retirada",
  retorno: "Retorno"
};

const BadgeStatus = ({ status }) => {
  return <span className={`${s.badge} ${s[`st-${status}`]}`}>{status}</span>;
};

function Item({ ag }) {
  const dt = new Date(ag.dataISO);
  const dia = dt.toLocaleDateString([], { day: "2-digit", month: "2-digit", year: "numeric" });
  const hora = dt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <article className={s.item}>
      <div className={s.itemLeft}>
        <div className={s.iconWrap} data-tipo={ag.tipo}>
          {/* ícones simples em SVG controlados por data-tipo */}
          {ag.tipo === "consulta" && (
            <svg viewBox="0 0 24 24" className={s.icon}><path d="M8 7h8M8 11h8M8 15h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.8"/></svg>
          )}
          {ag.tipo === "exame" && (
            <svg viewBox="0 0 24 24" className={s.icon}><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8"/><path d="M15.5 15.5 21 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
          )}
          {ag.tipo === "retirada" && (
            <svg viewBox="0 0 24 24" className={s.icon}><path d="M3 7h18l-2 11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L3 7Z" stroke="currentColor" strokeWidth="1.8"/><path d="M9 10h6M9 14h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
          )}
          {ag.tipo === "retorno" && (
            <svg viewBox="0 0 24 24" className={s.icon}><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/><path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
          )}
        </div>
      </div>

      <div className={s.itemMid}>
        <h4 className={s.titulo}>{ag.titulo}</h4>
        <p className={s.meta}>
          <strong>{tipoLabel[ag.tipo]}</strong> • {ag.profissional} • {ag.local}
        </p>
        {ag.observacao && <p className={s.obs}>{ag.observacao}</p>}
      </div>

      <div className={s.itemRight}>
        <div className={s.data}>
          <span className={s.dia}>{dia}</span>
          <span className={s.hora}>{hora}</span>
        </div>
        <BadgeStatus status={ag.status} />
      </div>
    </article>
  );
}

export default function Agenda() {
  const [filtroTipo, setFiltroTipo] = useState("todos"); // todos | consulta | exame | retirada | retorno
  const [busca, setBusca] = useState("");

  const agora = new Date();

  const { proximos, passados } = useMemo(() => {
    let base = [...MOCK];

    if (filtroTipo !== "todos") base = base.filter((a) => a.tipo === filtroTipo);
    if (busca.trim()) {
      const b = busca.toLowerCase();
      base = base.filter(
        (a) =>
          a.titulo.toLowerCase().includes(b) ||
          a.profissional.toLowerCase().includes(b) ||
          a.local.toLowerCase().includes(b)
      );
    }

    base.sort((a, b) => new Date(a.dataISO) - new Date(b.dataISO));

    const prox = base.filter((a) => new Date(a.dataISO) >= agora);
    const pass = base.filter((a) => new Date(a.dataISO) < agora).reverse();

    return { proximos: prox, passados: pass };
  }, [filtroTipo, busca]);

  return (
    <div className={s.wrapper}>
      <header className={s.header}>
        <div className={s.headerInner}>
          <img className={s.logo} src="/brand/logo_nuza.png" alt="NUZA" />
          <h1 className={s.title}>Minha Agenda</h1>
        </div>
      </header>

      <div className={s.container}>
        {/* Filtros */}
        <div className={s.filters}>
          <div className={s.segment}>
            {["todos","consulta","exame","retirada","retorno"].map((t) => (
              <button
                key={t}
                className={`${s.segmentBtn} ${filtroTipo===t ? s.active : ""}`}
                onClick={() => setFiltroTipo(t)}
              >
                {t === "todos" ? "Todos" : tipoLabel[t]}
              </button>
            ))}
          </div>

          <input
            className={s.search}
            placeholder="Buscar por profissional, local ou título…"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        {/* Próximos */}
        <section>
          <h3 className={s.sectionTitle}>Próximos</h3>
          {proximos.length === 0 ? (
            <div className={s.empty}>Nenhum agendamento futuro.</div>
          ) : (
            <div className={s.list}>{proximos.map((ag) => <Item key={ag.id} ag={ag} />)}</div>
          )}
        </section>

        {/* Passados */}
        <section>
          <h3 className={s.sectionTitle}>Passados</h3>
          {passados.length === 0 ? (
            <div className={s.empty}>Nenhum histórico anterior.</div>
          ) : (
            <div className={s.list}>{passados.map((ag) => <Item key={ag.id} ag={ag} />)}</div>
          )}
        </section>
      </div>
    </div>
  );
}
