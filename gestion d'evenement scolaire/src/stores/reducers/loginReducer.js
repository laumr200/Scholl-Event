import { SET_AUTH_USER, LOGOUT_USER } from "../actions";

const initLoginUser = {
    authUser: {},  // Stocke les infos de l'utilisateur connecté
    token: '',     // Stocke le token d'authentification
    isAuthenticated: false // Indique si l'utilisateur est connecté
};

export const loginReducer = (state = initLoginUser, action) => {
    const { type, payload } = action;
    
    switch (type) {
        case SET_AUTH_USER:
            return { 
                ...state, 
                authUser: payload,  // `payload` doit contenir l'utilisateur authentifié
                token: payload.token || '', 
                isAuthenticated: true 
            };
        case LOGOUT_USER:
            return { 
                ...state, 
                authUser: {}, 
                token: '', 
                isAuthenticated: false 
            };
        default:
            return state;
    }
};
