//Importer les actions

// import * as actions from actions
import { SET_USER, SET_USERS, SET_AUTH_USER, LOGOUT_USER } from "./actions";

//La table des utilisateurs

export const setUser = user => ({ type: SET_USER, payload: user })
export const setUsers = users => ({ type: SET_USERS, payload: users })

export const logedInUser = user => ({ type: SET_AUTH_USER, payload: user })
export const logout = () => ({ type: LOGOUT_USER, payload: {} })
