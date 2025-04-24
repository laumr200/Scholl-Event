import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/modifierevent.css";

const ModifierEvenements = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  const handleEdit = (id) => {
    navigate(`/evenementform/${id}`);
  };

  return (
    <div className="container-modifier">
      <h2>✏️ Modifier des événements</h2>

      {loading && <p className="message">⏳ Chargement en cours...</p>}
      {error && <p className="message">⚠️ {error}</p>}

      {events.length > 0 ? (
        <table className="table">
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
                  <button className="btn btn-edit" onClick={() => handleEdit(event.id)}>
                    ✏️ Modifier
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && <p className="message">Aucun événement trouvé.</p>
      )}
    </div>
  );
};

export default ModifierEvenements;
