import React, { useState, useEffect } from "react";
import axios from "axios";

const ListeParticipants = () => {
    const [eventId, setEventId] = useState("");
    const [participants, setParticipants] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchParticipants = async () => {
        if (!eventId) return;
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`http://localhost:3000/api/admin/participants/${eventId}`);
            setParticipants(response.data);
        } catch (err) {
            setError("Erreur lors du chargement des participants");
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchParticipants();
    }, [eventId]);

    return (
        <div className="p-4" style={{ padding: "150px"}}>
            <h2 className="text-xl font-bold mb-4">Liste des Participants</h2>
            <input 
                type="text"
                placeholder="Entrez l'ID de l'événement"
                value={eventId}
                onChange={(e) => setEventId(e.target.value)}
                className="border p-2 rounded w-full mb-4"
            />
            <button
                onClick={fetchParticipants}
                className="bg-blue-500 text-white px-4 py-2 rounded" 
            >
                Charger les participants
            </button>
            
            {loading && <p>Chargement...</p>}
            {error && <p className="text-red-500">{error}</p>}
            
            <ul className="mt-4" style={{ padding: "50px"}}>
                {participants.length > 0 ? (
                    participants.map((participant) => (
                        <li key={participant.id} className="p-2 border-b">
                            <strong>{participant.nom}</strong> - {participant.email}
                        </li>
                    ))
                ) : (
                    <p>Aucun participant trouvé.</p>
                )}
            </ul>
        </div>
    );
};

export default ListeParticipants;
