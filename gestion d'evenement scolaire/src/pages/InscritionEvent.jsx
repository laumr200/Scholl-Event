import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/events.css";

const InscriptionEvent = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")); // Récupération de l'utilisateur connecté
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/evenement/liste")
      .then((response) => {
        setEvents(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des événements :", error);
        setError("Impossible de charger les événements. Veuillez réessayer plus tard.");
        setLoading(false);
      });
  }, []);

  const handleInscription = async (eventId) => {
    if (!user) {
      alert("Vous devez être connecté pour vous inscrire à un événement.");
      navigate("/login");
      return;
    }
    
    try {
      const response = await axios.post(
        `http://localhost:3000/api/etudiant/inscription`,
        { evenementId: eventId, etudiantId: user.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      alert(response.data.message || "Inscription réussie !");
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      alert(error.response?.data?.message || "Une erreur s'est produite.");
    }
  };

  return (
    <div className="events-container">
      <h2>📅 Inscription aux événements</h2>

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
            {events.map((event) => (
              <tr key={event.id}>
                <td>{event.id}</td>
                <td>{event.titre}</td>
                <td>
                  <button onClick={() => handleInscription(event.id)}>
                    S'inscrire
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && <p className="no-events">Aucun événement disponible.</p>
      )}
    </div>
  );
};

export default InscriptionEvent;
