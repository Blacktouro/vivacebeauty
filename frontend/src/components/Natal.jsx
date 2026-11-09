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
