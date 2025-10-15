import React, { useEffect } from "react";
import s from "./TelaFuncionario.module.css";
import h from "../Home/Home.module.css";
import { Link } from "react-router-dom";

/* ÍCONES */
const IconProntuario = () => (
  <svg className={s.icon} viewBox="0 0 24 24" fill="none">
    <path d="M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.8"/>
    <path d="M9 7h6M9 11h6M9 15h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);
const IconCalendario = () => (
  <svg className={s.icon} viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="17" rx="2" stroke="currentColor" strokeWidth="1.8"/>
    <path d="M8 2v4M16 2v4M3 9h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    <rect x="7" y="12" width="3" height="3" rx="0.5" fill="currentColor"/>
    <rect x="12" y="12" width="3" height="3" rx="0.5" fill="currentColor"/>
    <rect x="17" y="12" width="3" height="3" rx="0.5" fill="currentColor"/>
  </svg>
);
const IconMapa = () => (
  <svg className={s.icon} viewBox="0 0 24 24" fill="none">
    <path d="M9 6 3 8v12l6-2 6 2 6-2V4l-6 2-6-2Z" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="15" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.6"/>
  </svg>
);
const IconRelogio = () => (
  <svg className={s.icon} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/>
    <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);
const IconAlterarUsuario = () => (
  <svg className={s.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);
const IconLupa = () => (
  <svg className={s.icon} viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8"/>
    <path d="M20 20l-4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);
const IconLixeira = () => (
  <svg className={s.icon} viewBox="0 0 24 24" fill="none">
    <path d="M4 7h16M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);
const IconRetorno = () => (
  <svg className={s.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="7" r="4" />
    <path d="M5.5 18v-2a4.5 4.5 0 0 1 4.5-4.5h4a4.5 4.5 0 0 1 4.5 4.5v2" />
    <path d="M10 15h4" />
    <path d="M12 13l-2 2 2 2" />
  </svg>
);

export default function TelaFuncionario() {
  useEffect(() => {
    try { localStorage.setItem("nuza.role", "funcionario"); } catch {}
  }, []);

  return (
    <div className={s.wrapper}>
      {/* ======= TOPO ======= */}
      <header className={h.topbar}>
        <div className={h.container}>
          <div className={h.topbarLeft}>
            <span className={h.small}>📞 +55 (71) 99298-9940</span>
            <span className={h.small}>✉️ info@nuza.com</span>
          </div>
          <div className={h.topbarRight}>
            <a className={h.cta} href="#contato">Fale conosco</a>
          </div>
        </div>
      </header>

      <nav className={h.navbar}>
        <div className={h.container}>
          <div className={h.brand}>
            <img
              className={h.logo}
              src="/brand/logo_nuza.png"
              alt="NUZA"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>

          <ul className={h.menu}>
            <li><Link to="/">Home</Link></li>
            <li><a href="/especialidade">Especialidade</a></li>
            <li><a href="/consulta">Consulta</a></li>
            <li><Link to="/exames">Exames</Link></li>
            <li><Link to="/medicamentos">Medicamentos</Link></li>
             <li>
              <a 
                href="https://www.google.com/maps/search/maps+hospitais+publico+e+upas/@-12.9172834,-38.6040061,12z?entry=ttu&g_ep=EgoyMDI1MDgyNC4wIKXMDSoASAFQAw%3D%3D" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Mapa saúde
              </a>
            </li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/configuracoes">Configurações</Link></li>
          </ul>
        </div>
      </nav>
      {/* ======= FIM DO TOPO ======= */}

      <header className={s.header}>
        <strong>Painel do Funcionário</strong>
      </header>

      {/* ======= GRID ======= */}
      <section className={s.acoes} aria-label="Ações rápidas do funcionário">
        <div className={s.grid}>
          {/* 🔗 link atualizado */}
          <Link to="/funcionario/prontuarios" className={s.item}>
            <div className={s.iconWrap}><IconProntuario /></div>
            <p className={s.itemTitle}>Prontuários</p>
          </Link>

          <Link to="/agendamentos" className={s.item}>
            <div className={s.iconWrap}><IconCalendario /></div>
            <p className={s.itemTitle}>Agendamentos</p>
          </Link>

          <a 
            href="https://www.google.com/maps/search/maps+hospitais+publico+e+upas/@-12.9172834,-38.6040061,12z?entry=ttu&g_ep=EgoyMDI1MDgyNC4wIKXMDSoASAFQAw%3D%3D" 
            target="_blank" 
            rel="noopener noreferrer"
            className={s.item}
          >
              <div className={s.iconWrap}><IconMapa /></div>
              <p className={s.itemTitle}>Mapa Saúde</p>
          </a>

          <Link to="/agenda" className={s.item}>
            <div className={s.iconWrap}><IconRelogio /></div>
            <p className={s.itemTitle}>Atendimentos do Dia</p>
          </Link>

          <Link to="/alterar-usuario" className={s.item}>
            <div className={s.iconWrap}><IconAlterarUsuario /></div>
            <p className={s.itemTitle}>Alterar Usuário</p>
          </Link>

          <Link to="/buscar" className={s.item}>
            <div className={s.iconWrap}><IconLupa /></div>
            <p className={s.itemTitle}>Buscar</p>
          </Link>

          <Link to="/retorno" className={s.item}>
            <div className={s.iconWrap}><IconRetorno /></div>
            <p className={s.itemTitle}>Retorno Paciente</p>
          </Link>

          <Link to="/excluir" className={s.item}>
            <div className={s.iconWrap}><IconLixeira /></div>
            <p className={s.itemTitle}>Exclusões</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
