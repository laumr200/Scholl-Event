import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "../styles/home.css";

// Importando imagens para o carrossel
import banner1 from "../images/banner 1.jpg";
import banner2 from "../images/banner 2.jpg";
import banner3 from "../images/banner 3.jpg";
import banner4 from "../images/banner 4.jpg";
import banner5 from "../images/banner 5.jpg";
import banner6 from "../images/banner 6.jpg";

// Importando imagens dos eventos
import event1 from "../images/bdb5584d406e8790d586111f2d165e1a.jpg";
import event2 from "../images/c7e15e537a746b212a7445ebb27d0741.jpg";
import event3 from "../images/ec33dc3365bc16eb11003adaa26ba5f5.jpg";

const images = [banner1, banner2, banner3, banner4, banner5, banner6];

const Home = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000); // Troca a cada 5 segundos

    AOS.init({ duration: 1000 });

    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrentImage((prevImage) => (prevImage - 1 + images.length) % images.length);
  };

  const nextSlide = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % images.length);
  };

  return (
    <div className="home-container">
      {/* Hero Section com Carrossel */}
      <section className="hero" style={{ backgroundImage: `url(${images[currentImage]})` }}>
        <div className="hero-overlay">
          <div className="hero-content" data-aos="fade-up">
            <h1>🎉 Bienvenue sur la plateforme de gestion des événements scolaires</h1>
            <p>Organisez, suivez et participez aux événements scolaires en toute simplicité et efficacité.</p>
            <Link to="/events" className="cta-button">📆 Découvrir les événements</Link>
          </div>
          <div className="carousel-controls">
            <button onClick={prevSlide} className="prev-button">⬅</button>
            <div className="carousel-progress">
              {images.map((_, index) => (
                <span
                  key={index}
                  className={`progress-dot ${index === currentImage ? "active" : ""}`}
                  onClick={() => setCurrentImage(index)}
                />
              ))}
            </div>
            <button onClick={nextSlide} className="next-button">➡</button>
          </div>
        </div>
      </section>

      {/* Section Fonctionnalités */}
      <section className="features">
        <h2 data-aos="fade-up">Pourquoi utiliser notre plateforme ?</h2>
        <div className="features-grid">
          <div className="feature-card" data-aos="fade-right">
            <span>📅</span>
            <h3>Gestion Simplifiée</h3>
            <p>Ajoutez, modifiez et gérez vos événements en quelques clics.</p>
          </div>
          <div className="feature-card" data-aos="fade-up">
            <span>🔔</span>
            <h3>Rappels et Notifications</h3>
            <p>Recevez des rappels automatiques pour ne jamais manquer un événement.</p>
          </div>
          <div className="feature-card" data-aos="fade-left">
            <span>📊</span>
            <h3>Statistiques et Analyses</h3>
            <p>Analysez les performances de vos événements pour une meilleure organisation.</p>
          </div>
        </div>
      </section>

      {/* Événements Récents */}
      <section className="recent-events">
        <h2 data-aos="fade-up">🎉 Événements Récents</h2>
        <div className="events-grid">
          {[event1, event2, event3].map((event, index) => (
            <div className="event-card" data-aos="zoom-in" key={index}>
              <img src={event} alt={`Événement ${index + 1}`} className="event-image"/>
              <div className="event-info">
                <h3>{index === 0 ? "Foire Scientifique" : index === 1 ? "Festival de Musique" : "Compétition Sportive"}</h3>
                <p>{index === 0 ? "Découvrez les projets scientifiques de nos élèves." : index === 1 ? "Un festival unique mettant en avant nos jeunes talents." : "Une journée excitante remplie de compétitions interscolaires."}</p>
                <Link to="/events" className="btn-event">Voir l'événement</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section Próximos Eventos */}
      <section className="upcoming-events">
        <h2 data-aos="fade-up">📅 Prochains Événements</h2>
        <div className="upcoming-events-grid">
          <div className="upcoming-event-card" data-aos="fade-right">
            <h3>Journée Portes Ouvertes</h3>
            <p>Date: 15 Novembre 2023</p>
            <p>Découvrez notre école et nos programmes.</p>
            <Link to="/events" className="btn-event">En savoir plus</Link>
          </div>
          <div className="upcoming-event-card" data-aos="fade-up">
            <h3>Concours d'Art</h3>
            <p>Date: 20 Novembre 2023</p>
            <p>Participez à notre concours d'art annuel.</p>
            <Link to="/events" className="btn-event">En savoir plus</Link>
          </div>
          <div className="upcoming-event-card" data-aos="fade-left">
            <h3>Fête de Noël</h3>
            <p>Date: 15 Décembre 2023</p>
            <p>Célébrez Noël avec nous!</p>
            <Link to="/events" className="btn-event">En savoir plus</Link>
          </div>
        </div>
      </section>

      {/* Section Galeria de Fotos */}
      <section className="photo-gallery">
        <h2 data-aos="fade-up">📸 Galerie de Photos</h2>
        <div className="gallery-grid">
          {[event1, event2, event3, banner1, banner2, banner3].map((photo, index) => (
            <div className="gallery-item" data-aos="zoom-in" key={index}>
              <img src={photo} alt={`Gallery ${index + 1}`} className="gallery-image"/>
            </div>
          ))}
        </div>
      </section>

      {/* Section Témoignages */}
      <section className="testimonials">
        <h2 data-aos="fade-up">✨ Ce que disent nos utilisateurs</h2>
        <div className="testimonial-card" data-aos="zoom-in">
          <p>« Cette plateforme nous a permis d’organiser nos événements avec une efficacité incroyable ! »</p>
          <span>- Directeur de l'école Saint-Louis</span>
        </div>
      </section>

      {/* Section Parceiros */}
      <section className="partners">
        <h2 data-aos="fade-up">🤝 Nos Partenaires</h2>
        <div className="partners-grid">
          <div className="partner-logo" data-aos="fade-right">
            <img src="https://via.placeholder.com/150" alt="Partner 1"/>
          </div>
          <div className="partner-logo" data-aos="fade-up">
            <img src="https://via.placeholder.com/150" alt="Partner 2"/>
          </div>
          <div className="partner-logo" data-aos="fade-left">
            <img src="https://via.placeholder.com/150" alt="Partner 3"/>
          </div>
        </div>
      </section>

      {/* Botão de Voltar ao Topo */}
      <button className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        ↑
      </button>
    </div>
  );
};

export default Home;