import { useEffect, useState } from "react";
import "../styles/header.css";

const translations = {
  pt: {
    home: "Início",
    about: "Sobre nós",
    services: "Serviços",
    contact: "Contacto",
    booking: "Marcar agora",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    navigation: "Navegação principal",
    language: "Selecionar idioma",
  },

  en: {
    home: "Home",
    about: "About us",
    services: "Services",
    contact: "Contact",
    booking: "Book now",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    navigation: "Main navigation",
    language: "Select language",
  },
};

const navigationItems = [
  { id: "inicio", key: "home" },
  { id: "sobre", key: "about" },
  { id: "servicos", key: "services" },
  { id: "contacto", key: "contact" },
];

const WHATSAPP_URL = "https://wa.me/351919828555";

function Header({
  language = "pt",
  onLanguageChange = () => {},
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");

  const text = translations[language] || translations.pt;

  function closeMenu() {
    setOpen(false);
  }

  function changeLanguage(newLanguage) {
    onLanguageChange(newLanguage);
    closeMenu();
  }

  /*
   * Altera o idioma do documento.
   */
  useEffect(() => {
    document.documentElement.lang =
      language === "en" ? "en" : "pt-PT";
  }, [language]);

  /*
   * Adiciona um efeito ao cabeçalho depois do scroll.
   */
  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /*
   * Impede o conteúdo da página de fazer scroll
   * quando o menu móvel está aberto.
   */
  useEffect(() => {
    if (open) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }

    return () => {
      document.body.classList.remove("menu-open");
    };
  }, [open]);

  /*
   * Fecha o menu com a tecla Escape.
   */
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        closeMenu();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  /*
   * Fecha o menu quando o utilizador passa
   * novamente para a versão de computador.
   */
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 1050) {
        closeMenu();
      }
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /*
   * Deteta qual secção está visível.
   */
  useEffect(() => {
    const sections = navigationItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    if (!sections.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (first, second) =>
              second.intersectionRatio - first.intersectionRatio,
          );

        if (visibleSections.length > 0) {
          setActiveSection(visibleSections[0].target.id);
        }
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0.05, 0.2, 0.5],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <header
      className={`header ${scrolled ? "header-scrolled" : ""}`}
    >
      <div className="header-container">
        <a
          href="#inicio"
          className="logo"
          onClick={closeMenu}
          aria-label="Vivace Beauty - Início"
        >
          <span className="logo-name">
            Vivace<span className="logo-dot">.</span>
          </span>

          <span className="logo-subtitle">Beauty</span>
        </a>

        <nav
          id="main-navigation"
          className={`nav ${open ? "active" : ""}`}
          aria-label={text.navigation}
        >
          <div className="nav-mobile-heading">
            <span>Vivace Beauty</span>

            <small>
              {language === "pt"
                ? "Cabeleireiro e estética"
                : "Hair and beauty salon"}
            </small>
          </div>

          <div className="nav-links">
            {navigationItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={
                  activeSection === item.id
                    ? "nav-link active-link"
                    : "nav-link"
                }
                onClick={closeMenu}
                aria-current={
                  activeSection === item.id ? "page" : undefined
                }
              >
                {text[item.key]}
              </a>
            ))}
          </div>

          <div
            className="language-selector"
            aria-label={text.language}
          >
            <button
              type="button"
              className={`language-button ${
                language === "pt" ? "selected" : ""
              }`}
              onClick={() => changeLanguage("pt")}
              aria-pressed={language === "pt"}
              aria-label="Mudar para português"
            >
              <span className="flag" aria-hidden="true">
                🇵🇹
              </span>

              <span>PT</span>
            </button>

            <button
              type="button"
              className={`language-button ${
                language === "en" ? "selected" : ""
              }`}
              onClick={() => changeLanguage("en")}
              aria-pressed={language === "en"}
              aria-label="Change to English"
            >
              <span className="flag" aria-hidden="true">
                🇬🇧
              </span>

              <span>EN</span>
            </button>
          </div>

          <a
            href={WHATSAPP_URL}
            className="btn-header"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            aria-label={`${text.booking} pelo WhatsApp`}
          >
            <span className="button-icon" aria-hidden="true">
              ◇
            </span>

            {text.booking}
          </a>

          <div className="nav-mobile-footer">
            <span>Peniche, Portugal</span>
          </div>
        </nav>

        <button
          type="button"
          className={`menu-toggle ${open ? "active" : ""}`}
          onClick={() => setOpen((currentOpen) => !currentOpen)}
          aria-label={open ? text.closeMenu : text.openMenu}
          aria-expanded={open}
          aria-controls="main-navigation"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <button
        type="button"
        className={`menu-overlay ${open ? "active" : ""}`}
        onClick={closeMenu}
        aria-label={text.closeMenu}
        tabIndex={open ? 0 : -1}
      />
    </header>
  );
}

export default Header;