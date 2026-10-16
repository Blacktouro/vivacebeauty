import { useState } from "react";
import "../styles/wilza.css";
import "../styles/team-shared.css";

const content = {
  pt: {
    label: "A nossa equipa",
    name: "Wilza",
    role: "Cabeleireira Profissional",
    text1:
      "Wilza é especialista em cabelos, oferecendo serviços completos como cortes modernos, escovas, madeixas e loiros personalizados, adaptados ao estilo de cada cliente.",
    text2:
      "Trabalha também com tratamentos capilares avançados, incluindo cronograma capilar e progressiva, garantindo fios mais saudáveis, brilhantes e alinhados.",
    text3:
      "O seu foco é transformar não só o cabelo, mas também a autoestima, proporcionando resultados elegantes e duradouros.",
    contactTitle: "Marca com a Wilza",
    contactText: "Fala diretamente com a Wilza pelo WhatsApp e agenda o teu horário.",
    whatsapp: "Marcar pelo WhatsApp",
    imageFallback: "Foto brevemente",
  },

  en: {
    label: "Our team",
    name: "Wilza",
    role: "Professional Hairdresser",
    text1:
      "Wilza specialises in hair care, offering complete services such as modern haircuts, blow-drying, highlights and personalised colouring, adapted to each client's style.",
    text2:
      "She also works with advanced hair treatments, including hair scheduling and keratin straightening, ensuring healthier, shinier and more even hair.",
    text3:
      "Her focus is on transforming not just the hair, but also self-confidence, delivering elegant and long-lasting results.",
    contactTitle: "Book with Wilza",
    contactText: "Talk directly to Wilza on WhatsApp and schedule your appointment.",
    whatsapp: "Book via WhatsApp",
    imageFallback: "Photo coming soon",
  },
};

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.44 1.32 4.94L2 22l5.29-1.39a9.87 9.87 0 0 0 4.75 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.06c-.24.68-1.4 1.32-1.93 1.4-.49.08-1.11.11-1.79-.11-.41-.13-.94-.31-1.62-.6-2.85-1.23-4.71-4.1-4.85-4.29-.14-.19-1.16-1.54-1.16-2.94 0-1.4.73-2.08 1-2.37.26-.28.57-.35.76-.35.19 0 .38 0 .55.01.18.01.41-.07.64.49.24.57.81 1.98.88 2.12.07.14.11.31.02.5-.09.19-.14.31-.28.47-.14.16-.29.36-.42.48-.14.14-.28.29-.12.57.16.28.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.22 1.37.28.14.44.12.6-.07.16-.19.68-.79.87-1.06.18-.28.37-.23.62-.14.26.09 1.63.77 1.91.91.28.14.46.21.53.33.07.12.07.68-.17 1.36z" />
    </svg>
  );
}

function TeamPhoto({ src, alt, fallbackLabel }) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div className="team-image-fallback">
        <span>{fallbackLabel}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setError(true)}
    />
  );
}

function Wilza({ language }) {
  const text = content[language] || content.pt;

  return (
    <section className="team-section wilza" id="wilza">
      <div className="section-container team-container reverse">
        <div className="team-text">
          <span className="section-label">{text.label}</span>
          <h2>{text.name}</h2>
          <h3>{text.role}</h3>

          <p>{text.text1}</p>
          <p>{text.text2}</p>
          <p>{text.text3}</p>

          <div className="team-contact">
            <h4>{text.contactTitle}</h4>
            <p>{text.contactText}</p>

            <a
              href="https://wa.me/351964326339"
              className="button button-primary team-whatsapp-btn"
              target="_blank"
              rel="noreferrer"
            >
              <WhatsAppIcon />
              <span>{text.whatsapp}</span>
            </a>
          </div>
        </div>

        <div className="team-image">
          <TeamPhoto
            src="/img/wilza.jpeg"
            alt={text.name}
            fallbackLabel={text.imageFallback}
          />
        </div>
      </div>
    </section>
  );
}

export default Wilza;