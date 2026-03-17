import "../styles/header.css"

export default function Header() {
  return (
    <header className="header">
      <div className="logo">Vivace</div>

      <nav className="nav">
        <a href="#inicio">Início</a>
        <a href="#servicos">Serviços</a>
        <a href="#sobre">Sobre</a>
        <a href="#contacto" className="btn-header">Marcar</a>
      </nav>
    </header>
  )
}