import React, { useState, useEffect } from "react";
import { FaArrowUp, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import "../styles/footer.css";

const Footer = () => {
  const [showScroll, setShowScroll] = useState(false);

  // Verifica a posição do scroll para mostrar ou esconder o botão "Voltar ao Topo"
  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 300) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  // Função para rolar suavemente para o topo
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Links Úteis */}
        <div className="footer-section">
          <h3>Liens Utiles</h3>
          <ul>
            <li><a href="/about">À propos</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/privacy">Politique de confidentialité</a></li>
            <li><a href="/terms">Conditions d'utilisation</a></li>
          </ul>
        </div>

        {/* Redes Sociais */}
        <div className="footer-section">
          <h3>Suivez-nous</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="icon" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="icon" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="icon" />
            </a>
          </div>
        </div>

        {/* Informações de Contato */}
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: contact@evenements-scolaires.com</p>
          <p>Téléphone: +33 1 23 45 67 89</p>
        </div>
      </div>

      {/* Direitos Autorais */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Gestion d'événements scolaires. Tous droits réservés.</p>
      </div>

      {/* Botão "Voltar ao Topo" */}
      {showScroll && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          <FaArrowUp />
        </button>
      )}
    </footer>
  );
};

export default Footer;