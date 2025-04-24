import React, { useState } from "react";
import axios from "axios";
import '../styles/event2.css'; // Assurez-vous que le fichier CSS est correctement lié à votre projet

function RechercheEvenements() {
  const [etudiantId, setEtudiantId] = useState("");
  const [evenements, setEvenements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setEtudiantId(event.target.value);
  };

  const rechercherEvenements = async () => {
    if (!etudiantId) {
      setError("Veuillez entrer un ID d'étudiant.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`http://localhost:3000/api/etudiant/mesevenements/${etudiantId}`);
      setEvenements(response.data);
      setLoading(false);
    } catch (err) {
      setError("Erreur lors de la récupération des événements.");
      setLoading(false);
    }
  };

  const annulerInscription = async (evenementId) => {
        try {
            // Utiliser la bonne route avec etudiantId
            await axios.delete(`http://localhost:3000/api/etudiant/annulerInscription/${etudiantId}/${evenementId}`);
        
            // Mise à jour de la liste après annulation
            setEvenements((prevEvenements) =>
              prevEvenements.filter((evenement) => evenement.id !== evenementId)
            );
          } catch (err) {
            setError("Erreur lors de l'annulation de l'inscription.");
          }
  };

  return (
    <div className="events-container">
      <h2>Rechercher les événements d'un étudiant</h2>

      <div>
        <label htmlFor="etudiantId">Numero d'étudiant :</label>
        <input
          type="text"
          id="etudiantId"
          value={etudiantId}
          onChange={handleInputChange}
          placeholder="Entrez l'ID de l'étudiant"
        />
        <button onClick={rechercherEvenements}>Rechercher</button>
      </div>

      {loading && <div className="loading">Chargement des événements...</div>}
      {error && <div className="error-message">{error}</div>}

      {evenements.length === 0 && !loading && !error && (
        <p className="no-events">Aucun événement trouvé pour cet étudiant.</p>
      )}

      {evenements.length > 0 && !loading && !error && (
        <table className="event-table">
          <thead>
            <tr>
              <th>Titre</th>
              <th>Description</th>
              <th>Date</th>
              <th>Heure</th>
              <th>Lieu</th>
              <th>Catégorie</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {evenements.map((evenement) => (
              <tr key={evenement.id}>
                <td>{evenement.titre}</td>
                <td>{evenement.description}</td>
                <td>{new Date(evenement.date).toLocaleDateString()}</td>
                <td>{evenement.heure}</td>
                <td>{evenement.lieu}</td>
                <td>{evenement.categorie}</td>
                <td>
                  <button
                    className="annuler-button"
                    onClick={() => annulerInscription(evenement.id)}
                  >
                    Annuler
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default RechercheEvenements;
