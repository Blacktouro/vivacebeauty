import "../styles/sobre.css";

function Sobre({ language }) {
  const content = {
    pt: {
      tag: "Sobre nós",
      title: "Sobre a",
      brand: "Vivace Beauty",
      city: "em Peniche",
      intro:
        "Um espaço dedicado à beleza, bem-estar e confiança de cada cliente.",

      p1: (
        <>
          A <strong>Vivace Beauty</strong> é um salão de beleza em Peniche,
          criado com paixão pela estética, cabeleireiro e bem-estar. O nosso
          objetivo é ajudar cada cliente a sentir-se mais confiante, bonita e
          segura.
        </>
      ),

      p2: (
        <>
          Oferecemos serviços profissionais de <strong>cabeleireiro</strong>,
          <strong> unhas de gel</strong>, <strong> pestanas</strong> e
          <strong> tratamentos estéticos</strong>, sempre com foco na qualidade
          e na satisfação de quem nos visita.
        </>
      ),

      p3: (
        <>
          No nosso espaço valorizamos um atendimento personalizado, criando uma
          experiência única, confortável e profissional.
        </>
      ),

      p4: (
        <>
          Se procuras um salão de beleza em Peniche que combine qualidade,
          confiança e resultados, a Vivace Beauty é a escolha certa.
        </>
      ),

      button: "Marcar Visita",

      mainTitle: "Beleza com cuidado e dedicação",

      mainText:
        "Cada serviço é realizado de forma personalizada, respeitando o estilo e as necessidades de cada cliente.",

      cards: [
        {
          icon: "♡",
          title: "Atendimento personalizado",
          text: "Um acompanhamento próximo e pensado para ti.",
        },
        {
          icon: "✧",
          title: "Qualidade profissional",
          text: "Serviços realizados com atenção a todos os detalhes.",
        },
        {
          icon: "❀",
          title: "Ambiente acolhedor",
          text: "Um espaço confortável para relaxar e cuidar de ti.",
        },
      ],
    },

    en: {
      tag: "About Us",
      title: "About",
      brand: "Vivace Beauty",
      city: "in Peniche",
      intro:
        "A beauty salon dedicated to your confidence, wellbeing and beauty.",

      p1: (
        <>
          <strong>Vivace Beauty</strong> is a beauty salon located in Peniche,
          created with passion for hair, beauty and aesthetics. Our goal is to
          help every client feel more confident and beautiful.
        </>
      ),

      p2: (
        <>
          We provide professional <strong>hairdressing</strong>,
          <strong> gel nails</strong>, <strong> eyelashes</strong> and
          <strong> beauty treatments</strong>, always focused on quality and
          customer satisfaction.
        </>
      ),

      p3: (
        <>
          Every appointment is tailored to each client, offering a relaxing,
          welcoming and professional experience.
        </>
      ),

      p4: (
        <>
          If you're looking for a trusted beauty salon in Peniche, Vivace Beauty
          is the perfect choice.
        </>
      ),

      button: "Book Appointment",

      mainTitle: "Beauty with care and dedication",

      mainText:
        "Every service is personalised to match each client's style and needs.",

      cards: [
        {
          icon: "♡",
          title: "Personal service",
          text: "Every client receives individual attention.",
        },
        {
          icon: "✧",
          title: "Professional quality",
          text: "Attention to every detail in every service.",
        },
        {
          icon: "❀",
          title: "Relaxing atmosphere",
          text: "A comfortable space designed for your wellbeing.",
        },
      ],
    },
  };

  const t = content[language];

  return (
    <section className="sobre" id="sobre">
      <div className="sobre-container">

        <div className="sobre-texto">

          <span className="sobre-etiqueta">{t.tag}</span>

          <h2>
            {t.title} <span>{t.brand}</span> {t.city}
          </h2>

          <p className="sobre-introducao">{t.intro}</p>

          <div className="sobre-descricao">
            <p>{t.p1}</p>
            <p>{t.p2}</p>
            <p>{t.p3}</p>
            <p>{t.p4}</p>
          </div>

          <a href="#contacto" className="btn-header">
            {t.button}
          </a>

        </div>

        <aside
          className="sobre-destaques"
          aria-label={language === "pt" ? "Valores da Vivace Beauty" : "Vivace Beauty Values"}
        >
          <div className="destaque-principal">

            <span className="destaque-simbolo">✦</span>

            <h3>{t.mainTitle}</h3>

            <p>{t.mainText}</p>

          </div>

          <div className="destaques-grid">

            {t.cards.map((card, index) => (
              <article className="destaque-item" key={index}>
                <span>{card.icon}</span>

                <div>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </div>

              </article>
            ))}

          </div>

        </aside>

      </div>
    </section>
  );
}

export default Sobre;