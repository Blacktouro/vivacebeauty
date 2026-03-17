import Header from "./components/Header"
import Hero from "./components/Hero"
import Contact from "./Contact"

import "./styles/main.css"

function App() {
  return (
    <>
      <Header />

      <Hero />

      <section id="servicos" style={{ height: "100vh", padding: "50px" }}>
        <h2>Serviços</h2>
      </section>

      <section id="sobre" style={{ height: "100vh", padding: "50px" }}>
        <h2>Sobre</h2>
      </section>

      <section id="contacto" style={{ height: "100vh", padding: "50px" }}>
        <h2>Contacto</h2>
      </section>
    </>
  )
}

export default App