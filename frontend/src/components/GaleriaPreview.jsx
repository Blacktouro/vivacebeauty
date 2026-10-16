import { Link } from "react-router-dom";
import "../styles/galeriaPreview.css";

/**
 * GaleriaPreview — secção para a página principal
 * ----------------------------------------------------------------
 * Mostra algumas fotos em destaque + um botão que leva a /galeria.
 *
 * SUBSTITUI PELAS TUAS FOTOS REAIS:
 * As imagens vêm de frontend/public/img/ — atualiza os nomes no
 * array PREVIEW_IMAGES abaixo para os ficheiros que lá tiveres
 * (usa 4 a 6 fotos fortes, as melhores que tiveres — esta secção
 * é só uma "amostra").
 */

const PREVIEW_IMAGES = [
  "/img/unhas-01.jpg",
  "/img/cabelo-01.jpg",
  "/img/pestanas-01.jpg",
  "/img/unhas-02.jpg",
  "/img/cabelo-02.jpg",
  "/img/estetica-01.jpg",
];

const TEXT = {
  pt: {
    label: "A nossa galeria",
    heading: "Vê os nossos trabalhos",
    intro:
      "Uma amostra do que fazemos no salão — cabelo, unhas, pestanas, sobrancelhas e estética.",
  },
  en: {
    label: "Our gallery",
    heading: "See our work",
    intro:
      "A sample of what we do in the salon — hair, nails, lashes, brows and beauty treatments.",
  },
};

export default function GaleriaPreview({ language = "pt" }) {
  const t = TEXT[language] ?? TEXT.pt;

  return (
    <section className="galeria-preview-section">
      <div className="galeria-preview-container">
        <div className="galeria-preview-header">
          <span className="section-label">{t.label}</span>
          <h2>{t.heading}</h2>
          <p>{t.intro}</p>
        </div>

        <div className="galeria-preview-grid">
          {PREVIEW_IMAGES.map((src, i) => (
            <div className="galeria-preview-item" key={src + i}>
              <img src={src} alt="" loading="lazy" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}