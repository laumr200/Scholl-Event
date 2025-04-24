//Importer les actions
import { SET_USER, SET_USERS } from "../actions"
//Definir l'etat initial
const initialUserState = {
    user: {},
    users: []
}

//Les reducteurs pour mettre a jour l'etat
export const userReducer = (state = initialUserState, action)=>{
    const { type, payload } = action
    switch (type) {
        case SET_USER:
            return { ...state, user: payload }
        case SET_USERS:
            return { ...state, users: payload }
        default:
            return state
    }
}