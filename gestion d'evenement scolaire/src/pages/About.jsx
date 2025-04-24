import { useEffect, useState } from "react";
import "../styles/about.css";
import { FaCheckCircle, FaUsers, FaCalendarCheck, FaStar, FaQuoteLeft, FaLightbulb, FaChalkboardTeacher } from "react-icons/fa";

// Importando imagens do carrossel
import banner1 from "../images/banner 1.jpg";
import banner2 from "../images/banner 2.jpg";
import banner3 from "../images/banner 3.jpg";
import banner4 from "../images/banner 4.jpg";
import banner5 from "../images/banner 5.jpg";

const images = [banner1, banner2, banner3, banner4, banner5];

const About = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    // Alternar imagens a cada 4 segundos com transição suave
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Ativar animações ao rolar a página
    const handleScroll = () => {
      const elements = document.querySelectorAll(".fade-in");
      elements.forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight - 100) {
          el.classList.add("visible");
        }
      });
    };

    // Função do contador animado
    const animateCounters = () => {
      document.querySelectorAll(".counter").forEach((counter) => {
        const updateCount = () => {
          const target = +counter.getAttribute("data-target");
          const count = +counter.innerText;
          const speed = 200;
          const increment = target / speed;

          if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(updateCount, 20);
          } else {
            counter.innerText = target;
          }
        };
        updateCount();
      });
    };

    window.addEventListener("scroll", handleScroll);
    animateCounters();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="about-container">
      {/* Cabeçalho com Carrossel */}
      <div className="about-header">
        <div className="carousel">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt="Banner"
              className={`carousel-image ${index === currentImage ? "active" : ""}`}
            />
          ))}
        </div>
        <div className="header-text">
          <h1>📚 À propos de nous</h1>
          <p>
            Bienvenue sur <strong>Événements Scolaires</strong>, une plateforme moderne conçue pour simplifier
            la gestion et l'organisation des événements éducatifs.
          </p>
        </div>
      </div>

      {/* Nossa História */}
      <div className="about-history fade-in">
        <h2>Notre Histoire</h2>
        <p>
          Fondée en 2022, notre mission est de révolutionner la gestion des événements scolaires avec une plateforme intuitive et innovante.
          Nous croyons que la technologie peut faciliter l'organisation et l'engagement des étudiants et enseignants.
        </p>
      </div>

      {/* Estatísticas dinâmicas */}
      <div className="about-stats fade-in">
        <div className="stat">
          <FaCalendarCheck className="stat-icon" />
          <h2 className="counter" data-target="500">0</h2>
          <p>Événements organisés</p>
        </div>
        <div className="stat">
          <FaUsers className="stat-icon" />
          <h2 className="counter" data-target="1200">0</h2>
          <p>Utilisateurs inscrits</p>
        </div>
      </div>

      {/* Benefícios */}
      <div className="about-benefits fade-in">
        <h2>Pourquoi choisir notre plateforme ?</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <FaCalendarCheck className="icon" />
            <h3>Organisation Facile</h3>
            <p>Gérez vos événements en quelques clics grâce à une interface intuitive.</p>
          </div>
          <div className="benefit-card">
            <FaUsers className="icon" />
            <h3>Collaboration</h3>
            <p>Permettez aux enseignants et étudiants de participer activement aux événements.</p>
          </div>
          <div className="benefit-card">
            <FaCheckCircle className="icon" />
            <h3>Efficacité</h3>
            <p>Optimisez la gestion du temps et des ressources pour chaque événement.</p>
          </div>
          <div className="benefit-card">
            <FaStar className="icon" />
            <h3>Innovation</h3>
            <p>Profitez d'une plateforme conçue avec les meilleures technologies actuelles.</p>
          </div>
        </div>
      </div>

      {/* Nossa Equipe */}
      <div className="about-team fade-in">
        <h2>Notre Équipe</h2>
        <p>
          Une équipe passionnée composée de développeurs, d'enseignants et de spécialistes en gestion d'événements,
          unis par la volonté d'améliorer l'expérience éducative.
        </p>
      </div>

      {/* Call to Action */}
      <div className="about-cta fade-in">
        <h2>Prêt à organiser vos événements ?</h2>
        <p>Rejoignez-nous dès aujourd'hui et simplifiez votre gestion scolaire.</p>
        <a href="/signup" className="cta-button">Créer un compte</a>
      </div>
    </div>
  );
};

export default About;