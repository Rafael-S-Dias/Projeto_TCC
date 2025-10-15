import React from "react";
import s from "./Prontuario.module.css";

function Card({ title, area, children }) {
  return (
    <section className={s.card} data-area={area}>
      <h3 className={s.cardTitle}>{title}</h3>
      <div className={s.cardBody}>{children}</div>
    </section>
  );
}

export default function Prontuario() {
  return (
    <div className={s.wrapper}>
      {/* Header */}
      <header className={s.header}>
        <div className={s.headerInner}>
          <img className={s.logo} src="/brand/logo_nuza.png" alt="NUZA" />
          <div className={s.paciente}>
            <img
              className={s.avatar}
              src="https://ui-avatars.com/api/?size=128&name=Paciente"
              alt="Foto do paciente"
            />
            <div className={s.ident}>
              <h1 className={s.nome}>Paciente Exemplo</h1>
              <p className={s.meta}>
                CPF: 000.000.000-00 • Nasc.: 00/00/0000 • Sexo: —
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className={s.container}>
        <main className={s.main}>
          <Card title="Dados Pessoais" area="dados">
            <div className={s.duo}>
              <div>
                <label>Telefone</label>
                <p>(00) 00000-0000</p>
              </div>
              <div>
                <label>E-mail</label>
                <p>paciente@exemplo.com</p>
              </div>
            </div>
            <div className={s.hr}></div>
            <div>
              <label>Endereço</label>
              <p>Rua Exemplo, 123 — Bairro — Cidade/UF</p>
            </div>
          </Card>

          <Card title="Alergias" area="alergias">
            <ul className={s.list}><li>— Sem registros</li></ul>
          </Card>

          <Card title="Medicamentos em uso" area="meds">
            <ul className={s.list}><li>— Sem registros</li></ul>
          </Card>

          <Card title="Histórico Clínico" area="historico">
            <ul className={s.timeline}>
              <li>
                <span className={s.time}>—</span>
                <div>
                  <strong>Sem registros</strong>
                  <p>Quando houver consultas, exames e procedimentos, eles aparecerão aqui.</p>
                </div>
              </li>
            </ul>
          </Card>

          <Card title="Exames" area="exames">
            <ul className={s.list}><li>— Sem registros</li></ul>
          </Card>

          <Card title="Vacinas" area="vacinas">
            <ul className={s.list}><li>— Sem registros</li></ul>
          </Card>

          <Card title="Próximos agendamentos" area="agenda">
            <table className={s.table}>
              <thead>
                <tr>
                  <th>Data</th><th>Hora</th><th>Especialidade</th>
                  <th>Profissional</th><th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="5" style={{textAlign:"center", opacity:.75}}>
                    Nenhum agendamento encontrado.
                  </td>
                </tr>
              </tbody>
            </table>
          </Card>
        </main>
      </div>
    </div>
  );
}
