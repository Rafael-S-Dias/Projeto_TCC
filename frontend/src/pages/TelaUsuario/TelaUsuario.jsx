import { Link } from 'react-router-dom';
import { useRef, useCallback, useEffect } from 'react';
import s from './TelaUsuario.module.css';
import h from '../Home/Home.module.css'; // Continua usando o topo da Home

// --- ÍCONES (sem alterações) ---
const IconProntuario = () => ( <svg className={s.icon} viewBox="0 0 24 24" fill="none"> <path d="M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.8"/> <path d="M9 7h6M9 11h6M9 15h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/> </svg> );
const IconCalendario = () => ( <svg className={s.icon} viewBox="0 0 24 24" fill="none"> <rect x="3" y="4" width="18" height="17" rx="2" stroke="currentColor" strokeWidth="1.8"/> <path d="M8 2v4M16 2v4M3 9h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/> <rect x="7" y="12" width="3" height="3" rx="0.5" fill="currentColor"/> <rect x="12" y="12" width="3" height="3" rx="0.5" fill="currentColor"/> <rect x="17" y="12" width="3" height="3" rx="0.5" fill="currentColor"/> </svg> );
const IconMapa = () => ( <svg className={s.icon} viewBox="0 0 24 24" fill="none"> <path d="M9 6 3 8v12l6-2 6 2 6-2V4l-6 2-6-2Z" stroke="currentColor" strokeWidth="1.8" /> <circle cx="15" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.6"/> </svg> );
const IconRelogio = () => ( <svg className={s.icon} viewBox="0 0 24 24" fill="none"> <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/> <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/> </svg> );

// --- DADOS DAS NOTÍCIAS (IDÊNTICO À HOME) ---
const noticias = [
  { imagem: "/images/feed-img-1.png", titulo: "2,4 milhões de brasileiros têm autismo: epidemia, moda ou maior acesso à informação?", link: "https://veja.abril.com.br/saude/24-milhoes-de-brasileiros-tem-autismo-epidemia-moda-ou-maior-acesso-a-informacao/#google_vignette" },
  { imagem: "/images/feed-img-2.png", titulo: "Comissão do Senado aprova isenção de Imposto de Renda para autistas", link: "https://www.cnnbrasil.com.br/economia/macroeconomia/comissao-do-senado-aprova-isencao-de-imposto-de-renda-para-autistas/" },
  { imagem: "/images/feed-img-3.png", titulo: "Brasil tem 2,4 milhões de pessoas diagnosticadas com autismo, aponta Censo", link: "https://g1.globo.com/saude/noticia/2025/05/23/brasil-tem-24-milhoes-de-pessoas-diagnosticadas-com-autismo-aponta-censo-homens-sao-maioria.ghtml" },
  { imagem: "/images/feed-img-4.png", titulo: "IBGE divulga dados sobre educação de pessoas com autismo", link: "https://www.cnnbrasil.com.br/educacao/ibge-divulga-dados-sobre-educacao-de-pessoas-com-autismo/" },
  { imagem: "/images/feed-img-5.png", titulo: "Autismo: quais sinais observar e possíveis causas", link: "https://www.cnnbrasil.com.br/saude/autismo-quais-sinais-observar-e-possiveis-causas/" },
  { imagem: "/images/feed-img-6.png", titulo: "Como a inclusão escolar transforma a vida de crianças com TEA", link: "/noticia/inclusao-escolar" }
];

// --- COMPONENTE DE BOTÃO (COPIADO DA HOME) ---
const BotaoNoticia = ({ link, className, onClick, children }) => {
  const isExternal = link.startsWith('http');
  if (isExternal) {
    return ( <a href={link} className={className} onClick={onClick} target="_blank" rel="noopener noreferrer"> {children} </a> );
  }
  return ( <Link to={link} className={className} onClick={onClick}> {children} </Link> );
};

export default function TelaUsuario() {
  // --- LÓGICA DO CARROSSEL (COPIADA DA HOME) ---
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const isDraggingRef = useRef(false);
  const animationFrameIdRef = useRef(null);
  const animationStateRef = useRef({ startX: 0, currentX: 0, targetX: 0, velocity: 0, lastX: 0, trackStartPos: 0, bounds: { min: 0, max: 0 }, hasMoved: false });

  const preventClick = (e) => {
    if (animationStateRef.current.hasMoved) { e.preventDefault(); }
  };

  const animate = useCallback(() => {
    if (!trackRef.current) return;
    const state = animationStateRef.current;
    state.currentX += (state.targetX - state.currentX) * 0.1;
    if (!isDraggingRef.current) {
      state.velocity *= 0.94;
      if (Math.abs(state.velocity) < 0.1) state.velocity = 0;
      state.targetX += state.velocity;
    }
    if (!isDraggingRef.current) {
      if (state.targetX > state.bounds.max) { state.targetX += (state.bounds.max - state.targetX) * 0.1; }
      if (state.targetX < state.bounds.min) { state.targetX += (state.bounds.min - state.targetX) * 0.1; }
    }
    trackRef.current.style.transform = `translateX(${state.currentX}px)`;
    if (Math.abs(state.currentX - state.targetX) > 0.1 || Math.abs(state.velocity) > 0.1) {
      animationFrameIdRef.current = requestAnimationFrame(animate);
    } else {
      animationFrameIdRef.current = null;
    }
  }, []);

  const handleMouseDown = useCallback((e) => {
    isDraggingRef.current = true;
    wrapperRef.current?.classList.add(s.dragging);
    if (animationFrameIdRef.current) { cancelAnimationFrame(animationFrameIdRef.current); animationFrameIdRef.current = null; }
    const state = animationStateRef.current;
    state.startX = e.pageX;
    state.trackStartPos = state.currentX;
    state.velocity = 0;
    state.hasMoved = false;
    state.lastX = e.pageX;
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDraggingRef.current) return;
      const state = animationStateRef.current;
      const currentMouseX = e.pageX;
      if (!state.hasMoved && Math.abs(currentMouseX - state.startX) > 5) { state.hasMoved = true; }
      const dragDistance = currentMouseX - state.startX;
      state.targetX = state.trackStartPos + dragDistance;
      state.velocity = currentMouseX - state.lastX;
      state.lastX = currentMouseX;
      if (!animationFrameIdRef.current) { animationFrameIdRef.current = requestAnimationFrame(animate); }
    };
    const handleMouseUp = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      wrapperRef.current?.classList.remove(s.dragging);
      if (!animationFrameIdRef.current) { animationFrameIdRef.current = requestAnimationFrame(animate); }
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    const handleResize = () => {
      if (wrapperRef.current && trackRef.current) {
        const state = animationStateRef.current;
        const wrapperWidth = wrapperRef.current.offsetWidth;
        const trackWidth = trackRef.current.scrollWidth;
        state.bounds.min = wrapperWidth > trackWidth ? 0 : wrapperWidth - trackWidth;
        state.bounds.max = 0;
        const newX = Math.max(state.bounds.min, Math.min(state.targetX, state.bounds.max));
        state.targetX = newX;
        state.currentX = newX;
      }
    };
    window.addEventListener('resize', handleResize);
    setTimeout(handleResize, 100);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      if (animationFrameIdRef.current) { cancelAnimationFrame(animationFrameIdRef.current); }
    };
  }, [animate]);
  // --- FIM DA LÓGICA DO CARROSSEL ---

  return (
    <div className={s.wrapper}>
      {/* ===== TOPO IDÊNTICO À HOME ===== */}
      <header className={h.topbar}><div className={h.container}><div className={h.topbarLeft}><span className={h.small}>📞 +55 (71) 99298-9940</span><span className={h.small}>✉️ info@nuza.com</span></div><div className={h.topbarRight}><a className={h.cta} href="#contato">Fale conosco</a></div></div></header>
      <nav className={h.navbar}><div className={h.container}><div className={h.brand}><img className={h.logo} src="/brand/logo_nuza.png" alt="NUZA" /></div>
      
      {/* ===== MENU DE NAVEGAÇÃO ATUALIZADO ===== */}
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
      
      </div></nav>

      {/* ===== SEÇÃO DE NOTÍCIAS IDÊNTICA À HOME ===== */}
      <section className={s.feedSection}>
        <div className={s.container}>
          <h2 className={s.feedTitle}>Notícias e conteúdos</h2>
          <div
            className={s.feedWrapper}
            ref={wrapperRef}
            onMouseDown={handleMouseDown}
          >
            <div className={s.feedTrack} ref={trackRef}>
              {noticias.map((noticia, index) => (
                <div key={index} className={s.newsCard}>
                  <img src={noticia.imagem} alt={noticia.titulo} className={s.feedImage} />
                  <div className={s.cardOverlay}>
                    <h3 className={s.cardTitle}>{noticia.titulo}</h3>
                    <BotaoNoticia link={noticia.link} className={s.cardButton} onClick={preventClick}>
                      Saiba mais
                    </BotaoNoticia>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== AÇÕES RÁPIDAS (sem alterações) ===== */}
      <section className={s.acoes} aria-label="Ações rápidas">
        <div className={s.grid}>
          <Link to="/prontuario" className={s.item} aria-label="Prontuário do Paciente"><div className={s.iconWrap}><IconProntuario /></div><p className={s.itemTitle}>Prontuário Paciente</p></Link>
          <Link to="/agendamentos" className={s.item} aria-label="Agendamentos"><div className={s.iconWrap}><IconCalendario /></div><p className={s.itemTitle}>Agendamentos</p></Link>
          <Link to="/mapa-saude" className={s.item} aria-label="Mapa Saúde"><div className={s.iconWrap}><IconMapa /></div><p className={s.itemTitle}>Mapa Saúde</p></Link>
          <Link to="/agenda" className={s.item} aria-label="Agenda"><div className={s.iconWrap}><IconRelogio /></div><p className={s.itemTitle}>Agenda</p></Link>
        </div>
      </section>
    </div>
  );
}