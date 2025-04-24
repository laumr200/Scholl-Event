import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/modifierevent.css";

const ModifierEventForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState({
    titre: "",
    description: "",
    date: "",
    heure: "",
    lieu: "",
    categorie: "",
    limite_participants: ""  
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/evenement/details/${id}`)
      .then(response => {
        setEvent(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erreur lors du chargement de l'événement :", error);
        setError("Impossible de charger l'événement.");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent(prevEvent => ({ ...prevEvent, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem("token");  // Récupération du token JWT
    if (!token) {
      setError("Vous devez être connecté pour modifier cet événement.");
      return;
    }
  
    // Ajout du token dans l'en-tête de la requête
    axios
      .put(`http://localhost:3000/api/admin/modifier/${id}`, event, {
        headers: {
          Authorization: `Bearer ${token}`,  
        },
      })
      .then(() => {
        setSuccessMessage("Événement modifié avec succès.");
        setError(null);  // Efface les anciens messages d'erreur

        // Redirection vers la page des événements après 2 secondes
        setTimeout(() => {
          navigate("/events");
        }, 2000);
      })
      .catch(error => {
        console.error("Erreur lors de la modification :", error);
        setError("Impossible de modifier l'événement.");
        setSuccessMessage(null);  
      });
  };
  

  if (loading) return <p className="loading">⏳ Chargement...</p>;
  if (error) return <p className="error-message">⚠️ {error}</p>;

  return (
    <div className="create-event-container">
      <h2>✏️ Modifier l'événement</h2>
      {successMessage && <p className="success-message">✅ {successMessage}</p>}
      <form className="create-event-form" onSubmit={handleSubmit}>
        <input type="text" name="titre" value={event.titre} onChange={handleChange} placeholder="Titre" required />
        <textarea name="description" value={event.description} onChange={handleChange} placeholder="Description" required />
        <input type="date" name="date" value={event.date} onChange={handleChange} required />
        <input type="time" name="heure" value={event.heure} onChange={handleChange} required />
        <input type="text" name="lieu" value={event.lieu} onChange={handleChange} placeholder="Lieu" required />
        <input type="text" name="categorie" value={event.categorie} onChange={handleChange} placeholder="Catégorie" required />
        <input
          type="number"
          name="limite_participants"
          value={event.limite_participants}
          onChange={handleChange}
          placeholder="Limite de participants"
          required
        />
        
        <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
          <button type="submit">Mettre à jour</button>
          <button type="button" onClick={() => navigate("/modifiererevent")} className="cancel-button">
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModifierEventForm;
