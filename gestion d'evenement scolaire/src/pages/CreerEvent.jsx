import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importation de useNavigate
import '../styles/creerevent.css';

function CreerEvent() {
    const [titre, setTitre] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [heure, setHeure] = useState('');
    const [lieu, setLieu] = useState('');
    const [categorie, setCategorie] = useState('');
    const [limiteParticipants, setLimiteParticipants] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate(); // Initialisation de useNavigate

    const handleCreateEvent = async (e) => {
        e.preventDefault();
        const eventData = { titre, description, date, heure, lieu, categorie, limite_participants: limiteParticipants };
        const token = localStorage.getItem("token");
    
        console.log("\ud83d\udcdd Données envoyées:", eventData);
        console.log("\ud83d\udd11 Token:", token);
    
        try {
            const response = await axios.post(
                'http://localhost:3000/api/admin/creer', 
                eventData,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );
            if (response.data.message === "Événement créé avec succès") {
                setMessage('Événement créé avec succès!');
                setTimeout(() => {
                    // Redirection vers la page des événements après 2 secondes
                    navigate('/events');
                }, 2000); 
            } else {
                setMessage('Erreur lors de la création de l\'événement.');
            }
        } catch (error) {
            console.error('❌ Erreur lors de la création de l\'événement:', error);
            if (error.response) {
                setMessage(`Erreur: ${error.response.data.message || 'Erreur serveur'}`);
            } else {
                setMessage('Erreur inconnue lors de la création de l\'événement.');
            }
        }
    };
    
    return (
        <div className="create-event-container">
            <h2>Créer un événement</h2>
            <form onSubmit={handleCreateEvent} className="create-event-form">
                <input
                    type="text"
                    value={titre}
                    onChange={(e) => setTitre(e.target.value)}
                    placeholder="Titre"
                    required
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    required
                />
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
                <input
                    type="time"
                    value={heure}
                    onChange={(e) => setHeure(e.target.value)}
                    required
                />
                <input
                    type="text"
                    value={lieu}
                    onChange={(e) => setLieu(e.target.value)}
                    placeholder="Lieu"
                    required
                />
                <input
                    type="text"
                    value={categorie}
                    onChange={(e) => setCategorie(e.target.value)}
                    placeholder="Catégorie"
                    required
                />
                <input
                    type="number"
                    value={limiteParticipants}
                    onChange={(e) => setLimiteParticipants(e.target.value)}
                    placeholder="Limite de participants"
                    required
                />
                <button type="submit" className="create-event-button">Créer</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default CreerEvent;
