import "../styles/galeriaFaixas.css";

/**
 * GaleriaFaixas — Vivace Beauty
 * ----------------------------------------------------------------
 * Várias filas de fotos a passar automaticamente (como a secção de
 * reviews), uma por categoria, cada uma numa direção — dá o efeito
 * de "cruzamento".
 *
 * SUBSTITUI PELAS TUAS FOTOS REAIS:
 * As imagens vêm de frontend/public/img/. Dá-me os nomes reais dos
 * ficheiros e eu ajusto os arrays abaixo. Por agora usa-se
 * "/img/nome-do-ficheiro.jpg" como placeholder — troca pelos
 * nomes certos. Usa pelo menos 5-6 fotos por fila para o loop
 * ficar suave (poucas fotos fazem o "salto" do loop notar-se mais).
 */

const ROWS = [
  {
    key: "unhas",
    direction: "left", // fila desloca-se para a esquerda
    images: [
      "/img/unhas-01.jpg",
      "/img/unhas-02.jpg",
      "/img/unhas-03.jpg",
      "/img/unhas-04.jpg",
      "/img/unhas-05.jpg",
    ],
  },
  {
    key: "cabelo",
    direction: "right", // fila desloca-se para a direita (cruza com a de cima)
    images: [
      "/img/cabelo-01.jpg",
      "/img/cabelo-02.jpg",
      "/img/cabelo-03.jpg",
      "/img/cabelo-04.jpg",
      "/img/cabelo-05.jpg",
    ],
  },
  {
    key: "pestanas",
    direction: "left",
    images: [
      "/img/ps-01.jpg",
      "/img/ps-02.jpg",
      "/img/ps-03.jpg",
      "/img/ps-04.jpg",
      "/img/ps-05.jpg",
    ],
  },
];

const TEXT = {
  pt: {
    label: "A nossa galeria",
    heading: "Alguns dos nossos trabalhos",
  },
  en: {
    label: "Our gallery",
    heading: "Some of our work",
  },
};

export default function GaleriaFaixas({ language = "pt" }) {
  const t = TEXT[language] ?? TEXT.pt;

  return (
    <section className="faixas-section">
      <div className="faixas-header">
        <span className="section-label">{t.label}</span>
        <h2>{t.heading}</h2>
      </div>

      <div className="faixas-rows">
        {ROWS.map((row) => {
          const loop = [...row.images, ...row.images];
          return (
            <div className="faixas-row-wrap" key={row.key}>
              <div
                className={
                  "faixas-row" +
                  (row.direction === "right" ? " faixas-row--right" : "")
                }
              >
                {loop.map((src, i) => (
                  <div className="faixas-item" key={src + i}>
                    <img src={src} alt="" loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}