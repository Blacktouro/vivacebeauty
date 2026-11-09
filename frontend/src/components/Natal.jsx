import { useEffect, useRef, useState } from "react";
import "../styles/natal.css";

/**
 * Tema de Natal da Vivace Beauty
 * ------------------------------
 * Liga-se sozinho de 9 de novembro a 6 de janeiro (muda INICIO/FIM abaixo).
 * Para ver antes (ou testar): https://vivace-beauty.pt/?natal=1
 * Para desligar à força:       https://vivace-beauty.pt/?natal=0
 *
 * O que faz:
 *  - neve a cair (canvas leve, pára quando o separador não está visível,
 *    desliga-se com "reduzir movimento")
 *  - faixa de Boas Festas no topo, com botão de marcação
 *  - gorro de Pai Natal no logótipo e grinalda com bolas por baixo do cabeçalho (CSS)
 *  - acentos vermelhos (classe "natal" no <html>, ver natal.css)
 */

const TELEFONE = "351910624152"; // marcações gerais
const TELEFONE_UNHAS = "351912088636"; // unhas (o mesmo do agendamento de Unhas)

// Período do tema: [mês (1-12), dia]
const INICIO = [11, 9];
const FIM = [1, 6];

const textos = {
  pt: {
    faixa: "Boas Festas da Vivace Beauty",
    mensagens: [
      "Boas Festas da Vivace Beauty",
      "Unhas de Natal: gel, nail art e as cores das festas",
      "Marca já as tuas unhas para o Natal e a Passagem de Ano",
      "Marca cedo e escolhe o dia que te dá mais jeito",
    ],
    botao: "Marcar unhas",
    msg: "Olá! Gostava de marcar as unhas para o Natal / Passagem de Ano. Que dias têm disponíveis?",
    fechar: "Fechar mensagem de Natal",
  },
  en: {
    faixa: "Season's greetings from Vivace Beauty",
    mensagens: [
      "Season's greetings from Vivace Beauty",
      "Christmas nails: gel, nail art and festive colours",
      "Book your nails for Christmas and New Year's Eve",
      "Book early and pick the day that suits you",
    ],
    botao: "Book nails",
    msg: "Hi! I'd like to book my nails for Christmas / New Year's Eve. Which days do you have available?",
    fechar: "Close Christmas message",
  },
};

export function natalAtivo(hoje = new Date()) {
  try {
    const p = new URLSearchParams(window.location.search).get("natal");
    if (p === "1") return true;
    if (p === "0") return false;
  } catch {
    /* sem window */
  }
  const hojeN = (hoje.getMonth() + 1) * 100 + hoje.getDate(); // ex.: 1209 = 9 dez
  const ini = INICIO[0] * 100 + INICIO[1];
  const fim = FIM[0] * 100 + FIM[1];
  return ini <= fim ? hojeN >= ini && hojeN <= fim : hojeN >= ini || hojeN <= fim;
}

function Neve() {
  const ref = useRef(null);

  useEffect(() => {
    const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduz) return undefined;

    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let w = 0;
    let h = 0;
    let flocos = [];
    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function criar() {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = w < 600 ? 45 : 110;
      flocos = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.8 + Math.random() * 2.6,
        v: 0.3 + Math.random() * 0.9,
        o: Math.random() * Math.PI * 2,
        a: 0.35 + Math.random() * 0.55,
      }));
    }

    function passo() {
      ctx.clearRect(0, 0, w, h);
      for (const f of flocos) {
        f.y += f.v;
        f.o += 0.01;
        f.x += Math.sin(f.o) * 0.35;
        if (f.y > h + 5) {
          f.y = -5;
          f.x = Math.random() * w;
        }
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${f.a})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(passo);
    }

    function visibilidade() {
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(passo);
    }

    criar();
    raf = requestAnimationFrame(passo);
    window.addEventListener("resize", criar);
    document.addEventListener("visibilitychange", visibilidade);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", criar);
      document.removeEventListener("visibilitychange", visibilidade);
    };
  }, []);

  return <canvas ref={ref} className="natal-neve" aria-hidden="true" />;
}

/* Gorro original (SVG próprio) */
export function Gorro({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 64 48" aria-hidden="true">
      <path d="M8 38 C14 14 34 2 52 10 C58 13 60 22 56 30 C50 22 40 20 30 26 C24 30 20 34 18 38 Z" fill="#C8102E" />
      <path d="M30 26 C40 20 50 22 56 30 C52 24 44 22 36 24 Z" fill="#9E0B23" />
      <rect x="4" y="34" width="34" height="11" rx="5.5" fill="#F7F3EE" />
      <circle cx="56" cy="32" r="6" fill="#F7F3EE" />
    </svg>
  );
}


/* ---------- Pai Natal a voar (SVG original) ---------- */
function PaiNatalTreno() {
  const rena = (x) => (
    <g transform={`translate(${x} 0)`}>
      {/* hastes */}
      <path d="M44 14 l-4 -10 M44 14 l3 -11 M41 7 l-5 -2 M46 6 l4 -3" stroke="#6b4423" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      {/* corpo */}
      <ellipse cx="26" cy="34" rx="20" ry="9" fill="#8a5a33" />
      <path d="M40 30 Q46 22 46 16" stroke="#8a5a33" strokeWidth="7" strokeLinecap="round" fill="none" />
      <ellipse cx="48" cy="16" rx="7" ry="5" fill="#8a5a33" />
      <circle cx="55" cy="17" r="2.4" fill="#c8102e" />
      <circle cx="47" cy="14" r="1.2" fill="#1a1a1a" />
      {/* patas a galopar */}
      <path d="M14 40 l-8 8 M20 41 l-3 10 M34 41 l6 9 M38 39 l10 5" stroke="#6b4423" strokeWidth="3" strokeLinecap="round" />
      <path d="M8 30 q-6 -2 -8 2" stroke="#6b4423" strokeWidth="3" strokeLinecap="round" fill="none" />
    </g>
  );
  return (
    <svg className="natal-treno-svg" viewBox="0 0 330 90" aria-hidden="true">
      {/* rasto de brilho */}
      <g fill="#f0c48a">
        <circle cx="318" cy="64" r="2" opacity=".9" />
        <circle cx="308" cy="58" r="1.4" opacity=".7" />
        <circle cx="324" cy="52" r="1.2" opacity=".6" />
        <path d="M300 70 l2 -5 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 z" opacity=".8" />
      </g>
      {/* rédeas */}
      <path d="M182 50 Q140 42 118 34 M182 50 Q110 40 58 34" stroke="#d7b984" strokeWidth="1.5" fill="none" />
      {rena(70)}
      {rena(0)}
      {/* trenó */}
      <path d="M176 44 h92 q14 0 18 -16 l4 -6 q-2 30 -26 34 h-80 q-10 0 -8 -12z" fill="#c8102e" />
      <path d="M170 74 q4 6 14 6 h100 q12 0 16 -10" stroke="#d7b984" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M196 66 v10 M262 66 v10" stroke="#d7b984" strokeWidth="3" />
      <path d="M178 46 h92" stroke="#d7b984" strokeWidth="2" />
      {/* saco de presentes */}
      <path d="M248 40 q-6 -26 14 -28 q20 2 14 28z" fill="#7a4b22" />
      <rect x="252" y="14" width="10" height="9" rx="1.5" fill="#2f5d3a" />
      <rect x="264" y="18" width="8" height="8" rx="1.5" fill="#d7b984" />
      {/* Pai Natal */}
      <ellipse cx="222" cy="36" rx="15" ry="13" fill="#c8102e" />
      <rect x="208" y="38" width="29" height="4" fill="#1a1a1a" />
      <circle cx="222" cy="20" r="8.5" fill="#f2c9a0" />
      <path d="M212 22 q10 16 20 0 q-2 10 -10 10 q-8 0 -10 -10z" fill="#f7f3ee" />
      <path d="M213 16 q8 -16 22 -6 l6 4 l-3 2 q-10 -6 -25 0z" fill="#c8102e" />
      <rect x="211" y="14" width="19" height="4.5" rx="2.2" fill="#f7f3ee" />
      <circle cx="241" cy="16" r="3.2" fill="#f7f3ee" />
      <path d="M206 34 q-12 -2 -20 6" stroke="#c8102e" strokeWidth="6" strokeLinecap="round" fill="none" />
      <circle cx="185" cy="41" r="3.5" fill="#f7f3ee" />
    </svg>
  );
}

function PaiNatalVoar() {
  return (
    <div className="natal-treno" aria-hidden="true">
      <div className="natal-treno-bob">
        <PaiNatalTreno />
      </div>
    </div>
  );
}

/* ---------- Presente (SVG original) ---------- */
export function Presente({ cor = "#c8102e", fita = "#d7b984", className = "" }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      <rect x="8" y="26" width="48" height="32" rx="4" fill={cor} />
      <rect x="4" y="18" width="56" height="12" rx="3" fill={cor} />
      <rect x="4" y="27" width="56" height="3" fill="rgba(0,0,0,.18)" />
      <rect x="28" y="18" width="8" height="40" fill={fita} />
      <path d="M32 18 C22 4 10 10 16 16 C19 19 28 18 32 18 Z" fill={fita} />
      <path d="M32 18 C42 4 54 10 48 16 C45 19 36 18 32 18 Z" fill={fita} />
      <circle cx="32" cy="18" r="3.5" fill={fita} />
    </svg>
  );
}

/* ---------- Banner grande de Natal (depois do "Sobre nós") ---------- */
const bannerTextos = {
  pt: {
    tag: "Natal na Vivace",
    titulo: ["O teu Natal", "começa aqui"],
    intro: "Prepara-te para a Consoada, o almoço de Natal e a Passagem de Ano. Marca com tempo e chega às festas com as unhas, o cabelo e o olhar prontos.",
    cards: [
      { t: "Unhas de Natal", d: "Gel, nail art e as cores das festas: vermelho, dourado, brilhos." },
      { t: "Cabelo para as festas", d: "Corte, cor e brushing para a Consoada e a Passagem de Ano." },
      { t: "Olhar de festa", d: "Pestanas e sobrancelhas para brilhar nas fotos de família." },
    ],
    cta1: "Marcar unhas de Natal",
    cta2: "Marcar outro serviço",
    msg1: "Olá! Gostava de marcar as unhas para o Natal / Passagem de Ano. Que dias têm disponíveis?",
    msg2: "Olá! Gostava de marcar um atendimento para as festas de Natal / Passagem de Ano.",
  },
  en: {
    tag: "Christmas at Vivace",
    titulo: ["Your Christmas", "starts here"],
    intro: "Get ready for Christmas Eve, Christmas lunch and New Year's Eve. Book early and arrive with your nails, hair and look ready.",
    cards: [
      { t: "Christmas nails", d: "Gel, nail art and festive colours: red, gold and glitter." },
      { t: "Party hair", d: "Cut, colour and blow-dry for Christmas and New Year's Eve." },
      { t: "Party look", d: "Lashes and brows to shine in the family photos." },
    ],
    cta1: "Book Christmas nails",
    cta2: "Book another service",
    msg1: "Hi! I'd like to book my nails for Christmas / New Year's Eve. Which days do you have available?",
    msg2: "Hi! I'd like to book an appointment for Christmas / New Year's Eve.",
  },
};

export function NatalBanner({ language = "pt" }) {
  const [ativo] = useState(() => natalAtivo());
  if (!ativo) return null;
  const t = bannerTextos[language] || bannerTextos.pt;
  const icones = [
    <svg key="u" viewBox="0 0 24 24" fill="none"><path d="M8 21V10a4 4 0 0 1 8 0v11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><path d="M10 9.5a2 2 0 0 1 4 0V14h-4z" fill="currentColor" opacity=".35" /></svg>,
    <svg key="t" viewBox="0 0 24 24" fill="none"><circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="2" /><circle cx="6" cy="6" r="3" stroke="currentColor" strokeWidth="2" /><path d="M8.5 7.5L20 18M8.5 16.5L20 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>,
    <svg key="o" viewBox="0 0 24 24" fill="none"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" /><path d="M6 6.5L5 4.5M10 5.5V3.5M14 5.5V3.5M18 6.5l1-2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>,
  ];
  return (
    <section className="natal-banner" id="natal" aria-labelledby="natal-banner-t">
      <Presente className="nb-presente nb-p1" />
      <Presente className="nb-presente nb-p2" cor="#2f5d3a" />
      <Presente className="nb-presente nb-p3" cor="#d7b984" fita="#c8102e" />
      <div className="nb-in">
        <div className="nb-texto">
          <p className="nb-tag"><Gorro className="nb-gorro" /> {t.tag}</p>
          <h2 id="natal-banner-t">
            {t.titulo[0]} <span>{t.titulo[1]}</span>
          </h2>
          <p className="nb-intro">{t.intro}</p>
          <div className="nb-botoes">
            <a className="nb-btn nb-btn-1" href={`https://wa.me/${TELEFONE_UNHAS}?text=${encodeURIComponent(t.msg1)}`} target="_blank" rel="noopener noreferrer" data-umami-event="natal-banner-unhas">{t.cta1}</a>
            <a className="nb-btn nb-btn-2" href={`https://wa.me/${TELEFONE}?text=${encodeURIComponent(t.msg2)}`} target="_blank" rel="noopener noreferrer" data-umami-event="natal-banner-outro">{t.cta2}</a>
          </div>
        </div>
        <ul className="nb-cards">
          {t.cards.map((c, i) => (
            <li key={c.t} className="nb-card">
              <span className="nb-ico" aria-hidden="true">{icones[i]}</span>
              <h3>{c.t}</h3>
              <p>{c.d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function Natal({ language = "pt" }) {
  const [ativo] = useState(() => natalAtivo());
  const [faixa, setFaixa] = useState(() => {
    try {
      return sessionStorage.getItem("vb-natal-faixa") !== "fechada";
    } catch {
      return true;
    }
  });
  const t = textos[language] || textos.pt;

  useEffect(() => {
    if (!ativo) return undefined;
    document.documentElement.classList.add("natal");
    return () => document.documentElement.classList.remove("natal");
  }, [ativo]);

  if (!ativo) return null;

  const fechar = () => {
    setFaixa(false);
    try {
      sessionStorage.setItem("vb-natal-faixa", "fechada");
    } catch {
      /* ignora */
    }
  };

  return (
    <>
      <Neve />
      <PaiNatalVoar />
      {faixa && (
        <div className="natal-faixa" role="region" aria-label={t.faixa}>
          <div className="natal-faixa-in">
            <Gorro className="natal-faixa-gorro" />
            <p className="sr-only">{t.mensagens.join(". ")}</p>
            <div className="natal-ticker" aria-hidden="true">
              <div className="natal-ticker-track">
                {[0, 1].map((k) => (
                  <div className="natal-ticker-grupo" key={k}>
                    {t.mensagens.map((m) => (
                      <span key={m}>
                        <i>✦</i> {m}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <a
              className="natal-faixa-btn"
              href={`https://wa.me/${TELEFONE_UNHAS}?text=${encodeURIComponent(t.msg)}`}
              target="_blank"
              rel="noopener noreferrer"
              data-umami-event="natal-marcar-unhas"
            >
              {t.botao}
            </a>
            <button type="button" className="natal-faixa-x" onClick={fechar} aria-label={t.fechar}>
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
}
