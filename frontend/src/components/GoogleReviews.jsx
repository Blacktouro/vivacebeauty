import { useRef } from "react";

import "../styles/googlereviews.css";
/**
 * GoogleReviews — Vivace Beauty (Peniche)
 * ----------------------------------------------------------------
 * Segue o mesmo padrão das secções de equipa: recebe `language`,
 * usa classes de "styles/googlereviews.css" (fundo escuro + accent).
 *
 * NOTA SOBRE OS DADOS: o texto das avaliações abaixo foi copiado do
 * perfil Google do "Vivace Beauty" em Peniche. O Google não expõe
 * nome/foto/estrela individual via acesso público no browser, por
 * isso os cartões mostram apenas o texto real — sem inventar nomes.
 * Para atualização automática (com nome/foto reais) é preciso um
 * pequeno backend com a Google Places API.
 */

const BUSINESS = {
  name: "Vivace Beauty",
  location: "Peniche",
  rating: 5.0,
  reviewCount: 14,
  mapsUrl:
    "https://www.google.com/maps/place/?q=place_id:ChIJsdQvM1xFHw0RA6Ji1h9sCvg",
};

const REVIEWS = [
  "Awesome service! So friendly staff and they do know what they are doing!",
  "Adoro, faço as unhas á anos com elas e não trocaria por nada 😌❤️",
  "O melhor salão de Peniche. Todas são muito simpáticas e profissionais. 🪄🙏",
  "Adorei! Super profissionais e eficaz. Recomendo muito.",
  "Adoro cada uma delas! Uma vibe muito gostosinha de tar! Conhece-se 3 grandes profissionais e 3 amigas incríveis! Amo o trabalho de cada uma!",
];

const TEXT = {
  pt: {
    label: "O que dizem no Google",
    heading: `Clientes ${BUSINESS.name}, ${BUSINESS.location}`,
    reviewsLabel: "avaliações",
    reviewTag: "Avaliação no Google",
    cta: "Ver todas as avaliações no Google",
  },
  en: {
    label: "What people say on Google",
    heading: `${BUSINESS.name} reviews, ${BUSINESS.location}`,
    reviewsLabel: "reviews",
    reviewTag: "Google review",
    cta: "See all reviews on Google",
  },
};

function Stars() {
  return (
    <span className="reviews-stars" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20">
          <path d="M10 1.5l2.59 5.24 5.78.84-4.18 4.08.99 5.76L10 14.77l-5.18 2.65.99-5.76L1.63 7.58l5.78-.84L10 1.5z" />
        </svg>
      ))}
    </span>
  );
}

function GoogleG() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.6 16 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4c-7.4 0-13.8 4.2-17 10.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.5 0 10.4-1.8 14.3-5l-6.6-5.6C29.6 34.9 27 36 24 36c-5.3 0-9.6-3.4-11.3-8.1l-6.6 5.1C9.9 39.6 16.4 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.3 5.7l6.6 5.6C41.4 36.2 44 30.7 44 24c0-1.3-.1-2.7-.4-3.5z"
      />
    </svg>
  );
}

export default function GoogleReviews({ language = "pt" }) {
  const t = TEXT[language] ?? TEXT.pt;
  const trackRef = useRef(null);
  const loop = [...REVIEWS, ...REVIEWS];

  return (
    <section className="reviews-section" id="avaliacoes">
      <div className="reviews-container">
        <div className="reviews-header">
          <span className="section-label">{t.label}</span>
          <h2>{t.heading}</h2>

          <div className="reviews-rating">
            <GoogleG />
            <strong>{BUSINESS.rating.toFixed(1)}</strong>
            <Stars />
            <span>
              · {BUSINESS.reviewCount} {t.reviewsLabel}
            </span>
          </div>
        </div>

        <div className="reviews-track-wrap">
          <div className="reviews-track" ref={trackRef}>
            {loop.map((text, i) => (
              <blockquote className="reviews-card" key={i}>
                <span className="reviews-quote-mark">&ldquo;</span>
                <p>{text}</p>
                <footer className="reviews-card-footer">
                  <GoogleG />
                  {t.reviewTag}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>

        <div className="reviews-cta">
          <a href={BUSINESS.mapsUrl} target="_blank" rel="noopener noreferrer">
            {t.cta} →
          </a>
        </div>
      </div>
    </section>
  );
}