import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/admin.css';

function Admin() {
    return (
        <div className="admin-container">
            <h1 className="admin-title">Espace réservé à l'administrateur</h1>
            <div className="admin-action-buttons">
                <Link to="/create-event" className="admin-button">Créer un événement</Link>
                <Link to="/suprimerevent" className="admin-button">Suprimer un evenement</Link>
                <Link to="/modifiererevent" className="admin-button">Modifier un evenement</Link>
                <Link to="/listpart" className="admin-button">Liste des participants</Link>
            </div>
        </div>
    );
}

export default Admin;
