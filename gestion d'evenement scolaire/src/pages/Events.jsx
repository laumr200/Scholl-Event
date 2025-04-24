import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/events.css";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
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
  }, []);

  return (
    <div className="events-container">
      <h2>📅 Événements à venir</h2>

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
                  <button onClick={() => navigate(`/evenement/${event.id}`)}>
                    Détails
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

export default Events;
