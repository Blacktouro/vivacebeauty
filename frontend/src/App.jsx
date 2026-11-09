import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Sobre from "./components/Sobre";
import Servicos from "./components/Servicos";
import Helen from "./components/Helen";
import Thamy from "./components/Thamy";
import Wilza from "./components/Wilza";
import Novidades from "./components/Novidades";
import Natal, { natalAtivo, NatalBanner } from "./components/Natal";
import AgendamentoWhatsApp from "./components/AgendamentoWhatsApp";

import GaleriaFaixas from "./components/GaleriaFaixas";
import GoogleReviews from "./components/GoogleReviews";
import Localizacao from "./components/Localizacao";
import Footer from "./components/Footer";

import "./styles/main.css";
import "./styles/responsive.css";

const SITE_URL = "https://vivace-beauty.pt/";
const SHARE_IMAGE =
  "https://vivace-beauty.pt/images/og-vivace.jpg";

// Versão de Natal do título e descrição (Google, partilhas) — 1 dez a 6 jan
const seoNatal = {
  pt: {
    title: "Natal na Vivace Beauty | Cabeleireiro e Estética em Peniche",
    description:
      "Prepare o seu look de Natal e Passagem de Ano na Vivace Beauty, em Peniche: cabelo, unhas de gel, pestanas, sobrancelhas e estética. Marque já pelo WhatsApp.",
    ogTitle: "Natal na Vivace Beauty | Beleza para as festas em Peniche",
    ogDescription:
      "Cabelo, unhas, pestanas e estética para o Natal e a Passagem de Ano, em Peniche. Marque já.",
  },
  en: {
    title: "Christmas at Vivace Beauty | Hair and Beauty Salon in Peniche",
    description:
      "Get your look ready for Christmas and New Year's Eve at Vivace Beauty in Peniche: hair, gel nails, lashes, brows and beauty treatments. Book now on WhatsApp.",
    ogTitle: "Christmas at Vivace Beauty | Holiday beauty in Peniche",
    ogDescription:
      "Hair, nails, lashes and beauty treatments for Christmas and New Year's Eve in Peniche. Book now.",
  },
};

const seoContent = {
  pt: {
    language: "pt-PT",
    locale: "pt_PT",

    title:
      "Vivace Beauty | Cabeleireiro e Estética em Peniche",

    description:
      "Cabeleireiro e estética em Peniche. Unhas de gel, cabelo, pestanas, sobrancelhas, depilação e cuidados de beleza. Marca o teu atendimento na Vivace Beauty.",

    keywords:
      "Vivace Beauty, cabeleireiro Peniche, unhas de gel Peniche, estética Peniche, salão de beleza Peniche, pestanas Peniche, sobrancelhas Peniche, depilação Peniche",

    ogTitle:
      "Vivace Beauty | Beleza e Estética em Peniche",

    ogDescription:
      "Cabeleireiro, unhas, pestanas, sobrancelhas e serviços de estética em Peniche.",

    imageAlt:
      "Vivace Beauty, cabeleireiro, unhas e estética em Peniche",

    skipText: "Saltar para o conteúdo principal",
  },

  en: {
    language: "en",
    locale: "en_GB",

    title:
      "Vivace Beauty | Hair and Beauty Salon in Peniche",

    description:
      "Hair and beauty salon in Peniche. Gel nails, hair, eyelashes, eyebrows, waxing and personalised beauty treatments.",

    keywords:
      "Vivace Beauty, hair salon Peniche, beauty salon Peniche, gel nails Peniche, eyelashes Peniche, eyebrows Peniche, waxing Peniche",

    ogTitle:
      "Vivace Beauty | Hair and Beauty in Peniche",

    ogDescription:
      "Hair, nails, eyelashes, eyebrows and professional beauty services in Peniche.",

    imageAlt:
      "Vivace Beauty hair, nails and beauty salon in Peniche",

    skipText: "Skip to main content",
  },
};

function App() {
  const [language, setLanguage] = useState(() => {
    const savedLanguage =
      localStorage.getItem("vivace-language");

    return savedLanguage === "en" ? "en" : "pt";
  });

  const natal = natalAtivo();
  const seoBase = seoContent[language] ?? seoContent.pt;
  const seo = natal ? { ...seoBase, ...(seoNatal[language] ?? seoNatal.pt) } : seoBase;

  useEffect(() => {
    localStorage.setItem("vivace-language", language);
    document.documentElement.lang = seo.language;
  }, [language, seo.language]);

  return (
    <>
      <Helmet htmlAttributes={{ lang: seo.language }}>
        <title>{seo.title}</title>

        <meta
          name="description"
          content={seo.description}
        />

        <meta
          name="keywords"
          content={seo.keywords}
        />

        <meta
          name="author"
          content="Vivace Beauty"
        />

        <meta
          name="robots"
          content="index, follow"
        />

        {/* Cor da barra do browser no telemóvel (vermelho no Natal) */}
        <meta
          name="theme-color"
          content={natal ? "#9e0b23" : "#0d0d0e"}
        />

        <link rel="icon" type="image/svg+xml" href={natal ? "/favicon-natal.svg" : "/favicon.svg"} />

        <link
          rel="canonical"
          href={SITE_URL}
        />

        {/* Open Graph: WhatsApp, Facebook e LinkedIn */}

        <meta
          property="og:locale"
          content={seo.locale}
        />

        <meta
          property="og:locale:alternate"
          content={language === "pt" ? "en_GB" : "pt_PT"}
        />

        <meta
          property="og:type"
          content="website"
        />

        <meta
          property="og:site_name"
          content="Vivace Beauty"
        />

        <meta
          property="og:title"
          content={seo.ogTitle}
        />

        <meta
          property="og:description"
          content={seo.ogDescription}
        />

        <meta
          property="og:url"
          content={SITE_URL}
        />

        <meta
          property="og:image"
          content={SHARE_IMAGE}
        />

        <meta
          property="og:image:width"
          content="1200"
        />

        <meta
          property="og:image:height"
          content="630"
        />

        <meta
          property="og:image:alt"
          content={seo.imageAlt}
        />

        {/* Twitter / X */}

        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <meta
          name="twitter:title"
          content={seo.ogTitle}
        />

        <meta
          name="twitter:description"
          content={seo.ogDescription}
        />

        <meta
          name="twitter:image"
          content={SHARE_IMAGE}
        />

        <meta
          name="twitter:image:alt"
          content={seo.imageAlt}
        />
      </Helmet>

      <a
        href="#conteudo-principal"
        className="skip-link"
      >
        {seo.skipText}
      </a>

      <Natal language={language} />

      <Header
        language={language}
        onLanguageChange={setLanguage}
      />

      <main
        id="conteudo-principal"
        tabIndex="-1"
      >
        <Hero language={language} />

        <Sobre language={language} />

        <NatalBanner language={language} />

        <Novidades language={language} />

        <Servicos language={language} />

        <Helen language={language} />

        <Thamy language={language} />

        <Wilza language={language} />

        <GaleriaFaixas language={language} />

        <AgendamentoWhatsApp language={language} />

        <GoogleReviews language={language} />

        <Localizacao language={language} />
      </main>

      <Footer language={language} />
    </>
  );
}

export default App;