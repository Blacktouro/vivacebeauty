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

/* =========================================================
   MÚSICA DE NATAL — "Jingle Bells" (melodia de 1857, domínio público)
   tocada com o Web Audio API: nenhum ficheiro de áudio, nenhuns direitos.
   Toca sempre: arranca logo se o browser deixar, senão no primeiro
   toque/clique na página (os browsers exigem um gesto). Se a pessoa
   carregar em "Parar música", fica desligada nas visitas seguintes.
   ========================================================= */
const N = { C3: 130.81, F3: 174.61, G3: 196.0, C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99 };
const MELODIA = [
  ["E5",1],["E5",1],["E5",2], ["E5",1],["E5",1],["E5",2], ["E5",1],["G5",1],["C5",1.5],["D5",0.5], ["E5",4],
  ["F5",1],["F5",1],["F5",1.5],["F5",0.5], ["F5",1],["E5",1],["E5",1],["E5",0.5],["E5",0.5], ["E5",1],["D5",1],["D5",1],["E5",1], ["D5",2],["G5",2],
  ["E5",1],["E5",1],["E5",2], ["E5",1],["E5",1],["E5",2], ["E5",1],["G5",1],["C5",1.5],["D5",0.5], ["E5",4],
  ["F5",1],["F5",1],["F5",1],["F5",1], ["F5",1],["E5",1],["E5",1],["E5",0.5],["E5",0.5], ["G5",1],["G5",1],["F5",1],["D5",1], ["C5",4],
];
const BAIXO = ["C3","C3","C3","C3","F3","C3","G3","C3","C3","C3","C3","C3","F3","C3","G3","C3"]; // 1 por compasso
const BPM = 150;

function useMusicaNatal() {
  const ctxRef = useRef(null);
  const timerRef = useRef(0);
  const masterRef = useRef(null);
  const [aTocar, setATocar] = useState(false);

  const sino = (ctx, out, f, t, dur, vol) => {
    // som de sino: fundamental + harmónicos com decaimento rápido
    [[1, 1], [2.01, 0.35], [3.98, 0.12]].forEach(([mult, g]) => {
      const o = ctx.createOscillator();
      const v = ctx.createGain();
      o.type = "sine";
      o.frequency.value = f * mult;
      v.gain.setValueAtTime(0.0001, t);
      v.gain.exponentialRampToValueAtTime(vol * g, t + 0.01);
      v.gain.exponentialRampToValueAtTime(0.0001, t + Math.max(dur, 0.35) * 1.4);
      o.connect(v).connect(out);
      o.start(t);
      o.stop(t + Math.max(dur, 0.35) * 1.5);
    });
  };
  const guizos = (ctx, out, t) => {
    // pequeno "chocalho" de guizos em cada tempo
    const len = 0.08;
    const buf = ctx.createBuffer(1, ctx.sampleRate * len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const hp = ctx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 7000;
    const v = ctx.createGain();
    v.gain.value = 0.05;
    src.connect(hp).connect(v).connect(out);
    src.start(t);
  };

  const agendarVolta = (inicio) => {
    const ctx = ctxRef.current;
    const out = masterRef.current;
    const b = 60 / BPM;
    let t = inicio;
    MELODIA.forEach(([n, d]) => {
      sino(ctx, out, N[n], t, d * b, 0.22);
      t += d * b;
    });
    BAIXO.forEach((n, i) => {
      [0, 2].forEach((k) => {
        const tt = inicio + (i * 4 + k) * b;
        const o = ctx.createOscillator();
        const v = ctx.createGain();
        o.type = "triangle";
        o.frequency.value = N[n];
        v.gain.setValueAtTime(0.0001, tt);
        v.gain.exponentialRampToValueAtTime(0.12, tt + 0.02);
        v.gain.exponentialRampToValueAtTime(0.0001, tt + b * 1.8);
        o.connect(v).connect(out);
        o.start(tt);
        o.stop(tt + b * 2);
      });
    });
    for (let k = 0; k < 64; k++) guizos(ctx, out, inicio + k * b);
    const fim = inicio + 64 * b + b * 2; // pausa de 2 tempos entre voltas
    timerRef.current = window.setTimeout(() => agendarVolta(fim), (fim - ctx.currentTime - 1.5) * 1000);
  };

  const aTocarRef = useRef(false);
  const PREF = "vb-musica-natal"; // "off" = a pessoa desligou; fica lembrado

  const criarCtx = () => {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!ctxRef.current) {
      ctxRef.current = new AC();
      masterRef.current = ctxRef.current.createGain();
      masterRef.current.gain.value = 0.5;
      masterRef.current.connect(ctxRef.current.destination);
    }
    return ctxRef.current;
  };

  const comecar = () => {
    if (aTocarRef.current) return;
    const ctx = ctxRef.current;
    masterRef.current.gain.cancelScheduledValues(ctx.currentTime);
    masterRef.current.gain.setValueAtTime(0.0001, ctx.currentTime);
    masterRef.current.gain.exponentialRampToValueAtTime(0.5, ctx.currentTime + 1.2); // entra suave
    agendarVolta(ctx.currentTime + 0.15);
    aTocarRef.current = true;
    setATocar(true);
  };

  const ligar = () => {
    try {
      const ctx = criarCtx();
      ctx.resume().then(() => { if (ctx.state === "running") comecar(); });
      try { localStorage.removeItem(PREF); } catch { /* ignora */ }
    } catch {
      /* sem áudio */
    }
  };
  const desligar = () => {
    window.clearTimeout(timerRef.current);
    const ctx = ctxRef.current;
    if (ctx) {
      // corta suavemente e fecha (pára as notas já agendadas)
      masterRef.current.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.08);
      ctxRef.current = null;
      window.setTimeout(() => ctx.close(), 400);
    }
    aTocarRef.current = false;
    setATocar(false);
    try { localStorage.setItem(PREF, "off"); } catch { /* ignora */ }
  };

  useEffect(() => {
    // Música sempre a tocar: tenta arrancar logo; se o browser não deixar
    // (precisa de um gesto da pessoa), arranca no primeiro toque/clique/tecla
    // em qualquer sítio da página. Se a pessoa a desligou, respeita.
    let desligadoPeloUtilizador = false;
    try { desligadoPeloUtilizador = localStorage.getItem(PREF) === "off"; } catch { /* ignora */ }
    if (desligadoPeloUtilizador) return undefined;

    const eventos = ["pointerdown", "keydown", "touchend"];
    const tirar = () => eventos.forEach((ev) => window.removeEventListener(ev, noGesto, true));
    function noGesto(e) {
      if (e.target?.closest?.(".natal-musica")) { tirar(); return; } // o botão trata disso
      tirar();
      ligar();
    }
    try {
      const ctx = criarCtx();
      ctx.resume().then(() => {
        if (ctx.state === "running") { tirar(); comecar(); }
      }).catch(() => {});
    } catch { /* sem áudio */ }
    eventos.forEach((ev) => window.addEventListener(ev, noGesto, { capture: true, passive: true }));
    return tirar;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // pausa quando o separador fica escondido e continua quando volta
    const vis = () => {
      const ctx = ctxRef.current;
      if (!ctx || !aTocarRef.current) return;
      if (document.hidden) ctx.suspend(); else ctx.resume();
    };
    document.addEventListener("visibilitychange", vis);
    return () => { document.removeEventListener("visibilitychange", vis); window.clearTimeout(timerRef.current); if (ctxRef.current) ctxRef.current.close(); };
  }, []);

  return [aTocar, aTocar ? desligar : ligar];
}

function BotaoMusica({ language }) {
  const [aTocar, alternar] = useMusicaNatal();
  const txt = language === "en"
    ? { on: "Christmas music", off: "Stop music" }
    : { on: "Música de Natal", off: "Parar música" };
  return (
    <button
      type="button"
      className={`natal-musica ${aTocar ? "a-tocar" : ""}`}
      onClick={alternar}
      aria-pressed={aTocar}
      data-umami-event={aTocar ? "natal-musica-parar" : "natal-musica-tocar"}
    >
      <span className="natal-musica-ico" aria-hidden="true">
        {aTocar ? (
          <span className="natal-ondas"><i /><i /><i /><i /></span>
        ) : (
          <svg viewBox="0 0 24 24" fill="none"><path d="M9 18V6l11-2v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><circle cx="6.5" cy="18" r="2.5" fill="currentColor" /><circle cx="17.5" cy="16" r="2.5" fill="currentColor" /></svg>
        )}
      </span>
      <span className="natal-musica-txt">{aTocar ? txt.off : txt.on}</span>
    </button>
  );
}

/* =========================================================
   PRESENTES A CAIR — clicar abre uma mensagem de Natal
   ========================================================= */
const mensagens = {
  pt: [
    { t: "Feliz Natal!", m: "Que esta época te traga calma, carinho e muitos momentos bonitos com quem mais gostas." },
    { t: "Boas Festas!", m: "Obrigada por fazeres parte da família Vivace este ano. Que 2027 seja ainda mais bonito para ti." },
    { t: "Um miminho para ti", m: "Lembra-te: cuidar de ti também é um presente. Tira um tempinho só para ti nestas festas." },
    { t: "Brilha nestas festas!", m: "Que o teu Natal seja cheio de luz, abraços e boas gargalhadas. Feliz Natal da equipa Vivace!" },
    { t: "Feliz Ano Novo!", m: "Que o novo ano chegue cheio de saúde, alegria e motivos para sorrir. Até já na Vivace!" },
  ],
  en: [
    { t: "Merry Christmas!", m: "May this season bring you calm, warmth and lovely moments with the people you love." },
    { t: "Season's greetings!", m: "Thank you for being part of the Vivace family this year. May 2027 be even brighter for you." },
    { t: "A little treat for you", m: "Remember: taking care of yourself is a gift too. Save some time just for you this holiday." },
    { t: "Shine this season!", m: "May your Christmas be full of light, hugs and laughter. Merry Christmas from the Vivace team!" },
    { t: "Happy New Year!", m: "May the new year bring you health, joy and plenty of reasons to smile. See you soon at Vivace!" },
  ],
};
const CORES = [["#c8102e", "#d7b984"], ["#2f5d3a", "#c8102e"], ["#d7b984", "#c8102e"], ["#f7f3ee", "#c8102e"]];

function PresentesACair({ language }) {
  const [lista, setLista] = useState([]);
  const [aberta, setAberta] = useState(null);
  const dlg = useRef(null);
  const idRef = useRef(0);
  const t = language === "en"
    ? { abrir: "Open gift", fechar: "Close", cta: "Book Christmas nails", de: "From the whole Vivace Beauty team" }
    : { abrir: "Abrir presente", fechar: "Fechar", cta: "Marcar unhas de Natal", de: "De toda a equipa Vivace Beauty" };

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const max = window.innerWidth < 600 ? 2 : 3;
    const novo = () => {
      setLista((l) => {
        if (document.hidden || l.length >= max) return l;
        idRef.current += 1;
        const [cor, fita] = CORES[idRef.current % CORES.length];
        return [...l, {
          id: idRef.current,
          x: 6 + Math.random() * 82,
          dur: 11 + Math.random() * 6,
          rot: Math.random() * 40 - 20,
          tam: window.innerWidth < 600 ? 50 : 56 + Math.random() * 14,
          cor, fita,
        }];
      });
    };
    const primeiro = window.setTimeout(novo, 3500);
    const iv = window.setInterval(novo, 7000);
    return () => { window.clearTimeout(primeiro); window.clearInterval(iv); };
  }, []);

  const tirar = (id) => setLista((l) => l.filter((p) => p.id !== id));

  const abrir = (p) => {
    tirar(p.id);
    const lst = mensagens[language] || mensagens.pt;
    setAberta(lst[Math.floor(Math.random() * lst.length)]);
    window.umami?.track?.("natal-presente-aberto");
  };

  useEffect(() => {
    if (aberta && dlg.current && !dlg.current.open) dlg.current.showModal?.();
  }, [aberta]);

  const msgWA = language === "en"
    ? "Hi! I'd like to book my nails for Christmas / New Year's Eve. Which days do you have available?"
    : "Olá! Gostava de marcar as unhas para o Natal / Passagem de Ano. Que dias têm disponíveis?";

  return (
    <>
      <div className="natal-prendas" aria-hidden={lista.length ? undefined : true}>
        {lista.map((p) => (
          <button
            key={p.id}
            type="button"
            className="natal-prenda"
            style={{ left: `${p.x}vw`, width: p.tam, height: p.tam, animationDuration: `${p.dur}s`, "--rot": `${p.rot}deg` }}
            onAnimationEnd={(e) => { if (e.animationName === "prenda-cair") tirar(p.id); }}
            onClick={() => abrir(p)}
            aria-label={t.abrir}
          >
            <Presente cor={p.cor} fita={p.fita} />
          </button>
        ))}
      </div>

      {aberta && (
        <dialog
          ref={dlg}
          className="natal-msg"
          aria-labelledby="natal-msg-t"
          onClose={() => setAberta(null)}
          onClick={(e) => { if (e.target === dlg.current) dlg.current.close(); }}
        >
          <div className="natal-msg-in">
            <button type="button" className="natal-msg-x" onClick={() => dlg.current.close()} aria-label={t.fechar}>×</button>
            <div className="natal-msg-presente" aria-hidden="true"><Presente /></div>
            <div className="natal-msg-confetis" aria-hidden="true">{Array.from({ length: 14 }, (_, i) => <i key={i} />)}</div>
            <h2 id="natal-msg-t">{aberta.t}</h2>
            <p>{aberta.m}</p>
            <p className="natal-msg-de">— {t.de}</p>
            <a
              className="nb-btn nb-btn-1 natal-msg-cta"
              href={`https://wa.me/${TELEFONE_UNHAS}?text=${encodeURIComponent(msgWA)}`}
              target="_blank"
              rel="noopener noreferrer"
              data-umami-event="natal-presente-marcar"
            >
              {t.cta}
            </a>
          </div>
        </dialog>
      )}
    </>
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
      <PresentesACair language={language} />
      <BotaoMusica language={language} />
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
