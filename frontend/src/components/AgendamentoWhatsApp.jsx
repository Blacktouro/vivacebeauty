import React, { useEffect, useRef, useState } from "react";

/**
 * Botão flutuante de WhatsApp + assistente de marcação (PT / EN)
 * ---------------------------------------------------------------
 * Como usar (uma só vez, no fim da página, por exemplo no App.jsx):
 *   import AgendamentoWhatsApp from "./AgendamentoWhatsApp";
 *   <AgendamentoWhatsApp language={language} />
 *
 * O que faz:
 * 1. Mostra um botão redondo verde no canto inferior direito.
 * 2. Ao carregar, abre uma janela tipo chat:
 *      serviço → data(s) → nome e telefone → resumo → enviar
 * 3. Passados 20 segundos no site, a mesma janela abre sozinha
 *    (só uma vez por visita, para não incomodar).
 * 4. No fim, abre o WhatsApp do número desse serviço com a mensagem
 *    já escrita (ver NUMEROS_POR_SERVICO).
 */

const NOME_CLINICA = "Vivace-Beauty";
const TELEFONE_INTERNACIONAL = "351912088636"; // número principal (usado se faltar algum abaixo)
const SEGUNDOS_ATE_ABRIR = 20;

// Número de WhatsApp de cada serviço — "351" + 9 dígitos, sem "+" nem espaços.
// A ordem tem de ser igual à lista de serviços: Unhas, Cabeleireiro, Depilação, Pés, Laser
const NUMEROS_POR_SERVICO = [
  "351912088636", // Unhas
  "351964326339", // Cabeleireiro
  "351964326339", // Depilação
  "351919828555", // Pés (podologia)
  "351919828555", // Laser
];

const content = {
  pt: {
    abrir: "Marcar pelo WhatsApp",
    fechar: "Fechar",
    titulo: NOME_CLINICA,
    subtitulo: "Marcações pelo WhatsApp",
    passo0: "Olá! 👋 Qual seria o agendamento?",
    servicos: ["Unhas", "Cabeleireiro", "Depilação", "Pés (podologia)", "Laser"],
    passo1: "Ótima escolha! Que dia lhe dava jeito?",
    data1: "Data preferida",
    data2: "Outra data possível (opcional)",
    periodoLabel: "Período",
    periodos: ["Manhã", "Tarde", "Qualquer hora"],
    passo2: "Para confirmarmos a marcação, diga-nos o seu nome e telefone.",
    nome: "Nome",
    telefone: "Telefone",
    passo3: "Está tudo certo? Vamos enviar este pedido:",
    continuar: "Continuar",
    voltar: "Voltar",
    enviarWhats: "Enviar pelo WhatsApp",
    fim: "Abrimos o WhatsApp com a sua mensagem. Só falta carregar em Enviar — respondemos com a confirmação da marcação.",
    novoPedido: "Fazer outro pedido",
    erroData: "Escolha pelo menos uma data.",
    erroNome: "Escreva o seu nome.",
    erroTelefone: "Escreva um número com pelo menos 9 dígitos.",
    rotulos: {
      intro: `Olá! Gostaria de fazer uma marcação na ${NOME_CLINICA}.`,
      servico: "Serviço",
      data: "Data preferida",
      alternativa: "Data alternativa",
      periodo: "Período",
      nome: "Nome",
      telefone: "Telefone",
    },
  },
  en: {
    abrir: "Book on WhatsApp",
    fechar: "Close",
    titulo: NOME_CLINICA,
    subtitulo: "Bookings via WhatsApp",
    passo0: "Hi! 👋 What would you like to book?",
    servicos: ["Nails", "Hairdresser", "Hair removal", "Feet (podiatry)", "Laser"],
    passo1: "Great choice! Which day suits you?",
    data1: "Preferred date",
    data2: "Another possible date (optional)",
    periodoLabel: "Time of day",
    periodos: ["Morning", "Afternoon", "Any time"],
    passo2: "To confirm your booking, please tell us your name and phone number.",
    nome: "Name",
    telefone: "Phone",
    passo3: "All good? We'll send this request:",
    continuar: "Continue",
    voltar: "Back",
    enviarWhats: "Send on WhatsApp",
    fim: "We've opened WhatsApp with your message. Just tap Send — we'll reply to confirm your booking.",
    novoPedido: "Make another request",
    erroData: "Please choose at least one date.",
    erroNome: "Please enter your name.",
    erroTelefone: "Please enter a number with at least 9 digits.",
    rotulos: {
      intro: `Hi! I'd like to book an appointment at ${NOME_CLINICA}.`,
      servico: "Service",
      data: "Preferred date",
      alternativa: "Alternative date",
      periodo: "Time of day",
      nome: "Name",
      telefone: "Phone",
    },
  },
};

// Conta um clique no Umami (se o script do Umami estiver no site)
const registar = (evento, dados) => {
  try {
    window.umami?.track(evento, dados);
  } catch (e) {}
};

// "2026-09-25" → "25/09/2026"
const formatarData = (iso) => (iso ? iso.split("-").reverse().join("/") : "");
const hojeISO = () => new Date().toISOString().slice(0, 10);

export default function AgendamentoWhatsApp({ language = "pt" }) {
  const t = content[language] || content.pt;

  const [aberto, setAberto] = useState(false);
  const [passo, setPasso] = useState(0);
  const [servico, setServico] = useState(null); // índice
  const [data1, setData1] = useState("");
  const [data2, setData2] = useState("");
  const [periodo, setPeriodo] = useState(2); // "Qualquer hora"
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [erro, setErro] = useState("");
  const painelRef = useRef(null);

  // Abre sozinho ao fim de 20 segundos (uma vez por visita)
  useEffect(() => {
    let jaMostrado = false;
    try {
      jaMostrado = sessionStorage.getItem("vb-agendamento-visto") === "1";
    } catch (e) {}
    if (jaMostrado) return;

    const timer = setTimeout(() => {
      setAberto(true);
      registar("chat-aberto-20s");
      try {
        sessionStorage.setItem("vb-agendamento-visto", "1");
      } catch (e) {}
    }, SEGUNDOS_ATE_ABRIR * 1000);
    return () => clearTimeout(timer);
  }, []);

  // Tecla Esc fecha; foco vai para a janela ao abrir
  useEffect(() => {
    if (!aberto) return;
    painelRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && setAberto(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [aberto, passo]);

  const abrirPeloBotao = () => {
    if (!aberto) registar("chat-aberto-botao");
    setAberto((v) => !v);
    try {
      sessionStorage.setItem("vb-agendamento-visto", "1");
    } catch (e) {}
  };

  const recomecar = () => {
    setPasso(0);
    setServico(null);
    setData1("");
    setData2("");
    setPeriodo(2);
    setErro("");
  };

  const construirMensagem = () => {
    const r = t.rotulos;
    const linhas = [
      r.intro,
      "",
      `${r.servico}: ${t.servicos[servico]}`,
      `${r.data}: ${formatarData(data1)}`,
    ];
    if (data2) linhas.push(`${r.alternativa}: ${formatarData(data2)}`);
    linhas.push(`${r.periodo}: ${t.periodos[periodo]}`);
    linhas.push(`${r.nome}: ${nome.trim()}`);
    linhas.push(`${r.telefone}: ${telefone.trim()}`);
    return linhas.join("\n");
  };

  const avancarDatas = () => {
    if (!data1) return setErro(t.erroData);
    setErro("");
    setPasso(2);
  };

  const avancarDados = () => {
    if (!nome.trim()) return setErro(t.erroNome);
    if (telefone.replace(/\D/g, "").length < 9) return setErro(t.erroTelefone);
    setErro("");
    setPasso(3);
  };

  const enviarWhatsApp = () => {
    registar("marcacao-whatsapp", { servico: content.pt.servicos[servico] });
    const numero = NUMEROS_POR_SERVICO[servico] || TELEFONE_INTERNACIONAL;
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(
      construirMensagem()
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setPasso(4);
  };

  return (
    <div className="vbw" lang={language}>
      <style>{css}</style>

      {aberto && (
        <div
          className="vbw-painel"
          role="dialog"
          aria-modal="false"
          aria-labelledby="vbw-titulo"
          tabIndex={-1}
          ref={painelRef}
        >
          <header className="vbw-topo">
            <div className="vbw-avatar" aria-hidden="true">V</div>
            <div className="vbw-topo-texto">
              <strong id="vbw-titulo">{t.titulo}</strong>
              <span>{t.subtitulo}</span>
            </div>
            <button
              type="button"
              className="vbw-fechar"
              onClick={() => setAberto(false)}
              aria-label={t.fechar}
            >
              ×
            </button>
          </header>

          <div className="vbw-corpo">
            {/* Passo 0 — serviço */}
            {passo === 0 && (
              <>
                <p className="vbw-bolha">{t.passo0}</p>
                <div className="vbw-opcoes">
                  {t.servicos.map((s, i) => (
                    <button
                      type="button"
                      key={s}
                      className="vbw-chip"
                      onClick={() => {
                        registar("servico-escolhido", { servico: content.pt.servicos[i] });
                        setServico(i);
                        setPasso(1);
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* Passo 1 — datas */}
            {passo === 1 && (
              <>
                <p className="vbw-escolha">{t.servicos[servico]}</p>
                <p className="vbw-bolha">{t.passo1}</p>
                <label className="vbw-campo">
                  <span>{t.data1}</span>
                  <input
                    type="date"
                    min={hojeISO()}
                    value={data1}
                    onChange={(e) => setData1(e.target.value)}
                  />
                </label>
                <label className="vbw-campo">
                  <span>{t.data2}</span>
                  <input
                    type="date"
                    min={data1 || hojeISO()}
                    value={data2}
                    onChange={(e) => setData2(e.target.value)}
                  />
                </label>
                <fieldset className="vbw-periodo">
                  <legend>{t.periodoLabel}</legend>
                  {t.periodos.map((p, i) => (
                    <button
                      type="button"
                      key={p}
                      className={`vbw-chip ${periodo === i ? "vbw-ativo" : ""}`}
                      aria-pressed={periodo === i}
                      onClick={() => setPeriodo(i)}
                    >
                      {p}
                    </button>
                  ))}
                </fieldset>
                {erro && <p className="vbw-erro" role="alert">{erro}</p>}
                <div className="vbw-acoes">
                  <button type="button" className="vbw-sec" onClick={() => { setErro(""); setPasso(0); }}>
                    {t.voltar}
                  </button>
                  <button type="button" className="vbw-prim" onClick={avancarDatas}>
                    {t.continuar}
                  </button>
                </div>
              </>
            )}

            {/* Passo 2 — nome e telefone */}
            {passo === 2 && (
              <>
                <p className="vbw-bolha">{t.passo2}</p>
                <label className="vbw-campo">
                  <span>{t.nome}</span>
                  <input
                    type="text"
                    autoComplete="name"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
                </label>
                <label className="vbw-campo">
                  <span>{t.telefone}</span>
                  <input
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="9XX XXX XXX"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                  />
                </label>
                {erro && <p className="vbw-erro" role="alert">{erro}</p>}
                <div className="vbw-acoes">
                  <button type="button" className="vbw-sec" onClick={() => { setErro(""); setPasso(1); }}>
                    {t.voltar}
                  </button>
                  <button type="button" className="vbw-prim" onClick={avancarDados}>
                    {t.continuar}
                  </button>
                </div>
              </>
            )}

            {/* Passo 3 — resumo e envio */}
            {passo === 3 && (
              <>
                <p className="vbw-bolha">{t.passo3}</p>
                <pre className="vbw-resumo">{construirMensagem()}</pre>
                <div className="vbw-acoes">
                  <button type="button" className="vbw-sec" onClick={() => setPasso(2)}>
                    {t.voltar}
                  </button>
                  <button type="button" className="vbw-prim vbw-verde" onClick={enviarWhatsApp}>
                    {t.enviarWhats}
                  </button>
                </div>
              </>
            )}

            {/* Passo 4 — confirmação */}
            {passo === 4 && (
              <>
                <p className="vbw-bolha">{t.fim}</p>
                <div className="vbw-acoes">
                  <button type="button" className="vbw-sec" onClick={recomecar}>
                    {t.novoPedido}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <button
        type="button"
        className="vbw-botao"
        onClick={abrirPeloBotao}
        aria-label={aberto ? t.fechar : t.abrir}
        aria-expanded={aberto}
      >
        {aberto ? (
          <span className="vbw-x" aria-hidden="true">×</span>
        ) : (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-5 4V6a1 1 0 0 1 1-1z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path d="M8 10h8M8 13h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
      </button>
    </div>
  );
}

const css = `
.vbw { --bg:#1D1917; --bg2:#131110; --ink:#F5EFE9; --soft:#B8AFA8; --gold:#E9C79A; --line:#2C2724; --verde:#25D366;
  font-family:'Manrope', system-ui, sans-serif; }

.vbw-botao { position:fixed; right:20px; bottom:calc(20px + env(safe-area-inset-bottom, 0px)); z-index:9999;
  width:60px; height:60px; border-radius:50%; border:none; cursor:pointer;
  background:var(--verde); color:#fff; display:grid; place-items:center;
  box-shadow:0 6px 20px rgba(0,0,0,.35); }
.vbw-botao:focus-visible { outline:3px solid var(--gold); outline-offset:3px; }
.vbw-x { font-size:34px; line-height:1; }

.vbw-painel { position:fixed; right:20px; bottom:calc(92px + env(safe-area-inset-bottom, 0px)); z-index:9999;
  width:min(360px, calc(100vw - 24px)); max-height:calc(100vh - 120px); overflow:auto;
  background:var(--bg); color:var(--ink); border:1px solid var(--line); border-radius:18px;
  box-shadow:0 18px 50px rgba(0,0,0,.45); outline:none; animation:vbw-entrar .25s ease-out; }
@keyframes vbw-entrar { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:none; } }
@media (prefers-reduced-motion: reduce) { .vbw-painel { animation:none; } }

.vbw-topo { display:flex; align-items:center; gap:12px; padding:14px 16px; background:var(--bg2);
  border-bottom:1px solid var(--line); position:sticky; top:0; }
.vbw-avatar { width:40px; height:40px; border-radius:50%; background:var(--gold); color:#1D1712;
  display:grid; place-items:center; font-family:'Fraunces', serif; font-weight:600; font-size:20px; flex-shrink:0; }
.vbw-topo-texto { display:flex; flex-direction:column; flex:1; min-width:0; }
.vbw-topo-texto strong { font-size:15px; }
.vbw-topo-texto span { font-size:13px; color:var(--soft); }
.vbw-fechar { background:none; border:none; color:var(--soft); font-size:26px; cursor:pointer; padding:0 4px; line-height:1; }

.vbw-corpo { padding:16px; display:flex; flex-direction:column; gap:12px; }
.vbw-bolha { margin:0; background:var(--line); padding:12px 14px; border-radius:4px 14px 14px 14px;
  font-size:15px; line-height:1.5; max-width:90%; }
.vbw-escolha { margin:0; align-self:flex-end; background:var(--gold); color:#1D1712; font-weight:700;
  padding:8px 14px; border-radius:14px 4px 14px 14px; font-size:14px; }

.vbw-opcoes, .vbw-periodo { display:flex; flex-wrap:wrap; gap:8px; }
.vbw-periodo { border:none; padding:0; margin:0; }
.vbw-periodo legend { font-size:13px; color:var(--soft); margin-bottom:6px; padding:0; }
.vbw-chip { background:transparent; color:var(--ink); border:1px solid var(--soft); border-radius:999px;
  padding:9px 15px; font:inherit; font-size:14px; font-weight:500; cursor:pointer; }
.vbw-chip:hover { border-color:var(--gold); color:var(--gold); }
.vbw-ativo, .vbw-ativo:hover { background:var(--gold); border-color:var(--gold); color:#1D1712; font-weight:700; }

.vbw-campo { display:flex; flex-direction:column; gap:6px; font-size:13px; color:var(--soft); }
.vbw-campo input { font:inherit; font-size:16px; color:var(--ink); background:var(--bg2);
  border:1px solid var(--line); border-radius:10px; padding:11px 12px; color-scheme:dark; }
.vbw-campo input:focus { outline:2px solid var(--gold); outline-offset:1px; }

.vbw-erro { margin:0; color:#F2A38F; font-size:14px; }
.vbw-resumo { margin:0; white-space:pre-wrap; font-family:inherit; font-size:14px; line-height:1.55;
  background:var(--bg2); border:1px solid var(--line); border-radius:10px; padding:12px; }

.vbw-acoes { display:flex; gap:8px; justify-content:flex-end; flex-wrap:wrap; }
.vbw-prim, .vbw-sec { font:inherit; font-weight:700; font-size:14px; border-radius:999px; padding:11px 18px; cursor:pointer; }
.vbw-prim { background:var(--gold); color:#1D1712; border:1px solid var(--gold); }
.vbw-verde { background:var(--verde); border-color:var(--verde); color:#0B2E17; }
.vbw-sec { background:transparent; color:var(--ink); border:1px solid var(--line); }
.vbw-chip:focus-visible, .vbw-prim:focus-visible, .vbw-sec:focus-visible, .vbw-fechar:focus-visible {
  outline:2px solid var(--gold); outline-offset:2px; }

@media (max-width: 480px) {
  .vbw-painel { right:12px; bottom:calc(84px + env(safe-area-inset-bottom, 0px)); }
  .vbw-botao { right:14px; bottom:calc(14px + env(safe-area-inset-bottom, 0px)); }
}
`;