import { useState, useRef, useEffect } from "react";
import "../styles/team-carousel.css";
import teamData from "../data/teamData";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.44 1.32 4.94L2 22l5.29-1.39a9.87 9.87 0 0 0 4.75 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.06c-.24.68-1.4 1.32-1.93 1.4-.49.08-1.11.11-1.79-.11-.41-.13-.94-.31-1.62-.6-2.85-1.23-4.71-4.1-4.85-4.29-.14-.19-1.16-1.54-1.16-2.94 0-1.4.73-2.08 1-2.37.26-.28.57-.35.76-.35.19 0 .38 0 .55.01.18.01.41-.07.64.49.24.57.81 1.98.88 2.12.07.14.11.31.02.5-.09.19-.14.31-.28.47-.14.16-.29.36-.42.48-.14.14-.28.29-.12.57.16.28.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.22 1.37.28.14.44.12.6-.07.16-.19.68-.79.87-1.06.18-.28.37-.23.62-.14.26.09 1.63.77 1.91.91.28.14.46.21.53.33.07.12.07.68-.17 1.36z" />
    </svg>
  );
}

function ChevronIcon({ direction }) {
  const rotation = direction === "left" ? 0 : 180;
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: `rotate(${rotation}deg)` }}
      aria-hidden="true"
    >
      <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
  );
}

function PersonPhoto({ src, alt, fallbackLabel }) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div className="tc-photo-fallback">
        <span>{fallbackLabel}</span>
      </div>
    );
  }

  return <img src={src} alt={alt} loading="lazy" onError={() => setError(true)} />;
}

function TeamCarousel({ language = "pt" }) {
  const [current, setCurrent] = useState(0);
  const stageRef = useRef(null);
  const dragState = useRef({ startX: 0, dragging: false, delta: 0 });

  const total = teamData.length;

  const goTo = (i) => {
    setCurrent(((i % total) + total) % total);
  };

  // teclado (acessibilidade)
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") goTo(current + 1);
      if (e.key === "ArrowLeft") goTo(current - 1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  // arrastar / swipe
  const dragStart = (x) => {
    dragState.current = { startX: x, dragging: true, delta: 0 };
  };
  const dragMove = (x) => {
    if (dragState.current.dragging) {
      dragState.current.delta = x - dragState.current.startX;
    }
  };
  const dragEnd = () => {
    if (!dragState.current.dragging) return;
    dragState.current.dragging = false;
    if (dragState.current.delta > 40) goTo(current - 1);
    else if (dragState.current.delta < -40) goTo(current + 1);
  };

  const active = teamData[current];
  const text = active[language] || active.pt;

  return (
    <section className="tc-section" id="equipa">
      <div className="tc-heading">
        <span className="tc-label" style={{ color: active.accent }}>
          {text.label}
        </span>
      </div>

      {/* ===========================
          CARROSSEL DE FOTOS
      =========================== */}
      <div
        className="tc-stage"
        ref={stageRef}
        onMouseDown={(e) => dragStart(e.clientX)}
        onMouseMove={(e) => dragMove(e.clientX)}
        onMouseUp={dragEnd}
        onMouseLeave={dragEnd}
        onTouchStart={(e) => dragStart(e.touches[0].clientX)}
        onTouchMove={(e) => dragMove(e.touches[0].clientX)}
        onTouchEnd={dragEnd}
      >
        <div className="tc-track">
          {teamData.map((person, i) => {
            let offset = i - current;
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            const abs = Math.abs(offset);
            const spread = 130;
            const rotation = 22;
            const scale = Math.max(1 - abs * 0.16, 0.55);
            const z = -abs * 140;
            const opacity = abs > 2 ? 0 : 1 - abs * 0.18;

            const personText = person[language] || person.pt;

            return (
              <button
                key={person.id}
                type="button"
                className={`tc-card ${offset === 0 ? "is-active" : ""}`}
                style={{
                  transform: `translate(-50%,-50%) translateX(${offset * spread}px) translateZ(${z}px) rotateY(${offset * -rotation}deg) scale(${scale})`,
                  opacity,
                  zIndex: 100 - abs,
                  filter: abs === 0 ? "brightness(1)" : `brightness(${1 - abs * 0.18})`,
                  borderColor: offset === 0 ? person.accent : "transparent",
                }}
                onClick={() => goTo(i)}
                aria-label={`Ver ${personText.name}`}
                aria-current={offset === 0}
              >
                <PersonPhoto src={person.photo} alt={personText.name} fallbackLabel={personText.imageFallback} />
                <div className="tc-card-info">
                  <span className="tc-card-name">{personText.name.split(" ")[0]}</span>
                  <span className="tc-card-role" style={{ color: person.accent }}>
                    {personText.role}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ===========================
          CONTROLOS
      =========================== */}
      <div className="tc-controls">
        <button type="button" className="tc-nav-btn" onClick={() => goTo(current - 1)} aria-label="Anterior">
          <ChevronIcon direction="left" />
        </button>

        <div className="tc-dots">
          {teamData.map((person, i) => (
            <button
              key={person.id}
              type="button"
              className={`tc-dot ${i === current ? "is-active" : ""}`}
              style={i === current ? { background: person.accent } : undefined}
              onClick={() => goTo(i)}
              aria-label={`Ir para ${(person[language] || person.pt).name}`}
            />
          ))}
        </div>

        <button type="button" className="tc-nav-btn" onClick={() => goTo(current + 1)} aria-label="Próxima">
          <ChevronIcon direction="right" />
        </button>
      </div>

      {/* ===========================
          TEXTO DA PESSOA ATIVA
      =========================== */}
      <div className="tc-text" key={active.id}>
        <h2>{text.name}</h2>
        <h3 style={{ color: active.accent }}>{text.role}</h3>

        {text.texts.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}

        <div className="tc-contact">
          <h4>{text.contactTitle}</h4>
          <p>{text.contactText}</p>

          <a
            href={active.whatsapp}
            className="tc-whatsapp-btn"
            style={{ background: active.accent }}
            target="_blank"
            rel="noreferrer"
          >
            <WhatsAppIcon />
            <span>{text.whatsappLabel}</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default TeamCarousel;