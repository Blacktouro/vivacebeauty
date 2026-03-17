import { useState } from "react"

export default function Contact() {

  const [name, setName] = useState("")
  const [message, setMessage] = useState("")

  async function enviar() {
    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          message: message
        })
      })

      const data = await res.json()
      alert(data.message)

    } catch (err) {
      console.error(err)
      alert("Erro ao enviar")
    }
  }

  return (
    <div style={{ padding: "40px" }}>
      <h2>Contacto</h2>

      <input
        type="text"
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <textarea
        placeholder="Mensagem"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <br /><br />

      <button onClick={enviar}>
        Enviar
      </button>
    </div>
  )
}