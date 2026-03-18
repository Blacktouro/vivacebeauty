import { useState } from "react"
import "../styles/header.css"

function Header() {

  const [open, setOpen] = useState(false)

  return (
    <header className="header">

      <div className="logo">Vivace</div>

      <div className="menu-toggle" onClick={() => setOpen(!open)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <nav className={open ? "nav active" : "nav"}>
        <a href="#sobre">Sobre</a>
        <a href="#servicos">Serviços</a>
        <a href="#contacto">Contacto</a>
        <a href="#contacto" className="btn-header">Marcar</a>
      </nav>

    </header>
  )
}

export default Header