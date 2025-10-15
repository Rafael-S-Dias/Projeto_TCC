import { Link } from 'react-router-dom';
import { useRef, useCallback, useEffect } from 'react';
import s from './Home.module.css';

const noticias = [
  {
    imagem: "/images/feed-img-1.png",
    titulo: "2,4 milhões de brasileiros têm autismo: epidemia, moda ou maior acesso à informação?",
    link: "https://veja.abril.com.br/saude/24-milhoes-de-brasileiros-tem-autismo-epidemia-moda-ou-maior-acesso-a-informacao/#google_vignette"
  },
  {
    imagem: "/images/feed-img-2.png",
    titulo: "Comissão do Senado aprova isenção de Imposto de Renda para autistas",
    link: "https://www.cnnbrasil.com.br/economia/macroeconomia/comissao-do-senado-aprova-isencao-de-imposto-de-renda-para-autistas/"
  },
  {
    imagem: "/images/feed-img-3.png",
    titulo: "Brasil tem 2,4 milhões de pessoas diagnosticadas com autismo, aponta Censo",
    link: "https://g1.globo.com/saude/noticia/2025/05/23/brasil-tem-24-milhoes-de-pessoas-diagnosticadas-com-autismo-aponta-censo-homens-sao-maioria.ghtml"
  },
  {
    imagem: "/images/feed-img-4.png",
    titulo: "IBGE divulga dados sobre educação de pessoas com autismo",
    link: "https://www.cnnbrasil.com.br/educacao/ibge-divulga-dados-sobre-educacao-de-pessoas-com-autismo/"
  },
  {
    imagem: "/images/feed-img-5.png",
    titulo: "Autismo: quais sinais observar e possíveis causas",
    link: "https://www.cnnbrasil.com.br/saude/autismo-quais-sinais-observar-e-possiveis-causas/"
  },
  {
    imagem: "/images/feed-img-6.png",
    titulo: "Como a inclusão escolar transforma a vida de crianças com TEA",
    link: "/noticia/inclusao-escolar"
  }
];

const BotaoNoticia = ({ link, className, onClick, children }) => {
  const isExternal = link.startsWith('http');

  if (isExternal) {
    return (
      <a
        href={link}
        className={className}
        onClick={onClick}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link to={link} className={className} onClick={onClick}>
      {children}
    </Link>
  );
};

export default function Home() {
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const isDraggingRef = useRef(false);
  const animationFrameIdRef = useRef(null);

  const animationStateRef = useRef({
    startX: 0,
    currentX: 0,
    targetX: 0,
    velocity: 0,
    lastX: 0,
    trackStartPos: 0,
    bounds: { min: 0, max: 0 },
    hasMoved: false,
  });

  const preventClick = (e) => {
    if (animationStateRef.current.hasMoved) {
      e.preventDefault();
    }
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
      if (state.targetX > state.bounds.max) {
        state.targetX += (state.bounds.max - state.targetX) * 0.1;
      }
      if (state.targetX < state.bounds.min) {
        state.targetX += (state.bounds.min - state.targetX) * 0.1;
      }
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
    if (animationFrameIdRef.current) {
      cancelAnimationFrame(animationFrameIdRef.current);
      animationFrameIdRef.current = null;
    }
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
      if (!state.hasMoved && Math.abs(currentMouseX - state.startX) > 5) {
        state.hasMoved = true;
      }
      const dragDistance = currentMouseX - state.startX;
      state.targetX = state.trackStartPos + dragDistance;
      state.velocity = currentMouseX - state.lastX;
      state.lastX = currentMouseX;
      if (!animationFrameIdRef.current) {
        animationFrameIdRef.current = requestAnimationFrame(animate);
      }
    };
    const handleMouseUp = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      wrapperRef.current?.classList.remove(s.dragging);
      if (!animationFrameIdRef.current) {
        animationFrameIdRef.current = requestAnimationFrame(animate);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    const handleResize = () => {
      if (wrapperRef.current && trackRef.current) {
        const state = animationStateRef.current;
        const wrapperWidth = wrapperRef.current.offsetWidth;
        const trackWidth = trackRef.current.scrollWidth;
        state.bounds.min = wrapperWidth - trackWidth;
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
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [animate]);

  return (
    <>
      <header className={s.topbar}>
        <div className={s.container}>
          <div className={s.topbarLeft}>
            <span className={s.small}>📞 +55 (71) 99298-9940</span>
            <span className={s.small}>✉️ info@nuza.com</span>
          </div>
          <div className={s.topbarRight}>
            <a className={s.cta} href="#contato">Fale conosco</a>
          </div>
        </div>
      </header>
      <nav className={s.navbar}>
        <div className={s.container}>
          <div className={s.brand}>
            <img
              className={s.logo}
              src="/brand/logo_nuza.png"
              alt="NUZA"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>
          <ul className={s.menu}>
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

      <section
        className={s.hero}
        style={{ '--hero': "url('/images/hero.png')" }}
      />

      <section className={s.contentSection}>
        <div className={s.container}>
          <div className={s.contentWrapper}>
            <div className={s.mainText}>
              <h1 className={s.title}>
                A SUA SAÚDE NA <br />
                PALMA DA SUA MÃO EM <br />
                EM UM SÓ LUGAR.
              </h1>
              <p className={s.lead}>
                Cuidar de quem mais importa nunca foi tão simples. <br /> O Nuza foi criado especialmente para apoiar famílias com filhos no espectro autista, oferecendo uma forma rápida, acessível e descomplicada de agendar consultas, exames, retirada de medicamentos e transporte — tudo em um só lugar, com apenas alguns cliques, uma experiência pensada para tornar o dia a dia mais leve, acolhedor e humano para quem cuida com dedicação todos os dias. Menos burocracia, mais tempo com quem você ama.
              </p>
            </div>
            <div className={s.sideImage}>
              <img src="/images/hands-puzzle.png" alt="Mãos segurando peças de quebra-cabeça em formato de coração" />
            </div>
          </div>

          <div className={s.infoBlock}>
            <h2>Como é feito o diagnóstico do autismo?</h2>
            <p className={s.infoParagraph}>O Transtorno do Espectro Autista (TEA) é uma condição neurológica que afeta a comunicação, interação social e comportamento. O diagnóstico pode ser desafiador, pois não existe um exame único que o identifique – ele é feito com base em observações clínicas e avaliações multidisciplinares.</p>
            <h2>O que é autismo?</h2>
            <p className={s.infoParagraph}> O autismo, ou Transtorno do Espectro Autista (TEA), é uma condição de desenvolvimento que afeta a forma como a pessoa se comunica, interage e processa informações. Características comuns incluem: </p>
            <ul className={s.infoList}>
              <li>Dificuldades na comunicação social (contato visual reduzido, dificuldade em entender expressões faciais e ironias)</li>
              <li>Comportamentos repetitivos (balançar o corpo, fixação por rotinas)</li>
              <li>Interesses restritos (foco intenso em assuntos específicos)</li>
              <li>Sensibilidades sensoriais (hipersensibilidade a sons, luzes ou texturas)</li>
            </ul>
            <p className={s.infoParagraph}> O TEA é chamado de "espectro" porque abrange uma ampla variedade de sintomas e níveis de funcionalidade. </p>
            <h2>Diferença entre autismo leve, moderado e severo: entenda os níveis do TEA</h2>
            <p className={s.infoParagraph}> O DSM-5 (Manual Diagnóstico e Estatístico de Transtornos Mentais) classifica o autismo em três níveis de suporte necessário. Essa classificação ajuda a direcionar terapias e suportes adequados para cada indivíduo. </p>
            <h3>1. Nível 1 (Leve - "Exige suporte")</h3>
            <ul className={s.infoList}>
              <li>Comunicação: Consegue falar, mas pode ter dificuldade em manter conversas longas.</li>
              <li>Comportamento: Luta com mudanças de rotina e pode parecer desorganizado.</li>
              <li>Independência: Geralmente consegue viver de forma autônoma, mas pode precisar de ajuda em situações sociais.</li>
            </ul>
            <h3>2. Nível 2 (Moderado - "Exige suporte substancial")</h3>
            <ul className={s.infoList}>
              <li>Comunicação: Fala limitada ou repetitiva; pode precisar de auxílio para se expressar.</li>
              <li>Comportamento: Movimentos repetitivos mais evidentes; maior dificuldade em lidar com mudanças.</li>
              <li>Independência: Precisa de apoio em atividades diárias e interações sociais.</li>
            </ul>
            <h3>3. Nível 3 (Severo - "Exige suporte muito substancial")</h3>
            <ul className={s.infoList}>
              <li>Comunicação: Pode ser não verbal ou ter linguagem mínima.</li>
              <li>Comportamento: Comportamentos repetitivos intensos e grande dificuldade em lidar com alterações no ambiente.</li>
              <li>Independência: Necessita de assistência constante para tarefas básicas.</li>
            </ul>
            <div className={s.buttonWrapper}>
              <a className={s.primaryBtn} href="/nossa-historia">Sobre nossa história</a>
            </div>
          </div>
        </div>
      </section>

      <section className={s.feedSection}>
        <div className={s.container}>
          <h2 className={s.feedTitle}>Notícias</h2>
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
                    <BotaoNoticia
                      link={noticia.link}
                      className={s.cardButton}
                      onClick={preventClick}
                    >
                      Saiba mais
                    </BotaoNoticia>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={s.contactSection}>
        <div className={s.container}>
          <div className={s.contactContent}>
            <img
              src="/images/cap-logo.png"
              alt="CAP - Central de Atenção ao Paciente"
              className={s.contactLogo}
            />
            <h2 className={s.contactTitle}>Nós queremos te ouvir</h2>
            <p className={s.contactSubtitle}>Fale conosco sua sugestão é muito importante para nós!</p>
          </div>
        </div>
      </section>
    </>
  );
}