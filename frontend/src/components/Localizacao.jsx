import "../styles/localizacao.css";

const content = {
  pt: {
    title: "Cabeleireiro e Estética em Peniche",
    text1:
      "A Vivace Beauty está localizada em Peniche e oferece serviços profissionais de cabeleireiro, unhas de gel, pestanas e estética. Se procuras um salão de beleza em Peniche com qualidade e atendimento personalizado, visita-nos.",
    addressLabel: "Morada:",
    address: (
      <>
        R. do Lapadusso 28
        <br />
        2520-369 Peniche
        <br />
        Portugal
      </>
    ),
    phoneLabel: "Telefone:",
    phone: "+351 919 828 555",
    text2:
      "Estamos no centro de Peniche, com fácil acesso e um ambiente acolhedor para todos os clientes.",
    mapButton: "Ver no Google Maps",
  },

  en: {
    title: "Hair Salon and Beauty Care in Peniche",
    text1:
      "Vivace Beauty is located in Peniche and offers professional hairdressing, gel nails, eyelash and beauty services. If you're looking for a quality beauty salon in Peniche with personalised service, come visit us.",
    addressLabel: "Address:",
    address: (
      <>
        R. do Lapadusso 28
        <br />
        2520-369 Peniche
        <br />
        Portugal
      </>
    ),
    phoneLabel: "Phone:",
    phone: "+351 919 828 555",
    text2:
      "We are located in the centre of Peniche, with easy access and a welcoming environment for all clients.",
    mapButton: "View on Google Maps",
  },
};

function Localizacao({ language }) {
  const text = content[language];

  return (
    <section className="localizacao" id="contacto">
      <div className="section-container localizacao-container">
        {/* TEXTO */}
        <div className="localizacao-texto">
          <h2>{text.title}</h2>
          <p>{text.text1}</p>

          <p>
            <strong>{text.addressLabel}</strong>
            <br />
            {text.address}
          </p>

          <p>
            <strong>{text.phoneLabel}</strong>
            <br />
            {text.phone}
          </p>

          <p>{text.text2}</p>

          <a href="https://www.google.com/maps/place/39%C2%B021'23.0%22N+9%C2%B023'23.5%22W" target="_blank" rel="noreferrer" className="btn-mapa">
            {text.mapButton}
          </a>
        </div>

        {/* MAPA */}
        <div className="localizacao-mapa">
          <iframe
            src="https://www.google.com/maps?q=39.3563812,-9.3898627&z=15&output=embed"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title="Vivace Beauty - Google Maps"
          ></iframe>
        </div>
      </div>
    </section>
  );
}

export default Localizacao;
