import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';  // Base de l'API

export const register = async (registerInfo, role) => {
    try {
        let url = `${API_BASE_URL}/etudiants`;  // Par défaut, inscription étudiant
        if (role === "admin") {
            url = `${API_BASE_URL}/admins`;  // Si c'est un admin, change l'URL
        }

        const response = await axios.post(url, registerInfo, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        console.error('Erreur d\'inscription :', error.response?.data || error);
        throw error.response?.data || { message: 'Erreur lors de l\'inscription.' };
    }
};
