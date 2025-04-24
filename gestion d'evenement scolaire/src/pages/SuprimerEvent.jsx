import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/suprimerevent.css";

const SupprimerEvenements = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    axios
      .get("http://localhost:3000/api/evenement/liste") 
      .then(response => {
        setEvents(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erreur lors du chargement des événements :", error);
        setError("Impossible de charger les événements. Veuillez réessayer plus tard.");
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cet événement ?")) return;
  
    const token = localStorage.getItem("token"); // Récupère le token stocké
  
    axios
      .delete(`http://localhost:3000/api/admin/supprimer/${id}`, {
        headers: { Authorization: `Bearer ${token}` }, // 🔥 Ajoute le token ici
      })
      .then(() => {
        setEvents(events.filter(event => event.id !== id)); // Mettre à jour la liste
      })
      .catch(error => {
        console.error("Erreur lors de la suppression :", error);
        setError("Impossible de supprimer l'événement.");
      });
  };
  

  return (
    <div className="events-container">
      <h2>🗑️ Supprimer des événements</h2>

      {loading && <p className="loading">⏳ Chargement en cours...</p>}
      {error && <p className="error-message">⚠️ {error}</p>}

      {events.length > 0 ? (
        <table className="event-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Titre</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {events.map(event => (
              <tr key={event.id}>
                <td>{event.id}</td>
                <td>{event.titre}</td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(event.id)}>
                    ❌ Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && <p className="no-events">Aucun événement trouvé.</p>
      )}
    </div>
  );
};

export default SupprimerEvenements;
