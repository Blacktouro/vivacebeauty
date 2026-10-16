import { useState } from "react";
import services from "../data/services";
import "../styles/servicos.css";
import { Modal, Button } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function ServiceImage({ src, alt, variant = "card" }) {
  const [error, setError] = useState(false);
  const wrapperClass = variant === "modal" ? "modal-media" : "service-media";

  if (!src || error) {
    return (
      <div className={wrapperClass}>
        <div className="service-img-fallback">
          <span className="fallback-label">Brevemente</span>
        </div>
      </div>
    );
  }

  return (
    <div className={wrapperClass}>
      <img
        src={src}
        alt={alt}
        loading={variant === "modal" ? "eager" : "lazy"}
        onError={() => setError(true)}
      />
    </div>
  );
}

function ServiceCard({ service, language, onOpen }) {
  return (
    <div className="service-card">
      <ServiceImage src={service.image} alt={service.title} />

      <div className="service-content">
        <h3>{service.title}</h3>
        <p>{service.short}</p>

        <button className="service-btn" onClick={() => onOpen(service)}>
          <span>{language === "pt" ? "Saber Mais" : "Learn More"}</span>
          <span className="btn-arrow">→</span>
        </button>
      </div>
    </div>
  );
}

function Servicos({ language }) {
  const t = services[language] || services.pt;
  const [selectedService, setSelectedService] = useState(null);
  const [show, setShow] = useState(false);

  const openService = (service) => {
    setSelectedService(service);
    setShow(true);
  };

  const closeService = () => setShow(false);

  return (
    <section className="servicos" id="servicos">
      <div className="container">
        <div className="servicos-header">
          <span>{language === "pt" ? "Os nossos serviços" : "Our Services"}</span>
          <h2>
            {language === "pt"
              ? "Tudo o que precisas para cuidar da tua beleza"
              : "Everything you need to take care of your beauty"}
          </h2>
          <p>
            {language === "pt"
              ? "Descobre todos os serviços disponíveis na Vivace Beauty."
              : "Discover every beauty treatment available at Vivace Beauty."}
          </p>
        </div>

        {/* DESKTOP / TABLET */}
        <div className="desktop-services">
          <div className="services-grid">
            {t.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                language={language}
                onOpen={openService}
              />
            ))}
          </div>
        </div>

        {/* MOBILE */}
        <div className="mobile-services">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1.08}
            centeredSlides
            loop
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
          >
            {t.map((service) => (
              <SwiperSlide key={service.id}>
                <ServiceCard
                  service={service}
                  language={language}
                  onOpen={openService}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Modal */}
      <Modal show={show} onHide={closeService} centered size="lg" className="service-modal">
        {selectedService && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedService.title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <ServiceImage
                src={selectedService.image}
                alt={selectedService.title}
                variant="modal"
              />

              <p className="modal-description">{selectedService.description}</p>

              <div className="modal-services">
                <h4>{language === "pt" ? "Inclui:" : "Includes:"}</h4>
                <ul>
                  {selectedService.services.map((item, index) => (
                    <li key={index}>
                      <span className="check-icon">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={closeService}>
                {language === "pt" ? "Fechar" : "Close"}
              </Button>
              <a
                href="https://wa.me/351964326339"
                target="_blank"
                rel="noreferrer"
                className="btn btn-warning service-book-btn"
              >
                {language === "pt" ? "Marcar Agora" : "Book Now"}
              </a>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </section>
  );
}

export default Servicos;