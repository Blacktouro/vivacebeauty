import "../styles/localizacao.css"



function Localizacao() {
  return (
    <section className="localizacao" id="contacto">

      <div className="localizacao-container">

        {/* TEXTO */}
        <div className="localizacao-texto">
          <h2>Localização & Contacto</h2>

          <p><strong>Morada:</strong><br/>
          R. do Lapadusso 28<br/>
          2520-369 Peniche<br/>
          Portugal</p>

          <p><strong>Telefone:</strong><br/>
          +351 919 828 555</p>

          <p><strong>Email:</strong><br/>
          vivacebeauty@email.com</p>

          <a href="https://www.google.com/maps/place/39%C2%B021'23.0%22N+9%C2%B023'23.5%22W"
             target="_blank"
             className="btn-mapa">
            Ver no Google Maps
          </a>
        </div>

        {/* MAPA */}
        <div className="localizacao-mapa">
          <iframe
            src="https://www.google.com/maps?q=39.3563812,-9.3898627&z=15&output=embed"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>

      </div>

    </section>
  )
}

export default Localizacao