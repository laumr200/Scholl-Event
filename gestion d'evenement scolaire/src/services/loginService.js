import http from "./API/axiosAPI";

export const login = async (loginData) => {
    try {
        const response = await http.post('/auth/login', loginData);
        return response.data;
    } catch (error) {
        console.error("Erreur de connexion", error.response?.data || error.message);
        throw error;
    }
};
