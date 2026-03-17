export default function Hero() {
  return (
    <section style={{
      height: "100vh",
      background: "linear-gradient(135deg, #f5e6d3, #e8d5b7)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{
        background: "white",
        padding: "50px",
        borderRadius: "20px",
        textAlign: "center",
        boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
        maxWidth: "500px"
      }}>

        <h1 style={{
          color: "#2c2c2c",
          fontSize: "48px",
          marginBottom: "10px"
        }}>
          Vivace Beauty
        </h1>

        <p style={{
          color: "#666",
          marginBottom: "25px"
        }}>
          Cabeleireiro & Estética em Peniche
        </p>

        <button style={{
          background: "#6fbf73",
          border: "none",
          padding: "12px 25px",
          borderRadius: "999px",
          color: "white",
          fontWeight: "bold",
          cursor: "pointer",
          fontSize: "16px"
        }}>
          Marcar Agora
        </button>

      </div>

    </section>
  )
}