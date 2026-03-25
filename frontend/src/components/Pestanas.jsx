import "../styles/pestanas.css"

function Pestanas() {
  return (
    <section className="pestanas" id="pestanas">

      {/* TEXTO */}
      <div className="pestanas-texto">
        <h2 className="titulo-pestanas">Extensões de Pestanas</h2>

        <p className="texto-pestanas destaque">
          Realça o teu olhar. Sente-te mais confiante todos os dias.
        </p>

        <p className="texto-pestanas">
          Marca já as tuas pestanas e transforma completamente o teu visual
          com um resultado elegante e natural.
        </p>

        <p className="texto-pestanas chamada">
          ✨ Fala connosco e garante já o teu horário.
        </p>

        <a 
          href="https://wa.me/351919828555?text=Olá,%20quero%20marcar%20pestanas"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-marcar mt-3"
        >
          MARCAR AGORA
        </a>
      </div>

      {/* IMAGEM */}
      <div className="pestanas-img">
        <img src="/img/pestanas.png" alt="Pestanas" />
      </div>

    </section>
  )
}

export default Pestanas