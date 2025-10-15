import React from "react";
// Removido: import { Link } from "react-router-dom";
// O componente Link estava causando um erro de contexto do roteador.
// A solução é usar tags <a> normais para navegação.

// Os estilos foram movidos para dentro do componente para corrigir o erro de importação.
const Styles = () => (
    <style>{`
        :root {
            --tm-blue: #1f4ea1;
            --tm-white: #ffffff;
            --tm-ink: #0b0b0b;
        }

        /* --- ESTILOS DO NOVO CABEÇALHO (vindos de Prontuario) --- */
        .prontuario-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #184288;
            padding: 20px 30px;
            border-bottom: 2px solid #0d2965;
            color: var(--tm-white);
        }

        .prontuario-logo {
            height: 50px;
        }

        .prontuario-ident {
            text-align: right;
            line-height: 1.4;
        }

        .prontuario-ident strong {
            font-size: 1.1em;
        }

        /* --- ESTILOS DO CORPO DA PÁGINA (vindos de TelaMedico) --- */

        .tm-screen {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            background: var(--tm-blue);
            color: var(--tm-white);
            font-family: "Lexend", system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
        }

        .tm-main {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 40px 20px;
            gap: 28px;
        }

        .tm-grid {
            width: min(1100px, 95vw);
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 40px;
        }

        .tm-card {
            background: rgba(255, 255, 255, 0.15);
            border-radius: 16px;
            text-decoration: none;
            color: var(--tm-white);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 18px;
            padding: 40px 20px;
            transition: all .3s ease;
            backdrop-filter: blur(6px);
        }

        .tm-card:hover {
            transform: translateY(-4px) scale(1.03);
            box-shadow: 0 8px 20px rgba(0, 0, 0, .3);
            background: rgba(255, 255, 255, 0.25);
        }

        .tm-icon {
            width: 80px;
            height: 80px;
            color: var(--tm-white);
        }

        .tm-label {
            font-weight: 700;
            font-size: 18px;
            text-align: center;
        }

        .tm-actions {
            text-align: center;
        }

        .tm-back-btn {
            position: relative;
            display: inline-block;
            padding: 12px 24px;
            border-radius: 10px;
            background: rgba(255, 255, 255, 0.2);
            color: var(--tm-white);
            font-weight: 700;
            text-decoration: none;
            border: 1px solid rgba(255, 255, 255, 0.35);
            backdrop-filter: blur(6px);
            transition: transform .2s ease, box-shadow .2s ease, background .2s ease, border-color .2s ease;
            box-shadow: 0 6px 16px rgba(0, 0, 0, .25);
            overflow: hidden;
        }

        .tm-back-btn::after {
            content: "";
            position: absolute;
            inset: 0;
            background: linear-gradient(120deg, transparent 0%, rgba(255, 255, 255, .35) 50%, transparent 100%);
            transform: translateX(-120%);
            transition: transform .6s ease;
        }

        .tm-back-btn:hover {
            transform: translateY(-2px) scale(1.02);
            background: rgba(255, 255, 255, 0.28);
            border-color: rgba(255, 255, 255, 0.55);
            box-shadow: 0 10px 24px rgba(0, 0, 0, .35);
        }

        .tm-back-btn:hover::after {
            transform: translateX(120%);
        }

        .tm-back-btn:active {
            transform: translateY(0) scale(.98);
        }

        .tm-back-btn:focus-visible {
            outline: 3px solid rgba(255, 255, 255, .8);
            outline-offset: 2px;
        }

        .tm-bottom-shadow {
            height: 12px;
            background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, .3));
        }

        @media (max-width: 560px) {
            .tm-grid {
                gap: 26px;
            }
            .tm-icon {
                width: 72px;
                height: 72px;
            }
            .tm-label {
                font-size: 17px;
            }
        }
    `}</style>
);


// O cabeçalho da tela Prontuario foi movido para cá.
const HeaderProntuario = () => (
    <header className="prontuario-header">
        <img src="/brand/logo_nuza.png" alt="NUZA" className="prontuario-logo" />
        <div className="prontuario-ident">
            <strong>Médico</strong>
            <p>NUZA - Sistema de Saúde</p>
        </div>
    </header>
);

export default function TelaMedicoAtualizada() {
    return (
        <React.Fragment>
            <Styles />
            <div className="tm-screen">
                {/* O novo cabeçalho foi inserido aqui */}
                <HeaderProntuario />

                {/* Conteúdo principal continua o mesmo */}
                <main className="tm-main">
                    <nav className="tm-grid">
                        {/* Alterado de Link para <a> */}
                        <a href="/prontuariomedico" className="tm-card" aria-label="Prontuário Paciente">
                            <ClipboardIcon />
                            <span className="tm-label">Prontuário Paciente</span>
                        </a>

                        {/* Alterado de Link para <a> */}
                        <a href="/agendamentos" className="tm-card" aria-label="Agendamentos">
                            <CalendarIcon />
                            <span className="tm-label">Agendamentos</span>
                        </a>

                        {/* Alterado de Link para <a> */}
                        <a href="/retorno" className="tm-card" aria-label="Retorno Paciente">
                            <ReturnIcon />
                            <span className="tm-label">Retorno Paciente</span>
                        </a>

                        {/* Alterado de Link para <a> */}
                        <a href="/mapa-saude" className="tm-card" aria-label="Mapa Saúde">
                            <PinIcon />
                            <span className="tm-label">Mapa Saúde</span>
                        </a>
                    </nav>

                    <div className="tm-actions">
                         {/* Alterado de Link para <a> */}
                        <a href="/" className="tm-back-btn">
                            ← Voltar para Home
                        </a>
                    </div>
                </main>

                {/* Rodapé simples */}
                <footer className="tm-bottom-shadow" />
            </div>
        </React.Fragment>
    );
}

/* ==== Ícones SVG ==== */
function ClipboardIcon() {
    return (
        <svg className="tm-icon" viewBox="0 0 24 24" aria-hidden="true">
            <rect x="4" y="6" width="16" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/>
            <rect x="8" y="2" width="8" height="4" rx="1.5" fill="currentColor"/>
            <path d="M8 11h8M8 15h6M8 19h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
    );
}

function CalendarIcon() {
    return (
        <svg className="tm-icon" viewBox="0 0 24 24" aria-hidden="true">
            <rect x="3" y="4" width="18" height="17" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/>
            <path d="M8 2v4M16 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="16.5" cy="16.5" r="2.7" fill="none" stroke="currentColor" strokeWidth="2"/>
        </svg>
    );
}

function ReturnIcon() {
    return (
        <svg className="tm-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12l4-4M5 12l4 4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 12h6a4 4 0 1 1 0 8h-2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
    );
}

function PinIcon() {
    return (
        <svg className="tm-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z" fill="none" stroke="currentColor" strokeWidth="2"/>
            <circle cx="12" cy="10" r="2.6" fill="currentColor"/>
        </svg>
    );
}

