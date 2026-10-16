import "../styles/footer.css";

const content = {
  pt: {
    brand: "Vivace Beauty",
    brandText:
      "Cabeleireiro e estética em Peniche com serviços de unhas de gel, pestanas, cabelo e tratamentos de beleza.",

    contactsTitle: "Contactos",
    address: "R. do Lapadusso 28, 2520-369 Peniche",
    phone: "+351 964 326 339",

    navTitle: "Navegação",
    navHome: "Início",
    navAbout: "Sobre",
    navServices: "Serviços",
    navContact: "Contacto",

    socialsTitle: "Redes Sociais",

    seoText:
      "Salão de beleza em Peniche especializado em cabeleireiro, unhas de gel, pestanas e estética profissional. Atendimento personalizado com foco na qualidade e satisfação do cliente.",

    rights: "Todos os direitos reservados",
  },

  en: {
    brand: "Vivace Beauty",
    brandText:
      "Hair and beauty salon in Peniche offering gel nails, eyelashes, hair and beauty treatments.",

    contactsTitle: "Contact",
    address: "R. do Lapadusso 28, 2520-369 Peniche",
    phone: "+351 964 326 339",

    navTitle: "Navigation",
    navHome: "Home",
    navAbout: "About",
    navServices: "Services",
    navContact: "Contact",

    socialsTitle: "Social Media",

    seoText:
      "Beauty salon in Peniche specialising in hairdressing, gel nails, eyelashes and professional aesthetics. Personalised service focused on quality and client satisfaction.",

    rights: "All rights reserved",
  },
};

function Footer({ language }) {
  const text = content[language];
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="section-container footer-container">
        {/* COLUNA 1 */}
        <div className="footer-col">
          <h3>{text.brand}</h3>
          <p>{text.brandText}</p>
        </div>

        {/* COLUNA 2 */}
        <div className="footer-col">
          <h4>{text.contactsTitle}</h4>
          <p>📍 {text.address}</p>
          <p>📞 {text.phone}</p>
        </div>

        {/* COLUNA 3 */}
        <div className="footer-col">
          <h4>{text.navTitle}</h4>
          <a href="#inicio">{text.navHome}</a>
          <a href="#sobre">{text.navAbout}</a>
          <a href="#servicos">{text.navServices}</a>
          <a href="#contacto">{text.navContact}</a>
        </div>

        {/* COLUNA 4 */}
        <div className="footer-col">
          <h4>{text.socialsTitle}</h4>
          <div className="socials">
            <a href="https://instagram.com/vivacebeauty" target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href="#" target="_blank" rel="noreferrer">
              Facebook
            </a>
          </div>
        </div>
      </div>

      {/* EXTRA SEO */}
      <div className="section-container footer-seo">
        <p>{text.seoText}</p>
      </div>

      {/* COPYRIGHT */}
      <div className="footer-bottom">
        <p>
          © {year} {text.brand} — {text.rights}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
