import "../styles/contact.css"; // Importando o CSS
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { useState, useEffect } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [visible, setVisible] = useState(false);

  // Validação do formulário
  const validateForm = () => {
    let errors = {};
    if (!formData.name.trim()) errors.name = "Le nom est requis.";
    if (!formData.email.trim()) errors.email = "L'email est requis.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Email invalide.";
    if (!formData.message.trim()) errors.message = "Le message est requis.";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
      setFormData({ name: "", email: "", message: "" });
    } else {
      setErrors(errors);
    }
  };

  // Efeito de fade-in quando a seção entra na tela
  useEffect(() => {
    const handleScroll = () => {
      const section = document.querySelector(".contact-container");
      if (section) {
        const top = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (top < windowHeight - 100) {
          setVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`contact-container ${visible ? "fade-in" : ""}`}>
      <div className="contact-header">
        <h1>📞 Contactez-nous</h1>
        <p>Nous sommes à votre disposition pour toute question ou information.</p>
      </div>

      <div className="contact-content">
        {/* 📌 Seção de Informações */}
        <div className="contact-info">
          <h2>Nos coordonnées</h2>
          <p><FaEnvelope /> Email: contact@gestion-evenements.ca</p>
          <p><FaPhone /> Téléphone: +1 613 123 4567</p>
          <p><FaMapMarkerAlt /> Adresse: 100 Elgin Street, Ottawa, ON, Canada</p>

          {/* 🔗 Redes Sociais */}
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
          </div>
        </div>

        {/* 📩 Formulário de Contato */}
        <div className="contact-form">
          <h2>Envoyez-nous un message</h2>
          {submitted && <p className="success-message">✅ Message envoyé avec succès!</p>}
          <form onSubmit={handleSubmit}>
            <label>Nom:</label>
            <input 
              type="text" 
              placeholder="Votre nom" 
              value={formData.name} 
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}

            <label>Email:</label>
            <input 
              type="email" 
              placeholder="Votre email" 
              value={formData.email} 
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}

            <label>Message:</label>
            <textarea 
              placeholder="Votre message" 
              rows="5" 
              value={formData.message} 
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            ></textarea>
            {errors.message && <span className="error-message">{errors.message}</span>}

            <button type="submit">Envoyer</button>
          </form>
        </div>
      </div>

      {/* 🗺️ Mapa Embutido - Ottawa, Canadá */}
      <div className="contact-map">
        <h2>📍 Notre localisation</h2>
        <iframe 
          title="Carte de localisation"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2886.3664909283047!2d-75.69719378451513!3d45.42153027910025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cce050aa6e8f8f1%3A0x4d5f705e5c6f8d5!2s100%20Elgin%20St%2C%20Ottawa%2C%20ON%20K1P%201L2%2C%20Canada!5e0!3m2!1sen!2sca!4v1649964296231!5m2!1sen!2sca"
          width="100%"
          height="300"
          allowFullScreen="" 
          loading="lazy">
        </iframe>
      </div>
    </div>
  );
};

export default Contact;
