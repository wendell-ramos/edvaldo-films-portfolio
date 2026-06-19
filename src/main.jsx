import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowUpRight,
  BadgeDollarSign,
  Camera,
  Check,
  Instagram,
  MapPin,
  MousePointer2,
  Pause,
  Play,
  Sparkles,
  Smartphone,
  Video,
  X,
  Youtube,
  Zap,
} from 'lucide-react';
import './styles.css';

const instagramUrl = 'https://www.instagram.com/edvaldofilms/';
const youtubeUrl = 'https://www.youtube.com/@edvaldocordeiro11';

const projects = [
  {
    title: 'Comunicação corporativa',
    type: 'Vídeo corporativo',
    category: 'Reels',
    year: '2026',
    duration: '40s',
    video: './media/reel-financeiro.mp4',
    poster: './media/reel-financeiro.jpg',
    description:
      'Conteúdo profissional para apresentar ideias com clareza, fortalecer a credibilidade e aproximar a marca do público.',
    result: 'Captação dirigida, edição vertical e legendas para comunicação institucional nas redes.',
  },
  {
    title: 'Comercial automotivo',
    type: 'Estética automotiva',
    category: 'Comerciais',
    year: '2026',
    duration: '1min 12s',
    video: './media/comercial-automotivo.mp4',
    poster: './media/comercial-automotivo.jpg',
    description:
      'Produção voltada à estética automotiva, destacando acabamento, transformação e qualidade do serviço.',
    result: 'Vídeo comercial para valorizar o trabalho, fortalecer a marca e atrair novos clientes.',
  },
  {
    title: 'Publi Monster | Setup gamer',
    type: 'Publicação de produto',
    category: 'Lifestyle',
    year: '2025',
    duration: '30s',
    video: './media/setup-lifestyle.mp4',
    poster: './media/setup-lifestyle.jpg',
    description:
      'Publi de produto ambientada em um setup gamer, explorando luz, detalhes e a identidade visual da marca.',
    result: 'Peça vertical com linguagem lifestyle para redes sociais, campanhas e divulgação de produto.',
  },
  {
    title: 'Autoridade para especialistas',
    type: 'Conteúdo profissional',
    category: 'Reels',
    year: '2026',
    duration: '26s',
    video: './media/reel-gestao.mp4',
    poster: './media/reel-gestao.jpg',
    description:
      'Reel profissional com fala direta, cenário planejado e enquadramento limpo para transmitir conhecimento.',
    result: 'Conteúdo vertical com legendas, pensado para construir autoridade e presença digital.',
  },
];

const droneProjects = [
  {
    title: 'Horizonte urbano',
    type: 'Captação aérea',
    category: 'Drone',
    year: '2026',
    duration: '1min 02s',
    video: './media/aereo-litoral.mp4',
    poster: './media/aereo-litoral.jpg',
    orientation: 'landscape',
    description:
      'Movimentos amplos sobre litoral, arquitetura e espaços urbanos para apresentar destinos com escala.',
    result: 'Imagens aéreas horizontais para comerciais, turismo, eventos, campanhas e filmes institucionais.',
  },
  {
    title: 'Território e propriedade',
    type: 'Drone institucional',
    category: 'Drone',
    year: '2026',
    duration: '1min 03s',
    video: './media/aereo-institucional.mp4',
    poster: './media/aereo-institucional.jpg',
    orientation: 'landscape',
    description:
      'Percurso aéreo entre estrada, área verde e propriedade, conectando localização, entorno e estrutura.',
    result: 'Captação de contexto para imóveis, hospedagens, agronegócio, turismo e apresentações de negócio.',
  },
];

const services = [
  {
    icon: <Smartphone aria-hidden="true" />,
    title: 'Reels',
    copy: 'Conteúdos verticais com gancho nos primeiros segundos, ritmo de rede social e versões prontas para publicar.',
  },
  {
    icon: <BadgeDollarSign aria-hidden="true" />,
    title: 'Comerciais',
    copy: 'Vídeos para marcas, produtos e negócios locais com roteiro objetivo, direção visual e foco em conversão.',
  },
  {
    icon: <Camera aria-hidden="true" />,
    title: 'Lifestyle',
    copy: 'Filmes com movimento, naturalidade e estética de campanha para pessoas, experiências e marcas pessoais.',
  },
  {
    icon: <Video aria-hidden="true" />,
    title: 'Drone',
    copy: 'Imagens aéreas em 4K para revelar localização, escala e atmosfera em comerciais e projetos institucionais.',
  },
];

const timeline = [
  ['01', 'Briefing', 'Objetivo do vídeo, público, formato e canal principal: Reels, campanha ou portfólio.'],
  ['02', 'Roteiro visual', 'Ganchos, cenas-chave, referências, locação e ritmo pensado para prender atenção.'],
  ['03', 'Gravação', 'Direção no set, captação dos takes principais e materiais extras para cortes curtos.'],
  ['04', 'Entrega', 'Vídeo final, versões verticais, ajustes combinados e arquivos prontos para publicar.'],
];

const stats = [
  ['Reels', 'conteúdo vertical'],
  ['Drone', 'captação aérea 4K'],
  ['Ads', 'comerciais para marcas'],
];

const filters = ['Todos', 'Reels', 'Comerciais', 'Lifestyle'];

const stills = [
  {
    src: './media/still-corporativo.webp',
    title: 'Presença profissional',
    label: 'Retrato corporativo',
    className: 'is-featured',
  },
  {
    src: './media/still-lifestyle.webp',
    title: 'Histórias espontâneas',
    label: 'Lifestyle',
    className: '',
  },
  {
    src: './media/still-cotidiano.webp',
    title: 'Luz que cria atmosfera',
    label: 'Cotidiano',
    className: '',
  },
];

function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(maxScroll > 0 ? window.scrollY / maxScroll : 0);
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  return progress;
}

function useRevealOnScroll(dependency) {
  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.16 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [dependency]);
}

function App() {
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });
  const heroVideoRef = useRef(null);
  const progress = useScrollProgress();

  useRevealOnScroll(activeFilter);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'Todos') return projects;
    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  useEffect(() => {
    if (!heroVideoRef.current) return;
    if (isPlaying) {
      heroVideoRef.current.play().catch(() => {});
    } else {
      heroVideoRef.current.pause();
    }
  }, [isPlaying]);

  function handlePointerMove(event) {
    const x = Math.round((event.clientX / window.innerWidth) * 100);
    const y = Math.round((event.clientY / window.innerHeight) * 100);
    setSpotlight({ x, y });
  }

  return (
    <main
      style={{
        '--scroll-progress': progress,
        '--spot-x': `${spotlight.x}%`,
        '--spot-y': `${spotlight.y}%`,
      }}
      onPointerMove={handlePointerMove}
    >
      <div className="scroll-progress" aria-hidden="true" />
      <div className="spotlight" aria-hidden="true" />

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Início - Edvaldo Films">
          <img src="./media/edvaldo-films-logo.png" alt="Edvaldo Films" />
        </a>
        <nav aria-label="Navegação principal">
          <a href="#works">Trabalhos</a>
          <a href="#process">Processo</a>
          <a href="#contact">Contato</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-media" aria-hidden="true">
          <video
            ref={heroVideoRef}
            src="./media/aereo-litoral.mp4"
            poster="./media/aereo-litoral.jpg"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>
        <div className="hero-overlay" />

        <div className="hero-content" data-reveal>
          <p className="eyebrow">
            <Sparkles size={16} aria-hidden="true" />
            Drone • Reels • Comerciais • Lifestyle
          </p>
          <h1 className="slogan-title">
            <span>Criar</span>
            <i aria-hidden="true">/</i>
            <span>Registrar</span>
            <i aria-hidden="true">/</i>
            <span>Marcar</span>
          </h1>
          <p className="hero-copy">
            Filmes que fazem parar o scroll. A Edvaldo Films cria imagens aéreas,
            conteúdos verticais, comerciais e filmes lifestyle, unindo escala
            cinematográfica com ritmo feito para redes sociais.
          </p>
          <div className="hero-actions">
            <a className="primary-button magnetic" href="#works">
              <Play size={18} aria-hidden="true" />
              Ver trabalhos
            </a>
            <a
              className="ghost-button magnetic"
              href={youtubeUrl}
              target="_blank"
              rel="noreferrer"
            >
              Canal no YouTube
              <Youtube size={18} aria-hidden="true" />
            </a>
          </div>
        </div>

        <aside className="hero-panel" aria-label="Destaques do trabalho" data-reveal>
          <a className="profile-link" href={instagramUrl} target="_blank" rel="noreferrer">
            <Instagram size={16} aria-hidden="true" />
            @edvaldofilms
          </a>
          {stats.map(([value, label]) => (
            <div key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
          <button
            className="motion-toggle"
            type="button"
            onClick={() => setIsPlaying((current) => !current)}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            {isPlaying ? 'Pausar movimento' : 'Retomar movimento'}
          </button>
        </aside>
      </section>

      <div className="kinetic-strip" aria-hidden="true">
        <div className="kinetic-track">
          {[0, 1].map((group) => (
            <div className="kinetic-group" key={group}>
              <span>DRONE</span><i>01</i><span>REELS</span><i>02</i>
              <span>COMERCIAIS</span><i>03</i><span>LIFESTYLE</span><i>04</i>
            </div>
          ))}
        </div>
      </div>

      <section className="intro section-shell" data-reveal>
        <div>
          <p className="section-kicker">Identidade</p>
          <h2>Um portfólio feito para valorizar cada imagem.</h2>
        </div>
        <p>
          Cada projeto combina intenção, ritmo e estética para apresentar marcas,
          pessoas e lugares com clareza. Do drone ao Reel, o objetivo é transformar
          boas ideias em imagens que permanecem.
        </p>
      </section>

      <section className="aerial-section" id="aerial">
        <div className="section-shell aerial-heading" data-reveal>
          <div>
            <p className="section-kicker">Captação aérea</p>
            <h2>Uma nova perspectiva muda toda a história.</h2>
          </div>
          <p>
            Do litoral a uma propriedade, o drone apresenta escala, localização
            e atmosfera em poucos segundos.
          </p>
        </div>
        <div className="aerial-grid">
          {droneProjects.map((project, index) => (
            <article className="aerial-card" key={project.title} data-reveal>
              <button type="button" onClick={() => setSelectedProject(project)}>
                <video
                  src={project.video}
                  poster={project.poster}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label={`Trecho aéreo do projeto ${project.title}`}
                  onMouseEnter={(event) => event.currentTarget.play()}
                  onMouseLeave={(event) => {
                    event.currentTarget.pause();
                    event.currentTarget.currentTime = 0;
                  }}
                />
                <div className="aerial-overlay">
                  <span>0{index + 1} / DRONE 4K</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <strong>
                    Assistir projeto
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </strong>
                </div>
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="making-section">
        <div className="section-shell making-heading" data-reveal>
          <div>
            <p className="section-kicker">Por trás da câmera</p>
            <h2>Do bastidor ao frame final.</h2>
          </div>
          <p>
            Direção, movimento e intenção antes da imagem pronta. Dois olhares
            sobre a mesma cena.
          </p>
        </div>
        <div className="making-grid section-shell">
          <figure data-reveal>
            <video
              src="./media/bastidor-praia.mp4"
              poster="./media/bastidor-praia.jpg"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
            <figcaption>
              <span>01</span>
              <strong>Bastidor</strong>
            </figcaption>
          </figure>
          <figure data-reveal style={{ '--delay': '120ms' }}>
            <video
              src="./media/resultado-praia.mp4"
              poster="./media/resultado-praia.jpg"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
            <figcaption>
              <span>02</span>
              <strong>Resultado</strong>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="work-section" id="works">
        <div className="section-shell section-heading" data-reveal>
          <p className="section-kicker">Portfólio</p>
          <h2>Projetos em destaque</h2>
          <div className="filter-bar" aria-label="Filtro de projetos">
            {filters.map((filter) => (
              <button
                key={filter}
                className={activeFilter === filter ? 'is-active' : ''}
                type="button"
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="project-grid">
          {filteredProjects.map((project, index) => (
            <article
              className="project-card is-visible"
              key={project.title}
              data-reveal
              style={{ '--delay': `${index * 90}ms` }}
            >
              <button type="button" onClick={() => setSelectedProject(project)}>
                <video
                  src={project.video}
                  poster={project.poster}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label={`Trecho do projeto ${project.title}`}
                  onMouseEnter={(event) => event.currentTarget.play()}
                  onMouseLeave={(event) => {
                    event.currentTarget.pause();
                    event.currentTarget.currentTime = 0;
                  }}
                />
                <span className="play-badge">
                  <Play size={18} fill="currentColor" aria-hidden="true" />
                  Ver case
                </span>
                <div className="project-info">
                  <span>0{index + 1}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <footer>
                    <small>{project.type}</small>
                    <small>{project.duration}</small>
                  </footer>
                </div>
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="stills-section">
        <div className="section-shell stills-heading" data-reveal>
          <p className="section-kicker">Frames fotográficos</p>
          <h2>Algumas histórias cabem em um único instante.</h2>
          <p>
            Retrato, luz e composição também fazem parte do olhar por trás dos
            filmes.
          </p>
        </div>
        <div className="stills-grid section-shell">
          {stills.map((still, index) => (
            <figure
              className={`still-frame ${still.className}`}
              key={still.src}
              data-reveal
              style={{ '--delay': `${index * 100}ms` }}
            >
              <img src={still.src} alt={still.title} loading="lazy" />
              <figcaption>
                <span>{still.label}</span>
                <strong>{still.title}</strong>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="services section-shell" id="services" data-reveal>
        <div className="section-heading">
          <p className="section-kicker">Produção</p>
          <h2>Do nível da rua ao olhar de cima</h2>
        </div>
        <div className="service-grid">
          {services.map((service) => (
            <article className="service-card" key={service.title}>
              <div className="icon-box">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="process section-shell" id="process">
        <div className="section-heading" data-reveal>
          <p className="section-kicker">Fluxo</p>
          <h2>Como a ideia vira conteúdo publicado</h2>
        </div>
        <div className="timeline">
          {timeline.map(([number, title, copy]) => (
            <article key={number} data-reveal>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="section-shell contact-inner" data-reveal>
          <div>
            <p className="section-kicker">Contato</p>
            <h2>Vamos transformar a ideia em conteúdo?</h2>
            <p>
              Edvaldo Films atende em João Pessoa/PB com drone, Reels,
              comerciais, lifestyle, YouTube e campanhas digitais.
            </p>
          </div>
          <div className="contact-actions">
            <a href={instagramUrl} target="_blank" rel="noreferrer">
              <Instagram size={20} aria-hidden="true" />
              Instagram
            </a>
            <a href={youtubeUrl} target="_blank" rel="noreferrer">
              <Youtube size={20} aria-hidden="true" />
              YouTube
            </a>
            <span>
              <MapPin size={20} aria-hidden="true" />
              João Pessoa/PB
            </span>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <span>Desenvolvido por</span>
        <a
          href="https://wendell-ramos.github.io/portfolio-wendell-ramos/"
          target="_blank"
          rel="noreferrer"
        >
          Wendell Ramos
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </footer>

      <FloatingBrief />

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

    </main>
  );
}

function FloatingBrief() {
  return (
    <aside className="floating-brief" aria-label="Resumo rápido do projeto">
      <MousePointer2 size={16} aria-hidden="true" />
      <span>Edvaldo Films | Drone, Reels e Comerciais | @edvaldofilms</span>
    </aside>
  );
}

function ProjectModal({ project, onClose }) {
  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <section
        className={`project-modal ${project.orientation === 'landscape' ? 'is-landscape' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={`Detalhes do projeto ${project.title}`}
        onClick={(event) => event.stopPropagation()}
      >
        <button className="close-modal" type="button" onClick={onClose} aria-label="Fechar">
          <X size={22} aria-hidden="true" />
        </button>
          <video
            src={project.video}
            poster={project.poster}
            controls
            autoPlay
            muted
            playsInline
          aria-label={`Vídeo do projeto ${project.title}`}
        />
        <div className="modal-copy">
          <p className="section-kicker">{project.category}</p>
          <h2>{project.title}</h2>
          <p>{project.description}</p>
          <ul>
            <li>
              <Check size={18} aria-hidden="true" />
              {project.result}
            </li>
            <li>
              <Zap size={18} aria-hidden="true" />
              Formato pensado para impacto visual nos primeiros segundos.
            </li>
          </ul>
          <button className="primary-button" type="button" onClick={onClose}>
            Fechar case
          </button>
        </div>
      </section>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
