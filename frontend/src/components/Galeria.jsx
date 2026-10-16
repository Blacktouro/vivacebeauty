import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import "../styles/galeria.css";

/**
 * Galeria — Vivace Beauty
 * ----------------------------------------------------------------
 * SUBSTITUI ISTO PELAS TUAS FOTOS REAIS:
 * 1. As imagens vêm de: frontend/public/img/
 * 2. Atualiza o array IMAGES abaixo com o nome de cada ficheiro
 *    (ex: "/img/unhas-01.jpg")
 * 3. Usa "category" para uma das 4 chaves: cabelo, unhas, pestanas, estetica
 *    (podes adicionar mais categorias se quiseres, basta também
 *    acrescentar a tradução em CATEGORIES abaixo)
 */

const IMAGES = [
  { src: "/img/unhas-01.jpg", category: "unhas" },
  { src: "/img/unhas-02.jpg", category: "unhas" },
  { src: "/img/cabelo-01.jpg", category: "cabelo" },
  { src: "/img/cabelo-02.jpg", category: "cabelo" },
  { src: "/img/pestanas-01.jpg", category: "pestanas" },
  { src: "/img/pestanas-02.jpg", category: "pestanas" },
  { src: "/img/estetica-01.jpg", category: "estetica" },
  { src: "/img/unhas-03.jpg", category: "unhas" },
];

const CATEGORIES = {
  pt: {
    todos: "Todos",
    cabelo: "Cabelo",
    unhas: "Unhas",
    pestanas: "Pestanas & Sobrancelhas",
    estetica: "Estética",
  },
  en: {
    todos: "All",
    cabelo: "Hair",
    unhas: "Nails",
    pestanas: "Lashes & Brows",
    estetica: "Beauty",
  },
};

const TEXT = {
  pt: {
    label: "Os nossos trabalhos",
    heading: "Galeria",
    intro:
      "Uma seleção de trabalhos feitos no salão. Segue-nos no Instagram para veres mais.",
    back: "← Voltar ao site",
    empty: "Ainda não há fotos nesta categoria.",
  },
  en: {
    label: "Our work",
    heading: "Gallery",
    intro:
      "A selection of work done in the salon. Follow us on Instagram to see more.",
    back: "← Back to the site",
    empty: "No photos in this category yet.",
  },
};

export default function Galeria({ language = "pt" }) {
  const t = TEXT[language] ?? TEXT.pt;
  const categories = CATEGORIES[language] ?? CATEGORIES.pt;

  const [activeCategory, setActiveCategory] = useState("todos");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filtered = useMemo(() => {
    if (activeCategory === "todos") return IMAGES;
    return IMAGES.filter((img) => img.category === activeCategory);
  }, [activeCategory]);

  const closeLightbox = () => setLightboxIndex(null);

  const showPrev = () =>
    setLightboxIndex((i) => (i === 0 ? filtered.length - 1 : i - 1));

  const showNext = () =>
    setLightboxIndex((i) => (i === filtered.length - 1 ? 0 : i + 1));

  useEffect(() => {
    if (lightboxIndex === null) return;

    function handleKey(e) {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    }

    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, filtered.length]);

  return (
    <>
      <Helmet>
        <title>{`${t.heading} | Vivace Beauty`}</title>
        <meta name="description" content={t.intro} />
      </Helmet>

      <section className="gallery-section">
        <div className="gallery-container">
          <Link to="/" className="gallery-backlink">
            {t.back}
          </Link>

          <div className="gallery-header">
            <span className="section-label">{t.label}</span>
            <h1>{t.heading}</h1>
            <p>{t.intro}</p>
          </div>

          <div className="gallery-filters">
            {Object.entries(categories).map(([key, label]) => (
              <button
                key={key}
                type="button"
                className={
                  "gallery-filter" +
                  (activeCategory === key ? " gallery-filter--active" : "")
                }
                onClick={() => setActiveCategory(key)}
              >
                {label}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <p className="gallery-empty">{t.empty}</p>
          ) : (
            <div className="gallery-grid">
              {filtered.map((img, i) => (
                <button
                  key={img.src}
                  type="button"
                  className="gallery-item"
                  onClick={() => setLightboxIndex(i)}
                  aria-label={categories[img.category]}
                >
                  <img src={img.src} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {lightboxIndex !== null && filtered[lightboxIndex] && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          onClick={closeLightbox}
        >
          <button
            type="button"
            className="lightbox-close"
            onClick={closeLightbox}
            aria-label="Close"
          >
            ✕
          </button>

          <button
            type="button"
            className="lightbox-nav lightbox-nav--prev"
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            aria-label="Previous"
          >
            ‹
          </button>

          <img
            src={filtered[lightboxIndex].src}
            alt=""
            className="lightbox-image"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            type="button"
            className="lightbox-nav lightbox-nav--next"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            aria-label="Next"
          >
            ›
          </button>

          <span className="lightbox-counter">
            {lightboxIndex + 1} / {filtered.length}
          </span>
        </div>
      )}
    </>
  );
}