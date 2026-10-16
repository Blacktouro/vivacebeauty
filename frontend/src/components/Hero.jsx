import "../styles/hero.css";

const translations = {
  pt: {
    label: "Vivace Beauty · Peniche",
    titleStart: "Cabeleireiro e",
    titleHighlight: "Estética em Peniche",
    description:
      "Cabelo, unhas, pestanas e estética num espaço elegante, acolhedor e pensado para cuidar de ti.",
    booking: "Marcar agora",
    services: "Ver serviços",
    bookingLabel: "Marcar atendimento pelo WhatsApp",
    details: [
      { title: "Cabelo", text: "Cortes e coloração" },
      { title: "Unhas", text: "Gel e manicure" },
      { title: "Estética", text: "Pestanas e estética" },
    ],
  },

  en: {
    label: "Vivace Beauty · Peniche",
    titleStart: "Hair and",
    titleHighlight: "Beauty in Peniche",
    description:
      "Hair, nails, eyelashes and beauty treatments in an elegant and welcoming space designed for you.",
    booking: "Book now",
    services: "View services",
    bookingLabel: "Book an appointment through WhatsApp",
    details: [
      { title: "Hair", text: "Cuts and colouring" },
      { title: "Nails", text: "Gel and manicure" },
      { title: "Beauty", text: "Lashes and beauty" },
    ],
  },
};

const WHATSAPP_NUMBER = "351910624152";

export default function Hero({ language = "pt" }) {
  const text = translations[language] || translations.pt;

  const whatsappMessage =
    language === "pt"
      ? "Olá! Gostaria de marcar um atendimento na Vivace Beauty."
      : "Hello! I would like to book an appointment at Vivace Beauty.";

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    whatsappMessage,
  )}`;

  return (
    <section className="hero" id="inicio">
      <div className="hero-overlay" />

      <div className="hero-content">
        <span className="hero-label">{text.label}</span>

        <h1>
          {text.titleStart}
          <span>{text.titleHighlight}</span>
        </h1>

        <p>{text.description}</p>

        <div className="hero-actions">
          <a
            href={whatsappUrl}
            className="hero-button hero-button-primary"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={text.bookingLabel}
          >
            <span aria-hidden="true">✦</span>
            {text.booking}
          </a>

          <a
            href="#servicos"
            className="hero-button hero-button-secondary"
          >
            {text.services}
          </a>
        </div>

        <div className="hero-details">
          {text.details.map((item) => (
            <div key={item.title}>
              <strong>{item.title}</strong>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}