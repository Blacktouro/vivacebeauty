import "../styles/home.css";

const content = {
  pt: {
    heroLabel: "Cabeleireiro e estética em Peniche",
    heroTitle: "Realça a tua beleza natural",
    heroText:
      "Cabelo, unhas, sobrancelhas, pestanas e estética num espaço pensado para cuidar de ti.",
    booking: "Marcar agora",
    viewServices: "Ver serviços",

    aboutLabel: "Sobre nós",
    aboutTitle: "Um espaço criado para cuidar de ti",
    aboutText1:
      "A Vivace Beauty é um salão de cabeleireiro e estética em Peniche, com um atendimento próximo e personalizado.",
    aboutText2:
      "O nosso objetivo é proporcionar momentos de bem-estar e ajudar cada cliente a sentir-se confiante e bonita.",
    aboutCardTitle: "Atendimento personalizado",
    aboutCardText:
      "Cada serviço é adaptado ao teu estilo, necessidades e preferências.",

    servicesLabel: "Os nossos serviços",
    servicesTitle: "Cuidados completos de beleza",
    servicesText:
      "Encontra diferentes serviços de cabeleireiro e estética num único espaço.",

    hair: "Cabeleireiro",
    hairText: "Cortes, coloração, brushing e tratamentos capilares.",

    nails: "Unhas",
    nailsText: "Unhas de gel, verniz gel, manicure e decoração.",

    eyebrows: "Sobrancelhas",
    eyebrowsText: "Design, depilação e cuidados de sobrancelhas.",

    eyelashes: "Pestanas",
    eyelashesText: "Extensão, lifting e cuidados de pestanas.",

    waxing: "Depilação",
    waxingText: "Serviços de depilação facial e corporal.",

    beauty: "Estética",
    beautyText: "Tratamentos de rosto e cuidados personalizados.",

    pricesLabel: "Preçário",
    pricesTitle: "Consulta os nossos preços",
    pricesText:
      "Alguns serviços podem variar de preço conforme o trabalho necessário.",

    galleryLabel: "Galeria",
    galleryTitle: "Alguns dos nossos trabalhos",
    galleryText:
      "Descobre alguns dos resultados realizados no nosso salão.",

    contactLabel: "Contacto",
    contactTitle: "Marca o teu próximo serviço",
    contactText:
      "Entra em contacto através do WhatsApp e escolhe o melhor horário.",
    whatsapp: "Marcar pelo WhatsApp",

    addressTitle: "Morada",
    addressText: "Peniche, Portugal",

    scheduleTitle: "Horário",
    scheduleText: "Segunda a sábado, por marcação",
  },

  en: {
    heroLabel: "Hair and beauty salon in Peniche",
    heroTitle: "Enhance your natural beauty",
    heroText:
      "Hair, nails, eyebrows, eyelashes and beauty treatments in a space designed for you.",
    booking: "Book now",
    viewServices: "View services",

    aboutLabel: "About us",
    aboutTitle: "A space created to take care of you",
    aboutText1:
      "Vivace Beauty is a hair and beauty salon in Peniche, offering friendly and personalised service.",
    aboutText2:
      "Our goal is to provide moments of well-being and help every client feel confident and beautiful.",
    aboutCardTitle: "Personalised service",
    aboutCardText:
      "Every service is adapted to your style, needs and preferences.",

    servicesLabel: "Our services",
    servicesTitle: "Complete beauty care",
    servicesText:
      "Discover different hair and beauty services in one place.",

    hair: "Hair",
    hairText: "Haircuts, colouring, blow-dry and hair treatments.",

    nails: "Nails",
    nailsText: "Gel nails, gel polish, manicure and nail art.",

    eyebrows: "Eyebrows",
    eyebrowsText: "Eyebrow design, waxing and care.",

    eyelashes: "Eyelashes",
    eyelashesText: "Eyelash extensions, lifting and care.",

    waxing: "Waxing",
    waxingText: "Facial and body waxing services.",

    beauty: "Beauty treatments",
    beautyText: "Facial treatments and personalised beauty care.",

    pricesLabel: "Price list",
    pricesTitle: "View our prices",
    pricesText:
      "Some prices may vary depending on the service required.",

    galleryLabel: "Gallery",
    galleryTitle: "Some of our work",
    galleryText:
      "Discover some of the results created at our salon.",

    contactLabel: "Contact",
    contactTitle: "Book your next service",
    contactText:
      "Contact us through WhatsApp and choose the best time.",
    whatsapp: "Book through WhatsApp",

    addressTitle: "Address",
    addressText: "Peniche, Portugal",

    scheduleTitle: "Opening hours",
    scheduleText: "Monday to Saturday, by appointment",
  },
};

const prices = {
  pt: [
    {
      category: "Cabeleireiro",
      items: [
        { name: "Corte feminino", price: "Desde 18 €" },
        { name: "Corte masculino", price: "Desde 12 €" },
        { name: "Brushing", price: "Desde 12 €" },
        { name: "Coloração", price: "Sob consulta" },
        { name: "Tratamento capilar", price: "Desde 15 €" },
      ],
    },
    {
      category: "Unhas",
      items: [
        { name: "Manicure", price: "Desde 10 €" },
        { name: "Verniz gel", price: "Desde 15 €" },
        { name: "Aplicação de gel", price: "Desde 25 €" },
        { name: "Manutenção de gel", price: "Desde 20 €" },
        { name: "Nail art", price: "Sob consulta" },
      ],
    },
    {
      category: "Estética",
      items: [
        { name: "Sobrancelhas", price: "Desde 7 €" },
        { name: "Buço", price: "Desde 5 €" },
        { name: "Extensão de pestanas", price: "Desde 30 €" },
        { name: "Lifting de pestanas", price: "Desde 25 €" },
        { name: "Tratamento facial", price: "Desde 25 €" },
      ],
    },
  ],

  en: [
    {
      category: "Hair",
      items: [
        { name: "Women's haircut", price: "From €18" },
        { name: "Men's haircut", price: "From €12" },
        { name: "Blow-dry", price: "From €12" },
        { name: "Hair colouring", price: "Price on request" },
        { name: "Hair treatment", price: "From €15" },
      ],
    },
    {
      category: "Nails",
      items: [
        { name: "Manicure", price: "From €10" },
        { name: "Gel polish", price: "From €15" },
        { name: "Gel nail application", price: "From €25" },
        { name: "Gel maintenance", price: "From €20" },
        { name: "Nail art", price: "Price on request" },
      ],
    },
    {
      category: "Beauty",
      items: [
        { name: "Eyebrows", price: "From €7" },
        { name: "Upper lip waxing", price: "From €5" },
        { name: "Eyelash extensions", price: "From €30" },
        { name: "Eyelash lift", price: "From €25" },
        { name: "Facial treatment", price: "From €25" },
      ],
    },
  ],
};

function Home({ language }) {
  const text = content[language];
  const priceList = prices[language];

  const services = [
    {
      icon: "✂",
      title: text.hair,
      description: text.hairText,
    },
    {
      icon: "♡",
      title: text.nails,
      description: text.nailsText,
    },
    {
      icon: "✦",
      title: text.eyebrows,
      description: text.eyebrowsText,
    },
    {
      icon: "✧",
      title: text.eyelashes,
      description: text.eyelashesText,
    },
    {
      icon: "❀",
      title: text.waxing,
      description: text.waxingText,
    },
    {
      icon: "◇",
      title: text.beauty,
      description: text.beautyText,
    },
  ];

  return (
    <main>
      <section className="hero" id="inicio">
        <div className="hero-overlay" />

        <div className="hero-content">
          <span className="section-label hero-label">
            {text.heroLabel}
          </span>

          <h1>{text.heroTitle}</h1>

          <p>{text.heroText}</p>

          <div className="hero-buttons">
            <a
              href="https://wa.me/351XXXXXXXXX"
              className="button button-primary"
              target="_blank"
              rel="noreferrer"
            >
              {text.booking}
            </a>

            <a href="#servicos" className="button button-outline">
              {text.viewServices}
            </a>
          </div>
        </div>
      </section>

      <section className="about-section" id="sobre">
        <div className="section-container about-grid">
          <div className="about-content">
            <span className="section-label">{text.aboutLabel}</span>

            <h2>{text.aboutTitle}</h2>

            <p>{text.aboutText1}</p>
            <p>{text.aboutText2}</p>
          </div>

          <div className="about-card">
            <span className="about-icon">✦</span>
            <h3>{text.aboutCardTitle}</h3>
            <p>{text.aboutCardText}</p>
          </div>
        </div>
      </section>

      <section className="services-section" id="servicos">
        <div className="section-container">
          <div className="section-heading">
            <span className="section-label">{text.servicesLabel}</span>
            <h2>{text.servicesTitle}</h2>
            <p>{text.servicesText}</p>
          </div>

          <div className="services-grid">
            {services.map((service) => (
              <article className="service-card" key={service.title}>
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="prices-section" id="precario">
        <div className="section-container">
          <div className="section-heading centered-heading">
            <span className="section-label">{text.pricesLabel}</span>
            <h2>{text.pricesTitle}</h2>
            <p>{text.pricesText}</p>
          </div>

          <div className="prices-grid">
            {priceList.map((group) => (
              <article className="price-card" key={group.category}>
                <h3>{group.category}</h3>

                <div className="price-items">
                  {group.items.map((item) => (
                    <div className="price-item" key={item.name}>
                      <span>{item.name}</span>
                      <strong>{item.price}</strong>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="gallery-section" id="galeria">
        <div className="section-container">
          <div className="section-heading">
            <span className="section-label">{text.galleryLabel}</span>
            <h2>{text.galleryTitle}</h2>
            <p>{text.galleryText}</p>
          </div>

          <div className="gallery-grid">
            <img src="/images/trabalho-1.jpg" alt="Trabalho Vivace Beauty" />
            <img src="/images/trabalho-2.jpg" alt="Trabalho Vivace Beauty" />
            <img src="/images/trabalho-3.jpg" alt="Trabalho Vivace Beauty" />
            <img src="/images/trabalho-4.jpg" alt="Trabalho Vivace Beauty" />
            <img src="/images/trabalho-5.jpg" alt="Trabalho Vivace Beauty" />
            <img src="/images/trabalho-6.jpg" alt="Trabalho Vivace Beauty" />
          </div>
        </div>
      </section>

      <section className="contact-section" id="contacto">
        <div className="section-container contact-grid">
          <div className="contact-content">
            <span className="section-label">{text.contactLabel}</span>
            <h2>{text.contactTitle}</h2>
            <p>{text.contactText}</p>

            <a
              href="https://wa.me/351XXXXXXXXX"
              className="button button-primary"
              target="_blank"
              rel="noreferrer"
            >
              {text.whatsapp}
            </a>
          </div>

          <div className="contact-information">
            <div className="contact-item">
              <span>📍</span>
              <div>
                <h3>{text.addressTitle}</h3>
                <p>{text.addressText}</p>
              </div>
            </div>

            <div className="contact-item">
              <span>🕒</span>
              <div>
                <h3>{text.scheduleTitle}</h3>
                <p>{text.scheduleText}</p>
              </div>
            </div>

            <div className="contact-item">
              <span>📱</span>
              <div>
                <h3>WhatsApp</h3>
                <p>+351 XXX XXX XXX</p>
              </div>
            </div>

            <div className="contact-item">
              <span>📷</span>
              <div>
                <h3>Instagram</h3>
                <p>@vivacebeauty</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;