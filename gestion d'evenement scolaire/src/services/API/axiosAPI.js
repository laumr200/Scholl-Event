import axios from "axios";
import store from "../../stores";

//Creer une instance avec l'url
const http = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL
})

//Injecter le token de l'authentification

http.interceptors.request.use(config => {
    //Recuperer le token depuis le store
    const { token } = store.getState().auth

    //Ajouter le token a la requete
    config.headers = {
        'Authorization': token ? `Bearer ${token}` : '',
    }

    return config
})

export default http