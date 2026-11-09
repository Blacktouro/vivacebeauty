import React, { useEffect } from "react";

/**
 * Secção "Novidades" — Laser Podológico & Depilação a Laser (PT / EN)
 * --------------------------------------------------------------------
 * Como usar (igual à secção Sobre):
 *   import NovidadesSection from "./NovidadesSection";
 *   <NovidadesSection language={language} />
 *
 * "language" pode ser "pt" ou "en". Se não for passado, fica em "pt".
 *
 * ONDE COLOCAR AS FOTOS
 * ---------------------
 *   public/
 *     IMG/
 *       laser-podologico.jpg
 *       depilacao-laser.jpg
 *
 * Os nomes têm de ser iguais aos do campo "imagem" em IMAGENS (abaixo).
 * Atenção às maiúsculas: "IMG" não é o mesmo que "img" num servidor.
 */

const NOME_CLINICA = "Vivace-Beauty";
const CIDADE = "Peniche";
const URL_SITE = "https://www.vivace-beauty.pt";

// Contacto para marcações
const TELEFONE_VISIVEL = "919 828 555";
const TELEFONE_INTERNACIONAL = "351919828555"; // sem "+" nem espaços

const PASTA_IMAGENS = "/IMG";

// Página própria dos tratamentos a laser (subdomínio)
const URL_LASER = "https://laser.vivace-beauty.pt/";
const LINKS_LASER = {
  "laser-podologico": `${URL_LASER}#laser-podologico`,
  "depilacao-laser": URL_LASER,
};

// As fotos são as mesmas nas duas línguas
const IMAGENS = {
  "laser-podologico": "laser-podologico.jpg",
  "depilacao-laser": "depilacao-laser.jpg",
};

const linkLigar = `tel:+${TELEFONE_INTERNACIONAL}`;
const linkWhatsApp = (mensagem) =>
  `https://wa.me/${TELEFONE_INTERNACIONAL}?text=${encodeURIComponent(mensagem)}`;

const content = {
  pt: {
    tag: "Na clínica",
    titleStart: "Novidades:",
    service1: "laser podológico",
    and: "e",
    service2: "depilação a laser",
    intro: `Duas novas tecnologias a laser chegaram à ${NOME_CLINICA}, em ${CIDADE}: tratamento de fungos e calos com laser podológico, e depilação a laser para uma pele mais lisa por mais tempo.`,
    booking: "Marcações:",
    whatsappBtn: "Marcar pelo WhatsApp",
    callBtn: "Ligar",
    moreBtn: "Saber mais",
    moreAria: (titulo) => `Saber mais sobre ${titulo}`,
    whatsappAria: (titulo) => `Marcar ${titulo} pelo WhatsApp, ${TELEFONE_VISIVEL}`,
    callAria: `Ligar para a ${NOME_CLINICA}, ${TELEFONE_VISIVEL}`,
    items: [
      {
        id: "laser-podologico",
        tag: "Novo tratamento",
        titulo: "Laser Podológico",
        resumo:
          "Tratamento avançado a laser para fungos das unhas (onicomicose), calos e verrugas plantares — sem dor e sem tempo de paragem.",
        beneficios: [
          "Elimina fungos das unhas de forma eficaz e segura",
          "Sem cortes, sem anestesia, sem recuperação",
          "Resultados visíveis já nas primeiras sessões",
        ],
        imagemAlt: `Podologista a aplicar laser podológico numa unha do pé em ${CIDADE}`,
        mensagemWhatsApp: `Olá! Gostaria de marcar uma avaliação de laser podológico na ${NOME_CLINICA}.`,
      },
      {
        id: "depilacao-laser",
        tag: "Novidade na loja",
        titulo: "Depilação a Laser",
        resumo:
          "Depilação a laser de última geração para rosto e corpo, com redução progressiva e duradoura do pelo em todos os tipos de pele.",
        beneficios: [
          "Tecnologia indolor adaptada a cada tipo de pele",
          "Menos pelos encravados e irritação",
          "Laser díodo para rosto e corpo",
        ],
        imagemAlt: `Sessão de depilação a laser profissional em ${CIDADE}`,
        mensagemWhatsApp: `Olá! Gostaria de marcar uma sessão de depilação a laser na ${NOME_CLINICA}.`,
      },
    ],
  },

  en: {
    tag: "At the clinic",
    titleStart: "New:",
    service1: "podiatry laser",
    and: "and",
    service2: "laser hair removal",
    intro: `Two new laser treatments have arrived at ${NOME_CLINICA} in ${CIDADE}: podiatry laser for nail fungus and calluses, and laser hair removal for smoother skin that lasts longer.`,
    booking: "Bookings:",
    whatsappBtn: "Book on WhatsApp",
    callBtn: "Call",
    moreBtn: "Learn more",
    moreAria: (titulo) => `Learn more about ${titulo}`,
    whatsappAria: (titulo) => `Book ${titulo} on WhatsApp, ${TELEFONE_VISIVEL}`,
    callAria: `Call ${NOME_CLINICA}, ${TELEFONE_VISIVEL}`,
    items: [
      {
        id: "laser-podologico",
        tag: "New treatment",
        titulo: "Podiatry Laser",
        resumo:
          "Advanced laser treatment for nail fungus (onychomycosis), calluses and plantar warts — painless, with no downtime.",
        beneficios: [
          "Treats nail fungus effectively and safely",
          "No cuts, no anaesthesia, no recovery time",
          "Visible results from the first sessions",
        ],
        imagemAlt: `Podiatrist applying laser treatment to a toenail in ${CIDADE}`,
        mensagemWhatsApp: `Hi! I'd like to book a podiatry laser assessment at ${NOME_CLINICA}.`,
      },
      {
        id: "depilacao-laser",
        tag: "New in store",
        titulo: "Laser Hair Removal",
        resumo:
          "Latest-generation laser hair removal for face and body, with gradual, long-lasting hair reduction for all skin types.",
        beneficios: [
          "Painless technology adapted to every skin type",
          "Fewer ingrown hairs and less irritation",
          "Diode laser for face and body",
        ],
        imagemAlt: `Professional laser hair removal session in ${CIDADE}`,
        mensagemWhatsApp: `Hi! I'd like to book a laser hair removal session at ${NOME_CLINICA}.`,
      },
    ],
  },
};

export default function NovidadesSection({ language = "pt" }) {
  const t = content[language] || content.pt;

  // JSON-LD para o Google — atualiza quando a língua muda
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "novidades-jsonld";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": t.items.map((n) => ({
        "@type": "Service",
        name: n.titulo,
        description: n.resumo,
        inLanguage: language,
        image: `${URL_SITE}${PASTA_IMAGENS}/${IMAGENS[n.id]}`,
        provider: {
          "@type": "MedicalBusiness",
          name: NOME_CLINICA,
          telephone: `+${TELEFONE_INTERNACIONAL}`,
          areaServed: CIDADE,
        },
        url: `${URL_SITE}/#${n.id}`,
      })),
    });
    const existing = document.getElementById("novidades-jsonld");
    if (existing) existing.remove();
    document.head.appendChild(script);
    return () => {
      const el = document.getElementById("novidades-jsonld");
      if (el) el.remove();
    };
  }, [language, t]);

  return (
    <section
      id="novidades"
      aria-labelledby="novidades-heading"
      lang={language}
      style={styles.section}
    >
      <style>{fontImport + estilosInteracao}</style>

      <div style={styles.header}>
        <p style={styles.eyebrow}>{t.tag}</p>
        <h2 id="novidades-heading" style={styles.h2}>
          {t.titleStart} <span style={styles.accent}>{t.service1}</span>{" "}
          {t.and} <span style={styles.accent}>{t.service2}</span>
        </h2>
        <p style={styles.intro}>{t.intro}</p>
      </div>

      <div style={styles.grid}>
        {t.items.map((item, i) => (
          <article
            key={item.id}
            id={item.id}
            style={{
              ...styles.card,
              flexDirection: i % 2 === 0 ? "row" : "row-reverse",
            }}
          >
            <div style={styles.cardImageWrap}>
              <img
                src={`${PASTA_IMAGENS}/${IMAGENS[item.id]}`}
                alt={item.imagemAlt}
                loading="lazy"
                style={styles.cardImage}
                // Se a foto ainda não estiver na pasta, mostra só o fundo
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>

            <div style={styles.cardBody}>
              <span style={styles.tag}>{item.tag}</span>
              <h3 style={styles.h3}>{item.titulo}</h3>
              <p style={styles.resumo}>{item.resumo}</p>
              <ul style={styles.lista}>
                {item.beneficios.map((b) => (
                  <li key={b} style={styles.listaItem}>
                    <span style={styles.bullet} aria-hidden="true">
                      —
                    </span>
                    {b}
                  </li>
                ))}
              </ul>

              <p style={styles.marcarTexto}>
                {t.booking}{" "}
                <strong style={styles.numero}>{TELEFONE_VISIVEL}</strong>
              </p>

              <div style={styles.botoes}>
                <a
                  className="vb-btn"
                  href={linkWhatsApp(item.mensagemWhatsApp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.btnPrincipal}
                  data-umami-event="novidades-whatsapp"
                  data-umami-event-servico={item.id}
                  aria-label={t.whatsappAria(item.titulo)}
                >
                  <IconeMensagem />
                  {t.whatsappBtn}
                </a>
                <a
                  className="vb-btn"
                  href={linkLigar}
                  style={styles.btnSecundario}
                  data-umami-event="novidades-ligar"
                  data-umami-event-servico={item.id}
                  aria-label={t.callAria}
                >
                  <IconeTelefone />
                  {t.callBtn} {TELEFONE_VISIVEL}
                </a>
                <a
                  className="vb-btn"
                  href={LINKS_LASER[item.id]}
                  style={styles.btnLink}
                  data-umami-event="novidades-saber-mais"
                  data-umami-event-servico={item.id}
                  aria-label={t.moreAria(item.titulo)}
                >
                  {t.moreBtn} →
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* Ícones simples (genéricos) */
function IconeMensagem() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-5 4V6a1 1 0 0 1 1-1z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconeTelefone() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const fontImport = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Manrope:wght@400;500;700&display=swap');
`;

const estilosInteracao = `
  .vb-btn { transition: filter .15s ease, background-color .15s ease; }
  .vb-btn:hover { filter: brightness(1.08); }
  .vb-btn:focus-visible { outline: 2px solid #E9C79A; outline-offset: 3px; }
  @media (prefers-reduced-motion: reduce) { .vb-btn { transition: none; } }
`;

const palette = {
  bg: "#131110",
  cardBg: "#1D1917",
  ink: "#F5EFE9",
  inkSoft: "#B8AFA8",
  gold: "#E9C79A",
  line: "#2C2724",
};

const botaoBase = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  textDecoration: "none",
  fontWeight: 700,
  fontSize: 15,
  padding: "13px 22px",
  borderRadius: 999,
  whiteSpace: "nowrap",
};

const styles = {
  section: {
    background: palette.bg,
    padding: "80px 24px",
    fontFamily: "'Manrope', sans-serif",
    color: palette.ink,
  },
  header: { maxWidth: 640, margin: "0 auto 56px", textAlign: "left" },
  eyebrow: {
    display: "inline-block",
    fontSize: 13,
    letterSpacing: "0.08em",
    color: palette.gold,
    fontWeight: 700,
    margin: "0 0 20px",
    padding: "7px 16px",
    border: `1px solid ${palette.line}`,
    borderRadius: 999,
  },
  h2: {
    fontFamily: "'Fraunces', serif",
    fontWeight: 600,
    fontSize: "clamp(28px, 4vw, 40px)",
    lineHeight: 1.15,
    margin: "0 0 16px",
    color: palette.ink,
  },
  accent: { color: palette.gold },
  intro: {
    fontSize: 17,
    lineHeight: 1.6,
    color: palette.inkSoft,
    margin: 0,
    maxWidth: "60ch",
  },
  grid: {
    display: "flex",
    flexDirection: "column",
    gap: 32,
    maxWidth: 1080,
    margin: "0 auto",
  },
  card: {
    display: "flex",
    flexWrap: "wrap",
    background: palette.cardBg,
    border: `1px solid ${palette.line}`,
    borderRadius: 20,
    overflow: "hidden",
  },
  cardImageWrap: {
    flex: "1 1 320px",
    minHeight: 260,
    background: `linear-gradient(135deg, ${palette.line} 0%, #2A231C 100%)`,
  },
  cardImage: { width: "100%", height: "100%", objectFit: "cover", display: "block" },
  cardBody: {
    flex: "1 1 360px",
    padding: "36px 32px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  tag: { fontSize: 13, color: palette.gold, fontWeight: 700, marginBottom: 10 },
  h3: {
    fontFamily: "'Fraunces', serif",
    fontWeight: 600,
    fontSize: 26,
    margin: "0 0 12px",
    color: palette.ink,
  },
  resumo: { fontSize: 16, lineHeight: 1.6, color: palette.inkSoft, margin: "0 0 16px" },
  lista: { margin: "0 0 24px", padding: 0, listStyle: "none" },
  listaItem: {
    fontSize: 15,
    lineHeight: 1.5,
    color: palette.ink,
    marginBottom: 8,
    display: "flex",
    gap: 8,
  },
  bullet: { color: palette.gold, fontWeight: 700, flexShrink: 0 },
  marcarTexto: { fontSize: 15, color: palette.inkSoft, margin: "0 0 14px" },
  numero: { color: palette.ink, fontWeight: 700, letterSpacing: "0.02em" },
  botoes: { display: "flex", flexWrap: "wrap", gap: 12 },
  btnPrincipal: {
    ...botaoBase,
    background: palette.gold,
    color: "#1D1712",
    border: `1px solid ${palette.gold}`,
  },
  btnLink: {
    ...botaoBase,
    background: "transparent",
    color: palette.gold,
    border: "1px solid transparent",
    textDecoration: "underline",
    textUnderlineOffset: 4,
  },
  btnSecundario: {
    ...botaoBase,
    background: "transparent",
    color: palette.ink,
    border: `1px solid ${palette.inkSoft}`,
  },
};