import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT_USER } from "../stores/actions"; // Assure-toi que le fichier action est bien importé
import "../styles/navbar.css";
import logo from "../images/logo.png";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  
  // Récupère l'état d'authentification
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // Récupère le rôle de l'utilisateur depuis le localStorage
  const role = localStorage.getItem("role");  // "Admin" ou "Etudiant"

  // Gérer la déconnexion
  const handleLogout = () => {
    localStorage.removeItem("token"); // Supprime le token du localStorage
    localStorage.removeItem("role");  // Supprime le rôle du localStorage
    dispatch({ type: LOGOUT_USER }); // Dispatch l'action de déconnexion
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setMenuOpen(false); 
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        <Link to="/" className="logo" onClick={closeMenu}>
          <img src={logo} alt="Logo" className="logo-img" />
          <span>Événements Scolaires</span>
        </Link>

        {/* Menu Links */}
        <ul className={`nav-links ${menuOpen ? "show" : ""}`}>
          <li><Link to="/" onClick={closeMenu}>Accueil</Link></li>
          <li><Link to="/events" onClick={closeMenu}>Événements</Link></li>
          <li><Link to="/etudiant" onClick={closeMenu}>Etudiants</Link></li>

          {/* Affichage conditionnel pour le lien Admin */}
          {role === "Admin" && (
            <li><Link to="/admin" onClick={closeMenu}>Admin</Link></li>
          )}

          <li><Link to="/about" onClick={closeMenu}>À propos</Link></li>
          <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>

          {/* Affichage des boutons selon l'authentification */}
          {isAuthenticated ? (
            <li><button onClick={handleLogout} className="cta-button">Se déconnecter</button></li>
          ) : (
            <>
              <li><Link to="/signup" className="cta-button" onClick={closeMenu}>S'inscrire</Link></li>
              <li><Link to="/login" className="cta-button" onClick={closeMenu}>Se connecter</Link></li>
            </>
          )}
        </ul>

        {/* Menu Mobile */}
        <div className={`hamburger ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>

      {/* Menu Mobile Overlay */}
      <div className={`menu-overlay ${menuOpen ? "active" : ""}`}>
        <ul>
          <li><Link to="/" onClick={closeMenu}>Accueil</Link></li>
          <li><Link to="/events" onClick={closeMenu}>Événements</Link></li>
          <li><Link to="/about" onClick={closeMenu}>À propos</Link></li>
          <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>
          {!isAuthenticated && <li><Link to="/signup" className="cta-button" onClick={closeMenu}>S'inscrire</Link></li>}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
