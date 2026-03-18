import "../styles/footer.css"

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* COLUNA 1 */}
        <div className="footer-col">
          <h3>Vivace Beauty</h3>
          <p>
            Beleza, confiança e bem-estar.  
            Um espaço dedicado a cuidar de si.
          </p>
        </div>

        {/* COLUNA 2 */}
        <div className="footer-col">
          <h4>Contactos</h4>
          <p>📍 R. do Lapadusso 28, Peniche</p>
          <p>📞 +351 912 345 678</p>
          <p>✉️ vivacebeauty@email.com</p>
        </div>

        {/* COLUNA 3 */}
        <div className="footer-col">
          <h4>Navegação</h4>
          <a href="#sobre">Sobre</a>
          <a href="#servicos">Serviços</a>
          <a href="#contacto">Contacto</a>
        </div>

        {/* COLUNA 4 */}
        <div className="footer-col">
          <h4>Redes Sociais</h4>
          <div className="socials">
            <a href="#">Instagram</a>
            <a href="#">Facebook</a>
          </div>
        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="footer-bottom">
        <p>© 2026 Vivace Beauty — Todos os direitos reservados</p>
      </div>

    </footer>
  )
}

export default Footer