// ===========================
// DADOS DA EQUIPA
// Cada colaboradora é um objeto neste array.
// Para adicionar/remover pessoas, basta editar aqui —
// não precisas de tocar no componente TeamCarousel.jsx
// ===========================

const teamData = [
  {
    id: "thamy",
    photo: "/img/thamy.jpg",
    accent: "#e0a96d", // cor de destaque desta pessoa (bordas, botão, etc.)
    whatsapp: "https://wa.me/351910624152",

    pt: {
      label: "A nossa equipa",
      name: "Thamy Ferreira",
      role: "Estética & Beleza",
      texts: [
        "Thamy é especialista em unhas de gel e extensão, criando resultados elegantes, duradouros e totalmente personalizados para cada cliente.",
        "Também atua na área de maquilhagem profissional para noivas, garantindo um look perfeito, sofisticado e à prova de emoções para um dos dias mais importantes da sua vida.",
        "O seu foco é proporcionar uma experiência única, combinando técnica, cuidado e atenção ao detalhe para realçar a beleza natural de cada mulher.",
      ],
      contactTitle: "Marca com a Thamy",
      contactText: "Fala diretamente com a Thamy pelo WhatsApp e agenda o teu horário.",
      whatsappLabel: "Marcar pelo WhatsApp",
      imageFallback: "Foto brevemente",
    },

    en: {
      label: "Our team",
      name: "Thamy Ferreira",
      role: "Beauty & Aesthetics",
      texts: [
        "Thamy specialises in gel nails and extensions, creating elegant, long-lasting and fully personalised results for each client.",
        "She also works in professional bridal makeup, ensuring a perfect, sophisticated and emotion-proof look for one of the most important days of her life.",
        "Her focus is on providing a unique experience, combining technique, care and attention to detail to enhance every woman's natural beauty.",
      ],
      contactTitle: "Book with Thamy",
      contactText: "Talk directly to Thamy on WhatsApp and schedule your appointment.",
      whatsappLabel: "Book via WhatsApp",
      imageFallback: "Photo coming soon",
    },
  },

  {
    id: "helen",
    photo: "/img/helen.jpg",
    accent: "#6ec7c2",
    whatsapp: "https://wa.me/351910000000",

    pt: {
      label: "A nossa equipa",
      name: "Helen Costa",
      role: "Consultoria & Atendimento",
      texts: [
        "Helen é responsável pelo primeiro contacto com cada cliente, ajudando a perceber exatamente qual o serviço mais adequado.",
        "Acompanha o processo do início ao fim, garantindo que cada pessoa se sente ouvida e bem orientada.",
        "Valoriza a transparência e a clareza em cada recomendação que faz.",
      ],
      contactTitle: "Marca com a Helen",
      contactText: "Fala diretamente com a Helen pelo WhatsApp e agenda a tua consulta.",
      whatsappLabel: "Marcar pelo WhatsApp",
      imageFallback: "Foto brevemente",
    },

    en: {
      label: "Our team",
      name: "Helen Costa",
      role: "Consulting & Front Desk",
      texts: [
        "Helen handles the first contact with every client, helping identify exactly which service fits best.",
        "She follows the process from start to finish, making sure each person feels heard and well guided.",
        "She values transparency and clarity in every recommendation she makes.",
      ],
      contactTitle: "Book with Helen",
      contactText: "Talk directly to Helen on WhatsApp and schedule your consultation.",
      whatsappLabel: "Book via WhatsApp",
      imageFallback: "Photo coming soon",
    },
  },

  // Para adicionar mais uma colaboradora, copia um destes objetos
  // e muda id, photo, accent, whatsapp e os textos pt/en.
];

export default teamData;