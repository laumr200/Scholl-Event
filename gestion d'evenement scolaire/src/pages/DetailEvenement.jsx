import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import "../styles/detailEvenement.css";

const DetailEvenement = () => {
  const { id } = useParams(); // Récupère l'ID de l'événement à partir de l'URL
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Effectue une requête pour récupérer les détails de l'événement en fonction de l'ID
    axios
      .get(`http://localhost:3000/api/evenement/details/${id}`)
      .then(response => {
        setEvent(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erreur lors du chargement de l'événement :", error);
        setError("Impossible de charger les détails de l'événement. Veuillez réessayer.");
        setLoading(false);
      });
  }, [id]); // L'effet se déclenche quand l'ID change

  if (loading) return <p className="loading">⏳ Chargement des détails...</p>;
  if (error) return <p className="error-message">⚠️ {error}</p>;

  return (
    <div className="event-detail-container">
      {event ? (
        <>
          <h2>{event.titre}</h2>
          <p><strong>Date :</strong> {event.date}</p>
          <p><strong>Heure :</strong> {event.heure}</p>
          <p><strong>Description :</strong> {event.description}</p>
          <p><strong>Lieu :</strong> {event.lieu}</p>
          <p><strong>Catégorie :</strong> {event.categorie}</p>
          <p><strong>Limite de participants :</strong> {event.limite_participants}</p>
        </>
      ) : (
        <p>Événement non trouvé.</p>
      )}
    </div>
  );
};

export default DetailEvenement;
