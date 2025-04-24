import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/etudiant.css";

const Etudiant = () => {
    const [categorie, setCategorie] = useState("");
    const [evenements, setEvenements] = useState([]);
    const [messageErreur, setMessageErreur] = useState("");
    const navigate = useNavigate();

    // Rechercher par catégorie
    const rechercherParCategorie = async () => {
        if (!categorie.trim()) {
            setMessageErreur("Veuillez entrer une catégorie avant de rechercher.");
            setEvenements([]);
            return;
        }

        try {
            const res = await axios.get(`http://localhost:3000/api/etudiant/recherchercategorie?categorie=${categorie}`);

            setEvenements(res.data);
            setMessageErreur(""); // Supprime le message d'erreur
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setMessageErreur("Aucun événement trouvé pour cette catégorie.");
            } else {
                setMessageErreur("Une erreur est survenue. Veuillez réessayer.");
            }
            setEvenements([]);
        }
    };

    return (
        <div className="etudiant-container">
            <h2>Bienvenue Étudiant</h2>

            {/* Boutons de navigation */}
            <div className="etudiant-actions">
                <button onClick={() => navigate("/inscriptionevent")}>S'inscrire à un événement</button>
                <button onClick={() => navigate("/mesevenements")}>Mes événements</button>
            </div>

            {/* Barre de recherche */}
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Rechercher une catégorie"
                    value={categorie}
                    onChange={(e) => setCategorie(e.target.value)}
                />
                <button onClick={rechercherParCategorie}>Rechercher</button>
            </div>

            {/* Affichage du message d'erreur */}
            {messageErreur && <p className="error-message">{messageErreur}</p>}

            {/* Liste des événements */}
            {evenements.length > 0 && (
                <div>
                    <h3>Événements trouvés</h3>
                    <div className="event-list">
                        {evenements.map(event => (
                            <div key={event.id} className="event-card">
                                <h4>{event.nom}</h4>
                                <p><strong>Titre:</strong> {event.titre}</p>
                                <p><strong>Date:</strong> {event.date}</p>
                                <p><strong>Lieu:</strong> {event.lieu}</p>
                                <p><strong>Description:</strong> {event.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Etudiant;
