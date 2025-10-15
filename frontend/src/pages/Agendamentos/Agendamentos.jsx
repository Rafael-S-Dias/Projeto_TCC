import React, { useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import s from "./Agendamentos.module.css";

// Dados e componentes auxiliares (sem alterações)
const MOCK_ADMIN = [
  { id: "a1", tipo: "consulta", titulo: "Consulta – Pediatria", paciente: "João da Silva", profissional: "Dra. Ana Souza", local: "UBS Centro", dataISO: "2025-09-01T09:30:00-03:00", status: "confirmado", observacao: "Levar carteira de vacinação." },
  { id: "a7", tipo: "exame", titulo: "Exame – Raio-X", paciente: "Mariana Lima", profissional: "Clínica Imagem", local: "Hospital Central", dataISO: "2025-09-01T14:00:00-03:00", status: "agendado", observacao: "Chegar 15 minutos antes." },
  { id: "a5", tipo: "consulta", titulo: "Consulta – Clínico Geral", paciente: "Maria Oliveira", profissional: "Dra. Carla Menezes", local: "UBS Centro", dataISO: "2025-08-30T11:00:00-03:00", status: "agendado", observacao: "" },
  { id: "a3", tipo: "retirada", titulo: "Retirada de Medicamentos", paciente: "Carlos Pereira", profissional: "Farmácia Popular", local: "Farmácia Municipal", dataISO: "2025-08-28T14:00:00-03:00", status: "agendado", observacao: "Levar receita original." },
  { id: "a2", tipo: "exame", titulo: "Exame – Hemograma", paciente: "Ana Costa", profissional: "Lab. Vida", local: "Laboratório Vida", dataISO: "2025-08-20T07:45:00-03:00", status: "realizado", observacao: "Jejum de 8h." },
  { id: "a4", tipo: "retorno", titulo: "Retorno – Ortopedia", paciente: "Pedro Martins", profissional: "Dr. Paulo Lima", local: "Policlínica Sul", dataISO: "2025-07-15T10:00:00-03:00", status: "cancelado", observacao: "Consulta remarcada para outra data." },
  { id: "a6", tipo: "consulta", titulo: "Consulta – Dentista", paciente: "Beatriz Santos", profissional: "Dr. Ricardo Alves", local: "Clínica Sorriso", dataISO: "2025-10-15T15:00:00-03:00", status: "agendado", observacao: "Apresentar raio-x anterior." },
  { id: "a8", tipo: "retorno", titulo: "Retorno – Cardiologista", paciente: "Carlos Pereira", profissional: "Dr. Fábio Costa", local: "Policlínica Sul", dataISO: "2025-10-15T10:00:00-03:00", status: "confirmado", observacao: "Levar exames anteriores." },
];
const tipoLabel = { consulta: "Consulta", exame: "Exame", retirada: "Retirada", retorno: "Retorno" };
const BadgeStatus = ({ status }) => (<span className={`${s.badge} ${s[`st-${status}`]}`}>{status}</span>);
function Item({ ag }) {
  const dt = new Date(ag.dataISO);
  const dia = dt.toLocaleDateString([], { day: "2-digit", month: "2-digit", year: "numeric" });
  const hora = dt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  return (
    <article className={s.item}>
      <div className={s.itemLeft}>
        <div className={s.iconWrap} data-tipo={ag.tipo}>
          {ag.tipo === "consulta" && <svg viewBox="0 0 24 24" className={s.icon}><path d="M8 7h8M8 11h8M8 15h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.8"/></svg>}
          {ag.tipo === "exame" && <svg viewBox="0 0 24 24" className={s.icon}><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8"/><path d="M15.5 15.5 21 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>}
          {ag.tipo === "retirada" && <svg viewBox="0 0 24 24" className={s.icon}><path d="M3 7h18l-2 11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L3 7Z" stroke="currentColor" strokeWidth="1.8"/><path d="M9 10h6M9 14h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>}
          {ag.tipo === "retorno" && <svg viewBox="0 0 24 24" className={s.icon}><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/><path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>}
        </div>
      </div>
      <div className={s.itemMid}>
        <h4 className={s.titulo}>{ag.titulo}</h4>
        <p className={s.meta}><strong>Paciente: {ag.paciente}</strong> <br />{ag.profissional} • {ag.local}</p>
        {ag.observacao && <p className={s.obs}>{ag.observacao}</p>}
      </div>
      <div className={s.itemRight}>
        <div className={s.data}><span className={s.dia}>{dia}</span><span className={s.hora}>{hora}</span></div>
        <BadgeStatus status={ag.status} />
      </div>
    </article>
  );
}
const BotaoCalendario = React.forwardRef(({ value, onClick, isActive }, ref) => (
  <button onClick={onClick} ref={ref} className={`${s.segmentBtn} ${isActive ? s.active : ""}`}>{isActive ? value : "Data"}</button>
));

export default function Agendamentos() {
  const [filtroTipo, setFiltroTipo] = useState("todos");
  const [busca, setBusca] = useState("");
  const [filtroData, setFiltroData] = useState(null);

  const agora = new Date();

  const { proximos, passados } = useMemo(() => {
    let base = [...MOCK_ADMIN];
    if (filtroTipo !== "todos") { base = base.filter((a) => a.tipo === filtroTipo); }
    if (busca.trim()) {
      const b = busca.toLowerCase();
      base = base.filter((a) => a.paciente.toLowerCase().includes(b) || a.titulo.toLowerCase().includes(b) || a.profissional.toLowerCase().includes(b) || a.local.toLowerCase().includes(b));
    }
    if (filtroData) {
      base = base.filter(a => new Date(a.dataISO).toDateString() === filtroData.toDateString());
    }

    base.sort((a, b) => new Date(b.dataISO) - new Date(a.dataISO)); // Ordenação padrão (descendente)
    
    const prox = base.filter((a) => new Date(a.dataISO) >= agora);
    const pass = base.filter((a) => new Date(a.dataISO) < agora);
    
    // Para a visão padrão, 'próximos' é ascendente e 'passados' é descendente
    return { proximos: prox.reverse(), passados: pass };
  }, [filtroTipo, busca, filtroData]);

  const limparFiltros = () => { setFiltroTipo("todos"); setFiltroData(null); setBusca(""); };
  const handleDateChange = (date) => { setFiltroData(date); if (date) { setFiltroTipo("todos"); } };

  // === ALTERAÇÃO PRINCIPAL AQUI ===
  // Junta e ordena os agendamentos para a visão de dia único
  const agendamentosDoDia = [...proximos, ...passados].sort((a,b) => new Date(a.dataISO) - new Date(b.dataISO));

  return (
    <div className={s.wrapper}>
      <header className={s.header}>
        <div className={s.headerInner}>
          <img className={s.logo} src="/brand/logo_nuza.png" alt="NUZA" />
          <h1 className={s.title}>Agendamentos</h1>
        </div>
      </header>
      <div className={s.container}>
        <div className={s.filters}>
          <div className={s.segment}>
            <button className={`${s.segmentBtn} ${filtroTipo === 'todos' && !filtroData ? s.active : ""}`} onClick={limparFiltros}>Todos</button>
            {["consulta", "exame", "retirada", "retorno"].map((t) => (
              <button key={t} className={`${s.segmentBtn} ${filtroTipo === t ? s.active : ""}`} onClick={() => { setFiltroTipo(t); setFiltroData(null); }}>{tipoLabel[t]}</button>
            ))}
            <DatePicker selected={filtroData} onChange={handleDateChange} customInput={<BotaoCalendario isActive={!!filtroData} />} dateFormat="dd/MM/yyyy" withPortal />
          </div>
          <input className={s.search} placeholder="Buscar por paciente, profissional, local..." value={busca} onChange={(e) => setBusca(e.target.value)} />
        </div>

        {/* === E AQUI === */}
        {/* Renderização condicional: ou mostra a lista única, ou as duas listas separadas */}
        {filtroData ? (
          <section>
            <h3 className={s.sectionTitle}>
              Agendamentos
            </h3>
            {agendamentosDoDia.length === 0 
              ? <div className={s.empty}>Nenhum agendamento encontrado para esta data.</div> 
              : <div className={s.list}>{agendamentosDoDia.map((ag) => <Item key={ag.id} ag={ag} />)}</div>
            }
          </section>
        ) : (
          <>
            <section>
              <h3 className={s.sectionTitle}>Próximos</h3>
              {proximos.length === 0 ? <div className={s.empty}>Nenhum agendamento futuro encontrado.</div> : <div className={s.list}>{proximos.map((ag) => <Item key={ag.id} ag={ag} />)}</div>}
            </section>
            <section>
              <h3 className={s.sectionTitle}>Passados</h3>
              {passados.length === 0 ? <div className={s.empty}>Nenhum histórico anterior encontrado.</div> : <div className={s.list}>{passados.map((ag) => <Item key={ag.id} ag={ag} />)}</div>}
            </section>
          </>
        )}
      </div>
    </div>
  );
}